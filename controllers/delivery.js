import { DeliveryModel } from "../models/delivery.js";
import { OrderModel } from "../models/order.js";
import { DeliveryPersonModel } from "../models/deliveryperson.js";

export const addDeliveryPerson = async (req, res, next) => {
  try {
    const { name, contactNumber, status } = req.body;
    if (!name || !contactNumber || !status) {
      return res.status(400).json({
        message: "Name, contactNumber, and status are required",
      });
    }
    const deliveryPerson = new DeliveryPersonModel({
      name,
      contactNumber,
      status,
    });
    await deliveryPerson.save();
    res.status(201).json({message: "Delivery person created successfully"});
  } catch (error) {
    console.error("Error creating delivery person:", error);
    res.status(422).json({ message: "Failed to create delivery person", error});
  }
};

export const assignDeliveryPerson = async (req, res, next) => {
  try {
    const { orderId, deliveryPersonId } = req.body;

    const order = await OrderModel.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    const delivery = new DeliveryModel({
      orderId: order._id,
      deliveryPersonId,
      status: "in-preparation",
      collectPayment: order.paymentMethod === "pay_on_delivery",
    });
    await delivery.save();
    res.status(201).json(delivery);
  } catch (error) {
    res
      .status(422)
      .json({ message: "Failed to assign delivery person", error });
  }
};

export const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const delivery = await DeliveryModel.findByIdAndUpdate(
      req.params.deliveryId,
      { status },
      { new: true }
    );
    res.status(201).json("delivery updated successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update delivery status", error });
  }
};

export const trackDelivery = async (req, res, next) => {
  try {
    const delivery = await DeliveryModel.findById(
      req.params.deliveryId
    ).populate("orderId");
    res.json(delivery);
  } catch (error) {
    res.status(422).json({ message: "Failed to track delivery", error });
  }
};

export const completeDelivery = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const { paymentCollected } = req.body;
    const delivery = await DeliveryModel.findById(deliveryId).populate(
      "orderId"
    );
    if (!delivery)
      return res.status(404).json({ message: "Delivery not found" });

    if (delivery.collectPayment && !paymentCollected) {
      return res.status(400).json({ message: "Payment not collected" });
    }

    delivery.status = "completed";
    await DeliveryModel.save();
    if (delivery.collectPayment && paymentCollected) {
      delivery.orderId.paymentStatus = "paid";
      await DeliveryModel.orderId.save();
    }

    res.status(200).json({ message: "Delivery completed successfully" });
  } catch (error) {
    res.status(422).json({ message: "failed to complete delivery"}, error);
  }
};
