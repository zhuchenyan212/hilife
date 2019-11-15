$(function () {
    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search.substr(1)).match(reg); //获取参数
        if (r != null) return (r[2]);
        return null;
    }

    // 赋值页面
    var c_name = getUrlParams('c_name')
    var c_phone = getUrlParams('c_phone')
    var province = getUrlParams('province')
    // $('#demo3 select[name="province"]').append('<option>' + province + '</option>');
    var city = getUrlParams('city')
    // $('#demo3 select[name="city"]').append('<option>' + city + '</option>');
    var area = getUrlParams('area')
    // $('#demo3 select[name="area"]').append('<option>' + area + '</option>');
    var town = getUrlParams('town')
    // $('#demo3 select[name="town"]').append('<option>' + town + '</option>');
    var address = getUrlParams('address')
    $('.c_name').val(c_name)
    $('.c_phone').val(c_phone)
    $('.addresss').val(address)

    //请求省份
    $.ajax({
        url: 'https://www.kuailelifegroup.com/qgl_admin/weixin/getLocations?type=1',
        dataType: 'json',
        success: function (province) {
            for (i in province.locations) {
                $('#demo3 select[name="province"]').append('<option value="' + province.locations[i].id + '">' + province.locations[i].province + '</option>');
            }
        }
    });

    $(".province").change(function () {
        var id = $('#demo3 select[name="province"]').find("option:selected").val()
        if (id != undefined && id != "") {
            //请求市区
            $.ajax({
                url: 'https://www.kuailelifegroup.com/qgl_admin/weixin/getLocations?type=2&id=' + id,
                dataType: 'json',
                success: function (city) {
                    var str1 = ''
                    for (i in city.locations) {
                        str1 += '<option value="' + city.locations[i].id + '">' + city.locations[i].city + '</option>';
                    } // $('#demo3 select[name="city"]').append('<option value="' + city.locations[i].id + '">' + city.locations[i].city + '</option>');
                    $('.city').html(str1);
                }
            });
        }
    })
    $('.city').change(function () {
        var id = $('#demo3 select[name="city"]').find("option:selected").val()
        if (id != undefined && id != "") {
            //请求县
            $.ajax({
                url: 'https://www.kuailelifegroup.com/qgl_admin/weixin/getLocations?type=3&id=' + id,
                dataType: 'json',
                success: function (area) {
                    var str2 = ''
                    for (i in area.locations) {
                        // $('#demo3 select[name="area"]').append('<option value="' + area.locations[i].id + '">' + area.locations[i].area + '</option>');
                        str2 += '<option value="' + area.locations[i].id + '">' + area.locations[i].area + '</option>';
                    }
                    $('.area').html(str2);
                }
            });
        }
    })

    $('.area').change(function () {
        var id = $('#demo3 select[name="area"]').find("option:selected").val()
        if (id != undefined && id != "") {
            //请求镇
            $.ajax({
                url: 'https://www.kuailelifegroup.com/qgl_admin/weixin/getLocations?type=4&id=' + id,
                dataType: 'json',
                success: function (town) {
                    var str3 = ''
                    for (i in town.locations) {
                        // $('#demo3 select[name="town"]').append('<option value="' + town.locations[i].id + '">' + town.locations[i].town + '</option>');
                        str3 += '<option value="' + town.locations[i].id + '">' + town.locations[i].town + '</option>';
                    }
                    $('.town').html(str3);
                }
            });
        }
    })


    $('.confirm').click(function () {
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
        } else if ($('#demo3 select[name="province"]').find("option:selected").text() == '') {
            $.toast('请选择地区', 'text')
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