/**
 * 验证码逻辑处理
 */
const svgCaptcha = require('svg-captcha');
 const Captcha = {
    //  生成验证码
    genCaptcha(req, res, next){
        // 生成
        const captcha = svgCaptcha.create({color:true,noise:3});
        // 向session中保存验证码生成的字符串
        req.session.captcha = captcha.text;
        // 响应返回生成的验证码svg数据
        res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
        res.status(200).send(captcha.data);
    },
    // 校验验证码
    verifyCaptcha(req,res,next){
        //  从请求中获取待校验的验证码字符串
        const {code} = req.query;
        // 与session 中缓存的验证码比较：忽略字符大小写
        if(code.toUpperCase()===req.session.captcha.toUpperCase()) 
            res.json({res_code:1,res_error:"",res_body:{valid:true}});
        else
            res.json({res_code:-1,res_error:"",res_body:{valid:false}});
    }
 }

 module.exports = Captcha;

