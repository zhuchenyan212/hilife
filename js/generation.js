$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            waitSendList: [], //订单数据
        },
        mounted() {
            this.product() //请求商品数据
        },
        methods: {
            product() {
                var user = localStorage.getItem("user");
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/waitSend", {
                    "cid": JSON.parse(user).id
                }, (res) => {
                    if (res.status == 0) {
                        app.waitSendList = res.waitSendList
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            sureProduct(orderId, wuliuCom, wuliuNum) {
                // 确认发货
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/agentSureSent", {
                    "orderId": orderId,
                    "wuliuCom": wuliuCom,
                    "wuliuNum": wuliuNum
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('代发货成功', 'text')
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