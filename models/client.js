import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const clientSchema = new Schema({
  firstName: {
    type: String, required: true,},
  lastName: { type: String, requiered: true },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: "client", enum: ["client", "vendor"] },
},
  {
    timestamps: true,
  }
);

// // Add a virtual field for confirmPassword
// clientSchema.virtual("confirmPassword").set(function (value) {
//   this._confirmPassword = value;
// });
// // Custom validation for password confirmation
// clientSchema.pre("save", function (next) {
//   if (this.password === this._confirmPassword) {
//     return next(new Error("Passwords do not match"));
//   }
//   next();
// });

// Plugin for converting MongoDB data to JSON
clientSchema.plugin(toJSON);

export const ClientModel = model("Client", clientSchema);
