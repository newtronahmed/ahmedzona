import nextConnect from "next-connect";
import db from "../../../utils/db";
import {Category} from "../../../models/product";
const handler = nextConnect()
handler.get(async function(req,res){
    const categories = await Category.find({})
    // console.log(products)
    res.send(categories)
})
export default db.connect(handler)