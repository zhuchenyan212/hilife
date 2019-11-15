$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            shoppingInfo: '', //购物信息
            goodsList: [], //商品数据
            addressId: '', //是否选择地址
            c_name: '', //已选
            c_phone: '', //已选
            province: '', //已选
            city: '', //已选
            area: '', //已选
            town: '', //已选
            address: '', //已选
            orderIds: '', //订单id
            yunfei: '', //运费
            money: '',  //订单实际支付金额
            totalMoney: '', //总金额
            select: '0', //快递方式
        },
        mounted() {
            this.applyList()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            applyList() {
                var user = localStorage.getItem("user")
                var gdId = localStorage.getItem("gdId")
                var size = this.getUrlParams('size')
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/buyNow", {
                    "cid": JSON.parse(user).id,
                    "gdId": gdId,
                    "size": size
                }, (res) => {
                    if (res.status == 0) {
                        app.shoppingInfo = res
                        app.goodsList = res.goodsList
                        app.money = res.money
                        app.yunfei = res.yunfei
                        app.addressId = res.addressId
                        app.c_name = res.userName
                        app.c_phone = res.cellphone
                        app.province = res.province
                        app.city = res.city
                        app.area = res.area
                        app.town = res.town
                        app.address = res.address
                        //  请求运费
                        if (addressId != null && addressId != undefined && addressId != '') {
                            $.ajax({
                                url: "https://www.kuailelifegroup.com/qgl_admin/weixin/countYF",
                                traditional: true,
                                data: {
                                    "goodsList": JSON.stringify(res.goodsList),
                                    "addressId": addressId,
                                    "money": 0
                                },
                                type: "get",
                                dataType: 'json',
                                success: function (res) {
                                    if (res.status == 0) {
                                        app.goodsList = res.goodsList
                                        app.money = res.money
                                        app.yunfei = res.yunfei
                                    } else {
                                        $.toast('请求失败请稍后', 'text')
                                    }
                                }
                            })
                        }
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
                var that = this;
                //是否选择地址
                var addressId = this.getUrlParams('id')
                that.addressId = addressId
                //已选地址的详细信息
                var c_name = this.getUrlParams('c_name')
                var c_phone = this.getUrlParams('c_phone')
                var province = this.getUrlParams('province')
                var city = this.getUrlParams('city')
                var area = this.getUrlParams('area')
                var town = this.getUrlParams('town')
                var address = this.getUrlParams('address')
                that.c_name = c_name
                that.c_phone = c_phone
                that.province = province
                that.city = city
                that.area = area
                that.town = town
                that.address = address
            },
            chooseAddress() {
                var gdId = localStorage.getItem("gdId")
                var size = this.getUrlParams('size')
                window.location.href = "chooseAddress.html?type=3&gdId=" + gdId + "&size=" + size
            },
            codePay() {
                var user = localStorage.getItem("user")
                if (app.addressId == null) {
                    $.toast('请添加收货地址', 'text')
                    return
                } else {
                    //输入交易密码进行积分兑换
                    //选择快递
                    if (app.select == '0') {
                        for (var i = 0; i < app.goodsList.length; i++) {
                            app.goodsList[i].wuliuStyle = 0
                        }
                        //创建订单
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/createOrder", {
                            "cid": JSON.parse(user).id,
                            "storeList": JSON.stringify(app.goodsList),
                            "type": 2,
                            "addressId": app.addressId,
                            "yunfei": app.yunfei
                        }, (res) => {
                            if (res.status == 0) {
                                // 全局订单编号
                                app.totalMoney = res.totalMoney
                                app.orderIds = res.orderIds
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
                                            //积分兑换
                                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/scorePay", {
                                                "cid": JSON.parse(user).id,
                                                "orderId": app.orderIds[0],
                                            }, (res) => {
                                                if (res.status == 0) {
                                                    if (app.yunfei > 0) {
                                                        //调用微信支付运费
                                                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/transferParam", {
                                                            "openid": localStorage.getItem("openid"),
                                                            "money": app.yunfei,
                                                            "orderId": app.orderIds[0],
                                                        }, (res) => {
                                                            if (res.status == 0) {
                                                                //调用微信支付
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
                                                                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/successPayYunFee", {
                                                                                    "cid": JSON.parse(user).id,
                                                                                    "orderId": app.orderIds,
                                                                                    "score": $('.jifen')[0].innerText
                                                                                }, (res) => {
                                                                                    if (res.status == 0) {
                                                                                        $.toast('购买成功', 'text')
                                                                                        setTimeout(() => {
                                                                                            window.location.href = "codeExchange.html"
                                                                                        }, 1000)
                                                                                    } else {
                                                                                        $.toast('支付失败', 'text')
                                                                                        setTimeout(() => {
                                                                                            location.reload()
                                                                                        }, 1000)
                                                                                    }
                                                                                })
                                                                            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                                                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/failedPayYunFee", {
                                                                                    "cid": JSON.parse(user).id,
                                                                                    "orderId": app.orderIds,
                                                                                    "score": $('.jifen')[0].innerText
                                                                                }, (res) => {
                                                                                    if (res.status == 0) {
                                                                                        $.toast('暂未支付运费', 'text')
                                                                                        setTimeout(() => {
                                                                                            window.location.href = "codeExchange.html"
                                                                                        }, 1000)
                                                                                    } else {
                                                                                        $.toast('请求异常请稍后', 'text')
                                                                                    }
                                                                                })
                                                                            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                                                                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/failedPayYunFee", {
                                                                                    "cid": JSON.parse(user).id,
                                                                                    "orderId": app.orderIds,
                                                                                    "score": $('.jifen')[0].innerText
                                                                                }, (res) => {
                                                                                    if (res.status == 0) {
                                                                                        $.toast('暂未支付运费', 'text')
                                                                                        setTimeout(() => {
                                                                                            window.location.href = "codeExchange.html"
                                                                                        }, 1000)
                                                                                    } else {
                                                                                        $.toast('请求异常请稍后', 'text')
                                                                                    }
                                                                                })
                                                                            }
                                                                        });
                                                                }
                                                                if (typeof WeixinJSBridge == "undefined") {
                                                                    if (document.addEventListener) {
                                                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                                                    } else if (document.attachEvent) {
                                                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                                                    }
                                                                } else {
                                                                    onBridgeReady();
                                                                }
                                                            } else {
                                                                $.toast('请求失败请稍后', 'text')
                                                            }
                                                        })
                                                    } else {
                                                        $.toast('购买成功', 'text')
                                                        setTimeout(() => {
                                                            window.location.href = "codeExchange.html"
                                                        }, 1000)
                                                    }
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
                                        $.toast("请输入交易密码", 'text')
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
                            } else {
                                $.toast('请求失败请稍后', 'text')
                            }
                        })
                        //选择自提    
                    } else if (app.select == '1') {
                        for (var i = 0; i < app.goodsList.length; i++) {
                            app.goodsList[i].wuliuStyle = 1
                        }
                        //创建订单
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/createOrder", {
                            "cid": JSON.parse(user).id,
                            "storeList": JSON.stringify(app.goodsList),
                            "type": 2,
                            "addressId": app.addressId,
                            "yunfei": 0
                        }, (res) => {
                            if (res.status == 0) {
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
                                            //积分兑换
                                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/scorePay", {
                                                "cid": JSON.parse(user).id,
                                                "orderId": app.orderIds,
                                            }, (res) => {
                                                if (res.status == 0) {
                                                    $.toast('购买成功', 'text')
                                                    setTimeout(() => {
                                                        window.location.href = "codeExchange.html"
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
                                        $.toast("请输入交易密码", 'text')
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
                            } else {
                                $.toast('请求失败请稍后', 'text')
                            }
                        })
                    }
                }
            },
            choose(e) {
                app.select = $(e.target).val()
                // 改变页面显示的运费数据
                if ($(e.target).val() == 1) {
                    $('.iteyun').text(0)
                } else if ($(e.target).val() == 0) {
                    $('.iteyun').text(app.yunfei)
                }
            }
        }
    })
})