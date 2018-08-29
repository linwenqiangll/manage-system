function Position(){
    this.addListener();
}
Position.listInfoTemplate = `
            <% for (var i = 0;i < positions.length; i++){ %>
                <tr>
                    <td>1</td>
                    <td><img src="../images/upload/logo-1535525858180.png" style="width:80px;height:60px;"></td>
                    <td>前端工程师</td>
                    <td>千锋</td>
                    <td>3年</td>
                    <td>教育</td>
                    <td>礼包大厦</td>
                    <td>33332</td>
                    <td><a href="javascript:void(0);">修改</a> <a href="javascript:void(0);">删除</a></td>
                </tr>
                <% } %>`;
$.extend(Position.prototype,{
    // 注册事件监听
    addListener(){
        $(".btn-add-pos").on('click',this.addPositionHandler);
    },
    // 页面加载，查询第一页职位信息



    // 添加职位
    addPositionHandler(){
        // const data = $(".add-position-form").serialize(); //无法处理上传的文件信息
        // $.post("/positions/add",data,(data)=>{
        //     console.log(data)
        // },'json');

        // 创建FormData对象：包装待上传表单的数据
        const  formData = new FormData($('.add-position-form').get(0));//用get(0)或者用jQuery【0】下标方式拿jQuery对象中的dom对象
        // 使用$.ajax()方法
        $.ajax({
            type:'post',
            url:"/positions/add",
            data:formData,
            processData:false,//禁止将data转换为查询字符串
            contentType:false,//不设置contentType
            success:function(data){
                console.log(data)
            },
            dataType:"json"
        })
    }
})

new Position();