$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            storeList: [], //商品列表
            storeLists: [], //购物车结算参数
            carId: '', //当前商品id
            S: 0, //总价
            P: 0, //总电子币
        },
        mounted() {
            this.applyList()
        },
        methods: {
            EditProduct() {
                //编辑货品
                if ($(".Edit")[0].innerHTML == '编辑商品') {
                    $(".c-operations").css("display", "none")
                    $(".ui-submit").css("display", "flex")
                } else {
                    $(".c-operations").css("display", "flex")
                    $(".ui-submit").css("display", "none")
                }
            },
            applyList() {
                //请求购物车列表
                var user = localStorage.getItem("user");
                if (JSON.parse(user).id == undefined) {
                    window.location.href = "login.html"
                } else {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/shopCarList", {
                        "cid": JSON.parse(user).id,
                    }, (res) => {
                        if (res.status == 0) {
                            app.storeList = res.storeList
                            //计算总数量和总电子币
                            for (var a = 0; a < res.storeList.length; a++) {
                                var allmoney = 0;
                                var allPmoney = 0;
                                for (var i = 0; i < res.storeList[a].goodsList.length; i++) {
                                    allmoney = allmoney + res.storeList[a].goodsList[i].size * res.storeList[a].goodsList[i].price
                                    allPmoney = allPmoney + res.storeList[a].goodsList[i].size * res.storeList[a].goodsList[i].pMoney
                                }
                                app.S = allmoney
                                app.P = allPmoney
                                var arr = [];
                                var item = {};
                                for (var b = 0; b < res.storeList.length; b++) {
                                    var goodList = [];
                                    for (var c = 0; c < res.storeList[b].goodsList.length; c++) {
                                        goodList.push({
                                            carId: res.storeList[b].goodsList[c].carId,
                                            size: res.storeList[b].goodsList[c].size
                                        })
                                    }
                                    var obj = {
                                        'storeId': res.storeList[b].storeId,
                                        'goodList': goodList
                                    }
                                    arr.push(obj)
                                }
                            }
                            app.storeLists = arr
                        } else {
                            $.toast('请求异常请稍后', 'text')
                        }
                    })
                }
                //设置购物车默认全选
                $('.mainAll').attr("checked", "checked");
                $('.mainAll').next('img').attr("src", "images/c_checkbox_on.png");
            },
            add(carId, stock, gdId, e) {
                var user = localStorage.getItem("user");
                //对应data-id输入框的数字
                var num = parseInt(e.currentTarget.previousElementSibling.value)
                //对应data-id输入框
                var addNow = parseInt(e.currentTarget.previousElementSibling.getAttributeNode('data-id').value)
                //点击“+”绑定事件
                if (addNow == carId) {
                    if (num < stock) {
                        num = num + 1;
                        e.currentTarget.previousElementSibling.value = num
                        //请求购物车商品数量
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/changeGoodsSize", {
                            "cid": JSON.parse(user).id,
                            "gdId": gdId,
                            "size": num
                        }, (res) => {
                            if (res.status == 0) { } else {
                                $.toast('请求异常请稍后', 'text')
                            }
                        })
                    }
                }
            },
            reduce(carId, gdId, e) {
                var user = localStorage.getItem("user");
                //对应data-id输入框的数字
                var num = parseInt(e.currentTarget.nextElementSibling.value)
                //对应data-id输入框
                var addNow = parseInt(e.currentTarget.nextElementSibling.getAttributeNode('data-id').value)
                //点击“+”绑定事件
                if (addNow == carId) {
                    if (num > 0) {
                        num = num - 1;
                        e.currentTarget.nextElementSibling.value = num
                        //请求购物车商品数量
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/changeGoodsSize", {
                            "cid": JSON.parse(user).id,
                            "gdId": gdId,
                            "size": num
                        }, (res) => {
                            if (res.status == 0) {
                                if (num == 0) { //如果商品数量为0删除商品
                                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/deleteGoods", {
                                        "carId": carId
                                    }, (res) => {
                                        if (res.status == 0) {
                                            location.reload();
                                        } else {
                                            $.toast('请求异常请稍后', 'text')
                                        }
                                    })
                                }
                            } else {
                                $.toast('请求异常请稍后', 'text')
                            }
                        })
                    }
                }
            },
            chooseBox(e) {
                /*底部全选*/
                if ($(e.target).attr("checked") == undefined) {
                    $("#cartBox input[type='checkbox']").attr("checked", "checked");
                    $("#cartBox input[type='checkbox']").next('img').attr("src", "images/c_checkbox_on.png");
                } else if ($(e.target).attr("checked") == 'checked') {
                    $("#cartBox input[type='checkbox']").removeAttr("checked");
                    $("#cartBox input[type='checkbox']").next('img').attr("src", "images/c_checkbox_off.png");
                }
                this.total()
                this.account()
            },
            chooseOne(carId, price, size, e) {
                //当前物品的id
                app.carId = carId
                /*子项选择*/
                if (parseInt(e.target.getAttributeNode('data-id').value) == carId) {
                    if ($(e.target).attr("checked") == undefined) {
                        $(e.target).attr("checked", "checked");
                        $(e.target).next('img').attr("src", "images/c_checkbox_on.png");
                    } else {
                        $(e.target).removeAttr("checked");
                        $(e.target).next('img').attr("src", "images/c_checkbox_off.png");
                    }
                }
                //子项全选
                if ($("input[type='checkbox']:checked").length == $(".cart-list input[type='checkbox']").length) {
                    $('.mainAll').attr("checked", "checked");
                    $('.mainAll').next('img').attr("src", "images/c_checkbox_on.png");
                } else {
                    $('.mainAll').removeAttr("checked");
                    $('.mainAll').next('img').attr("src", "images/c_checkbox_off.png");
                }
                this.total()
                this.account()
            },
            total() {
                //计算购物车总价
                var S = 0;
                var P = 0;
                $.each($('.ui-bottom'), function () {
                    var $attr_total = $(this).prev('div').find("input[type='checkbox']");
                    var s = 0;
                    var n1 = 0;
                    $.each($(this).prev('div').find(".num"), function (i) {
                        if ($attr_total.eq(i).attr("checked") == "checked") {
                            s = s + parseInt($(this).val()) * parseInt($(this).attr("data-price"));
                            n1 = n1 + parseInt($(this).val()) * parseInt($(this).attr("data-pMoney"));
                        }
                    });
                    S = S + s;
                    P = P + n1;
                    app.S = S
                    app.P = P
                });
            },
            account() {
                var storeList = [];
                $.each($('.ui-bottom'), function () {
                    var $attr_total = $(this).prev('div').find("input[type='checkbox']");
                    $.each($(this).prev('div').find(".num"), function (i) {
                        if ($attr_total.eq(i).attr("checked") == "checked") {
                            var obj = {
                                'storeId': $(this).attr("data-storeId"),
                                'goodList': [{
                                    carId: $(this).attr("data-id"),
                                    size: $(this).val()
                                }]
                            }
                            storeList.push(obj)
                        }
                    });
                    app.storeLists = storeList
                });
            },
            goConfirm() {
                let goodList = app.storeLists.reduce((acc, current) => {
                    if (acc.length == 0) {
                        acc.push(current)
                    } else {
                        if (acc[acc.length - 1]['storeId'] != current.storeId) {
                            acc.push({
                                storeId: current.storeId,
                                goodList: current.goodLisat
                            })
                        } else {
                            [].push.apply(acc[acc.length - 1]['goodList'], current.goodList)
                        }
                    }
                    return acc
                }, [])
                //购物车商品存缓存
                console.log(JSON.stringify(goodList))
                localStorage.setItem("storeLists", JSON.stringify(goodList))
                window.location.href = "confirmOrder.html?type=2"
            },
            //删除购物车单个商品
            deletOne(carId) {
                $.confirm({
                    // title: '标题',
                    text: '确定删除当前商品吗？',
                    onOK: function () {
                        //点击确认
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/deleteGoods", {
                            "carId": carId
                        }, (res) => {
                            if (res.status == 0) {
                                location.reload();
                            } else {
                                $.toast('请求异常请稍后', 'text')
                            }
                        })
                    },
                    onCancel: function () {
                    }
                });
            }
        }
    })
})