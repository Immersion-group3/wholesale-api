
import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  vendorId: {
    type: Types.ObjectId,
    ref: "vendor",
    required: false,
  },
  deliveryDate: { type: [Date], default: [] },
<<<<<<< HEAD
});
    // title: { type: String, required: true },
    // price: { type: Number, required: true },
    // availability: { type: String, required: true },
    // description: { type: String, required: true },
    // icon: {type: String, required: true},
    // deliveryDate: { type: Date, required: true }

=======

});
>>>>>>> 7bddcb965fa5dfd43280338047a9a6bc3e4935e8

export const ProductModel = model("Products", productSchema);

