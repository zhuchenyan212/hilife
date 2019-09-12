$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            productList: [], //商品数据
            goodsDetail: '', //商品信息
            optionList: [], //商品规格参数
            gid: '', // 商品请求id
            gdId: '', //商品
            stock: '', //库存
            size: '', //购物数量
            arr: [],
            newarr: [],
            arre: [],
            apparr: [], //点击的获取目标数组
            examplePic: ''
        },
        mounted() {
            this.product() //请求商品数据
            this.chooseNum() //默认加减
        },
        methods: {
            product() {
                //查询商品详情
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoods", {}, (res) => {
                    if (res.status == 0) {
                        app.productList = res.productList
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            products(gid, examplePic) {
                // 弹窗商品图片
                app.examplePic = examplePic
                //设置全局gid
                var that = this;
                that.gid = gid
                //商品信息
                var user = localStorage.getItem("user");
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsDetail", {
                    "gid": gid,
                    "cid": JSON.parse(user).id
                }, (res) => {
                    if (res.status == 0) {
                        app.goodsDetail = res
                        app.size = res.goodSize
                        //商品参数
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsOptions", {
                            "gid": gid
                        }, (res) => {
                            if (res.status == 0) {
                                app.optionList = res.optionList
                                this.chooseParam(gid)
                            } else {
                                $.toast('请求失败请稍后', 'text')
                            }
                        })
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            chooseParam(gid) {
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
                        "gid": gid,
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
            getData() {
                // 获取目标数据
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
                // 请求参数
                $.ajax({
                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/selectPriceAndStock",
                    traditional: true,
                    data: {
                        "gid": app.gid,
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
            add() {
                var user = localStorage.getItem("user");
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/placeOrder", {
                    "cid": JSON.parse(user).id,
                    "gdId": app.gdId,
                    "size": $('.num').val(),
                    "price": $('.lowestPrice').text()
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('下单成功', 'text')
                        setTimeout(() => {
                            // 原地刷新
                            location.reload()
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            }
        }
    })
})