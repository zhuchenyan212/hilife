$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            id: '', //用户id
            userName: '', //用户名
            level: '', //会员等级
            pic: '', //会员头像
        },
        mounted() {
            this.attrId()
        },
        methods: {
            attrId() {
                var user = localStorage.getItem("user")
                var that = this;
                that.id = JSON.parse(user).id
                that.userName = JSON.parse(user).userName
                that.pic = JSON.parse(user).pic
                that.level = JSON.parse(user).level
                jQuery('#qrcodeCanvas').qrcode({
                    render: "canvas",
                    text: 'https://www.kuailelifegroup.com/project/register.html?id=' + JSON.parse(user).id + "&userName=" + JSON.parse(user).userName,
                    width: "188",
                    height: "188",
                    background: "#fff",
                    foreground: "#000000",
                    src: 'images/logo.png'
                });
            }
        }
    })

})