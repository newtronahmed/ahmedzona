import nextConnect from "next-connect";
import db from '../../../utils/db'
import Order from "../../../models/order";
// import jwt from 'jsonwebtoken'
import { onError } from "../../../utils/functions";
import auth from "../../../utils/auth";
const handler = nextConnect({
    onError,
})
// handler.use(authMiddleware)
handler.use(auth.authMiddleware)
handler.post(async function(req,res){
    // res.status(400).json({message:{...req.body}})
    // console.log(req.user._id)
    const order = await Order.create({...req.body , user: req.user._id})
    res.send({order})
    // res.status(201).json({...newOrder})
})
export default db.connect(handler)