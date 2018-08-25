/**
 * 验证码逻辑处理
 */
const svgCaptcha = require('svg-captcha');
 const Captcha = {
    //  生成验证码
    genCaptcha(req,res,next){
        // 生成
        var captcha = svgCaptcha.create({color:true,noise:3});
        // 向session中保存验证码生成的字符串
        req.session.captcha = captcha.text;
        // 响应返回生成的验证码svg数据
        res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
        res.status(200).send(captcha.data);
    },
    // 校验验证码
    verifyCaptcha(){

    }
 }

 module.exports = Captcha;