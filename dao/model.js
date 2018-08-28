// 引入mongoose
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/lwq_h51804');

// 用户模型
const User = mongoose.model('user',{
    username:String,
    password:String,
    email:String
});


module.exports = {User};