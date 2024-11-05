import { Schema, Types, model } from "mongoose";

const cartItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const cartSchema = new Schema({
  client: { type: Types.ObjectId, ref: "Client", required: true },
  items: [cartItemSchema],
  status: { type: String, default: "Active" },
  updatedAt: { type: Date, default: Date.now },
});

export const CartModel = model("Cart", cartSchema);