const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product'
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }
},{timestamps:true}) 

const Review = mongoose.models?.Review || mongoose.model('Review', ReviewSchema) 
export default Review;