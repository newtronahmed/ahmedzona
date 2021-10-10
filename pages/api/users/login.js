import nextConnect from "next-connect";
import User from "../../../models/user";
import db from "../../../utils/db";
import bcrypt from 'bcryptjs'
import auth from "../../../utils/auth";
const handler = nextConnect()

handler.post(async function (req,res){
    const user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(400).send({message:"No user found by this email"})
        return 
    }
    const passwordMatch = bcrypt.compareSync(req.body.password,user.password)

    if(!passwordMatch) return res.status(400).send({message:"Password doesn't match"})

    const token = auth.signToken(user)
    res.send({
        name:user.name,
        email:user.email,
        _id:user._id,
        token,
    })


})

export default db.connect(handler)
