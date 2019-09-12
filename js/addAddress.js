$(function () {
    // 选择收货地址
    var $town = $('#demo3 select[name="town"]');
    var townFormat = function (info) {
        $town.hide().empty();
        if (info['code'] % 1e4 && info['code'] < 7e5) {	//是否为“区”且不是港澳台地区
            $.ajax({
                url: 'https://passer-by.com/data_location/town/' + info['code'] + '.json',
                dataType: 'json',
                success: function (town) {
                    $town.show();
                    for (i in town) {
                        $town.append('<option value="' + i + '">' + town[i] + '</option>');
                    }
                }
            });
        }
    };

    $('#demo3').citys({
        province: '',
        city: '',
        area: '',
        onChange: function (info) {
            townFormat(info);
        }
    }, function (api) {
        var info = api.getInfo();
        townFormat(info);
    });

    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
        if (r != null) return (r[2]);
        return null;
    }

    $('.confirm').click(function () {
        var user = localStorage.getItem("user")
        var address = [];
        address.push($('#demo3 select[name="province"]').find("option:selected").text())
        address.push($('#demo3 select[name="city"]').find("option:selected").text())
        address.push($('#demo3 select[name="area"]').find("option:selected").text())
        address.push($('#demo3 select[name="town"]').find("option:selected").text())
        if ($('.username').val() == '') {
            $.toast('请填写收货人', 'text')
            return
        } else if ($('.number').val() == '') {
            $.toast('请填写手机号', 'text')
            return
        } else if (!(/^1[34578]\d{9}$/.test($('.number').val()))) {
            $.toast('手机号输入有误', 'text')
            return
        } else if ($('.detailed').val() == '') {
            $.toast('请填写详细地址', 'text')
            return
        } else {
            $.ajax({
                url: "https://www.kuailelifegroup.com/qgl_admin/weixin/addAddress",
                traditional: true,
                data: {
                    "cid": JSON.parse(user).id,
                    "c_name": $('.username').val(),
                    "c_phone": $('.number').val(),
                    "provinces": JSON.stringify(address),
                    "address": $('.detailed').val(),
                },
                type: "get",
                dataType: 'json',
                success: function (res) {
                    if (res.status == 0) {
                        $.toast('收货地址添加成功', 'text')
                        var type = getUrlParams('type')
                        var types = getUrlParams('types')
                        var size = getUrlParams('size')
                        console.log(type)
                        setTimeout(() => {
                            if (types == 2) {
                                window.location.href = "chooseAddress.html?type=" + type + '&size=' + size
                            } else {
                                window.location.href = "address.html"
                            }
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                }
            })
        }
    })

})