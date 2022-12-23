const express = require('express');
const Router = express.Router();
const { createBlog, updateBlog, deleteBlog, getUserBlog, getAllBlogs, getOneBlog } = require('../controller/blog');
const { verifyUser } = require('../utils/verifyToken');

Router.post('/post/:userid',verifyUser,createBlog);
Router.put('/edit/:id/:blogid',verifyUser,updateBlog);
Router.delete('/:userid/:id',verifyUser,deleteBlog);
Router.get('/userblog/:userid',getUserBlog);
Router.get('/',getAllBlogs);
Router.get('/:id',getOneBlog)

module.exports = Router;
