$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            customerIndex: {}, //请求数据
            self_consumption: '', //自我消费金额
            my_self_consumption: '', //已消费
            signIn: '' //是否签到
        },
        mounted() {
            this.applyUser()
        },
        methods: {
            applyUser() {
                var user = localStorage.getItem("user")
                if (JSON.parse(user).id == undefined) {
                    window.location.href = "login.html"
                } else {
                    $.ajax({
                        url: "https://www.kuailelifegroup.com/qgl_admin/weixin/customerIndex",
                        data: {
                            "cid": JSON.parse(user).id
                        },
                        type: "get",
                        dataType: 'json',
                        success: function (res) {
                            if (res.status == 0) {
                                app.customerIndex = res.customerIndex
                                app.self_consumption = res.self_consumption
                                app.my_self_consumption = res.my_self_consumption
                                app.signIn = res.signIn
                                $('#len').css('width', "" + res.my_self_consumption + "%")
                            } else {
                                $.toast('请求失败请稍后', 'text')
                            }
                        }
                    })
                }
                // 更新用户缓存
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/selectCustomerMsg", {
                    'id': JSON.parse(user).id,
                }, (res) => {
                    if (res.status == 0) {
                        // 存缓存
                        var data = JSON.stringify(res.user);
                        localStorage.setItem("user", data)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            checkIn() {
                var user = localStorage.getItem("user")
                $.ajax({
                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/signIn",
                    data: {
                        "cid": JSON.parse(user).id
                    },
                    type: "get",
                    dataType: 'json',
                    success: function (res) {
                        if (res.status == 0) {
                            $.toast('签到成功', 'text')
                            //原地刷新页面
                            setTimeout(() => {
                                location.reload()
                            }, 1500)
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    }
                })
            },
            link(level) {
                window.location.href = "income.html?level=" + level
            },
            goattr(score) {
                window.location.href = 'redeem.html?score=' + score
            }
        }
    })
})