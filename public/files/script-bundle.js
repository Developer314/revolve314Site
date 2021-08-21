/*! Skrollex */ ! function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                throw new Error("Cannot find module '" + g + "'")
            }
            var j = c[g] = {
                exports: {}
            };
            b[g][0].call(j.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, j, j.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function(a, b) {
        b.exports = function(a, b) {
            "use strict";
            var c = $("html").hasClass("poor-browser");
            return !Modernizr.cssanimations || c ? ($(".scroll-in-animation").removeClass("scroll-in-animation"), void $(".scroll-animation").removeClass("scroll-animation")) : void a.find(".scroll-in-animation, .scroll-animation").each(function() {
                var a = $(this),
                    c = a.data("delay"),
                    d = a.data("animation") + " animated css-animation-show",
                    e = function() {
                        c ? setTimeout(function() {
                            a.removeClass(d)
                        }, c) : a.removeClass(d)
                    },
                    f = function() {
                        c ? setTimeout(function() {
                            a.addClass(d)
                        }, c) : a.addClass(d)
                    },
                    g = f;
                b.players.addPlayer(a, g, e, f)
            })
        }
    }, {}],
    2: [function(a, b) {
        var c = [];
        c.addPlayer = function(a, b, d, e) {
            c.push(new function() {
                var f = !1,
                    g = !1;
                this.$view = a, a.addClass("player").data("player-ind", c.length), this.play = function() {
                    f || (f = !0, g ? e() : (g = !0, b()))
                }, this.pause = function() {
                    f && (f = !1, d())
                }
            })
        }, b.exports = c
    }, {}],
    3: [function(a, b) {
        b.exports = function(b) {
            "use strict";
            var c = this,
                d = (a("../tools/tools.js"), a("../app/scroll-animation.js")),
                e = $(window),
                f = ($("html").hasClass("poor-browser"), new d(c, b));
            this.windowTopPos = void 0, this.windowBottomPos = void 0, this.windowH = void 0, this.scroll = function(a) {
                c.windowH = e.height(), c.windowTopPos = a, c.windowBottomPos = a + c.windowH, c.windowTopPos < b.topNav.state1Top() ? b.topNav.state1() : b.topNav.state2(), f.scroll();
                for (var d = 0; d < b.players.length; d++) {
                    var g = c.calcPosition(b.players[d].$view);
                    g.visible ? b.players[d].play() : b.players[d].pause()
                }
            }, this.calcPosition = function(a) {
                var b = a.height(),
                    d = a.data("position"),
                    e = d + b;
                return {
                    top: d,
                    bottom: e,
                    height: b,
                    visible: d < c.windowBottomPos && e > c.windowTopPos
                }
            }
        }
    }, {
        "../app/scroll-animation.js": 7,
        "../tools/tools.js": 11
    }],
    4: [function(a, b) {
        b.exports = function() {
            "use strict";
            var b = (a("../app/app-share.js"), $("html").hasClass("poor-browser")),
                c = 4e3,
                d = 12e3,
                e = {
                    scale: 1
                },
                f = {
                    scale: 1.1
                },
                g = [
                    [e, f],
                    [f, e]
                ],
                h = [{
                    or: "left top",
                    xr: 0,
                    yr: 0
                }, {
                    or: "left center",
                    xr: 0,
                    yr: 1
                }, {
                    or: "right top",
                    xr: 2,
                    yr: 0
                }, {
                    or: "right center",
                    xr: 2,
                    yr: 1
                }],
                i = g.length - 1,
                j = h.length - 1,
                k = TWEEN.Easing.Quartic.InOut,
                l = TWEEN.Easing.Linear.None;
            this.run = function(a) {
                function e(b, m) {
                    var n = a.get(b),
                        o = $(n),
                        p = o.data(),
                        q = Math.round(Math.random() * i),
                        r = Math.round(Math.random() * j),
                        s = g[q];
                    p.ssScale = s[0].scale, p.ssOrig = h[r], p.ssOpacity = b !== f || m ? 1 : 0, b !== f || m || new TWEEN.Tween(p).to({
                        ssOpacity: 1
                    }, c).easing(k).onComplete(function() {
                        a.each(function() {
                            $(this).data().ssOpacity = 1
                        })
                    }).start(), new TWEEN.Tween(p).to({
                        ssScale: s[1].scale
                    }, d).easing(l).start(), b > 0 ? new TWEEN.Tween({
                        ssOpacity: 1
                    }).to({
                        ssOpacity: 0
                    }, c).onUpdate(function() {
                        p.ssOpacity = this.ssOpacity
                    }).easing(k).delay(d - c).onStart(function() {
                        e(b - 1)
                    }).start() : new TWEEN.Tween(p).to({}, 0).easing(k).delay(d - c).onStart(function() {
                        e(f)
                    }).start()
                }
                if (!b) {
                    var f = a.length - 1;
                    e(f, !0)
                }
            }
        }
    }, {
        "../app/app-share.js": 5
    }],
    5: [function(a, b) {
        b.exports = new function() {
            var a = -1 != navigator.appVersion.indexOf("Windows NT 6.1") || -1 != navigator.appVersion.indexOf("Windows NT 6.0") || -1 != navigator.appVersion.indexOf("Windows NT 5.1") || -1 != navigator.appVersion.indexOf("Windows NT 5.0"),
                b = $("html").hasClass("ie9"),
                c = $("html").hasClass("ie10"),
                d = $("html").hasClass("ie11"),
                e = $("html").hasClass("poor-browser"),
                f = $("html").hasClass("mobile"),
                g = function() {
                    return b || c || d && a ? 0 : d ? -.15 : e ? 0 : -.25
                }();
            this.force3D = f ? !1 : !0, this.parallaxMargin = function(a, b, c) {
                var d = c - (0 === b ? 0 : a.topNav.state2H);
                return Math.round(g * d)
            }
        }
    }, {}],
    6: [function(a, b) {
        b.exports = new function() {
            "use strict";

            function b(a) {
                var b, c, d = a.get(0);
                if ("img" === d.tagName.toLowerCase()) b = d.width, c = d.height;
                else if (d.naturalWidth) b = d.naturalWidth, c = d.naturalHeight;
                else {
                    var e = a.width();
                    a.css({
                        width: "",
                        height: ""
                    }), b = a.width(), c = a.height(), a.css({
                        width: e
                    })
                }
                return {
                    w: b,
                    h: c
                }
            }
            var c, d = a("./app-share.js"),
                e = a("./themes.js"),
                f = a("../animation/slide-show.js"),

                g = new f,
                h = $("html").hasClass("poor-browser"),
                i = $("html").hasClass("mobile"),
                j = 60,
                k = $("#top-nav, .page-border, #dot-scroll"),
                l = $("#top-nav"),
                m = l.data("state1-colors"),
                n = l.data("state2-colors"),
                o = $("body"),
                p = $(".view");
            this.prepare = function(a) {
                if ("file:" !== window.location.protocol || $("body").hasClass("example-page") || $('<div class="file-protocol-alert alert colors-d background-80 heading fade in">	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> Upload files to web server and open template from web server. If template is opened from local file system, some links, functions and examples may work incorrectly.</div>').appendTo("body"), d.force3D === !0 && $("html").addClass("force3d"), h) {
                    var b = $("body>.bg");
                    b.each(function(a) {
                        a === b.length - 1 ? $(this).css("display", "block") : $(this).remove()
                    }), $(".view").each(function() {
                        var a = $(this).children(".bg");
                        a.each(function(b) {
                            b === a.length - 1 ? $(this).css("display", "block") : $(this).remove()
                        })
                    })
                }
                if (i) {
                    var e = $("body>img.bg"),
                        f = e.length > 0 ? e : $(".view>img.bg");
                    if (f.length > 0) {
                        var g = $(f[0]);
                        $(".view").each(function() {
                            var a = $(this),
                                b = a.children("img.bg");
                            b.length < 1 && g.clone().prependTo(a)
                        })
                    }
                    $("body>img.bg").remove()
                }
                c = $(".bg"), a()
            }, this.setup = function(a) {
                function b(a) {
                    for (var b = 0; b < e.colors; b++) {
                        var c = "colors-" + String.fromCharCode(65 + b).toLowerCase();
                        if (a.hasClass(c)) return c
                    }
                }
                var c = function(a) {
                    var b = a.css("background-color");
                    return b.match(/#/i) || b.match(/rgb\(/i) || b.match(/rgba.*,0\)/i)
                };
                $(".view.section-header").each(function() {
                    var a = $(this),
                        b = a.nextAll(".view").first().children(".content");
                    b.length > 0 && c(b) && a.children(".content").addClass("skew-bottom-right")
                }), $(".view.section-footer").each(function() {
                    var a = $(this),
                        b = a.prevAll(".view").first().children(".content");
                    b.length > 0 && c(b) && a.children(".content").addClass("skew-top-right")
                }), p.find(".content").filter(".skew-top-right, .skew-top-left, .skew-bottom-left, .skew-bottom-right").each(function() {
                    var a = $(this),
                        d = a.parent();
                    if (a.hasClass("skew-top-right") || a.hasClass("skew-top-left")) {
                        var e = d.prevAll(".view").first().children(".content");
                        if (e.length > 0 && c(e)) {
                            var f = a.hasClass("skew-top-right") ? 1 : 2;
                            $('<div class="skew skew-top-' + (1 === f ? "right" : "left") + '"></div>').appendTo(a).css({
                                position: "absolute",
                                top: "0px",
                                width: "0px",
                                height: "0px",
                                "border-top-width": 2 === f ? j + "px" : "0px",
                                "border-right-width": "2880px",
                                "border-bottom-width": 1 === f ? j + "px" : "0px",
                                "border-left-width": "0px",
                                "border-style": "solid solid solid dashed",
                                "border-bottom-color": "transparent",
                                "border-left-color": "transparent"
                            }).addClass(b(e))
                        }
                    }
                    if (a.hasClass("skew-bottom-left") || a.hasClass("skew-bottom-right")) {
                        var g = d.nextAll(".view").first().children(".content");
                        if (g.length > 0 && c(g)) {
                            var f = a.hasClass("skew-bottom-left") ? 1 : 2;
                            $('<div class="skew skew-bottom-' + (1 === f ? "left" : "right") + '"></div>').appendTo(a).css({
                                position: "absolute",
                                bottom: "0px",
                                width: "0px",
                                height: "0px",
                                "border-top-width": 1 === f ? j + "px" : "0px",
                                "border-right-width": "0px",
                                "border-bottom-width": 2 === f ? j + "px" : "0px",
                                "border-left-width": "2880px",
                                "border-style": "solid dashed solid solid",
                                "border-top-color": "transparent",
                                "border-right-color": "transparent"
                            }).addClass(b(g))
                        }
                    }
                }), a()
            }, this.ungated = function() {
                $("body, .view").each(function() {
                    var a = $(this).children(".bg");
                    a.length > 1 && g.run(a)
                })
            }, this.tick = function() {
                c.each(function() {
                    var a, b, c, e, f = $(this),
                        g = f.data();
                    void 0 !== g.ssOpacity ? (a = g.ssOpacity, b = g.ssOrig.xr, c = g.ssOrig.yr, e = g.ssOrig.or) : (a = 1, b = 1, c = 1, e = "center center");
                    var h = g.normalX + g.zoomXDelta * b,
                        i = g.normalY + g.zoomYDelta * c + (void 0 !== g.parallaxY ? g.parallaxY : 0),
                        j = g.normalScale * (void 0 !== g.ssScale ? g.ssScale : 1);
                    f.css(Modernizr.csstransforms3d && d.force3D ? {
                        transform: "translate3d(" + h + "px, " + i + "px, 0px) scale(" + j + ", " + j + ")",
                        opacity: a,
                        "transform-origin": e + " 0px"
                    } : {
                        transform: "translate(" + h + "px, " + i + "px) scale(" + j + ", " + j + ")",
                        opacity: a,
                        "transform-origin": e
                    })
                })
            }, this.buildSizes = function(a) {
                function c(a, c, d, e) {
                    var f = b(a),
                        g = d / c > f.w / f.h ? d / f.w : c / f.h,
                        h = f.w * g,
                        i = f.h * g,
                        j = (h - f.w) / 2,
                        k = (i - f.h) / 2,
                        l = Math.round((d - h) / 2),
                        m = Math.round((e - i) / 2),
                        n = a.data();
                    n.normalScale = g, n.normalX = l, n.normalY = m, n.zoomXDelta = j, n.zoomYDelta = k
                }
                var e = $(window),
                    f = e.height(),
                    g = e.width(),
                    h = $("#top-nav:visible"),
                    i = f - (h.length > 0 ? a.topNav.state2H : 0),
                    j = $(".page-border.bottom:visible"),
                    k = j.length > 0 ? j.height() : 0;
                $(".full-size, .half-size, .one-third-size").each(function() {
                    var a = $(this),
                        b = parseInt(a.css({
                            "padding-top": ""
                        }).css("padding-top").replace("px", "")),
                        c = parseInt(a.css({
                            "padding-bottom": ""
                        }).css("padding-bottom").replace("px", "")),
                        d = i - (j.length > 0 ? k : 0),
                        e = Math.ceil(d / 2),
                        f = Math.ceil(d / 3),
                        g = a.hasClass("full-size") ? d : a.hasClass("half-size") ? e : f;
                    a.css({
                        "padding-top": b + "px",
                        "padding-bottom": c + "px"
                    }), (a.hasClass("stretch-height") || a.hasClass("stretch-full-height")) && a.css({
                        height: ""
                    });
                    var h = a.height();
                    if (g > h) {
                        var l = g - h - b - c;
                        0 > l && (l = 0);
                        var m = Math.round(l / 2),
                            n = l - m,
                            o = b + m,
                            p = c + n;
                        a.css({
                            "padding-top": o + "px",
                            "padding-bottom": p + "px"
                        })
                    }
                }), $(".stretch-height").each(function() {
                    var a = $(this),
                        b = a.parent(),
                        c = b.find(".stretch-height");
                    c.css("height", ""), a.outerWidth() < b.innerWidth() && c.css("height", b.innerHeight() + "px")
                }), $(".stretch-full-height").each(function() {
                    var a = $(this),
                        b = a.parent(),
                        c = b.find(".stretch-full-height");
                    if (c.css("height", ""), a.outerWidth() < b.innerWidth()) {
                        var d = b.innerHeight(),
                            e = d > f ? d : f;
                        c.css("height", e + "px")
                    }
                }), p.each(function(b) {
                    var e = $(this),
                        g = e.find(".content"),
                        h = g.find(".skew.skew-top-right, .skew.skew-top-left"),
                        i = g.find(".skew.skew-bottom-left, .skew.skew-bottom-right"),
                        j = g.width() + "px";
                    i.css({
                        "border-left-width": j
                    }), h.css({
                        "border-right-width": j
                    });
                    var k = e.height(),
                        l = e.width(),
                        m = function() {
                            var c, e = -1 * k,
                                g = 0,
                                h = f - k,
                                i = f,
                                j = d.parallaxMargin(a, b, e),
                                l = d.parallaxMargin(a, b, g),
                                m = d.parallaxMargin(a, b, h),
                                n = d.parallaxMargin(a, b, i),
                                o = function(a, b) {
                                    return b + (a > 0 ? 0 : a)
                                },
                                p = function(a, b) {
                                    var c = a + k;
                                    return -b - (f > c ? 0 : c - f)
                                },
                                q = 0;
                            return c = o(e, j), c > q && (q = c), c = o(g, l), c > q && (q = c), c = o(h, m), c > q && (q = c), c = o(i, n), c > q && (q = c), c = p(e, j), c > q && (q = c), c = p(g, l), c > q && (q = c), c = p(h, m), c > q && (q = c), c = p(i, n), c > q && (q = c), k + 2 * q
                        }();
                    e.children("img.bg").each(function() {
                        c($(this), m, l, k)
                    }), e.data("position", e.offset().top)
                }), $("section").each(function() {
                    var a = $(this);
                    a.data("position", a.offset().top)
                }), $("body").children("img.bg").each(function() {
                    c($(this), f, g, f)
                })
            }, this.changeSection = function(a, b) {
                var c = $(b),
                    d = c.data("border-colors");
                d ? (k.removeClass(e.colorClasses), k.addClass(d)) : o.hasClass("state2") && n ? (k.removeClass(e.colorClasses), k.addClass(n)) : m && (k.removeClass(e.colorClasses), k.addClass(m))
            }
        }
    }, {
        "../animation/slide-show.js": 4,
        "./app-share.js": 5,
        "./themes.js": 8
    }],
    7: [function(a, b) {
        b.exports = function(b, c) {
            "use strict";
            var d = $(".view"),
                e = a("./app-share.js"),
                f = $("html").hasClass("poor-browser");
            this.scroll = function() {
                f || d.each(function(a) {
                    var d = $(this),
                        f = b.calcPosition(d);
                    if (f.visible) {
                        var g = f.top - b.windowTopPos;
                        d.children(".bg:not(.static)").each(function() {
                            var b = $(this).data();
                            b.parallaxY = e.parallaxMargin(c, a, g)
                        })
                    }
                })
            }
        }
    }, {
        "./app-share.js": 5
    }],
    8: [function(a, b) {
        b.exports = new function() {
            var a = this;
            this.options = {
                angie: {
                    style: "theme-angie",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                },
                lynda: {
                    style: "theme-lynda",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                },
                alice: {
                    style: "theme-alice",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                },
                lucy: {
                    style: "theme-lucy",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                },
                mary: {
                    style: "theme-alice",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                },
                suzi: {
                    style: "theme-suzi",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                },
                viki: {
                    style: "theme-viki",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                },
                luiza: {
                    style: "theme-luiza",
                    bgSync: ["**/*.txt", "**/*"],
                    videoSync: []
                }
            }, this.names = {}, this.colors = 8, this.colorClasses = function() {
                for (var b = "", c = 0; c < a.colors; c++) {
                    var d = 0 === c ? "" : " ";
                    b += d + "colors-" + String.fromCharCode(65 + c).toLowerCase()
                }
                return b
            }()
        }
    }, {}],
    9: [function(a, b) {
        b.exports = function(b) {
            "use strict";

            function c() {
                p.css({
                    height: C.height() - parseInt(o.css("top").replace("px", "")) - 30 + "px"
                })
            }

            function d() {
                "custom" !== t.val() && ($('<option value="custom">Custom</option>').appendTo(t), t.val("custom"), $.cookie.json = !1, $.cookie("themeSelect", "custom", {
                    path: B
                }), $.cookie.json = !0)
            }

            function e() {
                for (var a = 0; z > a; a++) f(String.fromCharCode(65 + a).toLowerCase());
                i('<span><span class="primary-color"></span></span>', ".primary-color", "color", "input.primary-bg", "primary-bg", m), i('<span><span class="out-primary"></span></span>', ".out-primary", "opacity", "input.primary-out", "primary-out", g, h), i('<span><span class="success-color"></span></span>', ".success-color", "color", "input.success-bg", "success-bg", m), i('<span><span class="out-success"></span></span>', ".out-success", "opacity", "input.success-out", "success-out", g, h), i('<span><span class="info-color"></span></span>', ".info-color", "color", "input.info-bg", "info-bg", m), i('<span><span class="out-info"></span></span>', ".out-info", "opacity", "input.info-out", "info-out", g, h), i('<span><span class="warning-color"></span></span>', ".warning-color", "color", "input.warning-bg", "warning-bg", m), i('<span><span class="out-warning"></span></span>', ".out-warning", "opacity", "input.warning-out", "warning-out", g, h), i('<span><span class="danger-color"></span></span>', ".danger-color", "color", "input.danger-bg", "danger-bg", m), i('<span><span class="out-danger"></span></span>', ".out-danger", "opacity", "input.danger-out", "danger-out", g, h)
            }

            function f(a) {
                i('<span class="colors-' + a + '"><span class="bg-color"></span></span>', ".bg-color", "color", "input." + a + "-bg", a + "-bg", m), i('<span class="colors-' + a + '"><span class="text"></span></span>', ".text", "color", "input." + a + "-text", a + "-text", m), i('<span class="colors-' + a + '"><span class="highlight"></span></span>', ".highlight", "color", "input." + a + "-highlight", a + "-highlight", m), i('<span class="colors-' + a + '"><span class="link"></span></span>', ".link", "color", "input." + a + "-link", a + "-link", m), i('<span class="colors-' + a + '"><span class="heading"></span></span>', ".heading", "color", "input." + a + "-heading", a + "-heading", m), i('<span class="colors-' + a + '"><span class="out"></span></span>', ".out", "opacity", "input." + a + "-out", a + "-out", g, h)
            }

            function g(a) {
                return Math.round(100 * (1 - a))
            }

            function h(a) {
                return Math.round(a)
            }

            function i(a, b, c, e, f, g) {
                var h = $('<span class="getter"></span>').appendTo("body");
                $(a).appendTo(h);
                var i = h.find(b).css(c);
                h.remove(), i && g && (i = g(i)), A.lessVars[f] = i;
                var j = p.find(e);
                if (j.val(i), "color" === c) j.minicolors({
                    control: $(this).attr("data-control") || "hue",
                    defaultValue: $(this).attr("data-defaultValue") || "",
                    inline: "true" === $(this).attr("data-inline"),
                    letterCase: $(this).attr("data-letterCase") || "lowercase",
                    opacity: !1,
                    position: $(this).attr("data-position") || "top left",
                    change: function(a) {
                        d(), A.lessVars[f] = a, k()
                    },
                    show: function() {
                        var a = j.parent(),
                            b = a.children(".minicolors-panel"),
                            c = b.outerHeight(!0),
                            d = b.outerWidth(!0),
                            e = $(window),
                            f = e.width(),
                            g = e.height(),
                            h = b.offset(),
                            i = h.left - $(document).scrollLeft(),
                            k = h.top - $(document).scrollTop();
                        i + d > f && (i = f - d - 5), k + c > g && (k = g - c - 2), 0 > k && (k = 2), b.css({
                            position: "fixed",
                            left: i + "px",
                            top: k + "px"
                        })
                    },
                    hide: function() {
                        j.parent().children(".minicolors-panel").css({
                            position: "",
                            left: "",
                            top: ""
                        })
                    },
                    theme: "bootstrap"
                });
                else {
                    var l;
                    j.change(function() {
                        var a = $(this),
                            b = a.val();
                        l && clearTimeout(l), d(), A.lessVars[f] = b, k()
                    })
                }
            }

            function j() {
                if (!A.isShowPanel) return void o.hide();
                if (Object.keys(v.names).length > 0)
                    for (var a in v.names) $('<option value="' + a + '">' + v.names[a] + "</option>").appendTo(t);
                else t.remove(), $('<a class="button" href="#">Reset</a>').appendTo(p.find(".themes")).click(function(a) {
                    a.preventDefault(), $.cookie.json = !1, $.cookie("themeSelect", "", {
                        path: B
                    }), $.cookie.json = !0, A.hide(), x.gate(function() {
                        location.reload()
                    })
                });
                $.cookie.json = !1;
                var b = $.cookie("themeSelect");
                if ($.cookie.json = !0, "custom" === b) d();
                else if (b) t.val(b);
                else {
                    var c = $("#factory-theme");
                    if (c.length > 0 && "hidden" === c.css("visibility")) {
                        var e = v.options[c.html()].style;
                        t.val(e), $.cookie.json = !1, $.cookie("themeSelect", e, {
                            path: B
                        }), $.cookie.json = !0
                    }
                }
                t.change(function() {
                    $(".options .themes select option[value=custom]").remove();
                    var a = $(this).val();
                    $.cookie.json = !1, $.cookie("themeSelect", a, {
                        path: B
                    }), $.cookie.json = !0, A.hide(), x.gate(function() {
                        location.reload()
                    })
                }), o.css({
                    left: -1 * r + "px"
                }), q.click(function(a) {
                    a.preventDefault(), o.hasClass("on") ? A.hide() : A.show()
                }), p.find(".save-custom-css").click(function(a) {
                    a.preventDefault();
                    var b = s.find(".content");
                    if ($.cookie("saveAsLess")) {
                        var c = '@import "theme.less";\r\n\r\n';
                        for (var d in A.lessVars) c = c + "@" + d + ": " + A.lessVars[d] + ";\r\n", b.text(c)
                    } else n || k(), b.text(n.replace(/(\r\n|\r|\n)/g, "\r\n"));
                    new TWEEN.Tween({
                        autoAlpha: 0,
                        x: -450
                    }).to({
                        autoAlpha: 1,
                        x: 0
                    }, 400).onUpdate(function() {
                        s.css({
                            opacity: this.autoAlpha,
                            visibility: this.autoAlpha > 0 ? "visible" : "hidden"
                        }), s.css(Modernizr.csstransforms3d && y.force3D ? {
                            transform: "translate3d(" + this.x + "px, 0px, 0px)"
                        } : {
                            transform: "translate(" + this.x + "px, 0px)"
                        })
                    }).easing(TWEEN.Easing.Quadratic.Out).start()
                }), s.find(".close-panel").click(function(a) {
                    a.preventDefault(), new TWEEN.Tween({
                        autoAlpha: 1,
                        x: 0
                    }).to({
                        autoAlpha: 0,
                        x: -450
                    }, 400).onUpdate(function() {
                        s.css({
                            opacity: this.autoAlpha,
                            visibility: this.autoAlpha > 0 ? "visible" : "hidden"
                        }), s.css(Modernizr.csstransforms3d && y.force3D ? {
                            transform: "translate3d(" + this.x + "px, 0px, 0px)"
                        } : {
                            transform: "translate(" + this.x + "px, 0px)"
                        })
                    }).easing(TWEEN.Easing.Linear.None).start()
                }), w.selectTextarea(s.find("textarea"));
                var f = u.css("background-image");
                if (!f || "none" == f) {
                    var g = $("img.bg");
                    g.length > 0 && u.css({
                        "background-image": "url('" + g.get(0).src + "')",
                        "background-position": "center center",
                        "background-size": "cover"
                    })
                }
            }

            function k(a) {
                var b = atob(customLess);
                $.cookie("lessVars", A.lessVars, {
                    path: B
                }), l(b, function(b) {
                    if (!a) {
                        var c = "edit-mode-styles";
                        n = b;
                        var d = $("#" + c);
                        d.length < 1 ? ($('<style type="text/css" id="' + c + '">\n' + b + "</style>").appendTo("head"), $("#custom-css").remove()) : d[0].innerHTML ? d[0].innerHTML = n : d[0].styleSheet.cssText = n
                    }
                })
            }

            function l(a, b) {
                less.render(a, {
                    currentDirectory: "styles/themes/",
                    filename: "styles/themes/theme-default.less",
                    entryPath: "styles/themes/",
                    rootpath: "styles/themes/styles/themes/",
                    rootFilename: "styles/themes/theme-default.less",
                    relativeUrls: !1,
                    useFileCache: A.lessVars || less.globalVars,
                    compress: !1,
                    modifyVars: A.lessVars,
                    globalVars: less.globalVars
                }, function(a, c) {
                    b(c.css)
                })
            }

            function m(a) {
                function b(a) {
                    if (isNaN(a)) return "00";
                    var b = parseInt(a).toString(16);
                    return 1 == b.length ? "0" + b : b
                }
                if (-1 === a.indexOf("rgb")) return a;
                var c = a.match(/[^0-9]*([0-9]*)[^0-9]*([0-9]*)[^0-9]*([0-9]*)[^0-9]*/i);
                return "#" + b(c[1]) + b(c[2]) + b(c[3])
            }
            var n, o, p, q, r, s, t, u, v = a("../app/themes.js"),
                w = a("../tools/tools.js"),
                x = a("../widgets/loading.js"),
                y = a("../app/app-share.js"),
                z = v.colors,
                A = this,
                B = "",
                C = $(window),
                D = !1;
            this.lessVars = {}, this.isShowPanel = function() {
                var a = w.getUrlParameter("customize");
                return void 0 === a ? a = $.cookie("customize") : $.cookie("customize", "yes", {
                    path: B
                }), a && $("#top-nav").length > 0 ? !0 : !1
            }(), this.show = function() {
                setTimeout(function() {
                    if (!D) {
                        D = !0, k(!0), e();
                        var a = p.find(".options-gate");
                        a.css({
                            opacity: 0
                        }), setTimeout(function() {
                            a.css({
                                visibility: "hidden"
                            })
                        }, 1e3)
                    }
                }, 550), o.css({
                    left: "0px"
                }), o.addClass("on")
            }, this.hide = function() {
                o.css({
                    left: -1 * r + "px"
                }), o.removeClass("on")
            }, A.isShowPanel ? $('<div id="customize-panel"></div>').appendTo("body").load("customize/customize.html #customize-panel>*", function(a, d) {
                "success" !== d && "notmodified" !== d ? ($("#customize-panel").remove(), b.afterConfigure()) : $.getScript("customize/custom-less.js", function(a, d) {
                    if ("success" !== d && "notmodified" !== d) $("#customize-panel").remove(), b.afterConfigure();
                    else {
                        o = $("#customize-panel"), p = o.find(".options"), q = o.find(".toggle-button"), r = p.width(), s = o.find(".custom-css"), t = p.find(".themes select"), u = p.find(".colors"), $.cookie.json = !0, j(), w.getUrlParameter("save-as-less") && $.cookie("saveAsLess", "yes", {
                            path: B
                        }), $.cookie.json = !1;
                        var f = $.cookie("themeSelect");
                        $.cookie.json = !0, "custom" === f && (D = !0, A.lessVars = $.cookie("lessVars"), k(), e(), p.find(".options-gate").css({
                            visibility: "hidden"
                        })), C.resize(c), c(), b.afterConfigure()
                    }
                })
            }) : b.afterConfigure()
        }
    }, {
        "../app/app-share.js": 5,
        "../app/themes.js": 8,
        "../tools/tools.js": 11,
        "../widgets/loading.js": 18
    }],
    10: [function(require, module, exports) {
        $(function() {
            !new function() {
                "use strict";

                function onBodyHeightResize() {
                    buildSizes(), scrolling.scroll(tools.windowYOffset()), calcNavigationLinkTriggers()
                }

                function widgets($context) {
                    if (new ShowList($context, me), new Sliders($context), isMobile || $context.find(".hover-dir").each(function() {
                            $(this).hoverdir({
                                speed: 300
                            })
                        }), $context.find("a").click(function(a) {
                            var b = $(this);
                            b.data("toggle") || navigate(this.href, this.hash, a, b)
                        }), fluid.setup($context), new Map($context), new Counter($context, me), new ChangeColors($context), new Skillbar($context, me), $context.find("input,select,textarea").not("[type=submit]").jqBootstrapValidation(), new AjaxForm($context), new CssAnimation($context, me), $(".widget-tabs a").click(function(a) {
                            a.preventDefault(), $(this).tab("show")
                        }), $(".widget-tooltip").tooltip(), $(".widget-popover").popover(), $context.find("video").each(function() {
                            void 0 !== $(this).attr("muted") && (this.muted = !0)
                        }), $context.find(".open-overlay-window").each(function() {
                            var a = $(this),
                                b = $(a.data("overlay-window")),
                                c = new OverlayWindow(b);
                            a.click(function(a) {
                                a.preventDefault(), c.show()
                            })
                        }), isPoorBrowser) $context.find(".tlt-loop").remove();
                    else {
                        var $tlt = $context.find(".textillate");
                        $tlt.textillate(eval("(" + $tlt.data("textillate-options") + ")"))
                    }
                }

                function unwidgets(a) {
                    new Sliders(a, !0), a.find(".player").each(function() {
                        var a = $(this).data("player-ind");
                        me.players[a].pause(), me.players.splice(a, 1)
                    })
                }

                function navigate(a, b, c, d) {
                    var e = b ? a.replace(new RegExp(b + "$"), "") : a;
                    if (location === e && b && -1 === b.indexOf("!")) {
                        var f = $(b);
                        if (c && c.preventDefault(), f.length > 0) {
                            var g = f.offset().top - me.topNav.state2H,
                                h = f.get(0).tagName.toLowerCase();
                            ("h1" === h || "h2" === h || "h3" === h || "h4" === h || "h5" === h || "h6" === h) && (g -= 20), 0 > g && (g = 0), tools.scrollTo(g)
                        } else tools.scrollTo(0)
                    } else if (c && a !== location + "#" && !d.attr("target")) {
                        var i = function() {
                            c.preventDefault(), me.topNav.state1(), loading.gate(function() {
                                window.location = a
                            })
                        };
                        d.hasClass("page-transition") ? i() : $pageTransition.each(function() {
                            var a = $(this).get(0);
                            $.contains(a, d[0]) && i()
                        })
                    }
                }

                function calcNavigationLinkTriggers() {
                    var a = $window.height(),
                        b = a / 3;
                    sectionTriggers = [], $sections.each(function() {
                        var a = $(this),
                            c = a.attr("id");
                        c && sectionTriggers.push({
                            hash: "#" + c,
                            triggerOffset: a.data("position") - b
                        })
                    }), trigNavigationLinks(tools.windowYOffset())
                }

                function trigNavigationLinks(a) {
                    for (var b, c = 0; c < sectionTriggers.length; c++) sectionTriggers[c].triggerOffset < a && (b = sectionTriggers[c].hash);
                    if (b != lastActiveSectionHash) {
                        var d = location + b;
                        lastActiveSectionHash = b, $navLinks.each(function() {
                            var a = $(this);
                            this.href === d ? (a.addClass("active"), a.removeClass("target")) : a.removeClass("active")
                        }), app.changeSection(me, b)
                    }
                }

                function buildSizes() {
                    app.buildSizes(me), maxScrollPosition = $("body").height() - $window.height();
                    for (var a = 0; a < me.players.length; a++) {
                        var b = me.players[a].$view;
                        b.data("position", b.offset().top)
                    }
                }
                var Customize = require("./customize/customize.js"),
                    TopNav = require("./widgets/top-nav.js"),
                    MenuToggle = require("./widgets/menu-toggle.js"),
                    Players = require("./animation/players.js"),
                    Scrolling = require("./animation/scrolling.js"),
                    tools = require("./tools/tools.js"),
                    ShowList = require("./widgets/show-list.js"),
                    Gallery = require("./widgets/gallery.js"),
                    fluid = require("./widgets/fluid.js"),
                    Counter = require("./widgets/counter.js"),
                    ChangeColors = require("./widgets/change-colors.js"),
                    Sliders = require("./widgets/sliders.js"),
                    loading = require("./widgets/loading.js"),
                    CssAnimation = require("./animation/css-animation.js"),
                    dotScroll = require("./widgets/dot-scroll.js"),
                    Map = require("./widgets/map.js"),
                    Skillbar = require("./widgets/skillbar.js"),
                    AjaxForm = require("./widgets/ajax-form.js"),
                    YoutubeBG = require("./widgets/youtube-bg.js"),
                    VimeoBG = require("./widgets/vimeo-bg.js"),
                    VideoBG = require("./widgets/video-bg.js"),
                    app = require("./app/app.js"),
                    OverlayWindow = require("./widgets/overlay-window.js"),
                    isPoorBrowser = $("html").hasClass("poor-browser"),
                    isAndroid43minus = $("html").hasClass("android-browser-4_3minus"),
                    $pageTransition = $(".page-transition"),
                    me = this,
                    $window = $(window),
                    $sections = $("section"),
                    sectionTriggers = [],
                    lastActiveSectionHash, location = document.location.hash ? document.location.href.replace(new RegExp(document.location.hash + "$"), "") : document.location.href.replace("#", ""),
                    $navLinks = function() {
                        var a = jQuery();
                        return $("#top-nav .navbar-nav a").each(function() {
                            var b = $(this);
                            (!this.hash || this.href === location + this.hash && $("section" + this.hash).length > 0) && (a = a.add(b))
                        }), a
                    }(),
                    isMobile = $("html").hasClass("mobile"),
                    scrolling, maxScrollPosition, ticker = new function() {
                        var a = this;
                        window.requestAnimFrame = function() {
                            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                                window.setTimeout(a, 1e3 / 60)
                            }
                        }();
                        var b = -1;
                        this.pageIsReady = !1,
                            function c() {
                                if (a.pageIsReady) {
                                    var d = tools.windowYOffset();
                                    b !== d && (scrolling.scroll(d), trigNavigationLinks(d)), b = d, TWEEN.update(), app.tick()
                                }
                                loading.queue.length > 0 && loading.queue.pop()(), requestAnimFrame(c)
                            }()
                    };
                this.topNav = void 0, this.players = Players, this.afterConfigure = function() {
                    var a = window.location.hash;
                    history && history.replaceState && history.replaceState("", document.title, window.location.pathname + window.location.search), new YoutubeBG, new VimeoBG, new VideoBG, app.prepare(function() {
                        loading.load(function() {
                            $navLinks = $navLinks.add(dotScroll.links()).click(function() {
                                $navLinks.removeClass("target"), $(this).addClass("target")
                            }), me.topNav = new TopNav, new MenuToggle, scrolling = new Scrolling(me), widgets($("body")), new Gallery(onBodyHeightResize, widgets, unwidgets);
                            var b = $window.width(),
                                c = $window.height();
                            $window.resize(function() {
                                var a = $window.width(),
                                    d = $window.height();
                                (a !== b || d !== c) && (b = a, c = d, fluid.setup($("body")), onBodyHeightResize())
                            }), app.setup(function() {
                                var b = function() {
                                        buildSizes(), calcNavigationLinkTriggers(), ticker.pageIsReady = !0, $navLinks.each(function() {
                                            this.href == location && $(this).addClass("active")
                                        }), $(".bigtext").each(function() {
                                            $(this).bigtext()
                                        }), app.ungated(), setTimeout(function() {
                                            loading.ungate(), navigate(window.location.href, a)
                                        })
                                    },
                                    c = function() {
                                        for (var a = $("img"), d = 0; d < a.length; d++)
                                            if (!a[d].width || !a[d].height) return void setTimeout(c, 100);
                                        b()
                                    };
                                c()
                            })
                        })
                    })
                };
                var animEnd = function(a, b, c, d, e) {
                    var f = 100,
                        g = 1e3;
                    return a.each(function() {
                        var a = this;
                        if (c && !isAndroid43minus) {
                            var h = !1;
                            if ($(a).bind(b, function() {
                                    return h = !0, $(a).unbind(b), d.call(a)
                                }), e >= 0 || void 0 === e) {
                                var i = void 0 === e ? 1e3 : g + f;
                                setTimeout(function() {
                                    h || ($(a).unbind(b), d.call(a))
                                }, i)
                            }
                        } else d.call(a)
                    })
                };
                $.fn.animationEnd = function(a, b) {
                    return animEnd(this, tools.animationEnd, Modernizr.cssanimations, a, b)
                }, $.fn.transitionEnd = function(a, b) {
                    return animEnd(this, tools.transitionEnd, Modernizr.csstransitions, a, b)
                }, $.fn.stopTransition = function() {
                    return this.css({
                        "-webkit-transition": "none",
                        "-moz-transition": "none",
                        "-ms-transition": "none",
                        "-o-transition": "none",
                        transition: "none"
                    })
                }, $.fn.cleanTransition = function() {
                    return this.css({
                        "-webkit-transition": "",
                        "-moz-transition": "",
                        "-ms-transition": "",
                        "-o-transition": "",
                        transition: ""
                    })
                }, $.fn.nonTransition = function(a) {
                    return this.stopTransition().css(a).cleanTransition()
                }, $.fn.transform = function(a, b) {
                    return this.css(tools.transformCss(a, b))
                }, $("video").each(function() {
                    void 0 !== $(this).attr("muted") && (this.muted = !0)
                }), new Customize(me)
            }
        })
    }, {
        "./animation/css-animation.js": 1,
        "./animation/players.js": 2,
        "./animation/scrolling.js": 3,
        "./app/app.js": 6,
        "./customize/customize.js": 9,
        "./tools/tools.js": 11,
        "./widgets/ajax-form.js": 12,
        "./widgets/change-colors.js": 13,
        "./widgets/counter.js": 14,
        "./widgets/dot-scroll.js": 15,
        "./widgets/fluid.js": 16,
        "./widgets/gallery.js": 17,
        "./widgets/loading.js": 18,
        "./widgets/map.js": 19,
        "./widgets/menu-toggle.js": 20,
        "./widgets/overlay-window.js": 21,
        "./widgets/show-list.js": 22,
        "./widgets/skillbar.js": 23,
        "./widgets/sliders.js": 24,
        "./widgets/top-nav.js": 25,
        "./widgets/video-bg.js": 26,
        "./widgets/vimeo-bg.js": 27,
        "./widgets/youtube-bg.js": 28
    }],
    11: [function(a, b) {
        b.exports = new function() {
            "use strict";
            var b = this,
                c = (a("../script.js"), $("html").hasClass("android-browser-4_3minus"));
            this.animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", this.transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend", this.transition = ["-webkit-transition", "-moz-transition", "-ms-transition", "-o-transition", "transition"], this.transform = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"], this.property = function(a, b, c) {
                for (var d = c ? c : {}, e = 0; e < a.length; e++) d[a[e]] = b;
                return d
            }, this.windowYOffset = function() {
                return null != window.pageYOffset ? window.pageYOffset : "CSS1Compat" === document.compatMode ? document.documentElement.scrollTop : document.body.scrollTop
            }, this.getUrlParameter = function(a) {
                for (var b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
                    var e = c[d].split("=");
                    if (e[0] == a) return decodeURI(e[1])
                }
            }, this.selectTextarea = function(a) {
                a.focus(function() {
                    var a = $(this);
                    a.select(), a.mouseup(function() {
                        return a.unbind("mouseup"), !1
                    })
                })
            };
            var d;
            this.time = function(a) {
                if (d) {
                    var b = Date.now();
                    console.log("==== " + (b - d) + " ms" + (a ? " | " + a : "")), d = b
                } else d = Date.now(), console.log("==== Timer started" + (a ? " | " + a : ""))
            }, this.scrollTo = function(a, c, d) {
                void 0 === d && (d = 1200), new TWEEN.Tween({
                    y: b.windowYOffset()
                }).to({
                    y: Math.round(a)
                }, d).onUpdate(function() {
                    window.scrollTo(0, this.y)
                }).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function() {
                    c && c()
                }).start()
            }, this.androidStylesFix = function(a) {
                c && (a.hide(), a.get(0).offsetHeight, a.show())
            }, this.transformCss = function(a, b) {
                var c = {
                    "-webkit-transform": a,
                    "-moz-transform": a,
                    "-ms-transform": a,
                    "-o-transform": a,
                    transform: a
                };
                return b && (c["-webkit-transform-origin"] = b, c["-moz-transform-origin"] = b, c["-ms-transform-origin"] = b, c["-o-transform-origin"] = b, c["transform-origin"] = b), c
            }
        }
    }, {
        "../script.js": 10
    }],
    12: [function(a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function(b) {
            var d = a("./loading.js"),
                e = c(".gate .loader");
            b.find(".ajax-form").each(function() {
                var a = c(this);
                a.submit(function(b) {
                    a.find(".help-block ul").length < 1 && (e.addClass("show"), d.gate(function() {
                        var b = function(b) {
                            c('<div class="ajax-form-alert alert heading fade in text-center">	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> ' + b + "</div>").addClass(a.data("message-class")).appendTo("body"), d.ungate(), e.removeClass("show")
                        };
                        c.ajax({
                            type: a.attr("method"),
                            url: a.attr("action"),
                            data: a.serialize(),
                            success: function(c) {
                                a[0].reset(), b(c)
                            },
                            error: function(a) {

                                b("Error: " + a.responseCode)
                            }
                        })
                    }), b.preventDefault())
                })
            })
        }
    }, {
        "./loading.js": 18
    }],
    13: [function(a, b) {
        b.exports = function(b) {
            "use strict";
            var c = a("../app/themes.js");
            b.find(".change-colors").each(function() {
                for (var a, b = $(this), d = $(b.data("target")), e = b.find("a"), f = 0; f < c.colors; f++) {
                    var g = "colors-" + String.fromCharCode(65 + f).toLowerCase();
                    d.hasClass(g) && (a = g, e.each(function() {
                        var b = $(this);
                        b.data("colors") === a && b.addClass("active")
                    }))
                }
                e.click(function(b) {
                    b.preventDefault();
                    var c = $(this);
                    d.removeClass(a), a = c.data("colors"), d.addClass(a), e.removeClass("active"), c.addClass("active")
                })
            })
        }
    }, {
        "../app/themes.js": 8
    }],
    14: [function(a, b) {
        b.exports = function(a, b) {
            "use strict";
            var c = $("html").hasClass("poor-browser");
            c || a.find(".counter .count").each(function() {
                var a = $(this),
                    c = parseInt(a.text()),
                    d = {
                        n: 0
                    },
                    e = new TWEEN.Tween(d).to({
                        n: c
                    }, 1e3).onUpdate(function() {
                        a.text(Math.round(this.n))
                    }).easing(TWEEN.Easing.Quartic.InOut),
                    f = function() {
                        e.stop()
                    },
                    g = function() {
                        d.n = 0, e.start()
                    },
                    h = g;
                b.players.addPlayer(a, h, f, g)
            })
        }
    }, {}],
    15: [function(a, b) {
        b.exports = new function() {
            "use strict";
            var a, b = $("html").hasClass("mobile"),
                c = $("body>section[id]");
            if (!b && c.length > 1) {
                var d = $("#dot-scroll");
                c.each(function() {
                    d.append('<li><a href="#' + $(this).attr("id") + '"><span></span></a></li>')
                }), a = d.find("a")
            } else a = jQuery();
            this.links = function() {
                return a
            }
        }
    }, {}],
    16: [function(a, b) {
        b.exports = new function() {
            "use strict";
            this.setup = function(a) {
                a.find(".fluid *").each(function() {
                    var a = $(this),
                        b = a.parent(".fluid"),
                        c = b.width(),
                        d = a.attr("data-aspect-ratio");
                    d || (d = this.height / this.width, a.attr("data-aspect-ratio", d).removeAttr("height").removeAttr("width"));
                    var e = Math.round(c * d);
                    a.width(Math.round(c)).height(e), b.height(e)
                })
            }
        }
    }, {}],
    17: [function(require, module, exports) {
        module.exports = function(onBodyHeightResize, widgets, unwidgets) {
            "use strict";
            var tools = require("../tools/tools.js"),
                OverlayWindow = require("./overlay-window.js"),
                $topNav = $("#top-nav");
            $(".gallery").each(function(i) {
                function openItem(a) {
                    $currentItem = a;
                    var b = a.children("a")[0].hash.replace("#!", "");
                    overlayWindow.show(b + " .item-content")
                }
                var $gallery = $(this),
                    $overlay = $($gallery.data("overlay")),
                    overlayWindow = new OverlayWindow($overlay, widgets, unwidgets),
                    $overlayNext = $overlay.find(".next"),
                    $overlayPrevios = $overlay.find(".previos"),
                    isFilter = !1,
                    defaultGroup = $gallery.data("default-group") ? $gallery.data("default-group") : "all",
                    isNonFirstLayout = !1;
                defaultGroup || (defaultGroup = "all");
                var $grid = $gallery.find(".grid").shuffle({
                        group: defaultGroup,
                        speed: 500
                    }).on("filter.shuffle", function() {
                        isFilter = !0
                    }).on("layout.shuffle", function() {
                        isNonFirstLayout ? onBodyHeightResize(!0) : (onBodyHeightResize(), isNonFirstLayout = !0)
                    }).on("filtered.shuffle", function() {
                        isFilter && (isFilter = !1)
                    }),
                    $btns = $gallery.find(".filter a"),
                    $itemView = $gallery.find(".item-view"),
                    $itemShow = $itemView.find(".item-show"),
                    $itemNext = $itemView.find(".next-item"),
                    $itemPrev = $itemView.find(".prev-item"),
                    $itemClose = $itemView.find(".close-item"),
                    $all = $gallery.find(".filter a[data-group=all]"),
                    $items = $grid.find(".item"),
                    currentGroup = defaultGroup,
                    $currentItem;
                $gallery.find(".filter a[data-group=" + defaultGroup + "]").addClass("active"), $items.addClass("on"), $btns.click(function(e) {
                    if (e.preventDefault(), !isFilter) {
                        var $this = $(this),
                            isActive = $this.hasClass("active"),
                            group = isActive ? "all" : $this.data("group");
                        currentGroup !== group && (currentGroup = group, $btns.removeClass("active"), isActive ? $all.addClass("active") : $this.addClass("active"), $grid.shuffle("shuffle", group), $items.each(function() {
                            var $i = $(this),
                                filter = eval($i.data("groups"));
                            "all" == group || -1 != $.inArray(group, filter) ? $i.addClass("on") : $i.removeClass("on")
                        }))
                    }
                }), $items.click(function(a) {
                    a.preventDefault(), openItem($(this))
                }), $overlayNext.click(function(a) {
                    a.preventDefault();
                    var b = $currentItem.nextAll(".on").first();
                    b.length < 1 && (b = $items.filter(".on").first()), openItem(b)
                }), $overlayPrevios.click(function(a) {
                    a.preventDefault();
                    var b = $currentItem.prevAll(".on").first();
                    b.length < 1 && (b = $items.filter(".on").last()), openItem(b)
                })
            })
        }
    }, {
        "../tools/tools.js": 11,
        "./overlay-window.js": 21
    }],
    18: [function(a, b) {
        b.exports = new function() {
            "use strict";
            var b = a("../tools/tools.js"),
                c = $(".gate"),
                d = c.find(".gate-bar"),
                e = c.find(".loader"),
                f = $("html").hasClass("android-browser-4_3minus"),
                g = this;
            this.queue = [], this.load = function(a) {
                var b = [];
                $("*:visible:not(script)").each(function() {
                    var a = $(this),
                        c = a[0].nodeName.toLowerCase(),
                        d = a.css("background-image"),
                        e = a.attr("src"),
                        f = a.data("loading");
                    if (f) b.push(f);
                    else if ("img" === c && e && -1 === $.inArray(e, b)) b.push(e);
                    else if ("none" != d) {
                        var g = d.match(/url\(['"]?([^'")]*)/i);
                        g && g.length > 1 && -1 === $.inArray(g[1], b) && b.push(g[1])
                    }
                });
                var f = 0;
                if (0 === b.length) a();
                else {
                    e.addClass("show");
                    for (var h = 0, i = function() {
                            f++, h = f / b.length * 100, d.css({
                                width: h + "%"
                            }), f === b.length && (c.length < 1 ? a() : e.transitionEnd(function() {
                                e.removeClass("hided"), a()
                            }, 200).addClass("hided").removeClass("show"))
                        }, j = 0; j < b.length; j++)
                        if ("function" == typeof b[j]) b[j](i);
                        else {
                            var k = new Image;
                            $(k).one("load", function() {
                                g.queue.push(i)
                            }), k.src = b[j]
                        }
                }
            }, this.gate = function(a) {
                d.css({
                    width: "0%"
                }), c.transitionEnd(function() {
                    a && a()
                }).css({
                    opacity: 1,
                    visibility: "visible"
                })
            }, this.ungate = function(a) {
                c.transitionEnd(function() {
                    f && b.androidStylesFix($("body")), a && a()
                }).css({
                    opacity: 0,
                    visibility: "hidden"
                })
            }
        }
    }, {
        "../tools/tools.js": 11
    }],
    19: [function(a, b) {
        b.exports = function(b) {
            "use strict";
            var c = (a("../tools/tools.js"), a("./overlay-window.js"));
            "undefined" != typeof google && b.find(".map-open").each(function() {
                var a = $(this),
                    b = $(a.data("map-overlay")),
                    d = b.find(".map-canvas"),
                    e = {
                        center: new google.maps.LatLng(d.data("latitude"), d.data("longitude")),
                        zoom: d.data("zoom"),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    f = [];
                d.find(".map-marker").each(function() {
                    var a = $(this);
                    f.push({
                        latitude: a.data("latitude"),
                        longitude: a.data("longitude"),
                        text: a.data("text")
                    })
                }), d.addClass("close-map").wrap('<div class="map-view"></div>');
                var g = d.parent(),
                    h = new c(b, !1, !1, function() {
                        new TWEEN.Tween({
                            autoAlpha: 1
                        }).to({
                            autoAlpha: 0
                        }, 500).onUpdate(function() {
                            g.css({
                                opacity: this.autoAlpha,
                                visibility: this.autoAlpha > 0 ? "visible" : "hidden"
                            })
                        }).easing(TWEEN.Easing.Linear.None).start()
                    }),
                    i = !1;
                a.click(function(a) {
                    a.preventDefault(), h.show(!1, function() {
                        if (!i) {
                            i = !0;
                            for (var a = new google.maps.Map(d[0], e), c = function(b, c) {
                                    var d = new google.maps.InfoWindow({
                                        content: c
                                    });
                                    google.maps.event.addListener(b, "click", function() {
                                        d.open(a, b)
                                    })
                                }, h = 0; h < f.length; h++) {
                                var j = new google.maps.Marker({
                                        map: a,
                                        position: new google.maps.LatLng(f[h].latitude, f[h].longitude)
                                    }),
                                    k = f[h].text;
                                k && c(j, k)
                            }
                        }
                        var l = b.find(".overlay-control");
                        g.css({
                            height: $(window).height() - l.height() + "px"
                        }), new TWEEN.Tween({
                            autoAlpha: 0
                        }).to({
                            autoAlpha: 1
                        }, 500).onUpdate(function() {
                            g.css({
                                opacity: this.autoAlpha,
                                visibility: this.autoAlpha > 0 ? "visible" : "hidden"
                            })
                        }).easing(TWEEN.Easing.Linear.None).start()
                    })
                })
            })
        }
    }, {
        "../tools/tools.js": 11,
        "./overlay-window.js": 21
    }],
    20: [function(a, b) {
        b.exports = function() {
            "use strict";
            var a = $(".menu-toggle");
            a.click(function(a) {
                a.preventDefault();
                var b = $(this);
                if (b.hasClass("ext-nav-toggle")) {
                    var c = b.data("target"),
                        d = $(c),
                        e = $(c + ",#top-nav a:not(.menu-toggle),.page-border a"),
                        f = function() {
                            d.removeClass("show"), b.removeClass("show"), $("body").removeClass("ext-nav-show"), $("html, body").css({
                                overflow: "",
                                position: ""
                            }), e.unbind("click", f)
                        };
                    b.hasClass("show") ? (d.removeClass("show"), b.removeClass("show"), $("body").removeClass("ext-nav-show"), e.unbind("click", f)) : (d.addClass("show"), b.addClass("show"), $("body").addClass("ext-nav-show"), e.bind("click", f))
                } else b.hasClass("show") ? b.removeClass("show") : b.addClass("show")
            })
        }
    }, {}],
    21: [function(a, b) {
        b.exports = function(a, b, c, d) {
            "use strict";

            function e(a, b) {
                var c = $("html").hasClass("ie9") || $("html").hasClass("ie10");
                c ? (a.find("iframe").attr("src", ""), setTimeout(function() {
                    b()
                }, 300)) : b()
            }
            var f = a.find(".cross"),
                g = $(a.data("overlay-zoom")),
                h = a.find(".overlay-view"),
                f = a.find(".cross"),
                i = this;
            this.show = function(c, d) {
                var e = function() {
                    g.addClass("overlay-zoom"), a.transitionEnd(function() {
                        if (c) {
                            var e = a.find(".loader"),
                                f = $('<div class="loaded-content"></div>');
                            e.addClass("show"), f.addClass("content-container").appendTo(h), f.load(c, function(a, c) {
                                function g() {
                                    b && b(f), f.addClass("show"), e.removeClass("show"), d && d()
                                }
                                if ("success" !== c && "notmodified" !== c) return void f.text(c);
                                var h = f.find("img"),
                                    i = h.length;
                                i > 0 ? h.load(function() {
                                    i--, 0 === i && g()
                                }) : g()
                            })
                        } else d && d()
                    }).addClass("show")
                };
                a.hasClass("show") ? i.hide(e) : e()
            }, this.hide = function(b) {
                g.removeClass("overlay-zoom"), a.removeClass("show"), setTimeout(function() {
                    var f = a.find(".loaded-content");
                    f.length > 0 ? (c && c(f), e(f, function() {
                        f.remove(), d && d(), b && b()
                    })) : (d && d(), b && b())
                }, 500)
            }, f.click(function(a) {
                a.preventDefault(), i.hide()
            })
        }
    }, {}],
    22: [function(a, b) {
        b.exports = function(a) {
            "use strict";
            a.find(".show-list").each(function() {
                $(this).wrapInner('<div class="wrapper"></div>').textillate({
                    loop: !0,
                    "in": {
                        effect: "fadeInRight",
                        reverse: !0
                    },
                    out: {
                        effect: "fadeOutLeft",
                        sequence: !0
                    },
                    selector: ".wrapper"
                })
            })
        }
    }, {}],
    23: [function(a, b) {
        b.exports = function(a, b) {
            "use strict";
            var c = $("html").hasClass("poor-browser");
            a.find(".skillbar").each(function() {
                var a = $(this),
                    d = a.find(".skillbar-bar"),
                    e = parseInt(a.attr("data-percent").replace("%", ""));
                if (c) d.css({
                    width: e + "%"
                });
                else {
                    var f = {
                            width: 0
                        },
                        g = new TWEEN.Tween(f).to({
                            width: e
                        }, 1e3).onUpdate(function() {
                            d.css({
                                width: this.width + "%"
                            })
                        }).easing(TWEEN.Easing.Quartic.Out),
                        h = function() {
                            g.stop()
                        },
                        i = function() {
                            f.width = 0, g.start()
                        },
                        j = i;
                    b.players.addPlayer(a, j, h, i)
                }
            })
        }
    }, {}],
    24: [function(a, b) {
        b.exports = function(b, c) {
            "use strict";
            if (c) return void b.find(".carousel, .slider").each(function() {
                $(this).slick("unslick")
            });
            a("../tools/tools.js");
            b.find(".slider").each(function() {
                var a = $(this);
                a.slick({
                    autoplay: !0,
                    dots: !0
                })
            }), b.find(".carousel").each(function() {
                var a = $(this);
                a.slick({
                    autoplay: !1,
                    dots: !0,
                    infinite: !0,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [{
                        breakpoint: 1e3,
                        settings: {
                            dots: !0,
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            dots: !0,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                })
            })
        }
    }, {
        "../tools/tools.js": 11
    }],
    25: [function(a, b) {
        b.exports = function() {
            "use strict"; {
                var b = a("../tools/tools.js"),
                    c = $("#top-nav"),
                    d = $("body"),
                    e = c.length > 0,
                    f = c.find(".navbar-collapse"),
                    g = 20,
                    h = e ? 89 : 0,
                    i = e ? 49 : 0,
                    j = (a("../app/themes.js"), function() {
                        return e ? g : 0
                    }()),
                    k = !1,
                    l = !1,
                    m = this;
                c.data("state1-colors"), c.data("state2-colors")
            }
            this.state1H = h, this.state2H = i, this.state1Top = function() {
                return j
            }, this.state1 = function() {
                e && !k && (d.removeClass("state2").addClass("state1"), k = !0, l = !1, b.androidStylesFix(c))
            }, this.state2 = function() {
                e && !l && (d.removeClass("state1").addClass("state2"), k = !1, l = !0, b.androidStylesFix(c))
            }, this.$menu = function() {
                return f
            }, e && (m.state1(), f.find("a:not(.dropdown-toggle)").click(function() {
                c.find(".navbar-collapse.in").collapse("hide"), c.find(".menu-toggle.navbar-toggle").removeClass("show")
            }), $(window).resize(function() {
                c.find(".navbar-collapse.in").collapse("hide"), c.find(".menu-toggle.navbar-toggle").removeClass("show")
            }))
        }
    }, {
        "../app/themes.js": 8,
        "../tools/tools.js": 11
    }],
    26: [function(a, b) {
        b.exports = function() {
            "use strict";
            var a = $(".video-bg"),
                b = function() {
                    var a = $("html").hasClass("mobile"),
                        b = document.createElement("video"),
                        c = b.canPlayType ? b.canPlayType("video/mp4") : !1;
                    return c && !a
                }();
            return b ? void a.each(function() {
                var a = $(this);
                a.data("loading", function(b) {
                    var c = $('<video class="video-bg"></video>');
                    "yes" === a.data("mute") && (c[0].muted = !0);
                    var d = a.data("volume");
                    void 0 !== d && (c[0].volume = d / 100);
                    var e = function() {
                        var a = c.width(),
                            d = c.height(),
                            e = a / d,
                            f = $(window),
                            g = function() {
                                var a, b, d = f.width(),
                                    g = f.height(),
                                    h = d / g;
                                e > h ? (b = Math.ceil(g), a = Math.ceil(b * e)) : (a = Math.ceil(d), b = Math.ceil(a / e)), c.css({
                                    width: a + "px",
                                    height: b + "px",
                                    top: Math.round((g - b) / 2) + "px",
                                    left: Math.round((d - a) / 2) + "px"
                                })
                            };
                        f.resize(g), g(), c[0].play(), b()
                    };
                    c.on("ended", function() {
                        this.currentTime = 0, this.play(), this.ended && this.load()
                    });
                    var f = !0;
                    c.on("canplaythrough", function() {
                        f ? (f = !1, e()) : this.play()
                    }), c[0].src = a.data("video"), c[0].preload = "auto", a.after(c), a.remove()
                })
            }) : void a.each(function() {
                var a = $(this),
                    b = a.data("alternative");
                if (b) {
                    var c = $('<img alt class="bg" src="' + b + '"/>');
                    a.after(c).remove()
                }
            })
        }
    }, {}],
    27: [function(a, b) {
        b.exports = function() {
            "use strict";
            var a = $(".vimeo-bg");
            if ($("html").hasClass("mobile")) return void a.each(function() {
                var a = $(this),
                    b = a.data("alternative");
                if (b) {
                    var c = $('<img alt class="bg" src="' + b + '"/>');
                    a.after(c).remove()
                }
            });
            var b = [];
            a.each(function(a) {
                var c = $(this),
                    d = c.attr("id");
                d || (d = "vimeo-bg-" + a, c.attr("id", d)), c.data("loading", function(a) {
                    b[d] = a
                })
            }), $.getScript("https://f.vimeocdn.com/js/froogaloop2.min.js").done(function() {
                a.each(function() {
                    var a = $(this),
                        c = a.attr("id"),
                        d = function() {
                            var b = a.data("volume");
                            return void 0 === b ? 0 : b
                        }(),
                        e = a.data("video"),
                        f = $('<iframe class="vimeo-bg" src="https://player.vimeo.com/video/' + e + "?api=1&badge=0&byline=0&portrait=0&title=0&autopause=0&player_id=" + c + '&amp;loop=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                    a.after(f), a.remove(), f.attr("id", c);
                    var g = $f(f[0]);
                    g.addEvent("ready", function() {
                        var a = function(a) {
                            var b = $(window).width(),
                                c = $(window).height(),
                                d = f.width(),
                                e = f.height(),
                                g = d / e,
                                h = b / c,
                                i = function(d, e) {
                                    var h, i;
                                    g > a ? (i = Math.ceil(e), h = Math.ceil(i * g)) : (h = Math.ceil(d), i = Math.ceil(h / g)), f.css({
                                        width: h + "px",
                                        height: i + "px",
                                        top: Math.round((c - i) / 2) + "px",
                                        left: Math.round((b - h) / 2) + "px"
                                    })
                                };
                            if (h > a) {
                                var j = b,
                                    k = j / a;
                                i(j, k)
                            } else {
                                var k = c,
                                    j = k * a;
                                i(j, k)
                            }
                        };
                        g.addEvent("finish", function() {
                            g.api("play")
                        });
                        var e = !0;
                        g.addEvent("play", function() {
                            e && (e = !1, b[c]())
                        }), g.api("setVolume", d), g.api("getVideoWidth", function(b) {
                            var c = b;
                            g.api("getVideoHeight", function(b) {
                                var d = b,
                                    e = c / d;
                                $(window).resize(function() {
                                    a(e)
                                }), a(e), g.api("play")
                            })
                        })
                    })
                })
            }).fail(function() {
                console.log("Triggered ajaxError handler.")
            })
        }
    }, {}],
    28: [function(require, module, exports) {
        module.exports = function() {
            "use strict";
            var $youtubeBgs = $(".youtube-bg");
            if ($("html").hasClass("mobile")) return void $youtubeBgs.each(function() {
                var a = $(this),
                    b = a.data("alternative");
                if (b) {
                    var c = $('<img alt class="bg" src="' + b + '"/>');
                    a.after(c).remove()
                }
            });
            var dones = [];
            $youtubeBgs.each(function(a) {
                var b = $(this),
                    c = b.attr("id");
                c || (c = "youtube-bg-" + a, b.attr("id", c)), b.data("loading", function(a) {
                    dones[c] = a
                })
            });
            var tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag), window.onYouTubeIframeAPIReady = function() {
                $youtubeBgs.each(function() {
                    var $youtubeBg = $(this),
                        videoId = $youtubeBg.data("video"),
                        vol = $youtubeBg.data("volume"),
                        mute = $youtubeBg.data("mute"),
                        elId = $youtubeBg.attr("id"),
                        isNotDone = !0,
                        player = new YT.Player(elId, {
                            videoId: videoId,
                            playerVars: {
                                html5: 1,
                                controls: 0,
                                showinfo: 0,
                                modestbranding: 1,
                                rel: 0,
                                allowfullscreen: !0,
                                iv_load_policy: 3,
                                wmode: "transparent"
                            },
                            events: {
                                onReady: function(event) {
                                    var resize = function() {
                                        var $iFrame = $(event.target.getIframe()),
                                            windowW = $(window).width(),
                                            windowH = $(window).height(),
                                            iFrameW = $iFrame.width(),
                                            iFrameH = $iFrame.height(),
                                            ifRatio = iFrameW / iFrameH,
                                            wRatio = windowW / windowH,
                                            vRatio = function() {
                                                var r = $youtubeBg.data("ratio");
                                                return void 0 === r ? ifRatio : eval(r)
                                            }(),
                                            setSize = function(a, b) {
                                                var c, d;
                                                ifRatio > vRatio ? (d = Math.ceil(b), c = Math.ceil(d * ifRatio)) : (c = Math.ceil(a), d = Math.ceil(c / ifRatio)), $iFrame.css({
                                                    width: c + "px",
                                                    height: d + "px",
                                                    top: Math.round((windowH - d) / 2) + "px",
                                                    left: Math.round((windowW - c) / 2) + "px"
                                                })
                                            };
                                        if (wRatio > vRatio) {
                                            var vw = windowW,
                                                vh = vw / vRatio;
                                            setSize(vw, vh)
                                        } else {
                                            var vh = windowH,
                                                vw = vh * vRatio;
                                            setSize(vw, vh)
                                        }
                                    };
                                    $(window).resize(resize), resize(), event.target.setPlaybackQuality("highres"), void 0 !== vol && event.target.setVolume(vol), ("yes" === mute || void 0 === mute) && event.target.mute(), event.target.playVideo()
                                },
                                onStateChange: function(a) {
                                    isNotDone && a.data === YT.PlayerState.PLAYING ? (isNotDone = !1, dones[elId]()) : a.data === YT.PlayerState.ENDED && a.target.playVideo()
                                }
                            }
                        })
                })
            }
        }
    }, {}]
}, {}, [10]);