$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            goodsDetail: '', //商品信息
            optionList: [], //商品规格参数
            gdId: '', //商品
            stock: '', //库存
            size: '', //购物数量
            arr: [],
            newarr: [],
            arre: [],
            apparr: [], //点击的获取目标数组
        },
        mounted() {
            this.product() //请求商品信息
            this.chooseNum() //默认加减
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            product() {
                var id = this.getUrlParams('id')
                var user = localStorage.getItem("user");
                //查询商品详情
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsDetail", {
                    "gid": id,
                    "cid": JSON.parse(user).id
                }, (res) => {
                    if (res.status == 0) {
                        app.goodsDetail = res
                        app.size = res.goodSize
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
                //查询商品参数
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsOptions", {
                    "gid": id
                }, (res) => {
                    if (res.status == 0) {
                        app.optionList = res.optionList
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            openParam() {
                //商品参数弹窗
                $('.popup-mask').show();
                $('.shopParam').addClass('ui-spec-menu-active');
            },
            closeParam() {
                //商品参数弹窗关闭
                $('.shopParam').removeClass('ui-spec-menu-active');
                $('.popup-mask').hide();
            },
            chooseParam() {
                var id = this.getUrlParams('id')
                // 选择规格
                $('.popup-mask').show();
                $('.ui-spec-menu').addClass('ui-spec-menu-active');
                // 规格默认选中
                for (var i = 0; i < $('.spec-menu-container .semester-select').length; i++) {
                    $('.spec-menu-container .semester-select').eq(i).find('.color-cell').eq(0).addClass('active-color');
                }
                var arr = []
                for (var i = 0; i < app.optionList.length; i++) {
                    arr.push(app.optionList[i].param)
                }
                var newArr = []
                for (var i = 0; i < app.optionList.length; i++) {
                    newArr.push(app.optionList[i].options[0])
                }
                app.arr = arr
                app.newarr = newArr
                // 数组去重
                var newArre = [];
                for (var i = 0; i < app.newarr.length; i++) {
                    if (newArre.indexOf(app.newarr[i]) == -1) {
                        newArre.push(app.newarr[i]);
                    }
                }
                // 获取目标数据
                var obj = {};
                for (var i = 0; i < app.arr.length; i++) {
                    obj[app.arr[i]] = newArre[i]
                }
                var arre = [];
                for (let i in obj) {
                    let o = {};
                    o[i] = obj[i]
                    arre.push(o)
                }
                //请求默认参数
                console.log(JSON.stringify(arre))
                $.ajax({
                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/selectPriceAndStock",
                    traditional: true,
                    data: {
                        "gid": id,
                        "chooseValue": JSON.stringify(arre)
                    },
                    type: "get",
                    dataType: 'json',
                    success: function (res) {
                        if (res.status == 0) {
                            app.gdId = res.gdId //商品
                            app.stock = res.stock //库存
                            $('.lowestPrice').text(res.price.toFixed(2))
                            $('.lowestPMoney').text(res.pMoney.toFixed(2))
                            $('.totalStock').text(res.stock)
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    }
                })
            },
            hideParam() {
                // 关闭规格
                $('.ui-spec-menu').removeClass('ui-spec-menu-active');
                $('.popup-mask').hide();
                //商品参数弹窗关闭
                $('.shopParam').removeClass('ui-spec-menu-active');
                $('.popup-mask').hide();
                location.reload();
            },
            choose() {
                //弹层点击选中事件
                $('.semester-select').on('click', 'li', function () {
                    $(this).parents('.semester-select').find('.active-color').removeClass('active-color');
                    $(this).addClass('active-color');
                    var apparr = [];
                    for (var i = 0; i < $('.spec-menu-container .active-color').length; i++) {
                        apparr.push($('.spec-menu-container .active-color')[i].innerText)
                    }
                    app.apparr = apparr
                })
            },
            chooseNum() {
                // 点击“-”绑定事件
                $(".btn-reduce").on('click', function () {
                    var nput = $(this).parent().find('.num')
                    var quantity = parseFloat($(this).parent().find('.num').val())
                    if (nput.attr("data-id") == $(this).attr("data-id")) {
                        if (quantity >= 2) { //最低值需要数量为1
                            quantity--;
                            nput.val(quantity)
                            $('.number').text(quantity)
                        }
                    }
                })
                // 点击“+”绑定事件
                $(".btn-increse").on('click', function () {
                    var nput = $(this).parent().find('.num')
                    var quantity = parseFloat($(this).parent().find('.num').val())
                    if (nput.attr("data-id") == $(this).attr("data-id")) {
                        if (quantity < app.stock) {
                            quantity++;
                            nput.val(quantity)
                            $('.number').text(quantity)
                        }
                    }
                })
            },
            goto() {
                var id = this.getUrlParams('id')
                window.location.href = 'comment.html?id=' + id
            },
            getData() {
                var id = this.getUrlParams('id')
                //获取目标数据
                var obj = {};
                for (var i = 0; i < app.arr.length; i++) {
                    obj[app.arr[i]] = app.apparr[i]
                }
                var arre = [];
                for (let i in obj) {
                    let o = {};
                    o[i] = obj[i]
                    arre.push(o)
                }
                app.arre = arre
                //请求参数
                console.log(JSON.stringify(arre))
                $.ajax({
                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/selectPriceAndStock",
                    traditional: true,
                    data: {
                        "gid": id,
                        "chooseValue": JSON.stringify(arre)
                    },
                    type: "get",
                    dataType: 'json',
                    success: function (res) {
                        if (res.status == 0) {
                            app.gdId = res.gdId //商品
                            app.stock = res.stock //库存
                            $('.lowestPrice').text(res.price)
                            $('.lowestPMoney').text(res.pMoney)
                            $('.totalStock').text(res.stock)
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    }
                })
            },
            addCart() {
                var user = localStorage.getItem("user");
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/addToShopCar", {
                    "cid": JSON.parse(user).id,
                    "gdId": app.gdId,
                    "size": $('.num').val()
                }, (res) => {
                    if (res.status == 0) {
                        window.location.href = "shoppingCart.html"
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            buyNow() {
                // 缓存gdId
                localStorage.setItem("gdId", app.gdId)
                window.location.href = "confirmOrder.html?type=1&size=" + $('.num').val()
            }
        }
    })
})