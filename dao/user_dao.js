const {User} = require('./model.js');

const UserDao = {
    save(userinfo){
        const user = new User(userinfo);
        return user.save();//返回promise对象
    },
    find(userinfo){
        return User.find(userinfo);
    },
    updata(){},
    delete(){}
};


module.exports = UserDao;