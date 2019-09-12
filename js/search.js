$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {},
        mounted() {
            this.searchKey()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },

            searchKey() {
                var key = this.getUrlParams('searchKey')
                $(".search-bar-input").val(key)
                $(".search-bar-input").focus()
                $("body").keydown(function (event) {
                    if (event.keyCode == "13") {
                        if ($(".search-bar-input").val() != '') {
                            window.location.href = "searchProduct.html?searchKey=" + $(".search-bar-input").val()
                        } else {
                            $.toast('请输入搜索关键词', 'text')
                        }
                    }
                });
            },

            search() {
                if ($(".search-bar-input").val() != '') {
                    window.location.href = "searchProduct.html?searchKey=" + $(".search-bar-input").val()
                } else {
                    $.toast('请输入搜索关键词', 'text')
                }
            }
        }
    })

})