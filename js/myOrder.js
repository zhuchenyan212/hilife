 $(function () {
     //页面渲染
     var app = new Vue({
         el: "#app",
         data: {
             orderList: [], //订单数据
         },
         mounted() {
             this.applyOrder()
         },
         methods: {
             applyOrder() {
                 var user = localStorage.getItem("user")
                 $.ajax({
                     url: "https://www.kuailelifegroup.com/qgl_admin/weixin/orderList",
                     data: {
                         "cid": JSON.parse(user).id
                     },
                     type: "get",
                     dataType: 'json',
                     success: function (res) {
                         if (res.status == 0) {
                             app.orderList = res.orderList
                         } else {
                             $.toast('请求失败请稍后', 'text')
                         }
                     }
                 })
             },
             cancelOrder(orderId) {
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
             applyTui(orderId) {
                 //退换货
                 window.location.href = "applicate.html?orderId=" + orderId
             },
             goEvaluate(orderId) {
                 //去评价
                 window.location.href = "evaluate.html?orderId=" + orderId
             },
             confirmProduct(orderId) {
                 var user = localStorage.getItem("user")
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
             seelogistics(orderId) {
                 //  查看物流
                 window.location.href = "logistics.html?orderId=" + orderId
             },
             deletOrder(orderId) {
                //删除订单
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/deleteThisOrder", {
                    "orderId": orderId
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('删除订单成功', 'text')
                        setTimeout(() => {
                            //原地刷新
                            location.reload();
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            }
         }
     })
 })