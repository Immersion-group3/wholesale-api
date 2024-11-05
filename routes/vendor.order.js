import { Router } from "express";
import { addOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controllers/vendor.order.js";


const orderRouter = Router();

orderRouter.get("/orders", getAllOrders);

orderRouter.get("/orders/:id", getOrderById);

orderRouter.post("/orders", addOrder);

orderRouter.patch("/orders/:id", updateOrder);

orderRouter.delete("/orders/:id", deleteOrder);

export default orderRouter;
