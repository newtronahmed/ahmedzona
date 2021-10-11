import nextConnect from "next-connect";
import db from '../../../../utils/db'
// import Order from "../../../../models/order";
// import jwt from 'jsonwebtoken'
import { onError } from "../../../../utils/functions";
import auth from "../../../../utils/auth";
const handler = nextConnect({
    onError,
})
// handler.use(authMiddleware)
handler.use(auth.authMiddleware)
handler.get(async function(req,res){
    res.send(process.env.PAYPAL_CLIENT_ID)
    // res.status(201).json({...newOrder})
})
export default db.connect(handler)