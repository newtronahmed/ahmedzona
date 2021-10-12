import nextConnect from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/product";
import { data } from "../../../utils/data";
const handler = nextConnect()
handler.get(async function(req,res){
    // db.connect2()
    res.send(data.products)
    // const products = await Product.find({})
    // res.send(products)
})
// export default db.connect(handler)
export default handler