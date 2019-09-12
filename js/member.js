 $(function () {
     //页面渲染
     var app = new Vue({
         el: "#app",
         data: {
             goodsList: [], //商品信息
         },
         mounted() {
             this.product() //默认请求商品信息
         },
         methods: {
             product() {
                 //请求商品列表信息
                 $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                     'type': 1,
                     'sort': 0,
                     'ad': 1
                 }, (res) => {
                     if (res.status == 0) {
                         app.goodsList = res.goodsList
                     } else {
                         $.toast('请求失败请稍后', 'text')
                     }
                 })
             },
             //全部
             firstAll() {
                 //切换
                 $(".new-search-tab .new-search-item").click(function () {
                     $(this).addClass("active");
                     $(this).siblings().removeClass("active")
                 });
                 //请求商品列表信息
                 $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                     'type': 1,
                     'sort': 0,
                     'ad': 1
                 }, (res) => {
                     if (res.status == 0) {
                         app.goodsList = res.goodsList
                     } else {
                         $.toast('请求失败请稍后', 'text')
                     }
                 })
             },
             //销量
             secondSales() {
                 //切换
                 $(".new-search-tab .new-search-item").click(function () {
                     $(this).addClass("active");
                     $(this).siblings().removeClass("active")
                     if ($('.sales')[0].src.search("images/off.png") != -1) {
                         $('.sales')[0].src = "images/up.png";
                         $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                             'type': 1,
                             'sort': 1,
                             'ad': 1
                         }, (res) => {
                             if (res.status == 0) {
                                 app.goodsList = res.goodsList
                             } else {
                                 $.toast('请求失败请稍后', 'text')
                             }
                         })
                     }
                 });
                 //销量升序降序
                 if ($('.sales')[0].src.search("images/up.png") != -1) {
                     $('.sales')[0].src = "images/down.png";
                     //请求商品列表信息
                     $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                         'type': 1,
                         'sort': 1,
                         'ad': 2
                     }, (res) => {
                         if (res.status == 0) {
                             app.goodsList = res.goodsList
                         } else {
                             $.toast('请求失败请稍后', 'text')
                         }
                     })
                 } else if ($('.sales')[0].src.search("images/down.png") != -1) {
                     $('.sales')[0].src = "images/up.png"
                     //请求商品列表信息
                     $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                         'type': 1,
                         'sort': 1,
                         'ad': 1
                     }, (res) => {
                         if (res.status == 0) {
                             app.goodsList = res.goodsList
                         } else {
                             $.toast('请求失败请稍后', 'text')
                         }
                     })
                 }
             },
             //综合
             thirdline() {
                 //切换
                 $(".new-search-tab .new-search-item").click(function () {
                     $(this).addClass("active");
                     $(this).siblings().removeClass("active")
                 });
                 //  请求商品列表信息
                 $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                     'type': 1,
                     'sort': 0,
                     'ad': 2
                 }, (res) => {
                     if (res.status == 0) {
                         app.goodsList = res.goodsList
                     } else {
                         $.toast('请求失败请稍后', 'text')
                     }
                 })
             },
             //价格
             forthPrice() {
                 //切换
                 $(".new-search-tab .new-search-item").click(function () {
                     $(this).addClass("active");
                     $(this).siblings().removeClass("active")
                     if ($('.prices')[0].src.search("images/off.png") != -1) {
                         $('.prices')[0].src = "images/up.png";
                         $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                             'type': 1,
                             'sort': 2,
                             'ad': 1
                         }, (res) => {
                             if (res.status == 0) {
                                 app.goodsList = res.goodsList
                             } else {
                                 $.toast('请求失败请稍后', 'text')
                             }
                         })
                     }
                 });
                 if ($('.prices')[0].src.search("images/up.png") != -1) {
                     $('.prices')[0].src = "images/down.png";
                     //请求商品列表信息
                     $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                         'type': 1,
                         'sort': 2,
                         'ad': 2
                     }, (res) => {
                         if (res.status == 0) {
                             app.goodsList = res.goodsList
                         } else {
                             $.toast('请求失败请稍后', 'text')
                         }
                     })
                 } else if ($('.prices')[0].src.search("images/down.png") != -1) {
                     $('.prices')[0].src = "images/up.png"
                     //请求商品列表信息
                     $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                         'type': 1,
                         'sort': 2,
                         'ad': 1
                     }, (res) => {
                         if (res.status == 0) {
                             app.goodsList = res.goodsList
                         } else {
                             $.toast('请求失败请稍后', 'text')
                         }
                     })
                 }
             }
         }
     })
 })