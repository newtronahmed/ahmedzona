import Product from "../../../../models/product";
import nextConnect from "next-connect";
import db from "../../../../utils/db";

const handler = nextConnect()

handler.get(async function (req,res){
    const product = await Product.findOne({slug:req.query.slug}).lean()
    // console.log("product",product)
    res.json(db.convertDocToObject(product))
})
export default db.connect(handler)