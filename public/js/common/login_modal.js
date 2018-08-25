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
                                            <p>图片</p>
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
        $('.btn-login').on("click",this.loginHandler)
    },
    // 登录业务处理
    loginHandler(){
        // 待传递到服务器的用户登录数据
        var data = $(".login-form").serialize();
        // ajax 提交登录处理
        $.post("/users/login",data,(resData)=>{
            console.log(resData)
        }).done(()=>{
            $("#login_Modal").modal("hide");
        }).done(()=>{
            $(".login-success").removeClass("hide").siblings(".not-login").remove();
        })
    }
    
})
