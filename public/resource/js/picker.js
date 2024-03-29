! function (a) {
    "use strict";
    var h, i, j, k, l, m, b = {},
        c = navigator.userAgent,
        d = c.match(/(Android);?[\s\/]+([\d.]+)?/),
        e = c.match(/(iPad).*OS\s([\d_]+)/),
        f = c.match(/(iPod)(.*OS\s([\d_]+))?/),
        g = !e && c.match(/(iPhone\sOS)\s([\d_]+)/);
    if (b.ios = b.android = b.iphone = b.ipad = b.androidChrome = !1, d && (b.os = "android", b.osVersion = d[2], b.android = !0, b.androidChrome = c.toLowerCase().indexOf("chrome") >= 0), (e || g || f) && (b.os = "ios", b.ios = !0), g && !f && (b.osVersion = g[2].replace(/_/g, "."), b.iphone = !0), e && (b.osVersion = e[2].replace(/_/g, "."), b.ipad = !0), f && (b.osVersion = f[3] ? f[3].replace(/_/g, ".") : null, b.iphone = !0), b.ios && b.osVersion && c.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = c.toLowerCase().split("version/")[1].split(" ")[0]), b.webView = (g || e || f) && c.match(/.*AppleWebKit(?!.*Safari)/i), b.os && "ios" === b.os && (h = b.osVersion.split("."), b.minimalUi = !b.webView && (f || g) && (7 === 1 * h[0] ? 1 * h[1] >= 1 : 1 * h[0] > 7) && a('meta[name="viewport"]').length > 0 && a('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0), i = a(window).width(), j = a(window).height(), b.statusBar = !1, b.statusBar = b.webView && i * j === screen.width * screen.height ? !0 : !1, k = [], b.pixelRatio = window.devicePixelRatio || 1, k.push("pixel-ratio-" + Math.floor(b.pixelRatio)), b.pixelRatio >= 2 && k.push("retina"), b.os && (k.push(b.os, b.os + "-" + b.osVersion.split(".")[0], b.os + "-" + b.osVersion.replace(/\./g, "-")), "ios" === b.os))
        for (l = parseInt(b.osVersion.split(".")[0], 10), m = l - 1; m >= 6; m--) k.push("ios-gt-" + m);
    b.statusBar ? k.push("with-statusbar-overlay") : a("html").removeClass("with-statusbar-overlay"), k.length > 0 && a("html").addClass(k.join(" ")), a.device = b
}($), + function (a) {
    "use strict";
    var b = function (b) {
        function g() {
            var b = !1;
            return c.params.convertToPopover || c.params.onlyInPopover ? (!c.inline && c.params.input && (c.params.onlyInPopover ? b = !0 : a.device.ios ? b = a.device.ipad ? !0 : !1 : a(window).width() >= 768 && (b = !0)), b) : b
        }

        function h() {
            return c.opened && c.container && c.container.length > 0 && c.container.parents(".popover").length > 0 ? !0 : !1
        }

        function i() {
            if (c.opened)
                for (var a = 0; a < c.cols.length; a++) c.cols[a].divider || (c.cols[a].calcSize(), c.cols[a].setValue(c.cols[a].value, 0, !1))
        }

        function j(a) {
            var b, i, d, e, f, h, j, k;
            if (a.preventDefault(), !c.opened && (c.open(), c.params.scrollToInput && !g())) {
                if (b = c.input.parents(".content"), 0 === b.length) return;
                d = parseInt(b.css("padding-top"), 10), e = parseInt(b.css("padding-bottom"), 10), f = b[0].offsetHeight - d - c.container.height(), h = b[0].scrollHeight - d - c.container.height(), j = c.input.offset().top - d + c.input[0].offsetHeight, j > f && (k = b.scrollTop() + j - f, k + f > h && (i = k + f - h + e, f === h && (i = c.container.height()), b.css({
                    "padding-bottom": i + "px"
                })), b.scrollTop(k, 300))
            }
        }

        function k(b) {
            h() || (c.input && c.input.length > 0 ? b.target !== c.input[0] && 0 === a(b.target).parents(".weui-picker-modal").length && c.close() : 0 === a(b.target).parents(".weui-picker-modal").length && c.close())
        }

        function l() {
            c.opened = !1, c.input && c.input.length > 0 && c.input.parents(".page-content").css({
                "padding-bottom": ""
            }), c.params.onClose && c.params.onClose(c), c.container.find(".picker-items-col").each(function () {
                c.destroyPickerCol(this)
            })
        }
        var e, f, c = this,
            d = {
                updateValuesOnMomentum: !1,
                updateValuesOnTouchmove: !0,
                rotateEffect: !1,
                momentumRatio: 7,
                freeMode: !1,
                scrollToInput: !0,
                inputReadOnly: !0,
                toolbar: !0,
                toolbarCloseText: "完成",
                title: "请选择",
                toolbarTemplate: '<div class="toolbar">          <div class="toolbar-inner">          <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>          <h1 class="title">{{title}}</h1>          </div>          </div>'
            };
        b = b || {};
        for (e in d) "undefined" == typeof b[e] && (b[e] = d[e]);
        return c.params = b, c.cols = [], c.initialized = !1, c.inline = c.params.container ? !0 : !1, f = a.device.ios || navigator.userAgent.toLowerCase().indexOf("safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0 && !a.device.android, c.setValue = function (a, b) {
            var e, d = 0;
            for (e = 0; e < c.cols.length; e++) c.cols[e] && !c.cols[e].divider && (c.cols[e].setValue(a[d], b), d++)
        }, c.updateValue = function () {
            var e, b = [],
                d = [];
            for (e = 0; e < c.cols.length; e++) c.cols[e].divider || (b.push(c.cols[e].value), d.push(c.cols[e].displayValue));
            b.indexOf(void 0) >= 0 || (c.value = b, c.displayValue = d, c.params.onChange && c.params.onChange(c, c.value, c.displayValue), c.input && c.input.length > 0 && (a(c.input).val(c.params.formatValue ? c.params.formatValue(c, c.value, c.displayValue) : c.value.join(" ")), a(c.input).trigger("change")))
        }, c.initPickerCol = function (b, d) {
            function r() {
                q = a.requestAnimationFrame(function () {
                    h.updateItems(void 0, void 0, 0), r()
                })
            }

            function F(b) {
                if (!u && !t) {
                    b.preventDefault(), t = !0;
                    var c = a.getTouchPosition(b);
                    v = w = c.y, x = (new Date).getTime(), s = !0, z = B = a.getTranslate(h.wrapper[0], "y")
                }
            }

            function G(b) {
                var d, e;
                t && (b.preventDefault(), s = !1, d = a.getTouchPosition(b), w = d.y, u || (a.cancelAnimationFrame(q), u = !0, z = B = a.getTranslate(h.wrapper[0], "y"), h.wrapper.transition(0)), b.preventDefault(), e = w - v, B = z + e, A = void 0, n > B && (B = n - Math.pow(n - B, .8), A = "min"), B > o && (B = o + Math.pow(B - o, .8), A = "max"), h.wrapper.transform("translate3d(0," + B + "px,0)"), h.updateItems(void 0, B, 0, c.params.updateValuesOnTouchmove), D = B - C || B, E = (new Date).getTime(), C = B)
            }

            function H() {
                var d, e, f;
                return t && u ? (t = u = !1, h.wrapper.transition(""), A && ("min" === A ? h.wrapper.transform("translate3d(0," + n + "px,0)") : h.wrapper.transform("translate3d(0," + o + "px,0)")), y = (new Date).getTime(), y - x > 300 ? e = B : (d = Math.abs(D / (y - E)), e = B + D * c.params.momentumRatio), e = Math.max(Math.min(e, o), n), f = -Math.floor((e - o) / l), c.params.freeMode || (e = -f * l + o), h.wrapper.transform("translate3d(0," + parseInt(e, 10) + "px,0)"), h.updateItems(f, e, "", !0), c.params.updateValuesOnMomentum && (r(), h.wrapper.transitionEnd(function () {
                    a.cancelAnimationFrame(q)
                })), setTimeout(function () {
                    s = !0
                }, 100), void 0) : (t = u = !1, void 0)
            }

            function I() {
                if (s) {
                    a.cancelAnimationFrame(q);
                    var c = a(this).attr("data-picker-value");
                    h.setValue(c)
                }
            }
            var k, l, m, n, o, q, s, t, u, v, w, x, y, z, A, B, C, D, E, e = a(b),
                g = e.index(),
                h = c.cols[g];
            h.divider || (h.container = e, h.wrapper = h.container.find(".picker-items-col-wrapper"), h.items = h.wrapper.find(".picker-item"), h.replaceValues = function (a, b) {
                h.destroyEvents(), h.values = a, h.displayValues = b;
                var d = c.columnHTML(h, !0);
                h.wrapper.html(d), h.items = h.wrapper.find(".picker-item"), h.calcSize(), h.setValue(h.values[0], 0, !0), h.initEvents()
            }, h.calcSize = function () {
                c.params.rotateEffect && (h.container.removeClass("picker-items-col-absolute"), h.width || h.container.css({
                    width: ""
                }));
                var b, d;
                b = 0, d = h.container[0].offsetHeight, k = h.wrapper[0].offsetHeight, l = h.items[0].offsetHeight, m = l * h.items.length, n = d / 2 - m + l / 2, o = d / 2 - l / 2, h.width && (b = h.width, parseInt(b, 10) === b && (b += "px"), h.container.css({
                    width: b
                })), c.params.rotateEffect && (h.width || (h.items.each(function () {
                    var c = a(this);
                    c.css({
                        width: "auto"
                    }), b = Math.max(b, c[0].offsetWidth), c.css({
                        width: ""
                    })
                }), h.container.css({
                    width: b + 2 + "px"
                })), h.container.addClass("picker-items-col-absolute"))
            }, h.calcSize(), h.wrapper.transform("translate3d(0," + o + "px,0)").transition(0), h.setValue = function (b, d, e) {
                var f, g;
                "undefined" == typeof d && (d = ""), f = h.wrapper.find('.picker-item[data-picker-value="' + b + '"]').index(), "undefined" != typeof f && -1 !== f && (g = -f * l + o, h.wrapper.transition(d), h.wrapper.transform("translate3d(0," + g + "px,0)"), c.params.updateValuesOnMomentum && h.activeIndex && h.activeIndex !== f && (a.cancelAnimationFrame(q), h.wrapper.transitionEnd(function () {
                    a.cancelAnimationFrame(q)
                }), r()), h.updateItems(f, g, d, e))
            }, h.updateItems = function (b, d, e, g) {
                var i, j;
                "undefined" == typeof d && (d = a.getTranslate(h.wrapper[0], "y")), "undefined" == typeof b && (b = -Math.round((d - o) / l)), 0 > b && (b = 0), b >= h.items.length && (b = h.items.length - 1), i = h.activeIndex, h.activeIndex = b, h.wrapper.find(".picker-selected").removeClass("picker-selected"), c.params.rotateEffect && h.items.transition(e), j = h.items.eq(b).addClass("picker-selected").transform(""), (g || "undefined" == typeof g) && (h.value = j.attr("data-picker-value"), h.displayValue = h.displayValues ? h.displayValues[b] : h.value, i !== b && (h.onChange && h.onChange(c, h.value, h.displayValue), c.updateValue())), c.params.rotateEffect && ((d - (Math.floor((d - o) / l) * l + o)) / l, h.items.each(function () {
                    var b = a(this),
                        c = b.index() * l,
                        e = o - d,
                        g = c - e,
                        i = g / l,
                        j = Math.ceil(h.height / l / 2) + 1,
                        k = -18 * i;
                    k > 180 && (k = 180), -180 > k && (k = -180), Math.abs(i) > j ? b.addClass("picker-item-far") : b.removeClass("picker-item-far"), b.transform("translate3d(0, " + (-d + o) + "px, " + (f ? -110 : 0) + "px) rotateX(" + k + "deg)")
                }))
            }, d && h.updateItems(0, o, 0), s = !0, h.initEvents = function (b) {
                var c = b ? "off" : "on";
                h.container[c](a.touchEvents.start, F), h.container[c](a.touchEvents.move, G), h.container[c](a.touchEvents.end, H), h.items[c]("click", I)
            }, h.destroyEvents = function () {
                h.initEvents(!0)
            }, h.container[0].f7DestroyPickerCol = function () {
                h.destroyEvents()
            }, h.initEvents())
        }, c.destroyPickerCol = function (b) {
            b = a(b), "f7DestroyPickerCol" in b[0] && b[0].f7DestroyPickerCol()
        }, a(window).on("resize", i), c.columnHTML = function (a, b) {
            var e, c = "",
                d = "";
            if (a.divider) d += '<div class="picker-items-col picker-items-col-divider ' + (a.textAlign ? "picker-items-col-" + a.textAlign : "") + " " + (a.cssClass || "") + '">' + a.content + "</div>";
            else {
                for (e = 0; e < a.values.length; e++) c += '<div class="picker-item" data-picker-value="' + a.values[e] + '">' + (a.displayValues ? a.displayValues[e] : a.values[e]) + "</div>";
                d += '<div class="picker-items-col ' + (a.textAlign ? "picker-items-col-" + a.textAlign : "") + " " + (a.cssClass || "") + '"><div class="picker-items-col-wrapper">' + c + "</div></div>"
            }
            return b ? c : d
        }, c.layout = function () {
            var d, e, f, a = "",
                b = "";
            for (c.cols = [], e = "", d = 0; d < c.params.cols.length; d++) f = c.params.cols[d], e += c.columnHTML(c.params.cols[d]), c.cols.push(f);
            b = "weui-picker-modal picker-columns " + (c.params.cssClass || "") + (c.params.rotateEffect ? " picker-3d" : ""), a = '<div class="' + b + '">' + (c.params.toolbar ? c.params.toolbarTemplate.replace(/{{closeText}}/g, c.params.toolbarCloseText).replace(/{{title}}/g, c.params.title) : "") + '<div class="picker-modal-inner picker-items">' + e + '<div class="picker-center-highlight"></div>' + "</div>" + "</div>", c.pickerHTML = a
        }, c.params.input && (c.input = a(c.params.input), c.input.length > 0 && (c.params.inputReadOnly && c.input.prop("readOnly", !0), c.inline || c.input.on("click", j), c.params.inputReadOnly && c.input.on("focus mousedown", function (a) {
            a.preventDefault()
        }))), c.inline || a("html").on("click", k), c.opened = !1, c.open = function () {
            var b = g();
            c.opened || (c.layout(), b ? (c.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + c.pickerHTML + "</div></div>", c.popover = a.popover(c.pickerHTML, c.params.input, !0), c.container = a(c.popover).find(".weui-picker-modal"), a(c.popover).on("close", function () {
                l()
            })) : c.inline ? (c.container = a(c.pickerHTML), c.container.addClass("picker-modal-inline"), a(c.params.container).append(c.container)) : (c.container = a(a.openPicker(c.pickerHTML)), a(c.container).on("close", function () {
                l()
            })), c.container[0].f7Picker = c, c.container.find(".picker-items-col").each(function () {
                var a = !0;
                (!c.initialized && c.params.value || c.initialized && c.value) && (a = !1), c.initPickerCol(this, a)
            }), c.initialized ? c.value && c.setValue(c.value, 0) : c.params.value && c.setValue(c.params.value, 0)), c.opened = !0, c.initialized = !0, c.params.onOpen && c.params.onOpen(c)
        }, c.close = function () {
            return c.opened && !c.inline ? h() ? (a.closePicker(c.popover), void 0) : (a.closePicker(c.container), void 0) : void 0
        }, c.destroy = function () {
            c.close(), c.params.input && c.input.length > 0 && c.input.off("click focus", j), a("html").off("click", k), a(window).off("resize", i)
        }, c.inline && c.open(), c
    };
    a(document).on("click", ".close-picker", function () {
        var b = a(".weui-picker-modal.weui-picker-modal-visible");
        b.length > 0 && a.closePicker(b)
    }), a(document).on(a.touchEvents.move, ".picker-modal-inner", function (a) {
        a.preventDefault()
    }), a.openPicker = function (b, c) {
        var d, e;
        return a.closePicker(), d = a("<div class='weui-picker-container " + (c || "") + "'></div>").appendTo(document.body), d.show(), d.addClass("weui-picker-container-visible"), e = a(b).appendTo(d), e.width(), e.addClass("weui-picker-modal-visible"), e
    }, a.closePicker = function () {
        a(".weui-picker-modal-visible").removeClass("weui-picker-modal-visible").transitionEnd(function () {
            a(this).parent().remove()
        }).trigger("close")
    }, a.fn.picker = function (c) {
        var d = arguments;
        return this.each(function () {
            var e, f, g, h;
            this && (e = a(this), f = e.data("picker"), f || (c = c || {}, g = e.val(), void 0 === c.value && "" !== g && (c.value = c.cols.length > 1 ? g.split(" ") : [g]), h = a.extend({
                input: this
            }, c), f = new b(h), e.data("picker", f)), "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1)))
        })
    }
}($), + function (a) {
    "use strict";
    var b;
    a.fn.datetimePicker = function (c) {
        return c = a.extend({}, b, c), this.each(function () {
            var b, d, e, f, g, h, i, j, k, l, m, n, o;
            this && (b = new Date, d = function (a) {
                var c, b = [];
                for (c = 1;
                    (a || 31) >= c; c++) b.push(10 > c ? "0" + c : c);
                return b
            }, e = function (a, b) {
                var c = new Date(b, parseInt(a) + 1 - 1, 1),
                    e = new Date(c - 1);
                return d(e.getDate())
            }, f = function (a) {
                return 10 > a ? "0" + a : a
            }, g = function (a) {
                return 0 == c.m ? a[0] + c.dateSplit + a[1] + c.dateSplit + a[2] + " " + a[3] + c.timeSplit + a[4] : 1 == c.m ? a[0] + c.dateSplit + a[1] + c.dateSplit + a[2] : void 0
            }, h = "01 02 03 04 05 06 07 08 09 10 11 12".split(" "), i = function () {
                var b, a = [];
                for (b = 1950; 2030 >= b; b++) a.push(b);
                return a
            }(), 0 == c.m ? (k = [b.getFullYear(), f(b.getMonth() + 1), f(b.getDate()), f(b.getHours()), f(b.getMinutes())], l = [{
                values: i
            }, {
                values: h
            }, {
                values: d()
            }, {
                divider: !0,
                content: " "
            }, {
                values: function () {
                    var b, a = [];
                    for (b = 0; 23 >= b; b++) a.push(f(b));
                    return a
                }()
            }, {
                divider: !0,
                content: ":"
            }, {
                values: function () {
                    var b, a = [];
                    for (b = 0; 59 >= b; b++) a.push(f(b));
                    return a
                }()
            }]) : 1 == c.m && (k = [b.getFullYear(), f(b.getMonth() + 1), f(b.getDate())], l = [{
                values: i
            }, {
                values: h
            }, {
                values: d()
            }]), m = {
                rotateEffect: !1,
                value: k,
                onChange: function (a, b, d) {
                    var k, l, m, n, f = a.cols,
                        h = e(f[1].value, f[0].value),
                        i = a.cols[2].value;
                    i > h.length && (i = h.length), a.cols[2].setValue(i), k = +new Date(g(b, d)), l = !0, c.min && (m = +new Date("function" == typeof c.min ? c.min() : c.min), m > k && (a.setValue(j), l = !1)), c.max && (n = +new Date("function" == typeof c.max ? c.max() : c.max), k > n && (a.setValue(j), l = !1)), l && (j = b)
                },
                formatValue: function (a, b, c) {
                    return g(b, c)
                },
                cols: l
            }, n = a(this).val(), void 0 === c.value && "" !== n && (c.value = [].concat(n.split(" ")[0].split(c.dateSplit), n.split("")[1].split(c.timeSplit))), o = a.extend(m, c), a(this).picker(o))
        })
    }, b = a.fn.datetimePicker.prototype.defaults = {
        dateSplit: "",
        timeSplit: ":",
        min: void 0,
        max: void 0,
        m: 0
    }
}($);