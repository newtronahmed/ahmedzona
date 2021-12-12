import Product from "../../../models/product";
import nextConnect from "next-connect";
import db from "../../../utils/db";
import { responsiveFontSizes } from "@material-ui/core";

const handler = nextConnect()

handler.get(async function (req,res){
    const product = await Product.findById(req.query.id).populate('category')
    res.json(product)

})
export default db.connect(handler)