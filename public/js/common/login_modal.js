/**
 * 登录模态框
 */
function LoginModal(){
    this.createDom();
    this.addListener();
}
// 登录模态框的模板字符串
LoginModal.template = `<div class="modal fade" id="login_Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="login">用户登录</h4>
                                </div>
                                <div class="modal-body">
                                    <form class = "login-form">
                                        <div class="form-group">
                                        <label for="login_username">用户名</label>
                                        <input type="text" class="form-control" id="login_username" placeholder="输入用户名" name="username">
                                        </div>
                                        <div class="form-group">
                                        <label for="login_password">密码</label>
                                        <input type="password" class="form-control" id="login_password" placeholder="输入密码" name="password">
                                        </div>
                                        <div class="form-group">
                                            <label for="loginCode">验证码</label>
                                            <input type="text" class="form-control" id="loginCode" placeholder="输入验证码">
                                            <p class="code-img"  style = "display:inline-block;">图片</p>
                                            <span class = "code-info" style = "display:inline-block;"></span>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-primary btn-login">登录</button>
                                </div>
                            </div>
                            </div>
                            </div>`;

// 原型
$.extend(LoginModal.prototype,{
    // 创建dom元素并渲染
    createDom(){
        $(LoginModal.template).appendTo("body");
    },
    // 注册事件监听
    addListener(){
        $('#loginCode').on('blur',this.verifyHandler);
        $('.btn-login').on("click",this.loginHandler)
    },
    verifyHandler(){
        // 输入验证码
        var code = $("#loginCode").val();
        // ajax
        $.getJSON("/captcha/verify",{code},(data)=>{
            if(data.res_code === 1)
            $(".code-info").html("正确")
            else
            $(".code-info").html("错误")
        });
    },
    // 登录业务处理
    loginHandler(){
        // 待传递到服务器的用户登录数据
        var data = $(".login-form").serialize();
        // ajax 提交登录处理
        $.post("/users/login",data,(resData)=>{
            if(resData.res_code === 1){
                $("#login_Modal").modal("hide");
                $(".login-success").removeClass("hide").siblings(".not-login").remove();
                // 将登录成功的用户信息保存起来，保存到sessionStorage中
                sessionStorage.loginUser = JSON.stringify(resData.res_body);
            }else{
                alert('用户名或密码错误')
            }
        });
    }
    
})

