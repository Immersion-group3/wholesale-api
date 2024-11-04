import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const orderSchema = new Schema(
  {
    orderId: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      default: "in preparation",
      enum: ["in preparation", "in transit", "delivered"],
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.plugin(toJSON);

export const OrderModel = model("order", orderSchema);

