function Position(){
    this.addListener();
    this.load();
}
Position.listInfoTemplate = `
            <% for (var i = 0;i < positions.length; i++){ %>
                <tr>
                    <td><%= i+1 %></td>
                    <td><img src="../images/upload/<%=positions[i].logo %>" style="width:80px;height:60px;"></td>
                    <td><%=positions[i].name %></td>
                    <td><%=positions[i].company_name %></td>
                    <td><%=positions[i].experience %></td>
                    <td><%=positions[i].position_type %></td>
                    <td><%=positions[i].city %></td>
                    <td><%=positions[i].salary %></td>
                    <td><a href="javascript:void(0);">修改</a> <a href="javascript:void(0);">删除</a></td>
                </tr>
                <% } %>`;
Position.paginationTemplate = `
                <% for (var i = 1; i <= totalPages; i++)  {%>
                    <li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
                <% } %>`;
$.extend(Position.prototype,{
    // 注册事件监听
    addListener(){
        $(".btn-add-pos").on('click',this.addPositionHandler);
        // 翻页
		$(".pagination").on("click", "li", this.loadByPage);
    },
  // 页面加载
	load() {
		// 让“职位管理”导航选中
		$("#bs-example-navbar-collapse-1 ul:first li:last")
				.addClass("active")
				.siblings("li")
				.removeClass("active");
		// 加载第一页数据
		this.loadByPage(1);
	},
    // 按页加载数据
    loadByPage(event){
        let page;
        if(typeof event === 'number')//直接传递页码
        page = event;
        else{//获取待加载页码
            console.log(event.target)
            page = $(event.target).text();
        }

        // 读取page页数据
        $.getJSON('/positions/list?page=' + page,data=>{
            console.log(data)
            // 显示职位数据
            // 待渲染的数据
           const positions = data.res_body.data;
           const html = ejs.render(Position.listInfoTemplate,{positions});
            // 显示
            $(".list-table tbody").html(html);
			// 显示页码数据
			const pagination = ejs.render(Position.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
			$(".pagination").html(pagination);
        });

    },


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