import nextConnect from "next-connect";
import Product ,{Category, Brand} from "../../models/product";
import { data } from "../../utils/data";
import Review from "../../models/reviews";
import db from "../../utils/db";
import User from "../../models/user";
import mongoose from 'mongoose'
const handler = nextConnect()

handler.get(async function (req,res){
    // try {
    //     await Promise.all([
    //         //  Product.deleteMany(),
    //         //  User.deleteMany(),
    //         //  Product.insertMany(data.products),
    //             Review.insertMany(data.reviews)
    //         //  User.insertMany(data.users),
    //         //  Category.deleteMany(),
    //         //  Category.insertMany(data.categories),
    //         //  Brand.deleteMany(),
    //         //  Brand.insertMany(data.brands)
     
    //      ])
    //      res.send({message: "data seeded successfully"})  
    // } catch (error) {
    //     console.log(error)
    // }
    // try {
    //     await Product.updateMany({reviews:
    //         [{message:"Another kind of review" , owner:"Ahmed Zubairu"}] , category:mongoose.Types.ObjectId("619ec253cd207043b48fbc27"),
    //     })
    //     res.send({message: "data seeded successfully"})  
        
    // } catch (error) {
    //     console.log(error)
    // }
})
export default db.connect(handler);
