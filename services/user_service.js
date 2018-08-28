const UserDao = require("../dao/user_dao.js");
const bcrypt = require('bcrypt');//加密
const UserService = {
	login(req, res, next) {
		// 获取登录时的用户名与密码
		const {username, password} = req.body;
		// 根据用户名查询用户信息
		UserDao
			.find({username}) // 查询出用户信息
			.then(data=>{
				if (data.length === 1) { // 存在该用户
					// 获取数据库中所保存的用户加密后的密码
					const _pass = data[0].password;
					// 比较密码是否正确
					if (bcrypt.compareSync(password, _pass)) { // 正确
						res.json({res_code:1, res_error:"", res_body: data[0]});
					} else { // 错误
						res.json({res_code:0, res_error:"not exist", res_body:{}});
					}
				} else {
					res.json({res_code:-1, res_error:"not exist", res_body:{}});
				}
			})
			.catch(err=>{
				res.json({res_code: -1, res_error: err, res_body: {}});
			});
	},
	// 注册
	register(req, res, next) {
		// 获取在请求中传递的注册用户信息
        const {username, password, email} = req.body;
		// 验证用户名是否已被注册
		// ...
		// 对密码加密
		const passCrpty = bcrypt.hashSync(password, 10);
		// 保存用户用户信息
		UserDao
			.save({username, password:passCrpty, email})
			.then((data)=>{
				res.json({res_code:1, res_error:"", res_body: data});
			})
			.catch((err)=>{
				res.json({res_code: -1, res_error: err, res_body: {}});
			});
	}
};

module.exports = UserService;