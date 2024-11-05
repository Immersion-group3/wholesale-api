import { Router } from 'express';
import { checkout, getClientOrderById, getClientOrders } from '../controllers/order.js';


const orderRouter = Router();

orderRouter.post("/orders/checkout", checkout);

orderRouter.get("/orders", getClientOrders);

orderRouter.get("/orders/:id", getClientOrderById);

export default orderRouter;