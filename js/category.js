 $(function () {
     //页面渲染
     var app = new Vue({
         el: "#app",
         data: {
             goodsKinds: [], //一级分类
             goodsKindsTypes: [], //二级分类
         },
         mounted() {
             this.showKinds()
         },
         methods: {
             search() {
                 window.location.href = "search.html"
             },
             showKinds() {
                 $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsKinds", {}, (res) => {
                     if (res.status == 0) {
                         app.goodsKinds = res.goodsKinds
                         $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsKindsTypes", {
                             "kindId": res.goodsKinds[0].id
                         }, (res) => {
                             if (res.status == 0) {
                                 app.goodsKindsTypes = res.goodsKindsTypes
                             } else {
                                 $.toast('请求失败请稍后', "text")
                             }
                         })
                     } else {
                         $.toast('请求失败请稍后', "text")
                     }
                 })
             },
             clickTab(id) {
                 // 切换选中状态
                 $('.category-second .category-second-name').click(function () {
                     $(this).addClass('curtive')
                     $(this).siblings().removeClass('curtive')
                 })

                 $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsKindsTypes", {
                     "kindId": id
                 }, (res) => {
                     if (res.status == 0) {
                         app.goodsKindsTypes = res.goodsKindsTypes
                     } else {
                         $.toast('请求失败请稍后', "text")
                     }
                 })
             },
             searchTo(id, typeName) {
                 window.location.href = "categoryProduct.html?id=" + id
             },
         }
     })
 })