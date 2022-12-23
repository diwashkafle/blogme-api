
const jwt = require("jsonwebtoken");
const createError = require("./erros");

 const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        console.log("token not found");
        return next(createError(401, "You aren't authenticated"))
    }else{
        jwt.verify(token,process.env.JWTSECRET,(err,user)=>{
            if(err){
                return next(createError(403,"Token is not valid"))
            }
            req.user = user;
            next();
        })
    } 
}

 const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id ){
            next()
        }else{
            if(err) return next(createError(403, "You aren't authorized!"))
        }
    })
}



module.exports = {verifyToken,verifyUser};