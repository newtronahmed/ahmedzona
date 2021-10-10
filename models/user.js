import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required:true,
    }

})

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User;