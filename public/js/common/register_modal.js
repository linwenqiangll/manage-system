function RegisterModal(){
    this.createDom();
    this.addListener();
}

RegisterModal.template = `<div class="modal fade" id="register_Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title" id="register">用户注册</h4>
                                    </div>
                                    <div class="modal-body">
                                        <form class="register-form">
                                            <div class="form-group">
                                                <label for="register_username">用户名</label>
                                                <input type="text" class="form-control" name="username" id="register_username" placeholder="输入用户名">
                                            </div>
                                            <div class="form-group">
                                                <label for="register_password">密码</label>
                                                <input type="password" class="form-control" name="password" id="register_password" placeholder="输入密码">
                                            </div>
                                            <div class="form-group">
                                                <label for="con_password">确认密码</label>
                                                <input type="password" class="form-control" id="con_password" placeholder="再次输入密码">
                                            </div>
                                            <div class="form-group">
                                                <label for="register_email">邮箱</label>
                                                <input type="email" class="form-control" name="email" id="register_email" placeholder="输入e-mail地址">
                                            </div>
                                            <div class="form-group">
                                                <label for="registerCode">验证码</label>
                                                <input type="text" class="form-control" id="registerCode" placeholder="输入验证码">
                                                <p class="code-img" id="register-code" style = "display:inline-block;">图片</p>
                                                <span class = "code-info" style = "display:inline-block;"></span>
                                                <label class="recode" style="display:block;">看不清，换一张</label>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary btn-register">注册</button>
                                    </div>
                                </div>
                            </div>
                       </div>`;

$.extend(RegisterModal.prototype,{
    createDom(){
        $(RegisterModal.template).appendTo("body");
    },
    // 注册事件监听
    addListener(){
        $('#registerCode').on('blur',this.verifyHandler);
        $('.btn-register').on("click",this.registerHandler)
        $('.modal-body').on('click','#register-code, .recode',this.genCaptchaHandler);
    },

     // 生成验证码
     genCaptchaHandler(){
        $.get("/captcha/gencode",(data)=>{
            $(".code-img").html(data);
        },"text");
    },
    verifyHandler(){
        // 输入验证码
        var code = $("#registerCode").val();
        // ajax
        $.getJSON("/captcha/verify",{code},(data)=>{
            if(data.res_code === 1)
            $(".code-info").html("正确")
            else
            $(".code-info").html("错误")
        });
    },
    // 注册业务处理
    registerHandler(){
        // 待传递到服务器的用户登录数据
        var data = $(".register-form").serialize();
        // ajax 提交登录处理
        $.post("/users/register",data,(resData)=>{
            console.log(resData)
        },'json');
    }
})