$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {},
        mounted() {},
        methods: {
            change() {
                var user = localStorage.getItem("user")
                if ($('.oLdPassword').val() == '') {
                    $.toast('请填写原密码', 'text')
                    return
                } else if ($('.oLdPassword').val() != JSON.parse(user).t_password) {
                    $.toast('原密码输入有误', 'text')
                    return
                } else if ($('.newPassword').val() == '') {
                    $.toast('请填写新密码', 'text')
                    return
                } else {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/updatePwd", {
                        'cid': JSON.parse(user).id,
                        'location': 5,
                        'msg': $('.newPassword').val()
                    }, (res) => {
                        if (res.status == 0) {
                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/selectCustomerMsg", {
                                'id': JSON.parse(user).id,
                            }, (res) => {
                                if (res.status == 0) {
                                    // 注册存缓存
                                    var data = JSON.stringify(res.user);
                                    localStorage.setItem("user", data)
                                    $.toast("绑定成功", 'text')
                                    window.location.href = "userInfo.html"
                                } else {
                                    $.toast('请求失败请稍后', 'text')
                                }
                            })
                        } else {
                            $.toast("请求失败请稍后", 'text')
                        }
                    })
                }
            }
        }
    })

})