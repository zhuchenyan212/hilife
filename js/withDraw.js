$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            pMoney: '', //电子币数量
            username: '', //用户姓名
            myBank: {}, //用户已绑定的银行卡信息
            rate: '', //提现手续费
            money: '', //可提现金额
            isAgent: '', //用户身份
            serviceCharge: '', //手续费
            tax: '' //个税
        },
        mounted() {
            this.product() //请求商品数据
        },
        methods: {
            product() {
                var user = localStorage.getItem("user");
                var that = this;
                that.pMoney = JSON.parse(user).pMoney
                that.username = JSON.parse(user).userName
                that.isAgent = JSON.parse(user).isAgent
                // 查询页面信息
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/myPMoneyMsg", {
                    "cid": JSON.parse(user).id,
                    "pMoney": JSON.parse(user).pMoney
                }, (res) => {
                    if (res.status == 0) {
                        app.myBank = res.myBank
                        app.rate = res.rate
                        app.money = res.money
                        var attrMoney = res.money * 0.9
                        // 判断页面失去焦点请求税收
                        $('.inputmoney').blur(function () {
                            if ($('.inputmoney').val() <= attrMoney) {
                                // 查询手续费+个税
                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/countFee", {
                                    "cid": JSON.parse(user).id,
                                    "pMoney": $('.inputmoney').val(),
                                }, (res) => {
                                    if (res.status == 0) {
                                        app.serviceCharge = res.serviceCharge
                                        app.tax = res.tax
                                    } else {
                                        $.toast('请求失败请稍后', 'text')
                                    }
                                })
                            } else {
                                $.toast('请输入小于提现金额90%数额', 'text')
                            }
                        })
                        // 判断输入不为空请求税收
                        if ($('.inputmoney').val() <= attrMoney && $('.inputmoney').val() != '') {
                            // 查询手续费+个税
                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/countFee", {
                                "cid": JSON.parse(user).id,
                                "pMoney": $('.inputmoney').val(),
                            }, (res) => {
                                if (res.status == 0) {
                                    app.serviceCharge = res.serviceCharge
                                    app.tax = res.tax
                                } else {
                                    $.toast('请求失败请稍后', 'text')
                                }
                            })
                        } else {
                            $.toast('请输入小于提现金额90%数额', 'text')
                        }
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            sureTixian(cbId) {
                var user = localStorage.getItem("user");
                // var a = app.rate / 100
                // var b = a * $('.inputmoney').val()
                // var reg = /^[1-9][0-9]*0{2}$/
                var attrMoney = app.money * 0.9
                console.log(attrMoney)
                if ($('.inputmoney').val() >= attrMoney) {
                    $.toast('请输入小于提现金额90%数额', 'text')
                    return false;
                }
                //  else if (!reg.test($('.inputmoney').val())) {
                //     $.toast('请输入100的倍数', 'text')
                //     return false;
                // }
                else {
                    // $('.money').text(b)
                    // 电子币提现
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/pMoneyCashout", {
                        "cid": JSON.parse(user).id,
                        "pMoney": JSON.parse(user).pMoney,
                        "cbId": cbId,
                        "tax": app.tax,
                        "serviceCharge": app.serviceCharge
                    }, (res) => {
                        if (res.status == 0) {
                            console.log(res)
                            $.toast('提现成功，请与后台联系打款', 'text')
                            setTimeout(() => {
                                window.history.go(-1)
                            }, 2500)
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    })
                }
            }
        }
    })
})