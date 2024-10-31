import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product : {type: String, required: true},
    price : {type: String, required:true},
    avalability :{ type:String,required:true},
    order : { type:String, required:true},
})

export const ProductsModel = mongoose.model('Products', productSchema);