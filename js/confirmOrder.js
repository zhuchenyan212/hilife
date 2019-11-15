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
            orderIds: [], //订单编号
            money: '',  //订单实际支付金额
            yunfei: '', //运费
            select: '0', //快递方式
            pMoney: JSON.parse(localStorage.getItem("user")).pMoney //自己的电子币数量
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
                //不同方式进入确认订单
                var user = localStorage.getItem("user")
                var type = this.getUrlParams('type')
                var gdId = localStorage.getItem("gdId")
                if (type == 1) {
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
                            // 请求运费
                            if (addressId != null && addressId != undefined && addressId != '') {
                                $.ajax({
                                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/countYF",
                                    traditional: true,
                                    data: {
                                        "goodsList": JSON.stringify(res.goodsList),
                                        "addressId": addressId,
                                        "money": app.shoppingInfo.totalPrice
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
                } else if (type == 2) {
                    var storeList = localStorage.getItem("storeLists")
                    var user = localStorage.getItem("user")
                    $.ajax({
                        url: "https://www.kuailelifegroup.com/qgl_admin/weixin/goPay",
                        traditional: true,
                        data: {
                            "cid": JSON.parse(user).id,
                            "storeList": storeList
                        },
                        type: "get",
                        dataType: 'json',
                        success: function (res) {
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
                                            "money": app.shoppingInfo.totalPrice
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
                }
            },
            chooseAddress() {
                var type = this.getUrlParams('type')
                var size = this.getUrlParams('size')
                var gdId = localStorage.getItem("gdId")
                if (type == 1) {
                    window.location.href = "chooseAddress.html?type=1&gdId=" + gdId + "&size=" + size
                } else if (type == 2) {
                    window.location.href = "chooseAddress.html?type=2"
                }
            },
            wexinPay() {
                var user = localStorage.getItem("user")
                if (app.addressId == null) {
                    $.toast('请添加收货地址', 'text')
                    return
                } else {
                    //选择快递
                    if (app.select == '0') {
                        //创建订单
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/createOrder", {
                            "cid": JSON.parse(user).id,
                            "storeList": JSON.stringify(app.goodsList),
                            "type": 3,
                            "addressId": app.addressId,
                            "yunfei": app.yunfei
                        }, (res) => {
                            // alert(res.status)
                            if (res.status == 0) {
                                // 全局订单编号
                                app.orderIds = res.orderIds
                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/transferParam", {
                                    "openid": JSON.parse(user).openid,
                                    "money": app.money,
                                    "orderId": res.orderIds[0],
                                }, (res) => {
                                    // alert(res.package)
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
                                                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/payOverOrder", {
                                                            "orderIds": JSON.stringify(app.orderIds),
                                                        }, (res) => {
                                                            if (res.status == 0) {
                                                                //支付成功后跳转
                                                                window.location.href = "waitDeliver.html"
                                                            } else {
                                                                $.toast('请求失败请稍后', 'text')
                                                            }
                                                        })
                                                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
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
                                $.toast('请求失败请稍后', 'text')
                            }
                        })
                    } else if (app.select == '1') {
                        //选择自提                         
                        for (var i = 0; i < app.goodsList.length; i++) {
                            app.goodsList[i].wuliuStyle = 1
                        }
                        //创建订单
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/createOrder", {
                            "cid": JSON.parse(user).id,
                            "storeList": JSON.stringify(app.goodsList),
                            "type": 3,
                            "addressId": app.addressId,
                            "yunfei": 0
                        }, (res) => {
                            // alert(res.status)
                            if (res.status == 0) {
                                // 全局订单编号
                                app.orderIds = res.orderIds
                                var money = (app.money - app.yunfei).toFixed(2)
                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/transferParam", {
                                    "openid": JSON.parse(user).openid,
                                    "money": money,
                                    "orderId": res.orderIds[0],
                                }, (res) => {
                                    // alert(res.package)
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
                                                        //使用以上方式判断前端返回,微信团队郑重提示：
                                                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/payOverOrder", {
                                                            "orderIds": JSON.stringify(app.orderIds),
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
                                $.toast('请求失败请稍后', 'text')
                            }
                        })
                    }
                }
            },
            coinPay() {
                var user = localStorage.getItem("user")
                if (app.addressId == null) {
                    $.toast('请添加收货地址', 'text')
                    return
                } else {
                    //选择快递
                    console.log(JSON.stringify(app.goodsList))
                    if (app.select == '0') {
                        //创建订单
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/createOrder", {
                            "cid": JSON.parse(user).id,
                            "storeList": JSON.stringify(app.goodsList),
                            "type": 4,
                            "addressId": app.addressId,
                            "yunfei": app.yunfei
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
                                            //电子币支付
                                            for (var i = 0; i < res.orderIds.length; i++) {
                                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/coinPay", {
                                                    "cid": JSON.parse(user).id,
                                                    "orderId": res.orderIds[i],
                                                }, (res) => {
                                                    if (res.status == 0) {
                                                        $.toast('购买成功', 'text')
                                                        window.localStorage.removeItem('storeLists');
                                                        window.localStorage.removeItem('gdId');
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
                                            }
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
                        //选择自提 
                        for (var i = 0; i < app.goodsList.length; i++) {
                            app.goodsList[i].wuliuStyle = 1
                        }
                        //创建订单
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/createOrder", {
                            "cid": JSON.parse(user).id,
                            "storeList": JSON.stringify(app.goodsList),
                            "type": 4,
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
                                            //电子币支付
                                            for (var i = 0; i < res.orderIds.length; i++) {
                                                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/coinPay", {
                                                    "cid": JSON.parse(user).id,
                                                    "orderId": res.orderIds[i],
                                                }, (res) => {
                                                    if (res.status == 0) {
                                                        $.toast('购买成功', 'text')
                                                        window.localStorage.removeItem('storeLists');
                                                        window.localStorage.removeItem('gdId');
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
                                            }
                                        } else {
                                            $.toast("交易密码输入错误", 'text')
                                            setTimeout(() => {
                                                location.reload()
                                            }, 1000)
                                        }
                                    } else {
                                        $.toast("请输入支付密码")
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
                    var money = (app.money - app.yunfei).toFixed(2)
                    $('.money').text(money)
                } else if ($(e.target).val() == 0) {
                    $('.iteyun').text(app.yunfei)
                    $('.money').text(app.money)
                }
            }
        }
    })
})

