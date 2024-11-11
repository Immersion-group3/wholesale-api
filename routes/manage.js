import { Router } from "express";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { addOrderMessage, getVendorOrders, updateOrderStatus } from "../controllers/manage.js";



const manageRouter = Router();

manageRouter.get("/manage/:vendorId", isAuthenticated, hasPermission, getVendorOrders);

manageRouter.patch("/manage/:orderId", isAuthenticated, hasPermission, updateOrderStatus);

manageRouter.post("/manage/:orderId/message", isAuthenticated, hasPermission, addOrderMessage);

// export Router
export default manageRouter;