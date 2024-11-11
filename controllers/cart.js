import { CartModel } from "../models/cart.js";

// Add a product to the cart or update its quantity if it already exists in the cart.
export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const clientId = req.client.id;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Invalid product ID or quantity." });
  }

  try {
    let cart = await CartModel.findOne({ client: clientId, status: "Active" });

    if (!cart) {
      cart = new CartModel({ client: clientId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item?.product?.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(200).json({ message: "Added to Cart!", cart: updatedCart });

  } catch (error) {
    console.error("Error adding to cart:", error);
    next(error);
  }
}

// 
export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await CartModel.find().populate('items.product');
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error fetching all carts:", error);
    next(error);
  }
};

// Remove a product from the cart based on its product ID
export const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const clientId = req.client.id;

  if (!productId) {
    return res.status(400).json({ message: "Invalid product ID." });
  }

  try {
    const cart = await CartModel.findOne({ client: clientId, status: "Active" });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    const updatedCart = await cart.save();
    res.status(200).json({ message: "Item removed from cart.", cart: updatedCart });

  } catch (error) {
    console.error("Error removing from cart:", error);
    next(error);
  }
}

// Clear all items from the cart
export const clearCart = async (req, res, next) => {
  const clientId = req.client.id;

  try {
    const cart = await CartModel.findOne({ client: clientId, status: "Active" });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    cart.items = [];
    const updatedCart = await cart.save();
    res.status(200).json({ message: "Cart cleared.", cart: updatedCart });

  } catch (error) {
    console.error("Error clearing cart:", error);
    next(error);
  }
}