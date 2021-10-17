import nextConnect from "next-connect";
import User from "../../../../models/user";
import db from "../../../../utils/db";
// import bcrypt from 'bcryptjs'
import auth from "../../../../utils/auth";
const handler = nextConnect()
handler.use(auth.authMiddleware)
handler.get(async function (req,res){
    const user = await User.findById(req.user._id).populate("favourites")
    if(!user){
        res.status(400).send({message:"No user found by this email"})
        return 
    }
   res.send(user)
    
})

export default db.connect(handler)