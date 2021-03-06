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
// 职位模型
const Position = mongoose.model("position",{
    name:String,
    logo:String,
    salary:Number,
    city:String,
    position_type:String,
    company_name:String,
    experience:String
})


module.exports = {User,Position};