$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            myList: {}, //我的收益信息
            date: ''  //返回日期
        },
        mounted() {
            this.show()
            this.applyList()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            show() {
                var user = localStorage.getItem("user")
                var level = this.getUrlParams('level')
                //执行一个laydate实例
                laydate.render({
                    elem: '#test3',
                    type: 'month',
                    done: function (value, date, endDate) {
                        app.date = value
                        $.ajax({
                            url: "https://www.kuailelifegroup.com/qgl_admin/weixin/myProfit",
                            data: {
                                "cid": JSON.parse(user).id,
                                "level": level,
                                "date": value
                            },
                            type: "get",
                            dataType: 'json',
                            success: function (res) {
                                if (res.status == 0) {
                                    app.myList = res
                                    app.date = res.date
                                    $('#test3').val(res.date)
                                } else {
                                    $.toast('请求失败请稍后', 'text')
                                }
                            }
                        })
                    }
                });
            },
            applyList() {
                var user = localStorage.getItem("user")
                var level = this.getUrlParams('level')
                var date = this.getUrlParams('date')
                if (date != null) {
                    $.ajax({
                        url: "https://www.kuailelifegroup.com/qgl_admin/weixin/myProfit",
                        data: {
                            "cid": JSON.parse(user).id,
                            "level": level,
                            "date": date
                        },
                        type: "get",
                        dataType: 'json',
                        success: function (res) {
                            if (res.status == 0) {
                                app.myList = res
                                app.date = res.date
                                $('#test3').val(res.date)
                            } else {
                                $.toast('请求失败请稍后', 'text')
                            }
                        }
                    })
                } else {
                    $.ajax({
                        url: "https://www.kuailelifegroup.com/qgl_admin/weixin/myProfit",
                        data: {
                            "cid": JSON.parse(user).id,
                            "level": level
                        },
                        type: "get",
                        dataType: 'json',
                        success: function (res) {
                            if (res.status == 0) {
                                app.myList = res
                                app.date = res.date
                                $('#test3').val(res.date)
                            } else {
                                $.toast('请求失败请稍后', 'text')
                            }
                        }
                    })
                }
            },
            goDetail(level) {
                window.location.href = 'incomeDetail.html?level=' + level + '&date=' + app.date
            }
        }
    })
})