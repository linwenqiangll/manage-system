const {Position} = require("./model.js");
const Position_dao = {
    save(positionInfo){
        return new Position(positionInfo).save();
    },
    // 总记录数 
    count(){
        return Position.find().count();
    },
    // 按页查找职位信息
    findByPage(page){
        const pageSize = 5;
        // 查询
        return Position.find().skip((page-1)*pageSize).limit(pageSize);

        // 查询
        // const query = Position.find();//查询结果集
        // const count = query.count;//记录条数
        // const totalPages = Math.ceil(count/pageSize);//总页数
        // const positions = query.skip((page-1)*pageSize).limit(pageSize);
        // return {count,totalPages,positions};//返回总记录条数与当前页职位数据
    },
    update(positionInfo){
        return Position.findByIdAndUpdate(positionInfo.id,{$set:positionInfo},{new: true});//new默认返回原始的数据，需要将new属性设置为true，返回更新后的数据
    },
    find(id){
        return Position.findById(id);
    },
    delete(positionInfo){
        return Position.findByIdAndDelete(positionInfo);
    }
};

module.exports = Position_dao;