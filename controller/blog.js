const Blog = require('../models/blogs');
const User = require('../models/users');

const createBlog = async (req,res,next)=>{
    const userId = req.params.userid;
    const newBlog = new Blog(req.body);
    console.log(userId,newBlog);
    try{
        const savedBlog = await newBlog.save();
        try{
            await User.findByIdAndUpdate(userId,{
                $push: {blog:savedBlog._id}
            })
        }catch(err){
            next(err);
        }
        res.status(200).json(savedBlog);
    }catch(err){
        next(err);
    }
};

const updateBlog = async(req,res,next)=>{
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogid,
            { $set: req.body },
            { new:true } //this will reutrn updated value 
            );
            res.status(200).json(updatedBlog);
    }catch(err){
        next(err);
    }
};

const deleteBlog = async(req,res,next)=>{
    const userId = req.params.userid;
    try{
        await Blog.findByIdAndDelete(req.params.id);
        try{
            await User.findByIdAndUpdate(userId,
                {$pull:{blog: req.params.id}})
        }catch(err){
            next(err);
        }
        res.status(200).json("Blog has deleted!");
    }catch(err){
        next(err);
    }
    
};

const getUserBlog = async(req,res,next)=>{
    const id = req.params.userid;
    try{
        const user = await User.find({_id:id});
        try{
            const {email} = user[0];
            const userBlogs = await Blog.find({authorEmail:email});
    
            res.status(200).json(userBlogs);
        }catch(err){
            next(err);
        }
    }catch(err){
        next(err);
    }
};

const getAllBlogs = async(req,res,next)=>{
    try{
        const allBlogs = await Blog.find();
        res.status(200).json(allBlogs);
    }catch(err){
        next(err);
    }
};

const getOneBlog = async(req,res,next) =>{
    try{
        const thatblog = await Blog.findById(req.params.id);
       try{
        const thatuser = await User.find({email:thatblog.authorEmail});
        const {_id,username,email} =   thatuser[0];
        const totaldata = {thatblog,_id,username,email};
        res.status(200).json(totaldata);
       }catch(err){
        next(err);
       }
    }catch(err){
        next(err)
    }
}

module.exports = {createBlog,updateBlog,deleteBlog,getAllBlogs,getUserBlog,getOneBlog};