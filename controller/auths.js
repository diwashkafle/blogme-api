const User = require("../models/users");
const bcrypt = require('bcrypt');
const createError = require('../utils/erros');
const jwt = require("jsonwebtoken");

const register = async (req,res,next)=>{

    try{
        const {username,email,password,confirmPassword} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);
if(password===confirmPassword){
}
         const newUser = new User({
        username:username,
        email:email,
        password:hash,
    })
    await newUser.save();
    await res.status(200).send(newUser);
    }catch(err){
        next(err)
    }
}

const login = async (req,res,next)=>{
    const {email,password} = req.body;
    try{
       const user = await User.findOne({email:email})
       if(!user){
            return next(createError(404,"User not found!"))
       }else{
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return next(createError(404,"Incorrect password"));

        }
        const token = jwt.sign({id:user._id, email:user.email}, process.env.JWTSECRET)

        res.cookie("access_token",token,{
            sameSite:true,
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly:true
        })
        return res.status(200).json(user)
       }
      
    }catch(err){
        next(err);
    }

}

module.exports = {register,login};
