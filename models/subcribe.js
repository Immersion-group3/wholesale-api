import { Schema, model } from "mongoose";

const subscriberSchema = new Schema({
    email: { type: String, required: true, unique: true },
    dateSubscribed: { type: Date, default: Date.now }
},
    {
        timestamps: true,
    }
);

export const SubscribeModel = model("Subscribe", subscriberSchema)
