import Product from "../../../models/product";
import nextConnect from "next-connect";
import db from "../../../utils/db";
// import { responsiveFontSizes } from "@material-ui/core";

const handler = nextConnect()

handler.get(async function (req,res , next){
    try{
        const product = await Product.findById(req.query.id).populate('category').populate("reviews").populate('brand')
        res.json({product , reviews:product.reviews})
    }catch(e){
        console.log(e)
        next()
    }

})
export default db.connect(handler)