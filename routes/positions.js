const express = require('express');
const router = express.Router();
const path = require("path");
const PositionService = require("../services/position_service.js");

// 引入 multer 中间件：文件上传
const multer = require("multer");
// 配置磁盘保存
const storage = multer.diskStorage({
  // 存储目标 
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/upload/"));
  },
  // 文件名
  filename: function (req, file, cb) {
  	// 文件后缀
  	const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
// multer对象实例 
const upload = multer({ storage })

/* 添加职位 */
// http://localhost:3000/positions/add
router.post("/add", upload.single("logo"), PositionService.add);

// 按页查询
// http://localhost:3000/positions/list?page=1
router.get('/list',PositionService.listByPage);

module.exports = router;
