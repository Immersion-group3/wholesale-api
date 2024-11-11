import { ManageModel } from "../models/manage.js";

// Get all orders for the authenticated vendor
export const getVendorOrders = async (req, res, next) => {
    const vendorId = req.vendor.id;
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const orders = await ManageModel.find({ vendor: vendorId }).session(session);
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this vendor." });
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

  export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await ManageModel.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        order.updatedAt = Date.now();
        await order.save();

        res.json(order);
    } catch (error) {
        next(error);
    }
};

// Add a message for order communication
export const addOrderMessage = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { message } = req.body;

        const order = await ManageModel.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.messages.push({ message, sender: req.vendor.id });
        await order.save();

        res.json(order);
    } catch (error) {
        next(error);
    }
};