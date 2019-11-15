$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            Msg: {}, //订单详情
            pMoney: JSON.parse(localStorage.getItem("user")).pMoney //用户电子币额度
        },
        mounted() {
            this.orderDetail()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            orderDetail() {
                var orderId = this.getUrlParams('orderId')
                // var user = localStorage.getItem("user")
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/orderMsg", {
                    "orderId": orderId
                }, (res) => {
                    if (res.status == 0) {
                        app.Msg = res
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            cancelOrder() {
                var orderId = this.getUrlParams('orderId')
                //取消订单
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/cancleOrder", {
                    'orderId': orderId,
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('订单已取消', 'text')
                        setTimeout(() => {
                            //原地刷新
                            location.reload();
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            applyTui() {
                var orderId = this.getUrlParams('orderId')
                //退换货
                window.location.href = "applicate.html?orderId=" + orderId
            },
            goEvaluate() {
                var orderId = this.getUrlParams('orderId')
                //去评价
                window.location.href = "evaluate.html?orderId=" + orderId
            },
            confirmProduct() {
                var user = localStorage.getItem("user")
                var orderId = this.getUrlParams('orderId')
                //确认收货
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/sureReceive", {
                    "orderId": orderId,
                    "cid": JSON.parse(user).id
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('确认收货成功', 'text')
                        setTimeout(() => {
                            //原地刷新
                            location.reload();
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            seelogistics() {
                //查看物流
                var orderId = this.getUrlParams('orderId')
                window.location.href = "logistics.html?orderId=" + orderId
            },
            wexinPay() {
                var orderId = this.getUrlParams('orderId')
                var user = localStorage.getItem("user")
                console.log(orderId)
                if (orderId != undefined) {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/transferParam", {
                        "openid": JSON.parse(user).openid,
                        "money": app.Msg.total,
                        "orderId": orderId,
                    }, (res) => {
                        if (res.status == 0) {
                            // 调用微信支付
                            function onBridgeReady() {
                                WeixinJSBridge.invoke(
                                    'getBrandWCPayRequest', {
                                    "appId": res.appId,     //公众号名称，由商户传入
                                    "timeStamp": res.timeStamp,         //时间戳，自1970年以来的秒数
                                    "nonceStr": res.nonceStr, //随机串
                                    "package": res.package,
                                    "signType": "MD5",         //微信签名方式：
                                    "paySign": res.paySign, //微信签名
                                },
                                    function (res) {
                                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                            //创建订单 
                                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/payOverOrder", {
                                                "orderIds": orderId,
                                                "type": 1
                                            }, (res) => {
                                                if (res.status == 0) {
                                                    //  支付成功后跳转
                                                    window.location.href = "waitDeliver.html"
                                                } else {
                                                    $.toast('请求失败请稍后', 'text')
                                                }
                                            })
                                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                        }
                                    });
                            } onBridgeReady();
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    })
                } else {
                    $.toast('获取订单编号失败', 'text')
                }
            },
            coinPay() {
                var user = localStorage.getItem("user")
                var orderId = this.getUrlParams('orderId')
                if (orderId != undefined) {
                    // 打开支付密码对话框并生成订单
                    $('.pay-part').css("display", "block");
                    $(".cancel-btn").on("click", function () {
                        $('.pay-part').css("display", "none");
                        $inputs.each(function () { //input清空
                            $(this).val("");
                        })
                        pwd = "";
                        $(".real-ipt").val("");
                    })
                    $(".confirm-btn").on("click", function () {
                        if (len === 6 && pwd) {
                            //点击付款
                            //判断支付密码输入是否正确
                            if (pwd == JSON.parse(user).t_password) {
                                console.log(orderId)
                                console.log(JSON.parse(user).id)
                                //电子币支付
                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/coinPay", {
                                    "cid": JSON.parse(user).id,
                                    "orderId": orderId,
                                }, (res) => {
                                    if (res.status == 0) {
                                        $.toast('购买成功', 'text')
                                        setTimeout(() => {
                                            window.location.href = "waitDeliver.html"
                                        }, 1000)
                                    } else {
                                        $.toast(res.msg, 'text')
                                        setTimeout(() => {
                                            location.reload()
                                        }, 1000)
                                    }
                                })
                            } else {
                                $.toast("交易密码输入错误", 'text')
                                setTimeout(() => {
                                    location.reload()
                                }, 1000)
                            }
                        } else {
                            $.toast("请输入交易密码")
                        }
                    })
                    var pwd = "";
                    var len = 0;
                    var $inputs = $(".surface-ipt input");
                    $(".real-ipt").on("input", function () {
                        if (!$(this).val()) { //无值
                            console.log("无值")
                        }
                        if (/^[0-9]*$/g.test($(this).val())) { //有值且只能是数字（正则）
                            pwd = $(this).val().trim();
                            len = pwd.length;
                            for (var i in pwd) {
                                $inputs.eq(i).val(pwd[i]);
                            }
                            $inputs.each(function () { //将有值的当前input 后面的所有input清空
                                var index = $(this).index();
                                if (index >= len) {
                                    $(this).val("");
                                }
                            })
                            if (len === 6) {
                                //执行付款操作 密码输入完毕自动提交 暂不启用
                                console.log(pwd)
                            }
                        } else {
                            var arr = $(this).val().match(/\d/g);
                            try {
                                $(this).val($(this).val().slice(0, $(this).val().lastIndexOf(arr[arr.length - 1]) + 1));
                            } catch (e) {
                                //清空
                                $(this).val("");
                            }
                        }
                    })
                }
            }
        }
    })
})