const express = require('express');
const Router = express.Router();
const {getUser} = require('../controller/user');
const {verifyUser} = require('../utils/verifyToken')

Router.get("/user/:id",verifyUser,getUser);
// Router.get("/user/:id",getAllUser);
// Router.get("/user/:id",getUser);
// Router.get("/user/:id",getUser);

module.exports = Router;
