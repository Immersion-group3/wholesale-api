import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema(
  {
    client: { type: Types.ObjectId, ref: "client", required: true },
    cart_id: { type: Types.ObjectId, ref: "cart", required: true },
    items: [
      {
        product: { type: Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["In preparation", "In transit", "Delivered"],
    },
    vendor: { type: Types.ObjectId, ref: "Vendor", required: true },
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