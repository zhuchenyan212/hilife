$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            cellphone: '',
            password: '',
        },
        mounted() { },
        methods: {
            login() {
                var that = this;
                if (that.cellphone == '') {
                    $.toast('请填写手机号', 'text')
                    return
                } else if (!(/^1[34578]\d{9}$/.test(that.cellphone))) {
                    $.toast('手机号输入有误', 'text')
                    return
                } else if (that.password == '') {
                    $.toast('请填写注册密码', 'text')
                    return
                } else {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/login", {
                        "cellphone": that.cellphone,
                        "password": that.password
                    }, (res) => {
                        if (res.status == 0) {
                            // 注册存缓存
                            var data = JSON.stringify(res.user);
                            localStorage.setItem("user", data)
                            $.toast('登录成功', 'text')
                            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96046645636b6d58&redirect_uri=https://www.kuailelifegroup.com/project/index.html&response_type=code&scope=snsapi_base#wechat_redirect"
                        } else {
                            $.toast(res.msg, 'text')
                        }
                    })
                }
            },
            link() {
                window.location.href = "register.html"
            }
        }
    })

})