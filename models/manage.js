import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const manageOrderSchema = new Schema({
    clientId: { type: Types.ObjectId, ref: 'Client', required: true },
    vendorId: { type: Types.ObjectId, ref: 'Vendor', required: true },
    items: [{ name: String, quantity: Number }],
    status: { type: String, enum: ['pending', 'in progress', 'shipped', 'delivered'], default: 'pending' },
    messages: [{ message: String, sender: String, timestamp: { type: Date, default: Date.now } }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
  }
);

// Plugin for converting MongoDB data to JSON
manageOrderSchema.plugin(toJSON);

export const ManageModel = model("Manage", manageOrderSchema);