import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const deliveryPersonSchema = new Schema(
  {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    status: { type: String, enum: ["available", "busy"], default: "available" },
  },
  {
    timestamps: true,
  }
);

deliveryPersonSchema.plugin(toJSON)

export const DeliveryPersonModel = ("deliveryPerson", deliveryPersonSchema);