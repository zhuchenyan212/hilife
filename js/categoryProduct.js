$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            goodsList: [], //搜索结果
        },
        mounted() {
            this.getProduct()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            getProduct() {
                var id = this.getUrlParams('id')
                //请求商品列表信息
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                    'type': 2,
                    'sort': 0,
                    'ad': 1,
                    'typeId': id
                }, (res) => {
                    if (res.status == 0) {
                        app.goodsList = res.goodsList
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            search() {
                 window.location.href = "search.html"
            },
            //全部
            firstAll() {
                var id = this.getUrlParams('id')
                //切换
                $(".new-search-tab .new-search-item").click(function () {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active")
                });
                //请求商品列表信息
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                    'type': 2,
                    'sort': 0,
                    'ad': 1,
                    'typeId': id
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
                var id = this.getUrlParams('id')
                //切换
                $(".new-search-tab .new-search-item").click(function () {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active")
                    if ($('.sales')[0].src.search("images/off.png") != -1) {
                        $('.sales')[0].src = "images/up.png";
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                            'type': 2,
                            'sort': 1,
                            'ad': 1,
                            'typeId': id
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
                        'type': 2,
                        'sort': 1,
                        'ad': 2,
                        'typeId': id
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
                        'type': 2,
                        'sort': 1,
                        'ad': 1,
                        'typeId': id
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
                var id = this.getUrlParams('id')
                //切换
                $(".new-search-tab .new-search-item").click(function () {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active")
                });
                //  请求商品列表信息
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                    'type': 2,
                    'sort': 0,
                    'ad': 2,
                    'typeId': id
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
                var id = this.getUrlParams('id')
                //切换
                $(".new-search-tab .new-search-item").click(function () {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active")
                    if ($('.prices')[0].src.search("images/off.png") != -1) {
                        $('.prices')[0].src = "images/up.png";
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/areaGoodsList", {
                            'type': 2,
                            'sort': 2,
                            'ad': 1,
                            'typeId': id
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
                        'type': 2,
                        'sort': 2,
                        'ad': 2,
                        'typeId': id
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
                        'type': 2,
                        'sort': 2,
                        'ad': 1,
                        'typeId': id
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