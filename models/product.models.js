import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    offerPrice: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
})

const Product=mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
