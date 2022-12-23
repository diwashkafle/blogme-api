const User = require("../models/users");


const getUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        next(err)
    }
}



module.exports = {getUser};