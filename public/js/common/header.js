/**
 * 头部对象构造函数
 */
function Header(){
    this.createDom();
    this.createModal();
    this.addListener();
};
// 头部导航模板字符串
Header.template = `    <nav class="navbar navbar-default navbar-inverse">
                        <div class="container">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#">拉勾网管理系统</a>
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                            <li class="active"><a href="/">首页</a></li>
                            <li><a href="/html/position.html">职位管理</a></li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right not-login">
                            <li><a href="#" class="login link_login" data-toggle="modal" data-target="#login_Modal">登录</a></li>
                            <li><a href="#" class="register link_register" data-toggle="modal" data-target="#register_Modal">注册</a></li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right login-success hide">
                                <li><a href="#">欢迎您：123</a></li>
                                <li><a href="#">注销</a></li>
                            </ul>
                        </div>
                        </div>
                        </nav>`;
/** 
 * 原型
*/
$.extend(Header.prototype,{
    // 创建DOM元素并渲染
    createDom() {
        $(Header.template).appendTo("header");
    },
    // 创建模态框
    createModal(){
        new LoginModal();
        new RegisterModal();
    },
    // 注册事件监听
    addListener(){
        // 点击登录，注册链接
        $(".link_login,.link_register").on("click",this.genCaptchaHandler)
    },
    // 生成验证码
    genCaptchaHandler(){
        $.get("/captcha/gencode",(data)=>{
            $(".code-img").html(data);
        },"text");
    }
});
// 创建头部对象实例
new Header();

