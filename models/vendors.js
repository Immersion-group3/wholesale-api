import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const vendorSchema = new Schema({
    businessName: {type: String, required: false},
    firstName: {type: String, required: true},
    lastName: {type: String, requiered: true},
    email: {type: String, required: true, unique: true},
    mobile: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true}
},
{
  timestamps: true,
}
)

vendorSchema.plugin(toJSON);

export const VendorModel = model ("User", vendorSchema);
