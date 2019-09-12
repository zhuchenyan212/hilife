$(function () {

    //页面渲染
    var app = new Vue({
        el: "#app",
        data: {
            userName: '', //开户人姓名
            bankList: [] //开户银行
        },
        mounted() {
            this.getbank()
        },
        methods: {
            getbank() {
                var user = localStorage.getItem("user")
                var that = this;
                that.userName = JSON.parse(user).userName
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/bankList", {}, (res) => {
                    if (res.status == 0) {
                        app.bankList = res.bankList
                    } else {
                        $.toast("请求失败请稍后", 'text')
                    }
                })

                //请求绑定的银行卡信息并回显
                $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/bankCardMsg", {
                    'cid': JSON.parse(user).id,
                }, (res) => {
                    if (res.status == 0) {
                        $('#bankName').val(res.branchBank)
                        $('#bankPhone').val(res.b_phone)
                        $('#bankNumber').val(res.cardId)
                        $("#select").find("option[name = '" + res.bankName + "']").attr("selected", "selected");
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                })

            },
            change() {
                var user = localStorage.getItem("user")
                if ($('#bankName').val() == '') {
                    $.toast('请填写支行名称', 'text')
                    return
                } else if ($('#bankPhone').val() == '') {
                    $.toast('请填写预留手机号码', 'text')
                    return
                } else if ($('#bankNumber').val() == '') {
                    $.toast('请填写银行卡号', 'text')
                    return
                } else {
                    $.getJSON("https://www.kuailelifegroup.com/qgl_admin/weixin/bindBankCard", {
                        'cid': JSON.parse(user).id,
                        'bankId': $("#select option:selected").val(),
                        'branchBank': $('#bankName').val(),
                        'b_phone': $('#bankPhone').val(),
                        'cardId': $('#bankNumber').val()
                    }, (res) => {
                        if (res.status == 0) {
                            $.toast("修改成功", 'text')
                            window.location.href = "userInfo.html"
                        } else {
                            $.toast("请求失败请稍后", 'text')
                        }
                    })
                }
            }
        }
    })

})