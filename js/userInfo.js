$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            pic: '', // 用户的头像
            upperName: '', //推荐会员
            identityCard4: '', //身份证后四位
            shortCardId: '' //银行卡号
        },
        mounted() {
            this.getPic()
        },
        methods: {
            getPic() {
                var user = localStorage.getItem("user")
                var that = this;
                $('.username').val(JSON.parse(user).userName)
                $('.phone').val(JSON.parse(user).cellphone)
                that.pic = JSON.parse(user).pic
                that.upperName = JSON.parse(user).upperName
                that.identityCard4 = JSON.parse(user).identityCard4
                //修改昵称
                $('.username').blur(function () {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/updatePwd", {
                        'cid': JSON.parse(user).id,
                        'location': 1,
                        'msg': $('.username').val()
                    }, (res) => {
                        if (res.status == 0) {
                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/selectCustomerMsg", {
                                'id': JSON.parse(user).id,
                            }, (res) => {
                                if (res.status == 0) {
                                    $.toast('修改成功', 'text')
                                    // 存缓存
                                    var data = JSON.stringify(res.user);
                                    localStorage.setItem("user", data)
                                } else {
                                    $.toast('请求失败请稍后', 'text')
                                }
                            })
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    })
                })
                //修改手机号码
                $('.phone').blur(function () {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/updatePwd", {
                        'cid': JSON.parse(user).id,
                        'location': 2,
                        'msg': $('.phone').val()
                    }, (res) => {
                        if (res.status == 0) {
                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/selectCustomerMsg", {
                                'id': JSON.parse(user).id,
                            }, (res) => {
                                if (res.status == 0) {
                                    $.toast('修改成功', 'text')
                                    // 存缓存
                                    var data = JSON.stringify(res.user);
                                    localStorage.setItem("user", data)
                                } else {
                                    $.toast('请求失败请稍后', 'text')
                                }
                            })
                        } else {
                            $.toast('请求失败请稍后', 'text')
                        }
                    })
                })
                //请求绑定的银行卡信息
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/bankCardMsg", {
                    'cid': JSON.parse(user).id,
                }, (res) => {
                    if (res.status == 0) {
                        app.shortCardId = res.shortCardId
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })
            },
            chooseImg() {
                //获取图片路劲的方法，兼容多种浏览器，通过createObjectURL实现
                function getObjectURL(file) {
                    var url = null;
                    if (window.createObjectURL != undefined) {
                        url = window.createObjectURL(file); //basic
                    } else if (window.URL != undefined) {
                        url = window.URL.createObjectURL(file);
                    } else if (window.webkitURL != undefined) {
                        url = window.webkitURL.createObjectURL(file);
                    }
                    return url;
                }

                //实现功能代码
                $("#browerfile").change(function () {
                    var user = localStorage.getItem("user")
                    var path = browerfile.value;
                    var objUrl = getObjectURL(this.files[0]);
                    if (objUrl) {
                        $('.img1-img').attr("src", objUrl);
                        console.log(objUrl)
                        var form = document.getElementById("myForm");
                        var formData = new FormData(form);
                        $.ajax({
                            url: "https://www.kuailelifegroup.com/qgl_admin/weixin/updatePic",
                            type: 'post',
                            data: formData,
                            cache: false,
                            processData: false,
                            contentType: false,
                            async: false,
                            dataType: "json",
                            success: function (res) {
                                if (res.status == 0) {
                                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/updatePic2", {
                                        'cid': JSON.parse(user).id,
                                        'picLoc': res.picLocs[0]
                                    }, (res) => {
                                        if (res.status == 0) {
                                            $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/selectCustomerMsg", {
                                                'id': JSON.parse(user).id,
                                            }, (res) => {
                                                if (res.status == 0) {
                                                    $.toast('上传头像成功', 'text')
                                                    //存缓存
                                                    var data = JSON.stringify(res.user);
                                                    localStorage.setItem("user", data)
                                                } else {
                                                    $.toast('请求失败请稍后', 'text')
                                                }
                                            })
                                        } else {
                                            $.toast('请求失败请稍后', 'text')
                                        }
                                    })
                                } else {
                                    $.toast('请求失败请稍后', 'text')
                                }
                            }
                        })
                    }
                })
            },
            signOut() {
                //退出登录
                window.location.href="login.html"
            }
        }
    })

})