 $(function () {
     //页面渲染
     var app = new Vue({
         el: "#app",
         data: {
             vipInfo: '', //我的会员信息
         },
         mounted() {
             this.applyList()
         },
         methods: {
             applyList() {
                 var storeList = localStorage.getItem("storeLists")
                 var user = localStorage.getItem("user")
                 $.ajax({
                     url: "https://www.kuailelifegroup.com/qgl_admin/weixin/myVip",
                     data: {
                         "cid": JSON.parse(user).id,
                     },
                     type: "get",
                     dataType: 'json',
                     success: function (res) {
                         if (res.status == 0) {
                             app.vipInfo = res
                         } else {
                             $.toast('请求失败请稍后', 'text')
                         }
                     }
                 })
             },
             linkTo1() {
                 window.location.href = 'myMemInfo.html?type=1'
             },
             linkTo2() {
                 window.location.href = 'myMemInfo.html?type=2'
             },
             linkTo3() {
                 window.location.href = 'myMemInfo.html?type=3'
             },
             linkTo4() {
                 window.location.href = 'myMemInfo.html?type=4'
             },
             linkTo5() {
                 window.location.href = 'myMemInfo.html?type=5'
             }
         }
     })
 })