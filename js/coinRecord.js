$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            pMoney: '', //电子币
            recordList: [] //提现数据
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
                var that = this;
                that.pMoney = JSON.parse(user).pMoney
                //获取当前年份
                var date = new Date();
                var year = date.getFullYear();
                var mon = date.getMonth() + 1;
                var data = year + '-' + mon
                $('#test3').val(data)
                //执行一个laydate实例
                laydate.render({
                    elem: '#test3',
                    type: 'month',
                    done: function (value, date, endDate) {
                        console.log(value); //得到日期生成的值，如：2017-08-18
                        $.ajax({
                            url: "https://www.kuailelifegroup.com/qgl_admin/weixin/cashOutList",
                            data: {
                                "cid": JSON.parse(user).id,
                                "date": value
                            },
                            type: "get",
                            dataType: 'json',
                            success: function (res) {
                                if (res.status == 0) {
                                    app.recordList = res.recordList
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
                $.ajax({
                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/cashOutList",
                    data: {
                        "cid": JSON.parse(user).id
                    },
                    type: "get",
                    dataType: 'json',
                    success: function (res) {
                        if (res.status == 0) {
                            app.recordList = res.recordList
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    }
                })
            }
        }
    })
})