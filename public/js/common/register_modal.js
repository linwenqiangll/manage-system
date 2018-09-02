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
                                                <label for="register_username" class="user_label"></label>
                                            </div>
                                            <div class="form-group">
                                                <label for="register_password">密码</label>
                                                <input type="password" class="form-control" name="password" id="register_password" placeholder="输入密码">
                                                <label for="register_password" class="pass_label">密码</label>
                                            </div>
                                            <div class="form-group">
                                                <label for="con_password">确认密码</label>
                                                <input type="password" class="form-control" id="con_password" placeholder="再次输入密码">
                                                <label for="con_password" class="repass_label"></label>
                                            </div>
                                            <div class="form-group">
                                                <label for="register_email">邮箱</label>
                                                <input type="email" class="form-control" name="email" id="register_email" placeholder="输入e-mail地址">
                                                <label for="register_email" class="email_label"></label>
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
        // 注册处理
        $('.btn-register').on("click",this.registerHandler)
        // 验证码验证
        $('#registerCode').on('blur',this.verifyHandler);
        // 用户名失去焦点验证
        $("#register_username").on("blur",this.username_blur)
        // 用户密码失去焦点验证
        $("#register_password").on("blur",this.password_blur)
        // 再次输入密码失去焦点验证
        $("#con_password").on("blur",this.repassword_blur)
        // 邮箱验证
        $("#register_email").on("blur",this.email_blur)
        // 点击图片 和 文字刷新验证码
        $('.modal-body').on('click','#register-code, .recode',this.genCaptchaHandler);
    },

     // 生成验证码
     genCaptchaHandler(){
        $.get("/captcha/gencode",(data)=>{
            $(".code-img").html(data);
        },"text");
    },
    // 验证码验证
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
    // 用户名验证
    username_blur(){
        const username_reg = /^.{4,9}$/
        const a = username_reg.test($("#register_username").val());
        if(a === true){
            $(".user_label").text('用户名格式输入正确')
        }else{
            $(".user_label").text('请输入4-9个字')
        }
    },
    // 密码验证
    password_blur(){
        const username_reg = /^.{4,9}$/
        const b = username_reg.test($("#register_password").val());
        if(b === true){
            $(".pass_label").text('密码格式输入正确')
        }else{
            $(".pass_label").text('请输入4-9个字')
        }
    },
    // 再次输入密码验证 
    repassword_blur(){
        const username_reg = /^.{4,9}$/
        const b = username_reg.test($("#register_password").val());
        const d = username_reg.test($("#con_password").val());
        if(b === d&&$("#register_password").val()===$("#con_password").val()){
            $(".repass_label").text('两次密码输入一致')
        }else{
            $(".repass_label").text('两次密码输入不一致')
        }
    },
    // 邮箱验证
    email_blur(){
        const email = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        const c = email.test($("#register_email").val())
        if(c === true){
            $(".email_label").text('邮箱格式输入正确')
        }else{
            $(".email_label").text('请输入正确的邮箱')
        }
    },
    // 注册业务处理
    registerHandler(){
        const username_reg = /^.{4,9}$/
        const email = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        const a = username_reg.test($("#register_username").val());
        const b = username_reg.test($("#register_password").val());
        const c = email.test($("#register_email").val())
        if(a&&b&&c===true&&$(".code-info").html()==="正确"){
            // 待传递到服务器的用户登录数据
            var data = $(".register-form").serialize();
            // ajax 提交登录处理
            $.post("/users/register",data,(resData)=>{
            location.reload();
            },'json');            
            return;  
        }
    }
})
function code(){
    $.get("/captcha/gencode",(data)=>{
        $(".code-img").html(data);
    },"text");
}