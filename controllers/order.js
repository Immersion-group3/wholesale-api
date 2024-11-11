import { OrderModel } from "../models/order.js";
import { CartModel } from "../models/cart.js";
import mongoose from "mongoose";

export const checkout = async (req, res, next) => {
  const clientId = req.client.id;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Find the active cart for the client
    const cart = await CartModel.findOne({ client: clientId, status: "Active" })
      .populate("items.product")
      .session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Cart is empty or does not exist." });
    }
    // Calculate total amount
    const totalAmount = cart.items.reduce((acc, item) => {
      if (!item.product || !item.product.price) {
        throw new Error("Product information is incomplete.");
      }
      return acc + item.product.price * item.quantity;
    }, 0);
    // Create a new order
    const newOrder = new OrderModel({
      client: clientId,
      cart_id: cart._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
      status: "In preparation", // Initial status
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7 days from now
    });

    const savedOrder = await newOrder.save({ session });
    // Update cart status
    cart.status = "Checked Out";
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during checkout:", error);
    res
      .status(500)
      .json({ message: "Checkout failed. Please try again later." });
  }
};

export const createOrder = async (req, res, next) => {
  const clientId = req.client.id;
  try {
    // Find the active cart for the client
    const cart = await CartModel.findOne({
      client: clientId,
      status: "Active",
    }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found." });
    }
    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    // Create a new order
    const order = new OrderModel({
      client: clientId,
      cart_id: cart._id,
      items: cart.items,
      totalAmount,
      status: "In preparation",
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7 days from now
      paymentStatus: paymentMethod === "pay_on_delivery" ? "pending" : "unpaid", //added by irene
    });
    // Save the order
    const savedOrder = await order.save();
    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    next(error);
  }
};

// Get all orders for the authenticated client
export const getClientOrders = async (req, res, next) => {
  const clientId = req.client.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orders = await OrderModel.find({ client: clientId }).session(session);

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this client." });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(orders);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// Get a specific order for the authenticated client
export const getClientOrderById = async (req, res, next) => {
  const { orderId } = req.params;
  const clientId = req.client.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await OrderModel.findOne({
      _id: orderId,
      client: clientId,
    }).session(session);

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: "Order not found or access denied." });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(order);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
