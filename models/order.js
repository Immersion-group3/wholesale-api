import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
  client: { type: Types.ObjectId, ref: "Client", required: true },
  cart_id: { type: Types.ObjectId, ref: "Cart", required: true },
  items: [
    {
      product: { type: Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum : ["In preparation", "In transit", "Delivered"] },
  vendor: { type: Types.ObjectId, ref: "Vendor", required: true },
  deliveryDate: {type: Date, required: true}
},
{
    timestamps: true,
});

export const OrderModel = model("Order", orderSchema);