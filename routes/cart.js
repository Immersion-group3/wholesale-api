import { Router } from 'express';
import { addToCart, clearCart, getClientCart, removeFromCart } from '../controllers/cart.js';

const cartRouter = Router();

cartRouter.post("/carts/add", addToCart);

cartRouter.get("/carts/get", getClientCart);

cartRouter.post("/carts/remove", removeFromCart);

cartRouter.post("/carts/clear", clearCart);

export default cartRouter;