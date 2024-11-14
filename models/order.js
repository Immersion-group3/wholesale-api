import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema(
  {
    client: { type: Types.ObjectId, ref: "client", required: false },
    cart_id: { type: Types.ObjectId, ref: "cart", required: false },
    items: [
      {
        product: { type: String, ref: "product", required: false },
        quantity: { type: Number, required: false },
      },
    ],
    totalAmount: { type: Number, required: false },
    status: {
      type: String,
      enum: ["In preparation", "In transit", "Delivered"],
    },
    vendor: { type: String, ref: "Vendor", required: false },
    deliveryDate: { type: Date, required: true },
    //added by irene
    paymentMethod: {
      type: String,
      enum: ["online", "pay_on_delivery"],
      default: "pay_on_delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "pending"],
      default: "unpaid",
    },
  },
{
    timestamps: true,
  }
);

export const OrderModel = model("Order", orderSchema);