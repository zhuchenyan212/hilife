 $(function () {
     //页面渲染
     var app = new Vue({
         el: "#app",
         data: {
             now: '', //此时
             orderId: '', //订单编号
             wuliuCompany: '', //物流公司
             wuliuNumber: '', //物流编号
             wuliuMsg: [], //数据
         },
         mounted() {
             this.applyOrder()
         },
         methods: {
             getUrlParams(name) {
                 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                 var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                 if (r != null) return (r[2]);
                 return null;
             },
             applyOrder() {
                 var orderId = this.getUrlParams('orderId')
                 var that = this;
                 that.orderId = orderId
                 $.ajax({
                     url: "https://www.kuailelifegroup.com/qgl_admin/weixin/seeWuLiu",
                     data: {
                         "orderId": orderId
                     },
                     type: "get",
                     dataType: 'json',
                     success: function (res) {
                         if (res.status == 0) {
                             app.wuliuMsg = res.wuliuMsg
                             app.wuliuCompany = res.wuliuCompany
                             app.wuliuNumber = res.wuliuNumber
                         } else {
                             $.toast('请求失败请稍后', 'text')
                         }
                     }
                 })
             }
         }
     })
 })