import mongoose from 'mongoose'
const OrderSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User" , required:true},
    cartItems: [
        {
            name:{
                type:String,
                required:true,   
            },
            quantity:{
                type:Number,
                required:true,   
            },
            image:{
                type:String,
                required:true,   
            },
            price:{
                type:Number,
                required:true,   
            }
        }
    ] ,
    shippingInfo:{
        fullname:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalcode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    itemsPrice:{
        type:String,
        required:true,
    },
    tax:{
        type:String,
        required:true,
    },
    shippingPrice:{
        type:String,
        required:true,
    },
    total:{
        type:String,
        required:true,
    },
    isPaid:{
        type:Boolean,
    
        default:false,
    },
    isDelivered:{
        type:Boolean,
        default:false,
    },
    paidAt:{
        type: Date,
    },
    deliveredAt:{
        type:Date,
    },
    paymentResults:{
        id:{
            type:String
        },
        status:{
            type:String
        },
        email_address:{
            type:String
        }
    }

},{timestamps:true})
const Order = mongoose.models.Order || mongoose.model("Order",OrderSchema)
export default Order;