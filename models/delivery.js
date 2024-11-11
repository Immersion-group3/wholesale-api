import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const deliverySchema = new Schema(
  {
    orderId: { type: Types.ObjectId, ref: "Order", required: true },
    // deliveryPersonId: {
    //   type: Types.ObjectId,
    //   ref: "DeliveryPerson",
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["in preparation", "in-transit", "completed", "failed"],
      default: "in preparation",
    },
    assignedAt: { type: Date },
    completedAt: { type: Date },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);

deliverySchema.plugin(toJSON);

export const DeliveryModel = model("delivery", deliverySchema)