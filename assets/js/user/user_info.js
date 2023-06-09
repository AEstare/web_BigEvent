$(function(){
    const form=layui.form
    const layer=layui.layer

    // 验证规则
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须为1~6个字符之间'
            }
        }
    })

    initUserInfo()

    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
               if(res.status!==0){
                return layer.msg('获取用户信息失败')
               } 
            //    console.log(res);
            // 调用form.val()快速为表单赋值
            form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click',function(e){
        // 阻止表单默认重置
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单默认提交
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法，重新渲染用户头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})