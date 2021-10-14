import mongoose from "mongoose";
 function connect  (handler){
    
    return async (req,res) =>{
        if(mongoose.connections[0].readyState){
            return handler(req,res)
        }
        await mongoose.connect(process.env.MONGODB_URI , {
            useNewUrlParser: true, useUnifiedTopology: true 
        })
        return handler(req,res)
    }
    
}

function convertDocToObject (doc){
    doc._id = doc._id.toString(),
    doc.createdAt = doc.createdAt.toString()
    doc.updatedAt = doc.updatedAt.toString()
    return doc;
}

export  default {connect , convertDocToObject};

