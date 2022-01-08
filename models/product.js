import mongoose from 'mongoose'
import Review from './reviews'
export const Category = mongoose.models?.Category || mongoose.model('Category',{
    name:String
})
export const Brand = mongoose.models?.Brand || mongoose.model('Brand',{
    name:String
})
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
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    },
    countInStock:{
        type: String,
        required:true,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    // reviews:[new mongoose.Schema({
    //     message: {
    //         type: String,
    //         required: true,
    //         trim:true,
    //     },
    //     owner:{
    //         type: String,
    //         required: true,
    //     },
    //     createdAt:{
    //         type:Date,
    //         default:Date.now()
    //     }

    // })]

},{
    timestamps:true,
});

ProductSchema.virtual("reviews",{
    ref:"Review",
    foreignField:"product",
    localField:"_id"
})

const Product = mongoose.models?.Product ||  mongoose.model("Product",ProductSchema)

export default Product;