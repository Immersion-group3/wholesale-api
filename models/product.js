import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {type: String, required: true},
    price : {type: String, required:true},
    avalability :{ type:String,required:true},
    discription : { type:String, required:true},
    image : {type: String, required: true},
})

export const ProductsModel = mongoose.model('Products', productSchema);