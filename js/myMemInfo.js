$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            myVipList: '', //我的会员信息
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
                var type = this.getUrlParams('type')
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                month = (month < 10 ? "0" + month : month);
                var mydate = (year.toString() + '-' + month.toString());
                console.log(mydate)
                $('#test3').val(mydate)
                //执行一个laydate实例
                laydate.render({
                    elem: '#test3',
                    type: 'month',
                    done: function (value, date, endDate) {
                        console.log(value); //得到日期生成的值，如：2017-08-18
                        $.ajax({
                            url: "https://www.kuailelifegroup.com/qgl_admin/weixin/myVipProfit",
                            data: {
                                "cid": JSON.parse(user).id,
                                "type": type,
                                "date": value
                            },
                            type: "get",
                            dataType: 'json',
                            success: function (res) {
                                if (res.status == 0) {
                                    app.myVipList = res.myVipList
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
                var type = this.getUrlParams('type')
                $.ajax({
                    url: "https://www.kuailelifegroup.com/qgl_admin/weixin/myVipProfit",
                    data: {
                        "cid": JSON.parse(user).id,
                        "type": type
                    },
                    type: "get",
                    dataType: 'json',
                    success: function (res) {
                        if (res.status == 0) {
                            app.myVipList = res.myVipList
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    }
                })
            },
        }
    })
})