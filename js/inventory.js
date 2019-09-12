$(function () {
    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            productList: [], //商品数据
        },
        mounted() {
            this.product() //请求商品数据
        },
        methods: {
            product() {
                var user = localStorage.getItem("user");
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/myStock", {
                    "cid": JSON.parse(user).id
                }, (res) => {
                    if (res.status == 0) {
                        app.productList = res.productList
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            reduce(e) {
                // 点击“-”绑定事件
                if (e.currentTarget.nextElementSibling.value >= 2) { //最低值需要数量为1
                    e.currentTarget.nextElementSibling.value--;
                }
            },
            increse(e, maxSize) {
                // 点击“+”绑定事件
                if (e.currentTarget.previousElementSibling.value < maxSize) {
                    e.currentTarget.previousElementSibling.value++;
                }else{
                    $.toast('补货不能超过最大库存', 'text')
                }
            },
            addProduct(gdId, price, e) {
                var user = localStorage.getItem("user");
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/placeOrder", {
                    "cid": JSON.parse(user).id,
                    "gdId": gdId,
                    "size": e.currentTarget.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.value,
                    'price': price
                }, (res) => {
                    if (res.status == 0) {
                        $.toast('补货成功', 'text')
                        setTimeout(() => {
                            // 原地刷新
                            // location.reload()
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            }
        }
    })
})