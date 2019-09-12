$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            orderList: [], //订单数据
            goodsMsg: [], //数据
            storeName: '', //店铺名称
            totalPrice: '', //总价
            goodsPrice: '' //商品金额
        },
        mounted() {
            this.show()
            this.getMsg()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            getMsg() {
                //请求页面信息
                var orderId = this.getUrlParams('orderId')
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goEvaluateOrder", {
                    "orderId": orderId
                }, (res) => {
                    if (res.status == 0) {
                        app.goodsMsg = res.goodsMsg
                        app.storeName = res.storeName
                        app.totalPrice = res.totalPrice
                        app.goodsPrice = res.goodsPrice
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            show() {
                $('#default-demo1').raty();
            },
            demo1() {
                if ($(".pro-info input[name='score']").val() == 1) {
                    $('.showStar1')[0].innerText = '差评'
                } else if ($(".pro-info input[name='score']").val() == 2) {
                    $('.showStar1')[0].innerText = '差评'
                } else if ($(".pro-info input[name='score']").val() == 3) {
                    $('.showStar1')[0].innerText = '中评'
                } else if ($(".pro-info input[name='score']").val() == 4) {
                    $('.showStar1')[0].innerText = '好评'
                } else if ($(".pro-info input[name='score']").val() == 5) {
                    $('.showStar1')[0].innerText = '好评'
                }
            },
            evaluate() {
                var orderId = this.getUrlParams('orderId')
                //评价订单
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/orderComment", {
                    "orderId": orderId,
                    "star": $("input[name='score']").val(),
                    "note": $('.commentContent').val()
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('订单评价成功', 'text')
                        setTimeout(() => {
                            window.location.href = "myOrder.html"
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            }
        }
    })
})