import { OrderModel } from "../models/order.js";
import { CartModel } from "../models/cart.js";
import mongoose from 'mongoose';

export const checkout = async (req, res, next) => {
  const clientId = req.client.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await CartModel.findOne({ client: clientId, status: "Active" })
      .populate('items.product')
      .session(session);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty or does not exist." });
    }

    const totalAmount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const newOrder = new OrderModel({
      client: clientId,
      cart_id: cart._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalAmount
    });

    const savedOrder = await newOrder.save({ session });
    cart.status = "Checked Out";
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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
      return res.status(404).json({ message: "No orders found for this client." });
    }

    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json(orders);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

// Get a specific order for the authenticated client
export const getClientOrderById = async (req, res, next) => {
  const { orderId } = req.params;
  const clientId = req.client.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await OrderModel.findOne({ _id: orderId, client: clientId }).session(session);

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Order not found or access denied." });
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