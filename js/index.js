$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            bannerList: [], //banner图
            recommendList: [], //推荐专区
            areaList: [], //分类图
            goodsArea: [], //商品区
            vipArea: [], //会员区
            goodsList: [] //特惠专区
        },
        mounted() {
            this.banner()
            this.category()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            banner() {
                var code = this.getUrlParams('code')
                var user = localStorage.getItem("user")
                var openid = JSON.parse(user).openid
                if (openid == null || openid == undefined) {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/saveOpenId", {
                        "cid": JSON.parse(user).id,
                        "code": code
                    }, (res) => {
                        if (res.status == 0) {
                            localStorage.setItem("openid", res.openid)
                        } else {
                            $.toast('请求失败请稍后', "text")
                        }
                    })
                }
                // 轮播图
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/bannerList", {}, (res) => {
                    if (res.status == 0) {
                        app.bannerList = res.bannerList
                    } else {
                        $.toast('请求失败请稍后', "text")
                    }
                })
                // 推荐区
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/recommendList", {}, (res) => {
                    if (res.status == 0) {
                        app.recommendList = res.recommendList
                    } else {
                        $.toast('请求失败请稍后', "text")
                    }
                })
                //请求商品列表信息
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                    'type': 5,
                    'sort': 0,
                    'ad': 1
                }, (res) => {
                    if (res.status == 0) {
                        app.goodsList = res.goodsList
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
                // 首页新增会员区和商品区
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/mainPageGoods", {}, (res) => {
                    if (res.status == 0) {
                        app.goodsArea = res.goodsArea
                        app.vipArea = res.vipArea
                    } else {
                        $.toast('请求失败请稍后', "text")
                    }
                })
            },
            search() {
                window.location.href = "search.html"
            },
            category() {
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/seeZone", {}, (res) => {
                    if (res.status == 0) {
                        app.areaList = res.areaList
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            clickThis(e) {
                $('.grid')[0].href = 'tehui.html'
                $('.grid')[1].href = 'product.html'
                $('.grid')[2].href = 'member.html'
                $('.grid')[3].href = 'codeShop.html'
            },
        }
    })
})