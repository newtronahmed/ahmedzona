import nextConnect from "next-connect";
import db from "../../../utils/db";
import {Brand} from "../../../models/product";
const handler = nextConnect()
handler.get(async function(req,res){
    const brands = await Brand.find({})
    // console.log(products)
    res.send(brands)
})
export default db.connect(handler)