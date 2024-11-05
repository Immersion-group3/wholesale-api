import { CartModel } from "../models/cart.js";

// Add a product to the cart or update its quantity if it already exists in the cart.
export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const clientId = req.client.id;

  try {
    // Find the active cart for the client
    let cart = await CartModel.findOne({ client: clientId, status: "Active" });

    // If no active cart exists, create a new one
    if (!cart) {
      cart = new CartModel({ client: clientId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item => item?.product?.toString() === productId);
    if (itemIndex > -1) {
      // Update quantity if item already exists in cart
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Otherwise, add new item to cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the updated cart
    const updatedCart = await cart.save();
    res.status(200).json("Added to Cart!");

  } catch (error) {
    next(error);
  }
}

// Remove a product from the cart based on its product ID
export const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const clientId = req.client.id;

  try {
    // Find the active cart for the client
    const cart = await CartModel.findOne({ client: clientId, status: "Active" });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);

  } catch (error) {
    next(error);
  }
}

// Clear all items from the cart
export const clearCart = async (req, res, next) => {
  const clientId = req.client.id;

  try {
    // Find the active cart for the client
    const cart = await CartModel.findOne({ client: clientId, status: "Active" });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Clear the cart items
    cart.items = [];
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);

  } catch (error) {
    next(error);
  }
}