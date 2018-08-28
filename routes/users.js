var express = require('express');
var router = express.Router();
var UserService = require('../services/user_service');



// 用户登录
// http://localhost:3000/user/login
router.post("/login",UserService.login);
// 用户注册
router.post("/register",UserService.register);


module.exports = router;
