$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            dataList: [], //业绩数据
        },
        mounted() {
            this.getDate()
        },
        methods: {
            getDate() {
                //获取当前年份
                var date = new Date();
                var mon = date.getFullYear();
                $('.month').text(mon)
                var user = localStorage.getItem("user")
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/saleAchievement", {
                    "cid": JSON.parse(user).id,
                    "year": mon
                }, (res) => {
                    if (res.status == 0) {
                        app.dataList = res.dataList
                    } else {
                        $.toast("请求失败请稍后", 'text')
                    }
                })

                //月份选择
                var method = $('.select-value').mPicker({
                    level: 1,
                    dataJson: year,
                    Linkage: false,
                    rows: year.length,
                    idDefault: true,
                    confirm: function (year) {
                        var obj = parseInt(year.name) + 1
                        $('.month').text(obj)
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/saleAchievement", {
                            "cid": JSON.parse(user).id,
                            "year": obj
                        }, (res) => {
                            if (res.status == 0) {
                                app.dataList = res.dataList
                            } else {
                                $.toast("请求失败请稍后", 'text')
                            }
                        })
                    }
                })
            },
        }
    })

})