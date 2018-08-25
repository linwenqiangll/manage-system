var express = require('express');
var router = express.Router();
var Captcha = require("../services/captcha.js")
/* 生成验证码. */
router.get('/gencode', Captcha.genCaptcha);

module.exports = router;
