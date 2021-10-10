import Product from "../../../models/product";
import nextConnect from "next-connect";
import db from "../../../utils/db";

const handler = nextConnect()

handler.get(async function (req,res){
    const product = await Product.findById(req.query.id)
    res.json(product)
})
export default db.connect(handler)