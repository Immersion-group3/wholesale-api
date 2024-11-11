import { DeliveryModel } from "../models/delivery";

export const assignDeliveryPerson = async (req, res, next) => {
  try {
    const { orderId, deliveryPersonId } = req.body;
    const delivery = new DeliveryModel({
      orderId,
      deliveryPersonId,
      status: "assigned",
    });
    await delivery.save();
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign delivery person", error });
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
     res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: "Failed to update delivery status", error });
  }
};

export const trackDelivery = async (req, res, next) => {
    try {
        const delivery = await DeliveryModel.findById(req.params.deliveryId).populate('orderId');
        res.json(delivery);
    } catch (error) {
        res.status(500).json({ message: "Failed to track delivery", error });
    }
}
