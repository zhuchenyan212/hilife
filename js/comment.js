 $(function () {
     //页面渲染
     var app = new Vue({
         el: "#app",
         data: {
             stars: [1, 2, 3, 4, 5],
             commentList: [], //评论列表
             total: '',
             good: '',
             middle: '',
             bad: ''
         },
         mounted() {
             this.tab()
             this.getdata()
         },
         methods: {
             getUrlParams(name) {
                 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                 var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                 if (r != null) return (r[2]);
                 return null;
             },
             tab() {
                 // 切换tab
                 $(".tab a").click(function () {
                     $(this).addClass('curr').siblings().removeClass('curr');
                     var index = $(this).index();
                     number = index;
                     $('.nav .content li').hide();
                     $('.nav .content li:eq(' + index + ')').show();
                 });
             },
             getdata() {
                 var id = this.getUrlParams('id')
                 $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/goodsComments", {
                     "gid": id
                 }, (res) => {
                     if (res.status == 0) {
                         app.commentList = res.commentList
                         app.total = res.total
                         app.good = res.good
                         app.middle = res.middle
                         app.bad = res.bad
                     } else {
                         $.toast('请求失败请稍后', 'text')
                     }
                 })
             }
         }
     })
 })