import nextConnect from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/product";
const handler = nextConnect()
handler.get(async function(req,res){
    const products = await Product.find({})
    // console.log(products)
    res.send(products)
})
export default db.connect(handler)