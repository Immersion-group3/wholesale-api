import { Router } from 'express';
import { addToCart, clearCart, getAllCarts, removeFromCart } from '../controllers/cart.js';

const cartRouter = Router();

cartRouter.post("/carts/add", addToCart);

cartRouter.get("/carts/get", getAllCarts);

cartRouter.post("/carts/remove", removeFromCart);

cartRouter.post("/carts/clear", clearCart);

export default cartRouter;