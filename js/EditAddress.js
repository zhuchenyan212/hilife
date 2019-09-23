$(function () {

    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
        if (r != null) return (r[2]);
        return null;
    }

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

    // 赋值页面
    var c_name = getUrlParams('c_name')
    var c_phone = getUrlParams('c_phone')
    var province = getUrlParams('province')
    var city = getUrlParams('city')
    var area = getUrlParams('area')
    var town = getUrlParams('town')
    var address = getUrlParams('address')
    $('.c_name').val(c_name)
    $('.c_phone').val(c_phone)
    $('.addresss').val(address)

    $('#demo3').citys({
        province: province,
        city: city,
        area: area,
        town: town,
        onChange: function (info) {
            townFormat(info);
        }
    }, function (api) {
        var info = api.getInfo();
        townFormat(info);
    });

    $('.confirm').click(function () {
        var user = localStorage.getItem("user")
        var address = [];
        address.push($('#demo3 select[name="province"]').find("option:selected").text())
        address.push($('#demo3 select[name="city"]').find("option:selected").text())
        address.push($('#demo3 select[name="area"]').find("option:selected").text())
        address.push($('#demo3 select[name="town"]').find("option:selected").text())
        if ($('.c_name').val() == '') {
            $.toast('请填写收货人', 'text')
            return
        } else if ($('.c_phone').val() == '') {
            $.toast('请填写手机号', 'text')
            return
        } else if (!(/^1[34578]\d{9}$/.test($('.c_phone').val()))) {
            $.toast('手机号输入有误', 'text')
            return
        } else if ($('.addresss').val() == '') {
            $.toast('请填写详细地址', 'text')
            return
        } else {
            var id = getUrlParams('id')
            $.ajax({
                url: "https://www.kuailelifegroup.com/qgl_admin/weixin/editAddress",
                traditional: true,
                data: {
                    "id": id,
                    "c_name": $('.username').val(),
                    "c_phone": $('.number').val(),
                    "provinces": JSON.stringify(address),
                    "address": $('.detailed').val(),
                },
                type: "get",
                dataType: 'json',
                success: function (res) {
                    if (res.status == 0) {
                        $.toast('编辑地址成功', 'text')
                        setTimeout(() => {
                            window.location.href = "address.html"
                        }, 1000)
                    } else {
                        $.toast('请求失败请稍后', 'text')
                    }
                }
            })
        }
    })

})