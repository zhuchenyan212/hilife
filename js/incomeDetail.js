$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            myList: {}, //收益明细信息
            countDate: '', //结算日
            date: '',  //选择日期
            level: '', //日期
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
                        console.log(value); //得到日期生成的值，如：2017-08-18
                        $.ajax({
                            url: "https://www.kuailelifegroup.com/qgl_admin/weixin/profitDetail",
                            data: {
                                "cid": JSON.parse(user).id,
                                "location": level,
                                "date": value
                            },
                            type: "get",
                            dataType: 'json',
                            success: function (res) {
                                if (res.status == 0) {
                                    app.myList = res.vipList
                                    app.countDate = res.countDate
                                    $('#test3').val(res.countDate)
                                    console.log(res.countDate)
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
                var that = this;
                that.date = date
                that.level = level
                $.ajax({
                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/profitDetail",
                    data: {
                        "cid": JSON.parse(user).id,
                        "location": level,
                        "date": date
                    },
                    type: "get",
                    dataType: 'json',
                    success: function (res) {
                        if (res.status == 0) {
                            app.myList = res.vipList
                            app.countDate = res.countDate
                            $('#test3').val(res.countDate)
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    }
                })
            }
        }
    })
})