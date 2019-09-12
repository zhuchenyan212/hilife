$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {},
        mounted() {},
        methods: {
            changeCard() {
                var user = localStorage.getItem("user")
                if ($('.idCard').val() == '') {
                    $.toast('请填写身份证号码', 'text')
                    return
                } else {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/updatePwd", {
                        'cid': JSON.parse(user).id,
                        'location': 4,
                        'msg': $('.idCard').val()
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