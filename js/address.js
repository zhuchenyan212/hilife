$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            myAddressList: [], //用户的收货地址
        },
        mounted() {
            this.getAdress()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            getAdress() {
                var user = localStorage.getItem("user")
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/myAddressList", {
                    "cid": JSON.parse(user).id,
                }, (res) => {
                    if (res.status == 0) {
                        app.myAddressList = res.myAddressList
                    } else {
                        $.toast("请求失败请稍后", text)
                    }
                })
            },
            choose(id, c_name, c_phone, province, city, area, town, address) {
                var type = this.getUrlParams('type')
                var gdId = this.getUrlParams('gdId')
                var size = this.getUrlParams('size')
                if (type == 1) {
                    // 选择收货地址
                    window.location.href = "confirmOrder.html?type=1&id=" + id + '&c_name=' + c_name + '&c_phone=' + c_phone + '&province=' + province + '&city=' + city + '&area=' + area + '&town=' + town + '&address=' + address + "&gdId=" + gdId + "&size=" + size
                } else if (type == 2) {
                    // 选择收货地址
                    window.location.href = "confirmOrder.html?type=2&id=" + id + '&c_name=' + c_name + '&c_phone=' + c_phone + '&province=' + province + '&city=' + city + '&area=' + area + '&town=' + town + '&address=' + address
                } else if (type == 3) {
                    // 选择收货地址
                    window.location.href = "confirmCode.html?type=3&id=" + id + '&c_name=' + c_name + '&c_phone=' + c_phone + '&province=' + province + '&city=' + city + '&area=' + area + '&town=' + town + '&address=' + address + "&gdId=" + gdId + "&size=" + size
                }
            },
            deleteAddress(id) {
                console.log(id)
                // 执行删除某个收货地址
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/deleteAddress", {
                    "id": id,
                }, (res) => {
                    if (res.status == 0) {
                        location.reload() //刷新用户的地址列表
                        $.toast("删除收货地址成功", text)
                    } else {
                        $.toast("请求失败请稍后", text)
                    }
                })
            },
            edit(id, c_name, c_phone, province, city, area, town, address) {
                window.location.href = "EditAddress.html?id=" + id + '&c_name=' + c_name + '&c_phone=' + c_phone + '&province=' + province + '&city=' + city + '&area=' + area + '&town=' + town + '&address=' + address
            },
            addnew() {
                var type = this.getUrlParams('type')
                var size = this.getUrlParams('size')
                window.location.href = 'addAddress.html?types=2&type=' + type + '&size=' + size
            }
        }
    })

})