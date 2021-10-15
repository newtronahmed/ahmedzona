import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    slug:{
        type: String,
        required:true,
        unique:true,
    },
    description:{
        type: String,
        required:true,
    },
    numReviews:{
        type: Number,
        required:true,
        default:0
    },
    numRatings:{
        type: Number,
        required:true,
        default: 0,
    },
    price:{
        type: Number,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    brand:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    countInStock:{
        type: String,
        required:true,
        default:0
    }
},{
    timestamps:true,
});

const Product = mongoose.models?.Product ||  mongoose.model("Product",ProductSchema)
export default Product;