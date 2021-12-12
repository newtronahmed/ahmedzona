module.exports = function(fn){
    return (req,res,next) => fn(req,res,next).catch(err=> {
        console.log(err)
        res.send({message:'something went wrong' , status:'error' , error:err.toString()})
        
    }

    )
}