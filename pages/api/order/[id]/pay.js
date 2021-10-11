import nextConnect from "next-connect";
import db from '../../../../utils/db'
import Order from "../../../../models/order";
// import jwt from 'jsonwebtoken'
import { onError } from "../../../../utils/functions";
import auth from "../../../../utils/auth";
// import axios from "axios";
const handler = nextConnect({
    onError,
})
// handler.use(authMiddleware)
handler.use(auth.authMiddleware)
handler.put(async function(req,res){
    const order =await  Order.findById(req.query.id)
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResults={
            id:req.body.id,
            status:req.body.status,
            email_address:req.body.email_address
        }
    }
    const orderPaid = await   order.save()
    res.send({message:"order paid", order:orderPaid})
    // res.status(201).json({...newOrder})
})
export default db.connect(handler)