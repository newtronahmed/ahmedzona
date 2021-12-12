import nextConnect from "next-connect";
import db from '../../../utils/db'
import Review from '../../../models/reviews'
import ErrorHandler from '../../../utils/errorhandler'
import auth from '../../../utils/auth'
import Product from "../../../models/product";
const handler = nextConnect({
    // onError,
})

handler.get( ErrorHandler(async function(req,res, next){
    // throw new Error('ooohh')
    const reviews = await Review.find({}).populate('owner').populate('product')
    res.send({reviews})
}))
handler.use(auth.authMiddleware).post(ErrorHandler(async function (req,res,next){
    // console.log(req.body)
    if(!req.body.review || !req.body.product){
       return res.status(400).json({message:"Invalid input"})
    }
    const newReview = {message: req.body.review , product:req.body.product, owner: req.user._id}
     await Review.create(newReview)
     const product = await Product.findById(req.body.product)
     product.reviews.push({name: req.user.name, message:req.body.review, owner: req.user.name})
     const updatedProduct = await product.save()
     res.send({status:"success" , message:"Your review has been added" , updatedReviews:updatedProduct.reviews})
}))
export default db.connect(handler)