const express = require('express');
const PORT = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

const corsOptions ={
    origin:'https://blogme-1z0n.onrender.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use("/api/auth",authRouter);
app.use("/api",userRouter);
app.use("/api/blogs",blogRouter);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errormessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        sucess:false,
        status:errorStatus,
        message:errormessage,
        stack:err.stack
    })
})


const MongodbConnect = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO);
       console.log("Connected to mongodb")
    }catch(err){
        console.log(err)
    }
}

app.listen(PORT, ()=>{
    MongodbConnect();
    console.log(`Server is running in port ${PORT}`)
})
