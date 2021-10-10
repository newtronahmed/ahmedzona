import jwt from 'jsonwebtoken'
function signToken (user){
   const token= jwt.sign({
        ...user,
    }, process.env.JWT_SECRET_KEY ,

    {expiresIn:'30d'}

    )
    return token;
}

async function authMiddleware (req,res,next){
    const {authorization} = req.headers
        
        if(authorization) {
           const authToken = authorization.slice(7,authorization.length)
        
            jwt.verify(authToken,process.env.JWT_SECRET_KEY, function(err,decoded){
                if(err) {
                    res.status(403).json({message:"Invalid token provided"})  
                } 
                req.user = decoded;
                
            })
        }else {
             res.status(403).json({message:"Token Not provided"})
             
        }
        next()

}
export default {signToken, authMiddleware};