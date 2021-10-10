import nextConnect from "next-connect";
import Product from "../../models/product";
import { data } from "../../utils/data";
import db from "../../utils/db";
import User from "../../models/user";
const handler = nextConnect()

handler.get(async function (req,res){
    await Product.deleteMany()
    await User.deleteMany()
    await Product.insertMany(data.products)
    await User.insertMany(data.users)
    res.send({message: "data seeded successfully"})
})
export default db.connect(handler);
