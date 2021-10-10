import nextConnect from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/user";
import bcrypt from 'bcryptjs'
import auth from '../../../utils/auth'
const handler = nextConnect()

handler.post( async function  (req,res){
    const {name,email, password ,confirmPassword} = req.body
    const userExists = await User.findOne({email})
    if(userExists) return res.status(400).json({message:"Email is already signed up"})
     const newUser = await User.create({name,email, isAdmin:false , password:bcrypt.hashSync(password) })
    const token =  auth.signToken(newUser)
     res.status(200).json({_id: newUser._id, name:newUser.name, email:newUser.email , token , isAdmin:false})
    
})

export default  db.connect(handler)