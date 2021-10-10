const getError = (error) =>{
    console.log(error)
    return error.response?.data ? error.response.data.message : error.message;
}
const onError = (err,req,res,next) =>{
    res.status(500).send({message:err.toString()})
}
export {getError,onError}