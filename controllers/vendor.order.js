import { OrderModel } from "../models/vendor.order.js";
import { addOrderValidator, updateOrderValidator } from "../validators/vendor.order.js";

export const getAllOrders = async (req, res) => {
  try {
    const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;

    const orders = await OrderModel.find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip)
      .populate("user", "businessName");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

export const addOrder = async (req, res) => {
  try {
    const { error, value } = addOrderValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    const order = new OrderModel({
      ...value,
      user: req.auth.id,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(422).json({ message: "Failed to add order", error });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { error, value } = updateOrderValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      value,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "businessName"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Order", error });
  }
};
