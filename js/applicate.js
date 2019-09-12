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
            applyTui() {
                var orderId = this.getUrlParams('orderId')
                //申请退换货
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/changeGoods", {
                    "orderId": orderId,
                    "reason": $('.reason').val()
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('申请退换货成功', 'text')
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