$(function () {
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
        console.log($('#demo3 select[name="province"]').find("option:selected").text())
        if ($('.username').val() == '') {
            $.toast('请填写收货人', 'text')
            return
        } else if ($('.number').val() == '') {
            $.toast('请填写手机号', 'text')
            return
        } else if (!(/^1[34578]\d{9}$/.test($('.number').val()))) {
            $.toast('手机号输入有误', 'text')
            return
        } else if ($('#demo3 select[name="province"]').find("option:selected").text() == '') {
            $.toast('请选择地区', 'text')
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