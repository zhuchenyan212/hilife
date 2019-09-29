$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            username: '',
            phone: '',
            transPass: '',
            RtransPass: '',
            userName: ''
        },
        mounted() {
            this.Edit()
        },
        methods: {
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
                if (r != null) return (r[2]);
                return null;
            },
            Edit() {
                // 自动填入注册密码
                if ($('.phone').val() != '' || $('.phone').val() != undefined || $('.phone').val() != null) {
                    $('.phone').blur(function () {
                        $('.registerPass').val($('.phone').val())
                    })
                }
                //自动填入userName
                var that = this;
                var userName = this.getUrlParams('userName')
                that.userName = userName
                var id = this.getUrlParams('id')
                if (id == null && id == undefined) {
                    $('.suggest').val('长沙市青橄榄电子商务有限公司')
                } else {
                    $('.suggest').val(userName)
                }
            },
            register() {
                var that = this;
                var id = this.getUrlParams('id')
                if (that.username == '') {
                    $.toast('请填写姓名', 'text')
                    return
                } else if (that.phone == '') {
                    $.toast('请填写手机号', 'text')
                    return
                } else if (!(/^1[34578]\d{9}$/.test(that.phone))) {
                    $.toast('手机号输入有误', 'text')
                    return
                } else if (that.transPass == '') {
                    $.toast('请填写交易密码', 'text')
                    return
                } else if (that.RtransPass == '') {
                    $.toast('请确认交易密码', 'text')
                    return
                } else {
                    if (id == null && id == undefined) {
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/newUserRegister", {
                            "userName": that.username,
                            "cellphone": that.phone,
                            "registId": 1,
                            "t_password": that.RtransPass,
                        }, (res) => {
                            if (res.status == 0) {
                                // 注册存缓存
                                var data = JSON.stringify(res.user);
                                localStorage.setItem("user", data)
                                $.toast('登录成功', 'text')
                                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96046645636b6d58&redirect_uri=https://www.kuailelifegroup.com/project/index.html&response_type=code&scope=snsapi_base#wechat_redirect"
                            } else {
                                $.toast(res.msg, 'text')
                            }
                        })
                    } else {
                        $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/newUserRegister", {
                            "userName": that.username,
                            "cellphone": that.phone,
                            "registId": id,
                            "t_password": that.RtransPass,
                        }, (res) => {
                            if (res.status == 0) {
                                // 注册存缓存
                                var data = JSON.stringify(res.user);
                                localStorage.setItem("user", data)
                                $.toast('登录成功', 'text')
                                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96046645636b6d58&redirect_uri=https://www.kuailelifegroup.com/project/index.html&response_type=code&scope=snsapi_base#wechat_redirect"
                            } else {
                                $.toast(res.msg, 'text')
                            }
                        })
                    }
                }
            }
        }
    })

})