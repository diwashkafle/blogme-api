const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String
    },
    blog:{
        type:[String]
    }
})

module.exports = mongoose.model("User", UserSchema)