
import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, required: true },
    description: { type: String, required: true },
    icon: {type: String, required: true},
    deliveryDate: { type: Date, required: true }

})

export const ProductModel = model("Products", productSchema);

