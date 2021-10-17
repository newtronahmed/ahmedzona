import nextConnect from "next-connect";
import User from "../../../../models/user";
import db from "../../../../utils/db";
// import bcrypt from 'bcryptjs'
import auth from "../../../../utils/auth";
const handler = nextConnect()
handler.use(auth.authMiddleware)
handler.post(async function (req,res){
    let user = await User.findById(req.user._id)
    if(!user){
        res.status(400).send({message:"No user found by this email"})
        return 
    }
    user.favourites.push(req.query.id)
   let updatedUser =  await user.save()
   res.send(updatedUser)
})

handler.delete(async function (req,res){
    let user = await User.findById(req.user._id)
    if(!user){
        res.status(400).send({message:"No user found by this email"})
        return 
    }
    let updated = user.favourites.filter(each=>each != req.query.id)
    user.favourites = updated
    let updatedUser = await user.save()
    res.send(updatedUser)
    
}) 




export default db.connect(handler)