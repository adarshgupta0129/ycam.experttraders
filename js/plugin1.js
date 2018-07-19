/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
! function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function (e) {
        "use strict";

        function t(t) {
                var r = t.data;
                t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
        }

        function r(t) {
                var r = t.target,
                        a = e(r);
                if (!a.is("[type=submit],[type=image]")) {
                        var n = a.closest("[type=submit]");
                        if (0 === n.length) return;
                        r = n[0]
                }
                var i = this;
                if (i.clk = r, "image" == r.type)
                        if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
                        else if ("function" == typeof e.fn.offset) {
                        var o = a.offset();
                        i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
                } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
                setTimeout(function () {
                        i.clk = i.clk_x = i.clk_y = null
                }, 100)
        }

        function a() {
                if (e.fn.ajaxSubmit.debug) {
                        var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                        window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
                }
        }
        var n = {};
        n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
        var i = !!e.fn.prop;
        e.fn.attr2 = function () {
                if (!i) return this.attr.apply(this, arguments);
                var e = this.prop.apply(this, arguments);
                return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
        }, e.fn.ajaxSubmit = function (t) {
                function r(r) {
                        var a, n, i = e.param(r, t.traditional).split("&"),
                                o = i.length,
                                s = [];
                        for (a = 0; o > a; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
                        return s
                }

                function o(a) {
                        for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
                        if (t.extraData) {
                                var o = r(t.extraData);
                                for (i = 0; i < o.length; i++) o[i] && n.append(o[i][0], o[i][1])
                        }
                        t.data = null;
                        var s = e.extend(!0, {}, e.ajaxSettings, t, {
                                contentType: !1,
                                processData: !1,
                                cache: !1,
                                type: u || "POST"
                        });
                        t.uploadProgress && (s.xhr = function () {
                                var r = e.ajaxSettings.xhr();
                                return r.upload && r.upload.addEventListener("progress", function (e) {
                                        var r = 0,
                                                a = e.loaded || e.position,
                                                n = e.total;
                                        e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                                }, !1), r
                        }), s.data = null;
                        var c = s.beforeSend;
                        return s.beforeSend = function (e, r) {
                                r.data = t.formData ? t.formData : n, c && c.call(this, e, r)
                        }, e.ajax(s)
                }

                function s(r) {
                        function n(e) {
                                var t = null;
                                try {
                                        e.contentWindow && (t = e.contentWindow.document)
                                } catch (r) {
                                        a("cannot get iframe.contentWindow document: " + r)
                                }
                                if (t) return t;
                                try {
                                        t = e.contentDocument ? e.contentDocument : e.document
                                } catch (r) {
                                        a("cannot get iframe.contentDocument: " + r), t = e.document
                                }
                                return t
                        }

                        function o() {
                                function t() {
                                        try {
                                                var e = n(g).readyState;
                                                a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                                        } catch (r) {
                                                a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0
                                        }
                                }
                                var r = f.attr2("target"),
                                        i = f.attr2("action"),
                                        o = "multipart/form-data",
                                        c = f.attr("enctype") || f.attr("encoding") || o;
                                w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
                                        encoding: "multipart/form-data",
                                        enctype: "multipart/form-data"
                                }), m.timeout && (j = setTimeout(function () {
                                        T = !0, s(D)
                                }, m.timeout));
                                var l = [];
                                try {
                                        if (m.extraData)
                                                for (var d in m.extraData) m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0]);
                                        m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                                        try {
                                                w.submit()
                                        } catch (h) {
                                                var x = document.createElement("form").submit;
                                                x.apply(w)
                                        }
                                } finally {
                                        w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove()
                                }
                        }

                        function s(t) {
                                if (!x.aborted && !F) {
                                        if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), void S.reject(x, "timeout");
                                        if (t == k && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
                                        if (M && M.location.href != m.iframeSrc || T) {
                                                g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                                                var r, i = "success";
                                                try {
                                                        if (T) throw "timeout";
                                                        var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                                                        if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                                                        var u = M.body ? M.body : M.documentElement;
                                                        x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function (e) {
                                                                var t = {
                                                                        "content-type": m.dataType
                                                                };
                                                                return t[e.toLowerCase()]
                                                        }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                                                        var c = (m.dataType || "").toLowerCase(),
                                                                l = /(json|script|text)/.test(c);
                                                        if (l || m.textarea) {
                                                                var f = M.getElementsByTagName("textarea")[0];
                                                                if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                                                                else if (l) {
                                                                        var p = M.getElementsByTagName("pre")[0],
                                                                                h = M.getElementsByTagName("body")[0];
                                                                        p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                                                                }
                                                        } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
                                                        try {
                                                                E = _(x, c, m)
                                                        } catch (y) {
                                                                i = "parsererror", x.error = r = y || i
                                                        }
                                                } catch (y) {
                                                        a("error caught: ", y), i = "error", x.error = r = y || i
                                                }
                                                x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function () {
                                                        m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null
                                                }, 100)
                                        }
                                }
                        }
                        var c, l, m, d, p, v, g, x, y, b, T, j, w = f[0],
                                S = e.Deferred();
                        if (S.abort = function (e) {
                                        x.abort(e)
                                }, r)
                                for (l = 0; l < h.length; l++) c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
                        if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
                                        position: "absolute",
                                        top: "-1000px",
                                        left: "-1000px"
                                })), g = v[0], x = {
                                        aborted: 0,
                                        responseText: null,
                                        responseXML: null,
                                        status: 0,
                                        statusText: "n/a",
                                        getAllResponseHeaders: function () {},
                                        getResponseHeader: function () {},
                                        setRequestHeader: function () {},
                                        abort: function (t) {
                                                var r = "timeout" === t ? "timeout" : "aborted";
                                                a("aborting upload... " + r), this.aborted = 1;
                                                try {
                                                        g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
                                                } catch (n) {}
                                                v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
                                        }
                                }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
                        if (x.aborted) return S.reject(), S;
                        y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));
                        var D = 1,
                                k = 2,
                                A = e("meta[name=csrf-token]").attr("content"),
                                L = e("meta[name=csrf-param]").attr("content");
                        L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
                        var E, M, F, O = 50,
                                X = e.parseXML || function (e, t) {
                                        return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                                },
                                C = e.parseJSON || function (e) {
                                        return window.eval("(" + e + ")")
                                },
                                _ = function (t, r, a) {
                                        var n = t.getResponseHeader("content-type") || "",
                                                i = "xml" === r || !r && n.indexOf("xml") >= 0,
                                                o = i ? t.responseXML : t.responseText;
                                        return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
                                };
                        return S
                }
                if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
                var u, c, l, f = this;
                "function" == typeof t ? t = {
                        success: t
                } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
                        url: l,
                        success: e.ajaxSettings.success,
                        type: u || e.ajaxSettings.type,
                        iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
                }, t);
                var m = {};
                if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
                if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
                var d = t.traditional;
                void 0 === d && (d = e.ajaxSettings.traditional);
                var p, h = [],
                        v = this.formToArray(t.semantic, h);
                if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
                if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
                var g = e.param(v, d);
                p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
                var x = [];
                if (t.resetForm && x.push(function () {
                                f.resetForm()
                        }), t.clearForm && x.push(function () {
                                f.clearForm(t.includeHidden)
                        }), !t.dataType && t.target) {
                        var y = t.success || function () {};
                        x.push(function (r) {
                                var a = t.replaceTarget ? "replaceWith" : "html";
                                e(t.target)[a](r).each(y, arguments)
                        })
                } else t.success && x.push(t.success);
                if (t.success = function (e, r, a) {
                                for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
                        }, t.error) {
                        var b = t.error;
                        t.error = function (e, r, a) {
                                var n = t.context || this;
                                b.apply(n, [e, r, a, f])
                        }
                }
                if (t.complete) {
                        var T = t.complete;
                        t.complete = function (e, r) {
                                var a = t.context || this;
                                T.apply(a, [e, r, f])
                        }
                }
                var j = e("input[type=file]:enabled", this).filter(function () {
                                return "" !== e(this).val()
                        }),
                        w = j.length > 0,
                        S = "multipart/form-data",
                        D = f.attr("enctype") == S || f.attr("encoding") == S,
                        k = n.fileapi && n.formdata;
                a("fileAPI :" + k);
                var A, L = (w || D) && !k;
                t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function () {
                        A = s(v)
                }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
                for (var E = 0; E < h.length; E++) h[E] = null;
                return this.trigger("form-submit-notify", [this, t]), this
        }, e.fn.ajaxForm = function (n) {
                if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
                        var i = {
                                s: this.selector,
                                c: this.context
                        };
                        return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function () {
                                e(i.s, i.c).ajaxForm(n)
                        }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
                }
                return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
        }, e.fn.ajaxFormUnbind = function () {
                return this.unbind("submit.form-plugin click.form-plugin")
        }, e.fn.formToArray = function (t, r) {
                var a = [];
                if (0 === this.length) return a;
                var i, o = this[0],
                        s = this.attr("id"),
                        u = t ? o.getElementsByTagName("*") : o.elements;
                if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) return a;
                var c, l, f, m, d, p, h;
                for (c = 0, p = u.length; p > c; c++)
                        if (d = u[c], f = d.name, f && !d.disabled)
                                if (t && o.clk && "image" == d.type) o.clk == d && (a.push({
                                        name: f,
                                        value: e(d).val(),
                                        type: d.type
                                }), a.push({
                                        name: f + ".x",
                                        value: o.clk_x
                                }, {
                                        name: f + ".y",
                                        value: o.clk_y
                                }));
                                else if (m = e.fieldValue(d, !0), m && m.constructor == Array)
                        for (r && r.push(d), l = 0, h = m.length; h > l; l++) a.push({
                                name: f,
                                value: m[l]
                        });
                else if (n.fileapi && "file" == d.type) {
                        r && r.push(d);
                        var v = d.files;
                        if (v.length)
                                for (l = 0; l < v.length; l++) a.push({
                                        name: f,
                                        value: v[l],
                                        type: d.type
                                });
                        else a.push({
                                name: f,
                                value: "",
                                type: d.type
                        })
                } else null !== m && "undefined" != typeof m && (r && r.push(d), a.push({
                        name: f,
                        value: m,
                        type: d.type,
                        required: d.required
                }));
                if (!t && o.clk) {
                        var g = e(o.clk),
                                x = g[0];
                        f = x.name, f && !x.disabled && "image" == x.type && (a.push({
                                name: f,
                                value: g.val()
                        }), a.push({
                                name: f + ".x",
                                value: o.clk_x
                        }, {
                                name: f + ".y",
                                value: o.clk_y
                        }))
                }
                return a
        }, e.fn.formSerialize = function (t) {
                return e.param(this.formToArray(t))
        }, e.fn.fieldSerialize = function (t) {
                var r = [];
                return this.each(function () {
                        var a = this.name;
                        if (a) {
                                var n = e.fieldValue(this, t);
                                if (n && n.constructor == Array)
                                        for (var i = 0, o = n.length; o > i; i++) r.push({
                                                name: a,
                                                value: n[i]
                                        });
                                else null !== n && "undefined" != typeof n && r.push({
                                        name: this.name,
                                        value: n
                                })
                        }
                }), e.param(r)
        }, e.fn.fieldValue = function (t) {
                for (var r = [], a = 0, n = this.length; n > a; a++) {
                        var i = this[a],
                                o = e.fieldValue(i, t);
                        null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
                }
                return r
        }, e.fieldValue = function (t, r) {
                var a = t.name,
                        n = t.type,
                        i = t.tagName.toLowerCase();
                if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
                if ("select" == i) {
                        var o = t.selectedIndex;
                        if (0 > o) return null;
                        for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                                var m = u[f];
                                if (m.selected) {
                                        var d = m.value;
                                        if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;
                                        s.push(d)
                                }
                        }
                        return s
                }
                return e(t).val()
        }, e.fn.clearForm = function (t) {
                return this.each(function () {
                        e("input,select,textarea", this).clearFields(t)
                })
        }, e.fn.clearFields = e.fn.clearInputs = function (t) {
                var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
                return this.each(function () {
                        var a = this.type,
                                n = this.tagName.toLowerCase();
                        r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
                })
        }, e.fn.resetForm = function () {
                return this.each(function () {
                        ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
                })
        }, e.fn.enable = function (e) {
                return void 0 === e && (e = !0), this.each(function () {
                        this.disabled = !e
                })
        }, e.fn.selected = function (t) {
                return void 0 === t && (t = !0), this.each(function () {
                        var r = this.type;
                        if ("checkbox" == r || "radio" == r) this.checked = t;
                        else if ("option" == this.tagName.toLowerCase()) {
                                var a = e(this).parent("select");
                                t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
                        }
                })
        }, e.fn.ajaxSubmit.debug = !1
});;
(function ($) {
        'use strict';
        if (typeof _wpcf7 == 'undefined' || _wpcf7 === null) {
                _wpcf7 = {};
        }
        _wpcf7 = $.extend({
                cached: 0
        }, _wpcf7);
        $.fn.wpcf7InitForm = function () {
                this.ajaxForm({
                        beforeSubmit: function (arr, $form, options) {
                                $form.wpcf7ClearResponseOutput();
                                $form.find('[aria-invalid]').attr('aria-invalid', 'false');
                                $form.find('img.ajax-loader').css({
                                        visibility: 'visible'
                                });
                                return true;
                        },
                        beforeSerialize: function ($form, options) {
                                $form.find('[placeholder].placeheld').each(function (i, n) {
                                        $(n).val('');
                                });
                                return true;
                        },
                        data: {
                                '_wpcf7_is_ajax_call': 1
                        },
                        dataType: 'json',
                        success: $.wpcf7AjaxSuccess,
                        error: function (xhr, status, error, $form) {
                                var e = $('<div class="ajax-error"></div>').text(error.message);
                                $form.after(e);
                        }
                });
                if (_wpcf7.cached) {
                        this.wpcf7OnloadRefill();
                }
                this.wpcf7ToggleSubmit();
                this.find('.wpcf7-submit').wpcf7AjaxLoader();
                this.find('.wpcf7-acceptance').click(function () {
                        $(this).closest('form').wpcf7ToggleSubmit();
                });
                this.find('.wpcf7-exclusive-checkbox').wpcf7ExclusiveCheckbox();
                this.find('.wpcf7-list-item.has-free-text').wpcf7ToggleCheckboxFreetext();
                this.find('[placeholder]').wpcf7Placeholder();
                if (_wpcf7.jqueryUi && !_wpcf7.supportHtml5.date) {
                        this.find('input.wpcf7-date[type="date"]').each(function () {
                                $(this).datepicker({
                                        dateFormat: 'yy-mm-dd',
                                        minDate: new Date($(this).attr('min')),
                                        maxDate: new Date($(this).attr('max'))
                                });
                        });
                }
                if (_wpcf7.jqueryUi && !_wpcf7.supportHtml5.number) {
                        this.find('input.wpcf7-number[type="number"]').each(function () {
                                $(this).spinner({
                                        min: $(this).attr('min'),
                                        max: $(this).attr('max'),
                                        step: $(this).attr('step')
                                });
                        });
                }
                this.find('.wpcf7-character-count').wpcf7CharacterCount();
                this.find('.wpcf7-validates-as-url').change(function () {
                        $(this).wpcf7NormalizeUrl();
                });
                this.find('.wpcf7-recaptcha').wpcf7Recaptcha();
        };
        $.wpcf7AjaxSuccess = function (data, status, xhr, $form) {
                if (!$.isPlainObject(data) || $.isEmptyObject(data)) {
                        return;
                }
                var $responseOutput = $form.find('div.wpcf7-response-output');
                $form.wpcf7ClearResponseOutput();
                $form.find('.wpcf7-form-control').removeClass('wpcf7-not-valid');
                $form.removeClass('invalid spam sent failed');
                if (data.captcha) {
                        $form.wpcf7RefillCaptcha(data.captcha);
                }
                if (data.quiz) {
                        $form.wpcf7RefillQuiz(data.quiz);
                }
                if (data.invalids) {
                        $.each(data.invalids, function (i, n) {
                                $form.find(n.into).wpcf7NotValidTip(n.message);
                                $form.find(n.into).find('.wpcf7-form-control').addClass('wpcf7-not-valid');
                                $form.find(n.into).find('[aria-invalid]').attr('aria-invalid', 'true');
                        });
                        $responseOutput.addClass('wpcf7-validation-errors');
                        $form.addClass('invalid');
                        $(data.into).trigger('wpcf7:invalid');
                        $(data.into).trigger('invalid.wpcf7');
                } else if (1 == data.spam) {
                        $form.find('[name="g-recaptcha-response"]').each(function () {
                                if ('' == $(this).val()) {
                                        var $recaptcha = $(this).closest('.wpcf7-form-control-wrap');
                                        $recaptcha.wpcf7NotValidTip(_wpcf7.recaptcha.messages.empty);
                                }
                        });
                        $responseOutput.addClass('wpcf7-spam-blocked');
                        $form.addClass('spam');
                        $(data.into).trigger('wpcf7:spam');
                        $(data.into).trigger('spam.wpcf7');
                } else if (1 == data.mailSent) {
                        $responseOutput.addClass('wpcf7-mail-sent-ok');
                        $form.addClass('sent');
                        if (data.onSentOk) {
                                $.each(data.onSentOk, function (i, n) {
                                        eval(n)
                                });
                        }
                        $(data.into).trigger('wpcf7:mailsent');
                        $(data.into).trigger('mailsent.wpcf7');
                } else {
                        $responseOutput.addClass('wpcf7-mail-sent-ng');
                        $form.addClass('failed');
                        $(data.into).trigger('wpcf7:mailfailed');
                        $(data.into).trigger('mailfailed.wpcf7');
                }
                if (data.onSubmit) {
                        $.each(data.onSubmit, function (i, n) {
                                eval(n)
                        });
                }
                $(data.into).trigger('wpcf7:submit');
                $(data.into).trigger('submit.wpcf7');
                if (1 == data.mailSent) {
                        $form.resetForm();
                }
                $form.find('[placeholder].placeheld').each(function (i, n) {
                        $(n).val($(n).attr('placeholder'));
                });
                $responseOutput.append(data.message).slideDown('fast');
                $responseOutput.attr('role', 'alert');
                $.wpcf7UpdateScreenReaderResponse($form, data);
        };
        $.fn.wpcf7ExclusiveCheckbox = function () {
                return this.find('input:checkbox').click(function () {
                        var name = $(this).attr('name');
                        $(this).closest('form').find('input:checkbox[name="' + name + '"]').not(this).prop('checked', false);
                });
        };
        $.fn.wpcf7Placeholder = function () {
                if (_wpcf7.supportHtml5.placeholder) {
                        return this;
                }
                return this.each(function () {
                        $(this).val($(this).attr('placeholder'));
                        $(this).addClass('placeheld');
                        $(this).focus(function () {
                                if ($(this).hasClass('placeheld'))
                                        $(this).val('').removeClass('placeheld');
                        });
                        $(this).blur(function () {
                                if ('' == $(this).val()) {
                                        $(this).val($(this).attr('placeholder'));
                                        $(this).addClass('placeheld');
                                }
                        });
                });
        };
        $.fn.wpcf7AjaxLoader = function () {
                return this.each(function () {
                        var loader = $('<img class="ajax-loader" />').attr({
                                src: _wpcf7.loaderUrl,
                                alt: _wpcf7.sending
                        }).css('visibility', 'hidden');
                        $(this).after(loader);
                });
        };
        $.fn.wpcf7ToggleSubmit = function () {
                return this.each(function () {
                        var form = $(this);
                        if (this.tagName.toLowerCase() != 'form') {
                                form = $(this).find('form').first();
                        }
                        if (form.hasClass('wpcf7-acceptance-as-validation')) {
                                return;
                        }
                        var submit = form.find('input:submit');
                        if (!submit.length) return;
                        var acceptances = form.find('input:checkbox.wpcf7-acceptance');
                        if (!acceptances.length) return;
                        submit.removeAttr('disabled');
                        acceptances.each(function (i, n) {
                                n = $(n);
                                if (n.hasClass('wpcf7-invert') && n.is(':checked') || !n.hasClass('wpcf7-invert') && !n.is(':checked')) {
                                        submit.attr('disabled', 'disabled');
                                }
                        });
                });
        };
        $.fn.wpcf7ToggleCheckboxFreetext = function () {
                return this.each(function () {
                        var $wrap = $(this).closest('.wpcf7-form-control');
                        if ($(this).find(':checkbox, :radio').is(':checked')) {
                                $(this).find(':input.wpcf7-free-text').prop('disabled', false);
                        } else {
                                $(this).find(':input.wpcf7-free-text').prop('disabled', true);
                        }
                        $wrap.find(':checkbox, :radio').change(function () {
                                var $cb = $('.has-free-text', $wrap).find(':checkbox, :radio');
                                var $freetext = $(':input.wpcf7-free-text', $wrap);
                                if ($cb.is(':checked')) {
                                        $freetext.prop('disabled', false).focus();
                                } else {
                                        $freetext.prop('disabled', true);
                                }
                        });
                });
        };
        $.fn.wpcf7CharacterCount = function () {
                return this.each(function () {
                        var $count = $(this);
                        var name = $count.attr('data-target-name');
                        var down = $count.hasClass('down');
                        var starting = parseInt($count.attr('data-starting-value'), 10);
                        var maximum = parseInt($count.attr('data-maximum-value'), 10);
                        var minimum = parseInt($count.attr('data-minimum-value'), 10);
                        var updateCount = function ($target) {
                                var length = $target.val().length;
                                var count = down ? starting - length : length;
                                $count.attr('data-current-value', count);
                                $count.text(count);
                                if (maximum && maximum < length) {
                                        $count.addClass('too-long');
                                } else {
                                        $count.removeClass('too-long');
                                }
                                if (minimum && length < minimum) {
                                        $count.addClass('too-short');
                                } else {
                                        $count.removeClass('too-short');
                                }
                        };
                        $count.closest('form').find(':input[name="' + name + '"]').each(function () {
                                updateCount($(this));
                                $(this).keyup(function () {
                                        updateCount($(this));
                                });
                        });
                });
        };
        $.fn.wpcf7NormalizeUrl = function () {
                return this.each(function () {
                        var val = $.trim($(this).val());
                        if (val && !val.match(/^[a-z][a-z0-9.+-]*:/i)) {
                                val = val.replace(/^\/+/, '');
                                val = 'http://' + val;
                        }
                        $(this).val(val);
                });
        };
        $.fn.wpcf7NotValidTip = function (message) {
                return this.each(function () {
                        var $into = $(this);
                        $into.find('span.wpcf7-not-valid-tip').remove();
                        $into.append('<span role="alert" class="wpcf7-not-valid-tip">' + message + '</span>');
                        if ($into.is('.use-floating-validation-tip *')) {
                                $('.wpcf7-not-valid-tip', $into).mouseover(function () {
                                        $(this).wpcf7FadeOut();
                                });
                                $(':input', $into).focus(function () {
                                        $('.wpcf7-not-valid-tip', $into).not(':hidden').wpcf7FadeOut();
                                });
                        }
                });
        };
        $.fn.wpcf7FadeOut = function () {
                return this.each(function () {
                        $(this).animate({
                                opacity: 0
                        }, 'fast', function () {
                                $(this).css({
                                        'z-index': -100
                                });
                        });
                });
        };
        $.fn.wpcf7OnloadRefill = function () {
                return this.each(function () {
                        var url = $(this).attr('action');
                        if (0 < url.indexOf('#')) {
                                url = url.substr(0, url.indexOf('#'));
                        }
                        var id = $(this).find('input[name="_wpcf7"]').val();
                        var unitTag = $(this).find('input[name="_wpcf7_unit_tag"]').val();
                        $.getJSON(url, {
                                _wpcf7_is_ajax_call: 1,
                                _wpcf7: id,
                                _wpcf7_request_ver: $.now()
                        }, function (data) {
                                if (data && data.captcha) {
                                        $('#' + unitTag).wpcf7RefillCaptcha(data.captcha);
                                }
                                if (data && data.quiz) {
                                        $('#' + unitTag).wpcf7RefillQuiz(data.quiz);
                                }
                        });
                });
        };
        $.fn.wpcf7RefillCaptcha = function (captcha) {
                return this.each(function () {
                        var form = $(this);
                        $.each(captcha, function (i, n) {
                                form.find(':input[name="' + i + '"]').clearFields();
                                form.find('img.wpcf7-captcha-' + i).attr('src', n);
                                var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
                                form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
                        });
                });
        };
        $.fn.wpcf7RefillQuiz = function (quiz) {
                return this.each(function () {
                        var form = $(this);
                        $.each(quiz, function (i, n) {
                                form.find(':input[name="' + i + '"]').clearFields();
                                form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
                                form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
                        });
                });
        };
        $.fn.wpcf7ClearResponseOutput = function () {
                return this.each(function () {
                        $(this).find('div.wpcf7-response-output').hide().empty().removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked').removeAttr('role');
                        $(this).find('span.wpcf7-not-valid-tip').remove();
                        $(this).find('img.ajax-loader').css({
                                visibility: 'hidden'
                        });
                });
        };
        $.fn.wpcf7Recaptcha = function () {
                return this.each(function () {
                        var events = 'wpcf7:spam wpcf7:mailsent wpcf7:mailfailed';
                        $(this).closest('div.wpcf7').on(events, function (e) {
                                if (recaptchaWidgets && grecaptcha) {
                                        $.each(recaptchaWidgets, function (index, value) {
                                                grecaptcha.reset(value);
                                        });
                                }
                        });
                });
        };
        $.wpcf7UpdateScreenReaderResponse = function ($form, data) {
                $('.wpcf7 .screen-reader-response').html('').attr('role', '');
                if (data.message) {
                        var $response = $form.siblings('.screen-reader-response').first();
                        $response.append(data.message);
                        if (data.invalids) {
                                var $invalids = $('<ul></ul>');
                                $.each(data.invalids, function (i, n) {
                                        if (n.idref) {
                                                var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
                                        } else {
                                                var $li = $('<li></li>').append(n.message);
                                        }
                                        $invalids.append($li);
                                });
                                $response.append($invalids);
                        }
                        $response.attr('role', 'alert').focus();
                }
        };
        $.wpcf7SupportHtml5 = function () {
                var features = {};
                var input = document.createElement('input');
                features.placeholder = 'placeholder' in input;
                var inputTypes = ['email', 'url', 'tel', 'number', 'range', 'date'];
                $.each(inputTypes, function (index, value) {
                        input.setAttribute('type', value);
                        features[value] = input.type !== 'text';
                });
                return features;
        };
        $(function () {
                _wpcf7.supportHtml5 = $.wpcf7SupportHtml5();
                $('div.wpcf7 > form').wpcf7InitForm();
        });
})(jQuery);;
jQuery(document).ready(function ($) {
        function update_price_filter_slider() {
                var $ = jQuery;
                if ($('.price_slider').length <= 0) {
                        return;
                }
                var $price_slider = $('.price_slider');
                var $price_slider_amount = $('.price_slider_amount');
                var selected_currency = wc_aelia_currency_switcher_params.selected_currency;
                var exchange_rate_from_base = wc_aelia_currency_switcher_params.current_exchange_rate_from_base;
                var price_filter_currency_field = $('<input>').attr('id', 'price_filter_currency').attr('name', 'price_filter_currency').attr('value', selected_currency).hide();
                $('.price_slider_amount').append(price_filter_currency_field);
                var min_price = $price_slider_amount.find('#min_price').attr('data-min');
                var max_price = $price_slider_amount.find('#max_price').attr('data-max');
                min_price = Math.floor(min_price * exchange_rate_from_base);
                max_price = Math.ceil(max_price * exchange_rate_from_base);
                $price_slider_amount.find('#min_price').attr('data-min', min_price);
                $price_slider_amount.find('#max_price').attr('data-max', max_price);
                if (typeof woocommerce_price_slider_params != 'undefined') {
                        if (woocommerce_price_slider_params.min_price) {
                                woocommerce_price_slider_params.min_price = Math.floor(woocommerce_price_slider_params.min_price * exchange_rate_from_base);
                        }
                        if (woocommerce_price_slider_params.max_price) {
                                woocommerce_price_slider_params.max_price = Math.ceil(woocommerce_price_slider_params.max_price * exchange_rate_from_base);
                        }
                }
        }
        update_price_filter_slider();
});;
jQuery(document).ready(function ($) {
        var params = aelia_eu_vat_assistant_params;
        var tax_based_on = params.tax_based_on;
        var vat_country = '';
        var $self_certification_element = $('#woocommerce_location_self_certification');
        var $eu_vat_element;
        var $eu_vat_field;
        var last_vat_number = '';
        var get_vat_country = function () {
                if ((tax_based_on == 'shipping') && $('#ship-to-different-address input').is(':checked')) {
                        var country_field_selector = '#shipping_country';
                } else {
                        var country_field_selector = '#billing_country';
                }
                return $(country_field_selector).val();
        }
        var sufficient_location_evidence = function () {
                var country_count = {};
                country_count[$('#billing_country').val()] = ++country_count[$('#billing_country').val()] || 1;
                if (params.use_shipping_as_evidence && (params.use_shipping_as_evidence != 0)) {
                        if ($('#ship-to-different-address-checkbox').is(':checked') && ($('#shipping_country').length > 0)) {
                                country_count[$('#shipping_country').val()] = ++country_count[$('#shipping_country').val()] || 1;
                        }
                }
                country_count[params.ip_address_country] = ++country_count[params.ip_address_country] || 1;
                for (var country_id in country_count) {
                        if ((country_id != '') && (country_count[country_id] >= 2)) {
                                return true;
                        }
                }
                return false;
        }
        var update_self_certification_element = function () {
                var show_element = true;
                if (($eu_vat_field) && $eu_vat_field.prop('valid') && (params.hide_self_cert_field_with_valid_vat == 1)) {
                        show_element = false;
                } else {
                        switch (params.show_self_cert_field) {
                                case 'yes':
                                        show_element = true;
                                        break;
                                case 'conflict-only':
                                        show_element = !sufficient_location_evidence();
                                        break;
                        }
                }
                var self_cert_label = params.user_interface.self_certification_field_title;
                $self_certification_element.find('.self_certification_label').html(self_cert_label.replace('{billing_country}', $('#billing_country option:selected').text()));
                if (show_element) {
                        $self_certification_element.fadeIn();
                } else {
                        $self_certification_element.fadeOut();
                }
        }
        var hide_vat_number_field = function () {
                return !params.show_eu_vat_number_for_base_country && (vat_country == params.shop_base_country);
        }
        var validate_vat_number = function () {
                var vat_number = $eu_vat_field.val();
                if ((vat_country + vat_number) == last_vat_number) {
                        return;
                }
                if ((vat_country == '') || (vat_number == '')) {
                        return;
                }
                last_vat_number = vat_country + vat_number;
                var ajax_args = {
                        'action': 'validate_eu_vat_number',
                        'country': vat_country,
                        'vat_number': vat_number
                };
                $.get(params.ajax_url, ajax_args, function (response) {
                        $eu_vat_field.prop('valid', response.valid);
                        update_self_certification_element();
                });
        }
        var is_vat_number_required = function (vat_country) {
                var vat_country_is_in_eu = ($.inArray(vat_country, params.eu_vat_countries) >= 0);
                var company_field_filled = ($('form #billing_company').val().trim() != '');
                if (hide_vat_number_field()) {
                        return false;
                }
                var result = (params.eu_vat_field_required == 'required') || ((params.eu_vat_field_required == 'required_for_eu_only') && vat_country_is_in_eu) || ((params.eu_vat_field_required == 'required_if_company_field_filled') && company_field_filled) || ((params.eu_vat_field_required == 'required_if_company_field_filled_eu_only') && company_field_filled && vat_country_is_in_eu);
                return result;
        }
        var set_eu_vat_field_handlers = function () {
                var eu_vat_countries = params.eu_vat_countries;
                switch (tax_based_on) {
                        case 'billing':
                                var event_selector = 'select#billing_country';
                                break;
                        case 'shipping':
                                var event_selector = 'select#billing_country, select#shipping_country, input#ship-to-different-address-checkbox';
                                break;
                        default:
                                var event_selector = 'select#billing_country';
                }
                event_selector = event_selector + ', #billing_company';
                $('form.checkout, #order_review').on('change', event_selector, function () {
                        var previous_vat_country = vat_country;
                        vat_country = get_vat_country();
                        if ($eu_vat_element.length > 0) {
                                var vat_field_required = is_vat_number_required(vat_country);
                                if (vat_country && (($.inArray(vat_country, params.eu_vat_countries) >= 0) && !hide_vat_number_field()) || vat_field_required) {
                                        $eu_vat_element.fadeIn();
                                } else {
                                        $eu_vat_element.fadeOut(function () {
                                                $eu_vat_field.val('');
                                        });
                                }
                                if ($eu_vat_element.is(':visible') && vat_field_required) {
                                        $eu_vat_element.find('.form-row').addClass('validate-required');
                                } else {
                                        $eu_vat_element.find('.form-row').removeClass('validate-required');
                                }
                                validate_vat_number();
                        }
                        if ($self_certification_element.length > 0) {
                                update_self_certification_element();
                        }
                });
                if ($eu_vat_element.length > 0) {
                        $eu_vat_field.on('blur', function () {
                                validate_vat_number();
                        });
                }
        }
        if ($('.woocommerce form.checkout').length > 0) {
                $eu_vat_element = $('#woocommerce_eu_vat_number');
                if ($eu_vat_element.length > 0) {
                        $eu_vat_field = $eu_vat_element.find('#vat_number');
                }
                set_eu_vat_field_handlers();
                $('select#billing_country').change();
        }
});;
(function (t) {
        t.extend(t.fn, {
                validate: function (e) {
                        if (!this.length) return e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
                        var i = t.data(this[0], "validator");
                        return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (e) {
                                i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
                        }), this.submit(function (e) {
                                function s() {
                                        var s;
                                        return i.settings.submitHandler ? (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), !1) : !0
                                }
                                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
                        })), i)
                },
                valid: function () {
                        if (t(this[0]).is("form")) return this.validate().form();
                        var e = !0,
                                i = t(this[0].form).validate();
                        return this.each(function () {
                                e = e && i.element(this)
                        }), e
                },
                removeAttrs: function (e) {
                        var i = {},
                                s = this;
                        return t.each(e.split(/\s/), function (t, e) {
                                i[e] = s.attr(e), s.removeAttr(e)
                        }), i
                },
                rules: function (e, i) {
                        var s = this[0];
                        if (e) {
                                var r = t.data(s.form, "validator").settings,
                                        n = r.rules,
                                        a = t.validator.staticRules(s);
                                switch (e) {
                                        case "add":
                                                t.extend(a, t.validator.normalizeRule(i)), delete a.messages, n[s.name] = a, i.messages && (r.messages[s.name] = t.extend(r.messages[s.name], i.messages));
                                                break;
                                        case "remove":
                                                if (!i) return delete n[s.name], a;
                                                var u = {};
                                                return t.each(i.split(/\s/), function (t, e) {
                                                        u[e] = a[e], delete a[e]
                                                }), u
                                }
                        }
                        var o = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);
                        if (o.required) {
                                var l = o.required;
                                delete o.required, o = t.extend({
                                        required: l
                                }, o)
                        }
                        return o
                }
        }), t.extend(t.expr[":"], {
                blank: function (e) {
                        return !t.trim("" + t(e).val())
                },
                filled: function (e) {
                        return !!t.trim("" + t(e).val())
                },
                unchecked: function (e) {
                        return !t(e).prop("checked")
                }
        }), t.validator = function (e, i) {
                this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
        }, t.validator.format = function (e, i) {
                return 1 === arguments.length ? function () {
                        var i = t.makeArray(arguments);
                        return i.unshift(e), t.validator.format.apply(this, i)
                } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function (t, i) {
                        e = e.replace(RegExp("\\{" + t + "\\}", "g"), function () {
                                return i
                        })
                }), e)
        }, t.extend(t.validator, {
                defaults: {
                        messages: {},
                        groups: {},
                        rules: {},
                        errorClass: "error",
                        validClass: "valid",
                        errorElement: "label",
                        focusInvalid: !0,
                        errorContainer: t([]),
                        errorLabelContainer: t([]),
                        onsubmit: !0,
                        ignore: ":hidden",
                        ignoreTitle: !1,
                        onfocusin: function (t) {
                                this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
                        },
                        onfocusout: function (t) {
                                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
                        },
                        onkeyup: function (t, e) {
                                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
                        },
                        onclick: function (t) {
                                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
                        },
                        highlight: function (e, i, s) {
                                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
                        },
                        unhighlight: function (e, i, s) {
                                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
                        }
                },
                setDefaults: function (e) {
                        t.extend(t.validator.defaults, e)
                },
                messages: {
                        required: "This field is required.",
                        remote: "Please fix this field.",
                        email: "Please enter a valid email address.",
                        url: "Please enter a valid URL.",
                        date: "Please enter a valid date.",
                        dateISO: "Please enter a valid date (ISO).",
                        number: "Please enter a valid number.",
                        digits: "Please enter only digits.",
                        creditcard: "Please enter a valid credit card number.",
                        equalTo: "Please enter the same value again.",
                        maxlength: t.validator.format("Please enter no more than {0} characters."),
                        minlength: t.validator.format("Please enter at least {0} characters."),
                        rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                        range: t.validator.format("Please enter a value between {0} and {1}."),
                        max: t.validator.format("Please enter a value less than or equal to {0}."),
                        min: t.validator.format("Please enter a value greater than or equal to {0}.")
                },
                autoCreateRanges: !1,
                prototype: {
                        init: function () {
                                function e(e) {
                                        var i = t.data(this[0].form, "validator"),
                                                s = "on" + e.type.replace(/^validate/, "");
                                        i.settings[s] && i.settings[s].call(i, this[0], e)
                                }
                                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                                var i = this.groups = {};
                                t.each(this.settings.groups, function (e, s) {
                                        "string" == typeof s && (s = s.split(/\s/)), t.each(s, function (t, s) {
                                                i[s] = e
                                        })
                                });
                                var s = this.settings.rules;
                                t.each(s, function (e, i) {
                                        s[e] = t.validator.normalizeRule(i)
                                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                        },
                        form: function () {
                                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                        },
                        checkForm: function () {
                                this.prepareForm();
                                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                                return this.valid()
                        },
                        element: function (e) {
                                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                                var i = this.check(e) !== !1;
                                return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
                        },
                        showErrors: function (e) {
                                if (e) {
                                        t.extend(this.errorMap, e), this.errorList = [];
                                        for (var i in e) this.errorList.push({
                                                message: e[i],
                                                element: this.findByName(i)[0]
                                        });
                                        this.successList = t.grep(this.successList, function (t) {
                                                return !(t.name in e)
                                        })
                                }
                                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                        },
                        resetForm: function () {
                                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                        },
                        numberOfInvalids: function () {
                                return this.objectLength(this.invalid)
                        },
                        objectLength: function (t) {
                                var e = 0;
                                for (var i in t) e++;
                                return e
                        },
                        hideErrors: function () {
                                this.addWrapper(this.toHide).hide()
                        },
                        valid: function () {
                                return 0 === this.size()
                        },
                        size: function () {
                                return this.errorList.length
                        },
                        focusInvalid: function () {
                                if (this.settings.focusInvalid) try {
                                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                                } catch (e) {}
                        },
                        findLastActive: function () {
                                var e = this.lastActive;
                                return e && 1 === t.grep(this.errorList, function (t) {
                                        return t.element.name === e.name
                                }).length && e
                        },
                        elements: function () {
                                var e = this,
                                        i = {};
                                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                                })
                        },
                        clean: function (e) {
                                return t(e)[0]
                        },
                        errors: function () {
                                var e = this.settings.errorClass.replace(" ", ".");
                                return t(this.settings.errorElement + "." + e, this.errorContext)
                        },
                        reset: function () {
                                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
                        },
                        prepareForm: function () {
                                this.reset(), this.toHide = this.errors().add(this.containers)
                        },
                        prepareElement: function (t) {
                                this.reset(), this.toHide = this.errorsFor(t)
                        },
                        elementValue: function (e) {
                                var i = t(e).attr("type"),
                                        s = t(e).val();
                                return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s
                        },
                        check: function (e) {
                                e = this.validationTargetFor(this.clean(e));
                                var i, s = t(e).rules(),
                                        r = !1,
                                        n = this.elementValue(e);
                                for (var a in s) {
                                        var u = {
                                                method: a,
                                                parameters: s[a]
                                        };
                                        try {
                                                if (i = t.validator.methods[a].call(this, n, e, u.parameters), "dependency-mismatch" === i) {
                                                        r = !0;
                                                        continue
                                                }
                                                if (r = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
                                                if (!i) return this.formatAndAdd(e, u), !1
                                        } catch (o) {
                                                throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + u.method + "' method.", o), o
                                        }
                                }
                                return r ? void 0 : (this.objectLength(s) && this.successList.push(e), !0)
                        },
                        customDataMessage: function (e, i) {
                                return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
                        },
                        customMessage: function (t, e) {
                                var i = this.settings.messages[t];
                                return i && (i.constructor === String ? i : i[e])
                        },
                        findDefined: function () {
                                for (var t = 0; arguments.length > t; t++)
                                        if (void 0 !== arguments[t]) return arguments[t];
                                return void 0
                        },
                        defaultMessage: function (e, i) {
                                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
                        },
                        formatAndAdd: function (e, i) {
                                var s = this.defaultMessage(e, i.method),
                                        r = /\$?\{(\d+)\}/g;
                                "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({
                                        message: s,
                                        element: e
                                }), this.errorMap[e.name] = s, this.submitted[e.name] = s
                        },
                        addWrapper: function (t) {
                                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
                        },
                        defaultShowErrors: function () {
                                var t, e;
                                for (t = 0; this.errorList[t]; t++) {
                                        var i = this.errorList[t];
                                        this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
                                }
                                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                                        for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                                if (this.settings.unhighlight)
                                        for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                        },
                        validElements: function () {
                                return this.currentElements.not(this.invalidElements())
                        },
                        invalidElements: function () {
                                return t(this.errorList).map(function () {
                                        return this.element
                                })
                        },
                        showLabel: function (e, i) {
                                var s = this.errorsFor(e);
                                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
                        },
                        errorsFor: function (e) {
                                var i = this.idOrName(e);
                                return this.errors().filter(function () {
                                        return t(this).attr("for") === i
                                })
                        },
                        idOrName: function (t) {
                                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
                        },
                        validationTargetFor: function (t) {
                                return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
                        },
                        checkable: function (t) {
                                return /radio|checkbox/i.test(t.type)
                        },
                        findByName: function (e) {
                                return t(this.currentForm).find("[name='" + e + "']")
                        },
                        getLength: function (e, i) {
                                switch (i.nodeName.toLowerCase()) {
                                        case "select":
                                                return t("option:selected", i).length;
                                        case "input":
                                                if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                                }
                                return e.length
                        },
                        depend: function (t, e) {
                                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
                        },
                        dependTypes: {
                                "boolean": function (t) {
                                        return t
                                },
                                string: function (e, i) {
                                        return !!t(e, i.form).length
                                },
                                "function": function (t, e) {
                                        return t(e)
                                }
                        },
                        optional: function (e) {
                                var i = this.elementValue(e);
                                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
                        },
                        startRequest: function (t) {
                                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
                        },
                        stopRequest: function (e, i) {
                                this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                        },
                        previousValue: function (e) {
                                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                                        old: null,
                                        valid: !0,
                                        message: this.defaultMessage(e, "remote")
                                })
                        }
                },
                classRuleSettings: {
                        required: {
                                required: !0
                        },
                        email: {
                                email: !0
                        },
                        url: {
                                url: !0
                        },
                        date: {
                                date: !0
                        },
                        dateISO: {
                                dateISO: !0
                        },
                        number: {
                                number: !0
                        },
                        digits: {
                                digits: !0
                        },
                        creditcard: {
                                creditcard: !0
                        }
                },
                addClassRules: function (e, i) {
                        e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
                },
                classRules: function (e) {
                        var i = {},
                                s = t(e).attr("class");
                        return s && t.each(s.split(" "), function () {
                                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
                        }), i
                },
                attributeRules: function (e) {
                        var i = {},
                                s = t(e),
                                r = s[0].getAttribute("type");
                        for (var n in t.validator.methods) {
                                var a;
                                "required" === n ? (a = s.get(0).getAttribute(n), "" === a && (a = !0), a = !!a) : a = s.attr(n), /min|max/.test(n) && (null === r || /number|range|text/.test(r)) && (a = Number(a)), a ? i[n] = a : r === n && "range" !== r && (i[n] = !0)
                        }
                        return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
                },
                dataRules: function (e) {
                        var i, s, r = {},
                                n = t(e);
                        for (i in t.validator.methods) s = n.data("rule-" + i.toLowerCase()), void 0 !== s && (r[i] = s);
                        return r
                },
                staticRules: function (e) {
                        var i = {},
                                s = t.data(e.form, "validator");
                        return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
                },
                normalizeRules: function (e, i) {
                        return t.each(e, function (s, r) {
                                if (r === !1) return delete e[s], void 0;
                                if (r.param || r.depends) {
                                        var n = !0;
                                        switch (typeof r.depends) {
                                                case "string":
                                                        n = !!t(r.depends, i.form).length;
                                                        break;
                                                case "function":
                                                        n = r.depends.call(i, i)
                                        }
                                        n ? e[s] = void 0 !== r.param ? r.param : !0 : delete e[s]
                                }
                        }), t.each(e, function (s, r) {
                                e[s] = t.isFunction(r) ? r(i) : r
                        }), t.each(["minlength", "maxlength"], function () {
                                e[this] && (e[this] = Number(e[this]))
                        }), t.each(["rangelength", "range"], function () {
                                var i;
                                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
                        }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
                },
                normalizeRule: function (e) {
                        if ("string" == typeof e) {
                                var i = {};
                                t.each(e.split(/\s/), function () {
                                        i[this] = !0
                                }), e = i
                        }
                        return e
                },
                addMethod: function (e, i, s) {
                        t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], 3 > i.length && t.validator.addClassRules(e, t.validator.normalizeRule(e))
                },
                methods: {
                        required: function (e, i, s) {
                                if (!this.depend(s, i)) return "dependency-mismatch";
                                if ("select" === i.nodeName.toLowerCase()) {
                                        var r = t(i).val();
                                        return r && r.length > 0
                                }
                                return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
                        },
                        email: function (t, e) {
                                return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
                        },
                        url: function (t, e) {
                                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
                        },
                        date: function (t, e) {
                                return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t))
                        },
                        dateISO: function (t, e) {
                                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
                        },
                        number: function (t, e) {
                                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                        },
                        digits: function (t, e) {
                                return this.optional(e) || /^\d+$/.test(t)
                        },
                        creditcard: function (t, e) {
                                if (this.optional(e)) return "dependency-mismatch";
                                if (/[^0-9 \-]+/.test(t)) return !1;
                                var i = 0,
                                        s = 0,
                                        r = !1;
                                t = t.replace(/\D/g, "");
                                for (var n = t.length - 1; n >= 0; n--) {
                                        var a = t.charAt(n);
                                        s = parseInt(a, 10), r && (s *= 2) > 9 && (s -= 9), i += s, r = !r
                                }
                                return 0 === i % 10
                        },
                        minlength: function (e, i, s) {
                                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                                return this.optional(i) || r >= s
                        },
                        maxlength: function (e, i, s) {
                                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                                return this.optional(i) || s >= r
                        },
                        rangelength: function (e, i, s) {
                                var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                                return this.optional(i) || r >= s[0] && s[1] >= r
                        },
                        min: function (t, e, i) {
                                return this.optional(e) || t >= i
                        },
                        max: function (t, e, i) {
                                return this.optional(e) || i >= t
                        },
                        range: function (t, e, i) {
                                return this.optional(e) || t >= i[0] && i[1] >= t
                        },
                        equalTo: function (e, i, s) {
                                var r = t(s);
                                return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                                        t(i).valid()
                                }), e === r.val()
                        },
                        remote: function (e, i, s) {
                                if (this.optional(i)) return "dependency-mismatch";
                                var r = this.previousValue(i);
                                if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, s = "string" == typeof s && {
                                                url: s
                                        } || s, r.old === e) return r.valid;
                                r.old = e;
                                var n = this;
                                this.startRequest(i);
                                var a = {};
                                return a[i.name] = e, t.ajax(t.extend(!0, {
                                        url: s,
                                        mode: "abort",
                                        port: "validate" + i.name,
                                        dataType: "json",
                                        data: a,
                                        success: function (s) {
                                                n.settings.messages[i.name].remote = r.originalMessage;
                                                var a = s === !0 || "true" === s;
                                                if (a) {
                                                        var u = n.formSubmitted;
                                                        n.prepareElement(i), n.formSubmitted = u, n.successList.push(i), delete n.invalid[i.name], n.showErrors()
                                                } else {
                                                        var o = {},
                                                                l = s || n.defaultMessage(i, "remote");
                                                        o[i.name] = r.message = t.isFunction(l) ? l(e) : l, n.invalid[i.name] = !0, n.showErrors(o)
                                                }
                                                r.valid = a, n.stopRequest(i, a)
                                        }
                                }, s)), "pending"
                        }
                }
        }), t.format = t.validator.format
})(jQuery),
function (t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function (t, i, s) {
                var r = t.port;
                "abort" === t.mode && (e[r] && e[r].abort(), e[r] = s)
        });
        else {
                var i = t.ajax;
                t.ajax = function (s) {
                        var r = ("mode" in s ? s : t.ajaxSettings).mode,
                                n = ("port" in s ? s : t.ajaxSettings).port;
                        return "abort" === r ? (e[n] && e[n].abort(), e[n] = i.apply(this, arguments), e[n]) : i.apply(this, arguments)
                }
        }
}(jQuery),
function (t) {
        t.extend(t.fn, {
                validateDelegate: function (e, i, s) {
                        return this.bind(i, function (i) {
                                var r = t(i.target);
                                return r.is(e) ? s.apply(r, arguments) : void 0
                        })
                }
        })
}(jQuery);;
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (a) {
        "use strict";
        var b = a.fn.jquery.split(" ")[0].split(".");
        if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function (a) {
        "use strict";

        function b() {
                var a = document.createElement("bootstrap"),
                        b = {
                                WebkitTransition: "webkitTransitionEnd",
                                MozTransition: "transitionend",
                                OTransition: "oTransitionEnd otransitionend",
                                transition: "transitionend"
                        };
                for (var c in b)
                        if (void 0 !== a.style[c]) return {
                                end: b[c]
                        };
                return !1
        }
        a.fn.emulateTransitionEnd = function (b) {
                var c = !1,
                        d = this;
                a(this).one("bsTransitionEnd", function () {
                        c = !0
                });
                var e = function () {
                        c || a(d).trigger(a.support.transition.end)
                };
                return setTimeout(e, b), this
        }, a(function () {
                a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
                        bindType: a.support.transition.end,
                        delegateType: a.support.transition.end,
                        handle: function (b) {
                                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
                        }
                })
        })
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                return this.each(function () {
                        var c = a(this),
                                e = c.data("bs.alert");
                        e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
                })
        }
        var c = '[data-dismiss="alert"]',
                d = function (b) {
                        a(b).on("click", c, this.close)
                };
        d.VERSION = "3.3.5", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
                function c() {
                        g.detach().trigger("closed.bs.alert").remove()
                }
                var e = a(this),
                        f = e.attr("data-target");
                f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
                var g = a(f);
                b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
        };
        var e = a.fn.alert;
        a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
                return a.fn.alert = e, this
        }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                return this.each(function () {
                        var d = a(this),
                                e = d.data("bs.button"),
                                f = "object" == typeof b && b;
                        e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
                })
        }
        var c = function (b, d) {
                this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
        };
        c.VERSION = "3.3.5", c.DEFAULTS = {
                loadingText: "loading..."
        }, c.prototype.setState = function (b) {
                var c = "disabled",
                        d = this.$element,
                        e = d.is("input") ? "val" : "html",
                        f = d.data();
                b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
                        d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
                }, this), 0)
        }, c.prototype.toggle = function () {
                var a = !0,
                        b = this.$element.closest('[data-toggle="buttons"]');
                if (b.length) {
                        var c = this.$element.find("input");
                        "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
                } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
        };
        var d = a.fn.button;
        a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
                return a.fn.button = d, this
        }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
                var d = a(c.target);
                d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
                a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
        })
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                return this.each(function () {
                        var d = a(this),
                                e = d.data("bs.carousel"),
                                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                                g = "string" == typeof b ? b : f.slide;
                        e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
                })
        }
        var c = function (b, c) {
                this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
        };
        c.VERSION = "3.3.5", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
                interval: 5e3,
                pause: "hover",
                wrap: !0,
                keyboard: !0
        }, c.prototype.keydown = function (a) {
                if (!/input|textarea/i.test(a.target.tagName)) {
                        switch (a.which) {
                                case 37:
                                        this.prev();
                                        break;
                                case 39:
                                        this.next();
                                        break;
                                default:
                                        return
                        }
                        a.preventDefault()
                }
        }, c.prototype.cycle = function (b) {
                return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
        }, c.prototype.getItemIndex = function (a) {
                return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
        }, c.prototype.getItemForDirection = function (a, b) {
                var c = this.getItemIndex(b),
                        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
                if (d && !this.options.wrap) return b;
                var e = "prev" == a ? -1 : 1,
                        f = (c + e) % this.$items.length;
                return this.$items.eq(f)
        }, c.prototype.to = function (a) {
                var b = this,
                        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
                return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
                        b.to(a)
                }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
        }, c.prototype.pause = function (b) {
                return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, c.prototype.next = function () {
                return this.sliding ? void 0 : this.slide("next")
        }, c.prototype.prev = function () {
                return this.sliding ? void 0 : this.slide("prev")
        }, c.prototype.slide = function (b, d) {
                var e = this.$element.find(".item.active"),
                        f = d || this.getItemForDirection(b, e),
                        g = this.interval,
                        h = "next" == b ? "left" : "right",
                        i = this;
                if (f.hasClass("active")) return this.sliding = !1;
                var j = f[0],
                        k = a.Event("slide.bs.carousel", {
                                relatedTarget: j,
                                direction: h
                        });
                if (this.$element.trigger(k), !k.isDefaultPrevented()) {
                        if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                                this.$indicators.find(".active").removeClass("active");
                                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                                l && l.addClass("active")
                        }
                        var m = a.Event("slid.bs.carousel", {
                                relatedTarget: j,
                                direction: h
                        });
                        return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
                                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
                                        i.$element.trigger(m)
                                }, 0)
                        }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
                }
        };
        var d = a.fn.carousel;
        a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
                return a.fn.carousel = d, this
        };
        var e = function (c) {
                var d, e = a(this),
                        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
                if (f.hasClass("carousel")) {
                        var g = a.extend({}, f.data(), e.data()),
                                h = e.attr("data-slide-to");
                        h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
                }
        };
        a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
                a('[data-ride="carousel"]').each(function () {
                        var c = a(this);
                        b.call(c, c.data())
                })
        })
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
                return a(d)
        }

        function c(b) {
                return this.each(function () {
                        var c = a(this),
                                e = c.data("bs.collapse"),
                                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
                        !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
                })
        }
        var d = function (b, c) {
                this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };
        d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
                toggle: !0
        }, d.prototype.dimension = function () {
                var a = this.$element.hasClass("width");
                return a ? "width" : "height"
        }, d.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                        var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                        if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                                var f = a.Event("show.bs.collapse");
                                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                                        e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                                        var g = this.dimension();
                                        this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                                        var h = function () {
                                                this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                                        };
                                        if (!a.support.transition) return h.call(this);
                                        var i = a.camelCase(["scroll", g].join("-"));
                                        this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                                }
                        }
                }
        }, d.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                        var b = a.Event("hide.bs.collapse");
                        if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                                var c = this.dimension();
                                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                                var e = function () {
                                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                                };
                                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
                        }
                }
        }, d.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, d.prototype.getParent = function () {
                return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
                        var e = a(d);
                        this.addAriaAndCollapsedClass(b(e), e)
                }, this)).end()
        }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
                var c = a.hasClass("in");
                a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
        };
        var e = a.fn.collapse;
        a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
                return a.fn.collapse = e, this
        }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
                var e = a(this);
                e.attr("data-target") || d.preventDefault();
                var f = b(e),
                        g = f.data("bs.collapse"),
                        h = g ? "toggle" : e.data();
                c.call(f, h)
        })
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                var c = b.attr("data-target");
                c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
                var d = c && a(c);
                return d && d.length ? d : b.parent()
        }

        function c(c) {
                c && 3 === c.which || (a(e).remove(), a(f).each(function () {
                        var d = a(this),
                                e = b(d),
                                f = {
                                        relatedTarget: this
                                };
                        e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))))
                }))
        }

        function d(b) {
                return this.each(function () {
                        var c = a(this),
                                d = c.data("bs.dropdown");
                        d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
                })
        }
        var e = ".dropdown-backdrop",
                f = '[data-toggle="dropdown"]',
                g = function (b) {
                        a(b).on("click.bs.dropdown", this.toggle)
                };
        g.VERSION = "3.3.5", g.prototype.toggle = function (d) {
                var e = a(this);
                if (!e.is(".disabled, :disabled")) {
                        var f = b(e),
                                g = f.hasClass("open");
                        if (c(), !g) {
                                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                                var h = {
                                        relatedTarget: this
                                };
                                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
                        }
                        return !1
                }
        }, g.prototype.keydown = function (c) {
                if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
                        var d = a(this);
                        if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                                var e = b(d),
                                        g = e.hasClass("open");
                                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                                var h = " li:not(.disabled):visible a",
                                        i = e.find(".dropdown-menu" + h);
                                if (i.length) {
                                        var j = i.index(c.target);
                                        38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                                }
                        }
                }
        };
        var h = a.fn.dropdown;
        a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
                return a.fn.dropdown = h, this
        }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
                a.stopPropagation()
        }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function (a) {
        "use strict";

        function b(b, d) {
                return this.each(function () {
                        var e = a(this),
                                f = e.data("bs.modal"),
                                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
                        f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
                })
        }
        var c = function (b, c) {
                this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
                        this.$element.trigger("loaded.bs.modal")
                }, this))
        };
        c.VERSION = "3.3.5", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
                backdrop: !0,
                keyboard: !0,
                show: !0
        }, c.prototype.toggle = function (a) {
                return this.isShown ? this.hide() : this.show(a)
        }, c.prototype.show = function (b) {
                var d = this,
                        e = a.Event("show.bs.modal", {
                                relatedTarget: b
                        });
                this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
                        d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
                        })
                }), this.backdrop(function () {
                        var e = a.support.transition && d.$element.hasClass("fade");
                        d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
                        var f = a.Event("shown.bs.modal", {
                                relatedTarget: b
                        });
                        e ? d.$dialog.one("bsTransitionEnd", function () {
                                d.$element.trigger("focus").trigger(f)
                        }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
                }))
        }, c.prototype.hide = function (b) {
                b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
        }, c.prototype.enforceFocus = function () {
                a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
                        this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
                }, this))
        }, c.prototype.escape = function () {
                this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
                        27 == a.which && this.hide()
                }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
        }, c.prototype.resize = function () {
                this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
        }, c.prototype.hideModal = function () {
                var a = this;
                this.$element.hide(), this.backdrop(function () {
                        a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
                })
        }, c.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, c.prototype.backdrop = function (b) {
                var d = this,
                        e = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                        var f = a.support.transition && e;
                        if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                                        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
                        f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
                } else if (!this.isShown && this.$backdrop) {
                        this.$backdrop.removeClass("in");
                        var g = function () {
                                d.removeBackdrop(), b && b()
                        };
                        a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
                } else b && b()
        }, c.prototype.handleUpdate = function () {
                this.adjustDialog()
        }, c.prototype.adjustDialog = function () {
                var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                this.$element.css({
                        paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
                        paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
                })
        }, c.prototype.resetAdjustments = function () {
                this.$element.css({
                        paddingLeft: "",
                        paddingRight: ""
                })
        }, c.prototype.checkScrollbar = function () {
                var a = window.innerWidth;
                if (!a) {
                        var b = document.documentElement.getBoundingClientRect();
                        a = b.right - Math.abs(b.left)
                }
                this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
        }, c.prototype.setScrollbar = function () {
                var a = parseInt(this.$body.css("padding-right") || 0, 10);
                this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
        }, c.prototype.resetScrollbar = function () {
                this.$body.css("padding-right", this.originalBodyPad)
        }, c.prototype.measureScrollbar = function () {
                var a = document.createElement("div");
                a.className = "modal-scrollbar-measure", this.$body.append(a);
                var b = a.offsetWidth - a.clientWidth;
                return this.$body[0].removeChild(a), b
        };
        var d = a.fn.modal;
        a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
                return a.fn.modal = d, this
        }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
                var d = a(this),
                        e = d.attr("href"),
                        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
                        g = f.data("bs.modal") ? "toggle" : a.extend({
                                remote: !/#/.test(e) && e
                        }, f.data(), d.data());
                d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
                        a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                                d.is(":visible") && d.trigger("focus")
                        })
                }), b.call(f, g, this)
        })
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                return this.each(function () {
                        var d = a(this),
                                e = d.data("bs.tooltip"),
                                f = "object" == typeof b && b;
                        (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
                })
        }
        var c = function (a, b) {
                this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
        };
        c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: {
                        selector: "body",
                        padding: 0
                }
        }, c.prototype.init = function (b, c, d) {
                if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                                click: !1,
                                hover: !1,
                                focus: !1
                        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
                        var g = e[f];
                        if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
                        else if ("manual" != g) {
                                var h = "hover" == g ? "mouseenter" : "focusin",
                                        i = "hover" == g ? "mouseleave" : "focusout";
                                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
                        }
                }
                this.options.selector ? this._options = a.extend({}, this.options, {
                        trigger: "manual",
                        selector: ""
                }) : this.fixTitle()
        }, c.prototype.getDefaults = function () {
                return c.DEFAULTS
        }, c.prototype.getOptions = function (b) {
                return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
                        show: b.delay,
                        hide: b.delay
                }), b
        }, c.prototype.getDelegateOptions = function () {
                var b = {},
                        c = this.getDefaults();
                return this._options && a.each(this._options, function (a, d) {
                        c[a] != d && (b[a] = d)
                }), b
        }, c.prototype.enter = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
                        "in" == c.hoverState && c.show()
                }, c.options.delay.show)) : c.show())
        }, c.prototype.isInStateTrue = function () {
                for (var a in this.inState)
                        if (this.inState[a]) return !0;
                return !1
        }, c.prototype.leave = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
                        "out" == c.hoverState && c.hide()
                }, c.options.delay.hide)) : c.hide())
        }, c.prototype.show = function () {
                var b = a.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                        this.$element.trigger(b);
                        var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                        if (b.isDefaultPrevented() || !d) return;
                        var e = this,
                                f = this.tip(),
                                g = this.getUID(this.type);
                        this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
                        var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                                i = /\s?auto?\s?/i,
                                j = i.test(h);
                        j && (h = h.replace(i, "") || "top"), f.detach().css({
                                top: 0,
                                left: 0,
                                display: "block"
                        }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
                        var k = this.getPosition(),
                                l = f[0].offsetWidth,
                                m = f[0].offsetHeight;
                        if (j) {
                                var n = h,
                                        o = this.getPosition(this.$viewport);
                                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
                        }
                        var p = this.getCalculatedOffset(h, k, l, m);
                        this.applyPlacement(p, h);
                        var q = function () {
                                var a = e.hoverState;
                                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
                        };
                        a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
                }
        }, c.prototype.applyPlacement = function (b, c) {
                var d = this.tip(),
                        e = d[0].offsetWidth,
                        f = d[0].offsetHeight,
                        g = parseInt(d.css("margin-top"), 10),
                        h = parseInt(d.css("margin-left"), 10);
                isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
                        using: function (a) {
                                d.css({
                                        top: Math.round(a.top),
                                        left: Math.round(a.left)
                                })
                        }
                }, b), 0), d.addClass("in");
                var i = d[0].offsetWidth,
                        j = d[0].offsetHeight;
                "top" == c && j != f && (b.top = b.top + f - j);
                var k = this.getViewportAdjustedDelta(c, b, i, j);
                k.left ? b.left += k.left : b.top += k.top;
                var l = /top|bottom/.test(c),
                        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
                        n = l ? "offsetWidth" : "offsetHeight";
                d.offset(b), this.replaceArrow(m, d[0][n], l)
        }, c.prototype.replaceArrow = function (a, b, c) {
                this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
        }, c.prototype.setContent = function () {
                var a = this.tip(),
                        b = this.getTitle();
                a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
        }, c.prototype.hide = function (b) {
                function d() {
                        "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
                }
                var e = this,
                        f = a(this.$tip),
                        g = a.Event("hide.bs." + this.type);
                return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
        }, c.prototype.fixTitle = function () {
                var a = this.$element;
                (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
        }, c.prototype.hasContent = function () {
                return this.getTitle()
        }, c.prototype.getPosition = function (b) {
                b = b || this.$element;
                var c = b[0],
                        d = "BODY" == c.tagName,
                        e = c.getBoundingClientRect();
                null == e.width && (e = a.extend({}, e, {
                        width: e.right - e.left,
                        height: e.bottom - e.top
                }));
                var f = d ? {
                                top: 0,
                                left: 0
                        } : b.offset(),
                        g = {
                                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
                        },
                        h = d ? {
                                width: a(window).width(),
                                height: a(window).height()
                        } : null;
                return a.extend({}, e, g, h, f)
        }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
                return "bottom" == a ? {
                        top: b.top + b.height,
                        left: b.left + b.width / 2 - c / 2
                } : "top" == a ? {
                        top: b.top - d,
                        left: b.left + b.width / 2 - c / 2
                } : "left" == a ? {
                        top: b.top + b.height / 2 - d / 2,
                        left: b.left - c
                } : {
                        top: b.top + b.height / 2 - d / 2,
                        left: b.left + b.width
                }
        }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
                var e = {
                        top: 0,
                        left: 0
                };
                if (!this.$viewport) return e;
                var f = this.options.viewport && this.options.viewport.padding || 0,
                        g = this.getPosition(this.$viewport);
                if (/right|left/.test(a)) {
                        var h = b.top - f - g.scroll,
                                i = b.top + f - g.scroll + d;
                        h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
                } else {
                        var j = b.left - f,
                                k = b.left + f + c;
                        j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
                }
                return e
        }, c.prototype.getTitle = function () {
                var a, b = this.$element,
                        c = this.options;
                return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
        }, c.prototype.getUID = function (a) {
                do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
                return a
        }, c.prototype.tip = function () {
                if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
                return this.$tip
        }, c.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, c.prototype.enable = function () {
                this.enabled = !0
        }, c.prototype.disable = function () {
                this.enabled = !1
        }, c.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled
        }, c.prototype.toggle = function (b) {
                var c = this;
                b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
        }, c.prototype.destroy = function () {
                var a = this;
                clearTimeout(this.timeout), this.hide(function () {
                        a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
                })
        };
        var d = a.fn.tooltip;
        a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
                return a.fn.tooltip = d, this
        }
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                return this.each(function () {
                        var d = a(this),
                                e = d.data("bs.popover"),
                                f = "object" == typeof b && b;
                        (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
                })
        }
        var c = function (a, b) {
                this.init("popover", a, b)
        };
        if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
        c.VERSION = "3.3.5", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
                return c.DEFAULTS
        }, c.prototype.setContent = function () {
                var a = this.tip(),
                        b = this.getTitle(),
                        c = this.getContent();
                a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
        }, c.prototype.hasContent = function () {
                return this.getTitle() || this.getContent()
        }, c.prototype.getContent = function () {
                var a = this.$element,
                        b = this.options;
                return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
        }, c.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };
        var d = a.fn.popover;
        a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
                return a.fn.popover = d, this
        }
}(jQuery), + function (a) {
        "use strict";

        function b(c, d) {
                this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
        }

        function c(c) {
                return this.each(function () {
                        var d = a(this),
                                e = d.data("bs.scrollspy"),
                                f = "object" == typeof c && c;
                        e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
                })
        }
        b.VERSION = "3.3.5", b.DEFAULTS = {
                offset: 10
        }, b.prototype.getScrollHeight = function () {
                return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, b.prototype.refresh = function () {
                var b = this,
                        c = "offset",
                        d = 0;
                this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
                        var b = a(this),
                                e = b.data("target") || b.attr("href"),
                                f = /^#./.test(e) && a(e);
                        return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null
                }).sort(function (a, b) {
                        return a[0] - b[0]
                }).each(function () {
                        b.offsets.push(this[0]), b.targets.push(this[1])
                })
        }, b.prototype.process = function () {
                var a, b = this.$scrollElement.scrollTop() + this.options.offset,
                        c = this.getScrollHeight(),
                        d = this.options.offset + c - this.$scrollElement.height(),
                        e = this.offsets,
                        f = this.targets,
                        g = this.activeTarget;
                if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
                if (g && b < e[0]) return this.activeTarget = null, this.clear();
                for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
        }, b.prototype.activate = function (b) {
                this.activeTarget = b, this.clear();
                var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
                        d = a(c).parents("li").addClass("active");
                d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
        }, b.prototype.clear = function () {
                a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };
        var d = a.fn.scrollspy;
        a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
                return a.fn.scrollspy = d, this
        }, a(window).on("load.bs.scrollspy.data-api", function () {
                a('[data-spy="scroll"]').each(function () {
                        var b = a(this);
                        c.call(b, b.data())
                })
        })
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                return this.each(function () {
                        var d = a(this),
                                e = d.data("bs.tab");
                        e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
                })
        }
        var c = function (b) {
                this.element = a(b)
        };
        c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
                var b = this.element,
                        c = b.closest("ul:not(.dropdown-menu)"),
                        d = b.data("target");
                if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
                        var e = c.find(".active:last a"),
                                f = a.Event("hide.bs.tab", {
                                        relatedTarget: b[0]
                                }),
                                g = a.Event("show.bs.tab", {
                                        relatedTarget: e[0]
                                });
                        if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                                var h = a(d);
                                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
                                        e.trigger({
                                                type: "hidden.bs.tab",
                                                relatedTarget: b[0]
                                        }), b.trigger({
                                                type: "shown.bs.tab",
                                                relatedTarget: e[0]
                                        })
                                })
                        }
                }
        }, c.prototype.activate = function (b, d, e) {
                function f() {
                        g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
                }
                var g = d.find("> .active"),
                        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
                g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
        };
        var d = a.fn.tab;
        a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
                return a.fn.tab = d, this
        };
        var e = function (c) {
                c.preventDefault(), b.call(a(this), "show")
        };
        a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function (a) {
        "use strict";

        function b(b) {
                return this.each(function () {
                        var d = a(this),
                                e = d.data("bs.affix"),
                                f = "object" == typeof b && b;
                        e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
                })
        }
        var c = function (b, d) {
                this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
        };
        c.VERSION = "3.3.5", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
                offset: 0,
                target: window
        }, c.prototype.getState = function (a, b, c, d) {
                var e = this.$target.scrollTop(),
                        f = this.$element.offset(),
                        g = this.$target.height();
                if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
                if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
                var h = null == this.affixed,
                        i = h ? e : f.top,
                        j = h ? g : b;
                return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
        }, c.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(c.RESET).addClass("affix");
                var a = this.$target.scrollTop(),
                        b = this.$element.offset();
                return this.pinnedOffset = b.top - a
        }, c.prototype.checkPositionWithEventLoop = function () {
                setTimeout(a.proxy(this.checkPosition, this), 1)
        }, c.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                        var b = this.$element.height(),
                                d = this.options.offset,
                                e = d.top,
                                f = d.bottom,
                                g = Math.max(a(document).height(), a(document.body).height());
                        "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
                        var h = this.getState(g, b, e, f);
                        if (this.affixed != h) {
                                null != this.unpin && this.$element.css("top", "");
                                var i = "affix" + (h ? "-" + h : ""),
                                        j = a.Event(i + ".bs.affix");
                                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
                        }
                        "bottom" == h && this.$element.offset({
                                top: g - b - f
                        })
                }
        };
        var d = a.fn.affix;
        a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
                return a.fn.affix = d, this
        }, a(window).on("load", function () {
                a('[data-spy="affix"]').each(function () {
                        var c = a(this),
                                d = c.data();
                        d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
                })
        })
}(jQuery);;
if (typeof Object.create !== "function") {
        Object.create = function (obj) {
                function F() {}
                F.prototype = obj;
                return new F();
        };
}(function ($, window, document) {
        var Carousel = {
                init: function (options, el) {
                        var base = this;
                        base.$elem = $(el);
                        base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);
                        base.userOptions = options;
                        base.loadContent();
                },
                loadContent: function () {
                        var base = this,
                                url;

                        function getData(data) {
                                var i, content = "";
                                if (typeof base.options.jsonSuccess === "function") {
                                        base.options.jsonSuccess.apply(this, [data]);
                                } else {
                                        for (i in data.owl) {
                                                if (data.owl.hasOwnProperty(i)) {
                                                        content += data.owl[i].item;
                                                }
                                        }
                                        base.$elem.html(content);
                                }
                                base.logIn();
                        }
                        if (typeof base.options.beforeInit === "function") {
                                base.options.beforeInit.apply(this, [base.$elem]);
                        }
                        if (typeof base.options.jsonPath === "string") {
                                url = base.options.jsonPath;
                                $.getJSON(url, getData);
                        } else {
                                base.logIn();
                        }
                },
                logIn: function () {
                        var base = this;
                        base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
                        base.$elem.data("owl-originalClasses", base.$elem.attr("class"));
                        base.$elem.css({
                                opacity: 0
                        });
                        base.orignalItems = base.options.items;
                        base.checkBrowser();
                        base.wrapperWidth = 0;
                        base.checkVisible = null;
                        base.setVars();
                },
                setVars: function () {
                        var base = this;
                        if (base.$elem.children().length === 0) {
                                return false;
                        }
                        base.baseClass();
                        base.eventTypes();
                        base.$userItems = base.$elem.children();
                        base.itemsAmount = base.$userItems.length;
                        base.wrapItems();
                        base.$owlItems = base.$elem.find(".owl-item");
                        base.$owlWrapper = base.$elem.find(".owl-wrapper");
                        base.playDirection = "next";
                        base.prevItem = 0;
                        base.prevArr = [0];
                        base.currentItem = 0;
                        base.customEvents();
                        base.onStartup();
                },
                onStartup: function () {
                        var base = this;
                        base.updateItems();
                        base.calculateAll();
                        base.buildControls();
                        base.updateControls();
                        base.response();
                        base.moveEvents();
                        base.stopOnHover();
                        base.owlStatus();
                        if (base.options.transitionStyle !== false) {
                                base.transitionTypes(base.options.transitionStyle);
                        }
                        if (base.options.autoPlay === true) {
                                base.options.autoPlay = 5000;
                        }
                        base.play();
                        base.$elem.find(".owl-wrapper").css("display", "block");
                        if (!base.$elem.is(":visible")) {
                                base.watchVisibility();
                        } else {
                                base.$elem.css("opacity", 1);
                        }
                        base.onstartup = false;
                        base.eachMoveUpdate();
                        if (typeof base.options.afterInit === "function") {
                                base.options.afterInit.apply(this, [base.$elem]);
                        }
                },
                eachMoveUpdate: function () {
                        var base = this;
                        if (base.options.lazyLoad === true) {
                                base.lazyLoad();
                        }
                        if (base.options.autoHeight === true) {
                                base.autoHeight();
                        }
                        base.onVisibleItems();
                        if (typeof base.options.afterAction === "function") {
                                base.options.afterAction.apply(this, [base.$elem]);
                        }
                },
                updateVars: function () {
                        var base = this;
                        if (typeof base.options.beforeUpdate === "function") {
                                base.options.beforeUpdate.apply(this, [base.$elem]);
                        }
                        base.watchVisibility();
                        base.updateItems();
                        base.calculateAll();
                        base.updatePosition();
                        base.updateControls();
                        base.eachMoveUpdate();
                        if (typeof base.options.afterUpdate === "function") {
                                base.options.afterUpdate.apply(this, [base.$elem]);
                        }
                },
                reload: function () {
                        var base = this;
                        window.setTimeout(function () {
                                base.updateVars();
                        }, 0);
                },
                watchVisibility: function () {
                        var base = this;
                        if (base.$elem.is(":visible") === false) {
                                base.$elem.css({
                                        opacity: 0
                                });
                                window.clearInterval(base.autoPlayInterval);
                                window.clearInterval(base.checkVisible);
                        } else {
                                return false;
                        }
                        base.checkVisible = window.setInterval(function () {
                                if (base.$elem.is(":visible")) {
                                        base.reload();
                                        base.$elem.animate({
                                                opacity: 1
                                        }, 200);
                                        window.clearInterval(base.checkVisible);
                                }
                        }, 500);
                },
                wrapItems: function () {
                        var base = this;
                        base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
                        base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
                        base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
                        base.$elem.css("display", "block");
                },
                baseClass: function () {
                        var base = this,
                                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                                hasThemeClass = base.$elem.hasClass(base.options.theme);
                        if (!hasBaseClass) {
                                base.$elem.addClass(base.options.baseClass);
                        }
                        if (!hasThemeClass) {
                                base.$elem.addClass(base.options.theme);
                        }
                },
                updateItems: function () {
                        var base = this,
                                width, i;
                        if (base.options.responsive === false) {
                                return false;
                        }
                        if (base.options.singleItem === true) {
                                base.options.items = base.orignalItems = 1;
                                base.options.itemsCustom = false;
                                base.options.itemsDesktop = false;
                                base.options.itemsDesktopSmall = false;
                                base.options.itemsTablet = false;
                                base.options.itemsTabletSmall = false;
                                base.options.itemsMobile = false;
                                return false;
                        }
                        width = $(base.options.responsiveBaseWidth).width();
                        if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                                base.options.items = base.orignalItems;
                        }
                        if (base.options.itemsCustom !== false) {
                                base.options.itemsCustom.sort(function (a, b) {
                                        return a[0] - b[0];
                                });
                                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                                        if (base.options.itemsCustom[i][0] <= width) {
                                                base.options.items = base.options.itemsCustom[i][1];
                                        }
                                }
                        } else {
                                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                                        base.options.items = base.options.itemsDesktop[1];
                                }
                                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                                        base.options.items = base.options.itemsDesktopSmall[1];
                                }
                                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                                        base.options.items = base.options.itemsTablet[1];
                                }
                                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                                        base.options.items = base.options.itemsTabletSmall[1];
                                }
                                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                                        base.options.items = base.options.itemsMobile[1];
                                }
                        }
                        if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                                base.options.items = base.itemsAmount;
                        }
                },
                response: function () {
                        var base = this,
                                smallDelay, lastWindowWidth;
                        if (base.options.responsive !== true) {
                                return false;
                        }
                        lastWindowWidth = $(window).width();
                        base.resizer = function () {
                                if ($(window).width() !== lastWindowWidth) {
                                        if (base.options.autoPlay !== false) {
                                                window.clearInterval(base.autoPlayInterval);
                                        }
                                        window.clearTimeout(smallDelay);
                                        smallDelay = window.setTimeout(function () {
                                                lastWindowWidth = $(window).width();
                                                base.updateVars();
                                        }, base.options.responsiveRefreshRate);
                                }
                        };
                        $(window).resize(base.resizer);
                },
                updatePosition: function () {
                        var base = this;
                        base.jumpTo(base.currentItem);
                        if (base.options.autoPlay !== false) {
                                base.checkAp();
                        }
                },
                appendItemsSizes: function () {
                        var base = this,
                                roundPages = 0,
                                lastItem = base.itemsAmount - base.options.items;
                        base.$owlItems.each(function (index) {
                                var $this = $(this);
                                $this.css({
                                        "width": base.itemWidth
                                }).data("owl-item", Number(index));
                                if (index % base.options.items === 0 || index === lastItem) {
                                        if (!(index > lastItem)) {
                                                roundPages += 1;
                                        }
                                }
                                $this.data("owl-roundPages", roundPages);
                        });
                },
                appendWrapperSizes: function () {
                        var base = this,
                                width = base.$owlItems.length * base.itemWidth;
                        base.$owlWrapper.css({
                                "width": width * 2,
                                "left": 0
                        });
                        base.appendItemsSizes();
                },
                calculateAll: function () {
                        var base = this;
                        base.calculateWidth();
                        base.appendWrapperSizes();
                        base.loops();
                        base.max();
                },
                calculateWidth: function () {
                        var base = this;
                        base.itemWidth = Math.round(base.$elem.width() / base.options.items);
                },
                max: function () {
                        var base = this,
                                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
                        if (base.options.items > base.itemsAmount) {
                                base.maximumItem = 0;
                                maximum = 0;
                                base.maximumPixels = 0;
                        } else {
                                base.maximumItem = base.itemsAmount - base.options.items;
                                base.maximumPixels = maximum;
                        }
                        return maximum;
                },
                min: function () {
                        return 0;
                },
                loops: function () {
                        var base = this,
                                prev = 0,
                                elWidth = 0,
                                i, item, roundPageNum;
                        base.positionsInArray = [0];
                        base.pagesInArray = [];
                        for (i = 0; i < base.itemsAmount; i += 1) {
                                elWidth += base.itemWidth;
                                base.positionsInArray.push(-elWidth);
                                if (base.options.scrollPerPage === true) {
                                        item = $(base.$owlItems[i]);
                                        roundPageNum = item.data("owl-roundPages");
                                        if (roundPageNum !== prev) {
                                                base.pagesInArray[prev] = base.positionsInArray[i];
                                                prev = roundPageNum;
                                        }
                                }
                        }
                },
                buildControls: function () {
                        var base = this;
                        if (base.options.navigation === true || base.options.pagination === true) {
                                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
                        }
                        if (base.options.pagination === true) {
                                base.buildPagination();
                        }
                        if (base.options.navigation === true) {
                                base.buildButtons();
                        }
                },
                buildButtons: function () {
                        var base = this,
                                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
                        base.owlControls.append(buttonsWrapper);
                        base.buttonPrev = $("<div/>", {
                                "class": "owl-prev",
                                "html": base.options.navigationText[0] || ""
                        });
                        base.buttonNext = $("<div/>", {
                                "class": "owl-next",
                                "html": base.options.navigationText[1] || ""
                        });
                        buttonsWrapper.append(base.buttonPrev).append(base.buttonNext);
                        buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                                event.preventDefault();
                        });
                        buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                                event.preventDefault();
                                if ($(this).hasClass("owl-next")) {
                                        base.next();
                                } else {
                                        base.prev();
                                }
                        });
                },
                buildPagination: function () {
                        var base = this;
                        base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
                        base.owlControls.append(base.paginationWrapper);
                        base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                                event.preventDefault();
                                if (Number($(this).data("owl-page")) !== base.currentItem) {
                                        base.goTo(Number($(this).data("owl-page")), true);
                                }
                        });
                },
                updatePagination: function () {
                        var base = this,
                                counter, lastPage, lastItem, i, paginationButton, paginationButtonInner;
                        if (base.options.pagination === false) {
                                return false;
                        }
                        base.paginationWrapper.html("");
                        counter = 0;
                        lastPage = base.itemsAmount - base.itemsAmount % base.options.items;
                        for (i = 0; i < base.itemsAmount; i += 1) {
                                if (i % base.options.items === 0) {
                                        counter += 1;
                                        if (lastPage === i) {
                                                lastItem = base.itemsAmount - base.options.items;
                                        }
                                        paginationButton = $("<div/>", {
                                                "class": "owl-page"
                                        });
                                        paginationButtonInner = $("<span></span>", {
                                                "text": base.options.paginationNumbers === true ? counter : "",
                                                "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                                        });
                                        paginationButton.append(paginationButtonInner);
                                        paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                                        paginationButton.data("owl-roundPages", counter);
                                        base.paginationWrapper.append(paginationButton);
                                }
                        }
                        base.checkPagination();
                },
                checkPagination: function () {
                        var base = this;
                        if (base.options.pagination === false) {
                                return false;
                        }
                        base.paginationWrapper.find(".owl-page").each(function () {
                                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                                        base.paginationWrapper.find(".owl-page").removeClass("active");
                                        $(this).addClass("active");
                                }
                        });
                },
                checkNavigation: function () {
                        var base = this;
                        if (base.options.navigation === false) {
                                return false;
                        }
                        if (base.options.rewindNav === false) {
                                if (base.currentItem === 0 && base.maximumItem === 0) {
                                        base.buttonPrev.addClass("disabled");
                                        base.buttonNext.addClass("disabled");
                                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                                        base.buttonPrev.addClass("disabled");
                                        base.buttonNext.removeClass("disabled");
                                } else if (base.currentItem === base.maximumItem) {
                                        base.buttonPrev.removeClass("disabled");
                                        base.buttonNext.addClass("disabled");
                                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                                        base.buttonPrev.removeClass("disabled");
                                        base.buttonNext.removeClass("disabled");
                                }
                        }
                },
                updateControls: function () {
                        var base = this;
                        base.updatePagination();
                        base.checkNavigation();
                        if (base.owlControls) {
                                if (base.options.items >= base.itemsAmount) {
                                        base.owlControls.hide();
                                } else {
                                        base.owlControls.show();
                                }
                        }
                },
                destroyControls: function () {
                        var base = this;
                        if (base.owlControls) {
                                base.owlControls.remove();
                        }
                },
                next: function (speed) {
                        var base = this;
                        if (base.isTransition) {
                                return false;
                        }
                        base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
                        if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                                if (base.options.rewindNav === true) {
                                        base.currentItem = 0;
                                        speed = "rewind";
                                } else {
                                        base.currentItem = base.maximumItem;
                                        return false;
                                }
                        }
                        base.goTo(base.currentItem, speed);
                },
                prev: function (speed) {
                        var base = this;
                        if (base.isTransition) {
                                return false;
                        }
                        if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                                base.currentItem = 0;
                        } else {
                                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
                        }
                        if (base.currentItem < 0) {
                                if (base.options.rewindNav === true) {
                                        base.currentItem = base.maximumItem;
                                        speed = "rewind";
                                } else {
                                        base.currentItem = 0;
                                        return false;
                                }
                        }
                        base.goTo(base.currentItem, speed);
                },
                goTo: function (position, speed, drag) {
                        var base = this,
                                goToPixel;
                        if (base.isTransition) {
                                return false;
                        }
                        if (typeof base.options.beforeMove === "function") {
                                base.options.beforeMove.apply(this, [base.$elem]);
                        }
                        if (position >= base.maximumItem) {
                                position = base.maximumItem;
                        } else if (position <= 0) {
                                position = 0;
                        }
                        base.currentItem = base.owl.currentItem = position;
                        if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                                base.swapSpeed(0);
                                if (base.browser.support3d === true) {
                                        base.transition3d(base.positionsInArray[position]);
                                } else {
                                        base.css2slide(base.positionsInArray[position], 1);
                                }
                                base.afterGo();
                                base.singleItemTransition();
                                return false;
                        }
                        goToPixel = base.positionsInArray[position];
                        if (base.browser.support3d === true) {
                                base.isCss3Finish = false;
                                if (speed === true) {
                                        base.swapSpeed("paginationSpeed");
                                        window.setTimeout(function () {
                                                base.isCss3Finish = true;
                                        }, base.options.paginationSpeed);
                                } else if (speed === "rewind") {
                                        base.swapSpeed(base.options.rewindSpeed);
                                        window.setTimeout(function () {
                                                base.isCss3Finish = true;
                                        }, base.options.rewindSpeed);
                                } else {
                                        base.swapSpeed("slideSpeed");
                                        window.setTimeout(function () {
                                                base.isCss3Finish = true;
                                        }, base.options.slideSpeed);
                                }
                                base.transition3d(goToPixel);
                        } else {
                                if (speed === true) {
                                        base.css2slide(goToPixel, base.options.paginationSpeed);
                                } else if (speed === "rewind") {
                                        base.css2slide(goToPixel, base.options.rewindSpeed);
                                } else {
                                        base.css2slide(goToPixel, base.options.slideSpeed);
                                }
                        }
                        base.afterGo();
                },
                jumpTo: function (position) {
                        var base = this;
                        if (typeof base.options.beforeMove === "function") {
                                base.options.beforeMove.apply(this, [base.$elem]);
                        }
                        if (position >= base.maximumItem || position === -1) {
                                position = base.maximumItem;
                        } else if (position <= 0) {
                                position = 0;
                        }
                        base.swapSpeed(0);
                        if (base.browser.support3d === true) {
                                base.transition3d(base.positionsInArray[position]);
                        } else {
                                base.css2slide(base.positionsInArray[position], 1);
                        }
                        base.currentItem = base.owl.currentItem = position;
                        base.afterGo();
                },
                afterGo: function () {
                        var base = this;
                        base.prevArr.push(base.currentItem);
                        base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
                        base.prevArr.shift(0);
                        if (base.prevItem !== base.currentItem) {
                                base.checkPagination();
                                base.checkNavigation();
                                base.eachMoveUpdate();
                                if (base.options.autoPlay !== false) {
                                        base.checkAp();
                                }
                        }
                        if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                                base.options.afterMove.apply(this, [base.$elem]);
                        }
                },
                stop: function () {
                        var base = this;
                        base.apStatus = "stop";
                        window.clearInterval(base.autoPlayInterval);
                },
                checkAp: function () {
                        var base = this;
                        if (base.apStatus !== "stop") {
                                base.play();
                        }
                },
                play: function () {
                        var base = this;
                        base.apStatus = "play";
                        if (base.options.autoPlay === false) {
                                return false;
                        }
                        window.clearInterval(base.autoPlayInterval);
                        base.autoPlayInterval = window.setInterval(function () {
                                base.next(true);
                        }, base.options.autoPlay);
                },
                swapSpeed: function (action) {
                        var base = this;
                        if (action === "slideSpeed") {
                                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
                        } else if (action === "paginationSpeed") {
                                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
                        } else if (typeof action !== "string") {
                                base.$owlWrapper.css(base.addCssSpeed(action));
                        }
                },
                addCssSpeed: function (speed) {
                        return {
                                "-webkit-transition": "all " + speed + "ms ease",
                                "-moz-transition": "all " + speed + "ms ease",
                                "-o-transition": "all " + speed + "ms ease",
                                "transition": "all " + speed + "ms ease"
                        };
                },
                removeTransition: function () {
                        return {
                                "-webkit-transition": "",
                                "-moz-transition": "",
                                "-o-transition": "",
                                "transition": ""
                        };
                },
                doTranslate: function (pixels) {
                        return {
                                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                                "transform": "translate3d(" + pixels + "px, 0px,0px)"
                        };
                },
                transition3d: function (value) {
                        var base = this;
                        base.$owlWrapper.css(base.doTranslate(value));
                },
                css2move: function (value) {
                        var base = this;
                        base.$owlWrapper.css({
                                "left": value
                        });
                },
                css2slide: function (value, speed) {
                        var base = this;
                        base.isCssFinish = false;
                        base.$owlWrapper.stop(true, true).animate({
                                "left": value
                        }, {
                                duration: speed || base.options.slideSpeed,
                                complete: function () {
                                        base.isCssFinish = true;
                                }
                        });
                },
                checkBrowser: function () {
                        var base = this,
                                translate3D = "translate3d(0px, 0px, 0px)",
                                tempElem = document.createElement("div"),
                                regex, asSupport, support3d, isTouch;
                        tempElem.style.cssText = "  -moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D;
                        regex = /translate3d\(0px, 0px, 0px\)/g;
                        asSupport = tempElem.style.cssText.match(regex);
                        support3d = (asSupport !== null && asSupport.length === 1);
                        isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;
                        base.browser = {
                                "support3d": support3d,
                                "isTouch": isTouch
                        };
                },
                moveEvents: function () {
                        var base = this;
                        if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                                base.gestures();
                                base.disabledEvents();
                        }
                },
                eventTypes: function () {
                        var base = this,
                                types = ["s", "e", "x"];
                        base.ev_types = {};
                        if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                                types = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"];
                        } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                                types = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"];
                        } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                                types = ["mousedown.owl", "mousemove.owl", "mouseup.owl"];
                        }
                        base.ev_types.start = types[0];
                        base.ev_types.move = types[1];
                        base.ev_types.end = types[2];
                },
                disabledEvents: function () {
                        var base = this;
                        base.$elem.on("dragstart.owl", function (event) {
                                event.preventDefault();
                        });
                        base.$elem.on("mousedown.disableTextSelect", function (e) {
                                return $(e.target).is('input, textarea, select, option');
                        });
                },
                gestures: function () {
                        var base = this,
                                locals = {
                                        offsetX: 0,
                                        offsetY: 0,
                                        baseElWidth: 0,
                                        relativePos: 0,
                                        position: null,
                                        minSwipe: null,
                                        maxSwipe: null,
                                        sliding: null,
                                        dargging: null,
                                        targetElement: null
                                };
                        base.isCssFinish = true;

                        function getTouches(event) {
                                if (event.touches !== undefined) {
                                        return {
                                                x: event.touches[0].pageX,
                                                y: event.touches[0].pageY
                                        };
                                }
                                if (event.touches === undefined) {
                                        if (event.pageX !== undefined) {
                                                return {
                                                        x: event.pageX,
                                                        y: event.pageY
                                                };
                                        }
                                        if (event.pageX === undefined) {
                                                return {
                                                        x: event.clientX,
                                                        y: event.clientY
                                                };
                                        }
                                }
                        }

                        function swapEvents(type) {
                                if (type === "on") {
                                        $(document).on(base.ev_types.move, dragMove);
                                        $(document).on(base.ev_types.end, dragEnd);
                                } else if (type === "off") {
                                        $(document).off(base.ev_types.move);
                                        $(document).off(base.ev_types.end);
                                }
                        }

                        function dragStart(event) {
                                var ev = event.originalEvent || event || window.event,
                                        position;
                                if (ev.which === 3) {
                                        return false;
                                }
                                if (base.itemsAmount <= base.options.items) {
                                        return;
                                }
                                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                                        return false;
                                }
                                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                                        return false;
                                }
                                if (base.options.autoPlay !== false) {
                                        window.clearInterval(base.autoPlayInterval);
                                }
                                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                                        base.$owlWrapper.addClass("grabbing");
                                }
                                base.newPosX = 0;
                                base.newRelativeX = 0;
                                $(this).css(base.removeTransition());
                                position = $(this).position();
                                locals.relativePos = position.left;
                                locals.offsetX = getTouches(ev).x - position.left;
                                locals.offsetY = getTouches(ev).y - position.top;
                                swapEvents("on");
                                locals.sliding = false;
                                locals.targetElement = ev.target || ev.srcElement;
                        }

                        function dragMove(event) {
                                var ev = event.originalEvent || event || window.event,
                                        minSwipe, maxSwipe;
                                base.newPosX = getTouches(ev).x - locals.offsetX;
                                base.newPosY = getTouches(ev).y - locals.offsetY;
                                base.newRelativeX = base.newPosX - locals.relativePos;
                                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                                        locals.dragging = true;
                                        base.options.startDragging.apply(base, [base.$elem]);
                                }
                                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                                        if (ev.preventDefault !== undefined) {
                                                ev.preventDefault();
                                        } else {
                                                ev.returnValue = false;
                                        }
                                        locals.sliding = true;
                                }
                                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                                        $(document).off("touchmove.owl");
                                }
                                minSwipe = function () {
                                        return base.newRelativeX / 5;
                                };
                                maxSwipe = function () {
                                        return base.maximumPixels + base.newRelativeX / 5;
                                };
                                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                                if (base.browser.support3d === true) {
                                        base.transition3d(base.newPosX);
                                } else {
                                        base.css2move(base.newPosX);
                                }
                        }

                        function dragEnd(event) {
                                var ev = event.originalEvent || event || window.event,
                                        newPosition, handlers, owlStopEvent;
                                ev.target = ev.target || ev.srcElement;
                                locals.dragging = false;
                                if (base.browser.isTouch !== true) {
                                        base.$owlWrapper.removeClass("grabbing");
                                }
                                if (base.newRelativeX < 0) {
                                        base.dragDirection = base.owl.dragDirection = "left";
                                } else {
                                        base.dragDirection = base.owl.dragDirection = "right";
                                }
                                if (base.newRelativeX !== 0) {
                                        newPosition = base.getNewPosition();
                                        base.goTo(newPosition, false, "drag");
                                        if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                                                $(ev.target).on("click.disable", function (ev) {
                                                        ev.stopImmediatePropagation();
                                                        ev.stopPropagation();
                                                        ev.preventDefault();
                                                        $(ev.target).off("click.disable");
                                                });
                                                handlers = $._data(ev.target, "events").click;
                                                owlStopEvent = handlers.pop();
                                                handlers.splice(0, 0, owlStopEvent);
                                        }
                                }
                                swapEvents("off");
                        }
                        base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
                },
                getNewPosition: function () {
                        var base = this,
                                newPosition = base.closestItem();
                        if (newPosition > base.maximumItem) {
                                base.currentItem = base.maximumItem;
                                newPosition = base.maximumItem;
                        } else if (base.newPosX >= 0) {
                                newPosition = 0;
                                base.currentItem = 0;
                        }
                        return newPosition;
                },
                closestItem: function () {
                        var base = this,
                                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                                goal = base.newPosX,
                                closest = null;
                        $.each(array, function (i, v) {
                                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                                        closest = v;
                                        if (base.options.scrollPerPage === true) {
                                                base.currentItem = $.inArray(closest, base.positionsInArray);
                                        } else {
                                                base.currentItem = i;
                                        }
                                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                                        if (base.options.scrollPerPage === true) {
                                                closest = array[i + 1] || array[array.length - 1];
                                                base.currentItem = $.inArray(closest, base.positionsInArray);
                                        } else {
                                                closest = array[i + 1];
                                                base.currentItem = i + 1;
                                        }
                                }
                        });
                        return base.currentItem;
                },
                moveDirection: function () {
                        var base = this,
                                direction;
                        if (base.newRelativeX < 0) {
                                direction = "right";
                                base.playDirection = "next";
                        } else {
                                direction = "left";
                                base.playDirection = "prev";
                        }
                        return direction;
                },
                customEvents: function () {
                        var base = this;
                        base.$elem.on("owl.next", function () {
                                base.next();
                        });
                        base.$elem.on("owl.prev", function () {
                                base.prev();
                        });
                        base.$elem.on("owl.play", function (event, speed) {
                                base.options.autoPlay = speed;
                                base.play();
                                base.hoverStatus = "play";
                        });
                        base.$elem.on("owl.stop", function () {
                                base.stop();
                                base.hoverStatus = "stop";
                        });
                        base.$elem.on("owl.goTo", function (event, item) {
                                base.goTo(item);
                        });
                        base.$elem.on("owl.jumpTo", function (event, item) {
                                base.jumpTo(item);
                        });
                },
                stopOnHover: function () {
                        var base = this;
                        if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                                base.$elem.on("mouseover", function () {
                                        base.stop();
                                });
                                base.$elem.on("mouseout", function () {
                                        if (base.hoverStatus !== "stop") {
                                                base.play();
                                        }
                                });
                        }
                },
                lazyLoad: function () {
                        var base = this,
                                i, $item, itemNumber, $lazyImg, follow;
                        if (base.options.lazyLoad === false) {
                                return false;
                        }
                        for (i = 0; i < base.itemsAmount; i += 1) {
                                $item = $(base.$owlItems[i]);
                                if ($item.data("owl-loaded") === "loaded") {
                                        continue;
                                }
                                itemNumber = $item.data("owl-item");
                                $lazyImg = $item.find(".lazyOwl");
                                if (typeof $lazyImg.data("src") !== "string") {
                                        $item.data("owl-loaded", "loaded");
                                        continue;
                                }
                                if ($item.data("owl-loaded") === undefined) {
                                        $lazyImg.hide();
                                        $item.addClass("loading").data("owl-loaded", "checked");
                                }
                                if (base.options.lazyFollow === true) {
                                        follow = itemNumber >= base.currentItem;
                                } else {
                                        follow = true;
                                }
                                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                                        base.lazyPreload($item, $lazyImg);
                                }
                        }
                },
                lazyPreload: function ($item, $lazyImg) {
                        var base = this,
                                iterations = 0,
                                isBackgroundImg;
                        if ($lazyImg.prop("tagName") === "DIV") {
                                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                                isBackgroundImg = true;
                        } else {
                                $lazyImg[0].src = $lazyImg.data("src");
                        }

                        function showImage() {
                                $item.data("owl-loaded", "loaded").removeClass("loading");
                                $lazyImg.removeAttr("data-src");
                                if (base.options.lazyEffect === "fade") {
                                        $lazyImg.fadeIn(400);
                                } else {
                                        $lazyImg.show();
                                }
                                if (typeof base.options.afterLazyLoad === "function") {
                                        base.options.afterLazyLoad.apply(this, [base.$elem]);
                                }
                        }

                        function checkLazyImage() {
                                iterations += 1;
                                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                                        showImage();
                                } else if (iterations <= 100) {
                                        window.setTimeout(checkLazyImage, 100);
                                } else {
                                        showImage();
                                }
                        }
                        checkLazyImage();
                },
                autoHeight: function () {
                        var base = this,
                                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                                iterations;

                        function addHeight() {
                                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                                base.wrapperOuter.css("height", $currentItem + "px");
                                if (!base.wrapperOuter.hasClass("autoHeight")) {
                                        window.setTimeout(function () {
                                                base.wrapperOuter.addClass("autoHeight");
                                        }, 0);
                                }
                        }

                        function checkImage() {
                                iterations += 1;
                                if (base.completeImg($currentimg.get(0))) {
                                        addHeight();
                                } else if (iterations <= 100) {
                                        window.setTimeout(checkImage, 100);
                                } else {
                                        base.wrapperOuter.css("height", "");
                                }
                        }
                        if ($currentimg.get(0) !== undefined) {
                                iterations = 0;
                                checkImage();
                        } else {
                                addHeight();
                        }
                },
                completeImg: function (img) {
                        var naturalWidthType;
                        if (!img.complete) {
                                return false;
                        }
                        naturalWidthType = typeof img.naturalWidth;
                        if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                                return false;
                        }
                        return true;
                },
                onVisibleItems: function () {
                        var base = this,
                                i;
                        if (base.options.addClassActive === true) {
                                base.$owlItems.removeClass("active");
                        }
                        base.visibleItems = [];
                        for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                                base.visibleItems.push(i);
                                if (base.options.addClassActive === true) {
                                        $(base.$owlItems[i]).addClass("active");
                                }
                        }
                        base.owl.visibleItems = base.visibleItems;
                },
                transitionTypes: function (className) {
                        var base = this;
                        base.outClass = "owl-" + className + "-out";
                        base.inClass = "owl-" + className + "-in";
                },
                singleItemTransition: function () {
                        var base = this,
                                outClass = base.outClass,
                                inClass = base.inClass,
                                $currentItem = base.$owlItems.eq(base.currentItem),
                                $prevItem = base.$owlItems.eq(base.prevItem),
                                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
                        base.isTransition = true;
                        base.$owlWrapper.addClass('owl-origin').css({
                                "-webkit-transform-origin": origin + "px",
                                "-moz-perspective-origin": origin + "px",
                                "perspective-origin": origin + "px"
                        });

                        function transStyles(prevPos) {
                                return {
                                        "position": "relative",
                                        "left": prevPos + "px"
                                };
                        }
                        $prevItem.css(transStyles(prevPos, 10)).addClass(outClass).on(animEnd, function () {
                                base.endPrev = true;
                                $prevItem.off(animEnd);
                                base.clearTransStyle($prevItem, outClass);
                        });
                        $currentItem.addClass(inClass).on(animEnd, function () {
                                base.endCurrent = true;
                                $currentItem.off(animEnd);
                                base.clearTransStyle($currentItem, inClass);
                        });
                },
                clearTransStyle: function (item, classToRemove) {
                        var base = this;
                        item.css({
                                "position": "",
                                "left": ""
                        }).removeClass(classToRemove);
                        if (base.endPrev && base.endCurrent) {
                                base.$owlWrapper.removeClass('owl-origin');
                                base.endPrev = false;
                                base.endCurrent = false;
                                base.isTransition = false;
                        }
                },
                owlStatus: function () {
                        var base = this;
                        base.owl = {
                                "userOptions": base.userOptions,
                                "baseElement": base.$elem,
                                "userItems": base.$userItems,
                                "owlItems": base.$owlItems,
                                "currentItem": base.currentItem,
                                "prevItem": base.prevItem,
                                "visibleItems": base.visibleItems,
                                "isTouch": base.browser.isTouch,
                                "browser": base.browser,
                                "dragDirection": base.dragDirection
                        };
                },
                clearEvents: function () {
                        var base = this;
                        base.$elem.off(".owl owl mousedown.disableTextSelect");
                        $(document).off(".owl owl");
                        $(window).off("resize", base.resizer);
                },
                unWrap: function () {
                        var base = this;
                        if (base.$elem.children().length !== 0) {
                                base.$owlWrapper.unwrap();
                                base.$userItems.unwrap().unwrap();
                                if (base.owlControls) {
                                        base.owlControls.remove();
                                }
                        }
                        base.clearEvents();
                        base.$elem.attr("style", base.$elem.data("owl-originalStyles") || "").attr("class", base.$elem.data("owl-originalClasses"));
                },
                destroy: function () {
                        var base = this;
                        base.stop();
                        window.clearInterval(base.checkVisible);
                        base.unWrap();
                        base.$elem.removeData();
                },
                reinit: function (newOptions) {
                        var base = this,
                                options = $.extend({}, base.userOptions, newOptions);
                        base.unWrap();
                        base.init(options, base.$elem);
                },
                addItem: function (htmlString, targetPosition) {
                        var base = this,
                                position;
                        if (!htmlString) {
                                return false;
                        }
                        if (base.$elem.children().length === 0) {
                                base.$elem.append(htmlString);
                                base.setVars();
                                return false;
                        }
                        base.unWrap();
                        if (targetPosition === undefined || targetPosition === -1) {
                                position = -1;
                        } else {
                                position = targetPosition;
                        }
                        if (position >= base.$userItems.length || position === -1) {
                                base.$userItems.eq(-1).after(htmlString);
                        } else {
                                base.$userItems.eq(position).before(htmlString);
                        }
                        base.setVars();
                },
                removeItem: function (targetPosition) {
                        var base = this,
                                position;
                        if (base.$elem.children().length === 0) {
                                return false;
                        }
                        if (targetPosition === undefined || targetPosition === -1) {
                                position = -1;
                        } else {
                                position = targetPosition;
                        }
                        base.unWrap();
                        base.$userItems.eq(position).remove();
                        base.setVars();
                }
        };
        $.fn.owlCarousel = function (options) {
                return this.each(function () {
                        if ($(this).data("owl-init") === true) {
                                return false;
                        }
                        $(this).data("owl-init", true);
                        var carousel = Object.create(Carousel);
                        carousel.init(options, this);
                        $.data(this, "owlCarousel", carousel);
                });
        };
        $.fn.owlCarousel.options = {
                items: 5,
                itemsCustom: false,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
                singleItem: false,
                itemsScaleUp: false,
                slideSpeed: 200,
                paginationSpeed: 800,
                rewindSpeed: 1000,
                autoPlay: false,
                stopOnHover: false,
                navigation: false,
                navigationText: ["prev", "next"],
                rewindNav: true,
                scrollPerPage: false,
                pagination: true,
                paginationNumbers: false,
                responsive: true,
                responsiveRefreshRate: 200,
                responsiveBaseWidth: window,
                baseClass: "owl-carousel",
                theme: "owl-theme",
                lazyLoad: false,
                lazyFollow: true,
                lazyEffect: "fade",
                autoHeight: false,
                jsonPath: false,
                jsonSuccess: false,
                dragBeforeAnimFinish: true,
                mouseDrag: true,
                touchDrag: true,
                addClassActive: false,
                transitionStyle: false,
                beforeUpdate: false,
                afterUpdate: false,
                beforeInit: false,
                afterInit: false,
                beforeMove: false,
                afterMove: false,
                afterAction: false,
                startDragging: false,
                afterLazyLoad: false
        };
}(jQuery, window, document));;
! function (a) {
        a.fn.extend({
                smoothproducts: function () {
                        function b() {
                                a(".sp-selected").removeClass("sp-selected"), a(".sp-lightbox").fadeOut(function () {
                                        a(this).remove()
                                })
                        }

                        function c(a) {
                                return a.match(/url\([\"\']{0,1}(.+)[\"\']{0,1}\)+/i)[1]
                        }
                        a(".sp-loading").hide(), a(".sp-wrap").each(function () {
                                        a(this).addClass("sp-touch");
                                        var b = a("a", this).length;
                                        if (b > 1) {
                                                a(this).append('<div class="sp-large"></div><div class="sp-thumbs sp-tb-active"></div>'), a("a", this).each(function () {
                                                        var b = a("img", this).attr("src"),
                                                                c = a(this).attr("href");
                                                        a(this).parents(".sp-wrap").find(".sp-thumbs").append('<a href="' + c + '" style="background-image:url(' + b + ')"></a>'), a(this).remove()
                                                }), a(".sp-thumbs a:first", this).addClass("sp-current");
                                                var d = a(".sp-thumbs a:first", this).attr("href"),
                                                        e = c(a(".sp-thumbs a:first", this).css("backgroundImage"));
                                                a(".sp-large", this).append('<a href="' + d + '" class="sp-current-big"><img src="' + e + '" alt="" /></a>'), a(".sp-wrap").css("display", "inline-block")
                                        } else a(this).append('<div class="sp-large"></div>'), a("a", this).appendTo(a(".sp-large", this)).addClass(".sp-current-big"), a(".sp-wrap").css("display", "inline-block")
                                }), a(document.body).on("click", ".sp-thumbs", function (a) {
                                        a.preventDefault()
                                }),
                                /*a(document.body).on("mouseover", function(b) {
                                               a(".sp-wrap").removeClass("sp-touch").addClass("sp-non-touch"), b.preventDefault()
                                           }),*/
                                a(document.body).on("touchstart", function () {
                                        a(".sp-wrap").removeClass("sp-non-touch").addClass("sp-touch")
                                }), a(document.body).on("click", ".sp-tb-active a", function (b) {
                                        b.preventDefault(), a(this).parent().find(".sp-current").removeClass(), a(this).addClass("sp-current"), a(this).parents(".sp-wrap").find(".sp-thumbs").removeClass("sp-tb-active"), a(this).parents(".sp-wrap").find(".sp-zoom").remove();
                                        var d = a(this).parents(".sp-wrap").find(".sp-large").height(),
                                                e = a(this).parents(".sp-wrap").find(".sp-large").width();
                                        a(this).parents(".sp-wrap").find(".sp-large").css({
                                                overflow: "hidden",
                                                height: d + "px",
                                                width: e + "px"
                                        }), a(this).addClass("sp-current").parents(".sp-wrap").find(".sp-large a").remove();
                                        var f = a(this).parent().find(".sp-current").attr("href"),
                                                g = c(a(this).parent().find(".sp-current").css("backgroundImage"));
                                        a(this).parents(".sp-wrap").find(".sp-large").html('<a href="' + f + '" class="sp-current-big"><img src="' + g + '"/></a>'), a(this).parents(".sp-wrap").find(".sp-large").hide().fadeIn(250, function () {
                                                var b = a(this).parents(".sp-wrap").find(".sp-large img").height();
                                                a(this).parents(".sp-wrap").find(".sp-large").animate({
                                                        height: b
                                                }, "fast", function () {
                                                        a(".sp-large").css({
                                                                height: "auto",
                                                                width: "auto"
                                                        })
                                                }), a(this).parents(".sp-wrap").find(".sp-thumbs").addClass("sp-tb-active")
                                        })
                                }), a(document.body).on("mouseenter", ".sp-non-touch .sp-large", function (b) {
                                        var c = a("a", this).attr("href");
                                        a(this).append('<div class="sp-zoom"><img src="' + c + '"/></div>'), a(this).find(".sp-zoom").fadeIn(250), b.preventDefault()
                                }), a(document.body).on("mouseleave", ".sp-non-touch .sp-large", function (b) {
                                        a(this).find(".sp-zoom").fadeOut(250, function () {
                                                a(this).remove()
                                        }), b.preventDefault()
                                }), a(document.body).on("click", ".sp-non-touch .sp-zoom", function (b) {
                                        var c = a(this).html(),
                                                d = a(this).parents(".sp-wrap").find(".sp-thumbs a").length,
                                                e = a(this).parents(".sp-wrap").find(".sp-thumbs .sp-current").index() + 1;
                                        a(this).parents(".sp-wrap").addClass("sp-selected"), a("body").append("<div class='sp-lightbox' data-currenteq='" + e + "'>" + c + "</div>"), d > 1 && (a(".sp-lightbox").append("<a href='#' id='sp-prev'></a><a href='#' id='sp-next'></a>"), 1 == e ? a("#sp-prev").css("opacity", ".1") : e == d && a("#sp-next").css("opacity", ".1")), a(".sp-lightbox").fadeIn(), b.preventDefault()
                                }), a(document.body).on("click", ".sp-large a", function (b) {
                                        var c = a(this).attr("href"),
                                                d = a(this).parents(".sp-wrap").find(".sp-thumbs a").length,
                                                e = a(this).parents(".sp-wrap").find(".sp-thumbs .sp-current").index() + 1;
                                        a(this).parents(".sp-wrap").addClass("sp-selected"), a("body").append('<div class="sp-lightbox" data-currenteq="' + e + '"><img src="' + c + '"/></div>'), d > 1 && (a(".sp-lightbox").append("<a href='#' id='sp-prev'></a><a href='#' id='sp-next'></a>"), 1 == e ? a("#sp-prev").css("opacity", ".1") : e == d && a("#sp-next").css("opacity", ".1")), a(".sp-lightbox").fadeIn(), b.preventDefault()
                                }), a(document.body).on("click", "#sp-next", function (b) {
                                        b.stopPropagation();
                                        var d = a(".sp-lightbox").data("currenteq"),
                                                e = a(".sp-selected .sp-thumbs a").length;
                                        if (d >= e);
                                        else {
                                                var f = d + 1,
                                                        g = a(".sp-selected .sp-thumbs").find("a:eq(" + d + ")").attr("href"),
                                                        h = c(a(".sp-selected .sp-thumbs").find("a:eq(" + d + ")").css("backgroundImage"));
                                                d == e - 1 && a("#sp-next").css("opacity", ".1"), a("#sp-prev").css("opacity", "1"), a(".sp-selected .sp-current").removeClass(), a(".sp-selected .sp-thumbs a:eq(" + d + ")").addClass("sp-current"), a(".sp-selected .sp-large").empty().append("<a href=" + g + '><img src="' + h + '"/></a>'), a(".sp-lightbox img").fadeOut(250, function () {
                                                        a(this).remove(), a(".sp-lightbox").data("currenteq", f).append('<img src="' + g + '"/>'), a(".sp-lightbox img").hide().fadeIn(250)
                                                })
                                        }
                                        b.preventDefault()
                                }), a(document.body).on("click", "#sp-prev", function (b) {
                                        b.stopPropagation();
                                        var d = a(".sp-lightbox").data("currenteq"),
                                                d = d - 1;
                                        if (0 >= d);
                                        else {
                                                1 == d && a("#sp-prev").css("opacity", ".1");
                                                var e = d - 1,
                                                        f = a(".sp-selected .sp-thumbs").find("a:eq(" + e + ")").attr("href"),
                                                        g = c(a(".sp-selected .sp-thumbs").find("a:eq(" + e + ")").css("backgroundImage"));
                                                a("#sp-next").css("opacity", "1"), a(".sp-selected .sp-current").removeClass(), a(".sp-selected .sp-thumbs a:eq(" + e + ")").addClass("sp-current"), a(".sp-selected .sp-large").empty().append("<a href=" + f + '><img src="' + g + '"/></a>'), a(".sp-lightbox img").fadeOut(250, function () {
                                                        a(this).remove(), a(".sp-lightbox").data("currenteq", d).append('<img src="' + f + '"/>'), a(".sp-lightbox img").hide().fadeIn(250)
                                                })
                                        }
                                        b.preventDefault()
                                }), a(document.body).on("click", ".sp-lightbox", function () {
                                        b()
                                }), a(document).keydown(function (a) {
                                        return 27 == a.keyCode ? (b(), !1) : void 0
                                }), a(".sp-large").mousemove(function (b) {
                                        var c = a(this).width(),
                                                d = a(this).height(),
                                                e = a(this).find(".sp-zoom").width(),
                                                f = a(this).find(".sp-zoom").height(),
                                                g = a(this).parent().offset(),
                                                h = b.pageX - g.left,
                                                i = b.pageY - g.top,
                                                j = Math.floor(h * (c - e) / c),
                                                k = Math.floor(i * (d - f) / d);
                                        a(this).find(".sp-zoom").css({
                                                left: j,
                                                top: k
                                        })
                                })
                }
        })
}(jQuery);;
(function ($) {
        $.fn.extend({
                easyResponsiveTabs: function (options) {
                        var defaults = {
                                type: 'default',
                                width: 'auto',
                                fit: true,
                                closed: false,
                                activate: function () {}
                        }
                        var options = $.extend(defaults, options);
                        var opt = options,
                                jtype = opt.type,
                                jfit = opt.fit,
                                jwidth = opt.width,
                                vtabs = 'vertical',
                                accord = 'accordion';
                        var hash = window.location.hash;
                        var historyApi = !!(window.history && history.replaceState);
                        $(this).bind('tabactivate', function (e, currentTab) {
                                if (typeof options.activate === 'function') {
                                        options.activate.call(currentTab, e)
                                }
                        });
                        this.each(function () {
                                var $respTabs = $(this);
                                var $respTabsList = $respTabs.find('ul.resp-tabs-list');
                                var respTabsId = $respTabs.attr('id');
                                $respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
                                $respTabs.css({
                                        'display': 'block',
                                        'width': jwidth
                                });
                                $respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
                                jtab_options();

                                function jtab_options() {
                                        if (jtype == vtabs) {
                                                $respTabs.addClass('resp-vtabs');
                                        }
                                        if (jfit == true) {
                                                $respTabs.css({
                                                        width: '100%',
                                                        margin: '0px'
                                                });
                                        }
                                        if (jtype == accord) {
                                                $respTabs.addClass('resp-easy-accordion');
                                                $respTabs.find('.resp-tabs-list').css('display', 'none');
                                        }
                                }
                                var $tabItemh2;
                                $respTabs.find('.resp-tab-content').before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");
                                var itemCount = 0;
                                $respTabs.find('.resp-accordion').each(function () {
                                        $tabItemh2 = $(this);
                                        var $tabItem = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')');
                                        var $accItem = $respTabs.find('.resp-accordion:eq(' + itemCount + ')');
                                        $accItem.append($tabItem.html());
                                        $accItem.data($tabItem.data());
                                        $tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
                                        itemCount++;
                                });
                                var count = 0,
                                        $tabContent;
                                $respTabs.find('.resp-tab-item').each(function () {
                                        $tabItem = $(this);
                                        $tabItem.attr('aria-controls', 'tab_item-' + (count));
                                        $tabItem.attr('role', 'tab');
                                        var tabcount = 0;
                                        $respTabs.find('.resp-tab-content').each(function () {
                                                $tabContent = $(this);
                                                $tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                                                tabcount++;
                                        });
                                        count++;
                                });
                                var tabNum = 0;
                                if (hash != '') {
                                        var matches = hash.match(new RegExp(respTabsId + "([0-9]+)"));
                                        if (matches !== null && matches.length === 2) {
                                                tabNum = parseInt(matches[1], 10) - 1;
                                                if (tabNum > count) {
                                                        tabNum = 0;
                                                }
                                        }
                                }
                                $($respTabs.find('.resp-tab-item')[tabNum]).addClass('resp-tab-active');
                                if (options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {
                                        $($respTabs.find('.resp-accordion')[tabNum]).addClass('resp-tab-active');
                                        $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active').attr('style', 'display:block');
                                } else {
                                        $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active resp-accordion-closed')
                                }
                                $respTabs.find("[role=tab]").each(function () {
                                        var $currentTab = $(this);
                                        $currentTab.click(function () {
                                                var $currentTab = $(this);
                                                var $tabAria = $currentTab.attr('aria-controls');
                                                if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                                                        $respTabs.find('.resp-tab-content-active').slideUp('', function () {
                                                                $(this).addClass('resp-accordion-closed');
                                                        });
                                                        $currentTab.removeClass('resp-tab-active');
                                                        return false;
                                                }
                                                if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                                                        $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                                                        $respTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                                                        $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                                                        $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resp-tab-content-active');
                                                } else {
                                                        $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                                                        $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                                                        $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                                                        $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                                                }
                                                $currentTab.trigger('tabactivate', $currentTab);
                                                if (historyApi) {
                                                        var currentHash = window.location.hash;
                                                        var newHash = "";
                                                        if (currentHash != "") {
                                                                var re = new RegExp(respTabsId + "[0-9]+");
                                                                if (currentHash.match(re) != null) {
                                                                        newHash = currentHash.replace(re, newHash);
                                                                } else {
                                                                        newHash = currentHash + "|" + newHash;
                                                                }
                                                        } else {
                                                                newHash = '' + newHash;
                                                        }
                                                        history.replaceState(null, null, newHash);
                                                }
                                        });
                                });
                                $(window).resize(function () {
                                        $respTabs.find('.resp-accordion-closed').removeAttr('style');
                                });
                        });
                }
        });
})(jQuery);;
/*! WOW - v1.1.2 - 2015-08-19
 * Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function () {
        var a, b, c, d, e, f = function (a, b) {
                        return function () {
                                return a.apply(b, arguments)
                        }
                },
                g = [].indexOf || function (a) {
                        for (var b = 0, c = this.length; c > b; b++)
                                if (b in this && this[b] === a) return b;
                        return -1
                };
        b = function () {
                function a() {}
                return a.prototype.extend = function (a, b) {
                        var c, d;
                        for (c in b) d = b[c], null == a[c] && (a[c] = d);
                        return a
                }, a.prototype.isMobile = function (a) {
                        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
                }, a.prototype.createEvent = function (a, b, c, d) {
                        var e;
                        return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
                }, a.prototype.emitEvent = function (a, b) {
                        return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
                }, a.prototype.addEvent = function (a, b, c) {
                        return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
                }, a.prototype.removeEvent = function (a, b, c) {
                        return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
                }, a.prototype.innerHeight = function () {
                        return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
                }, a
        }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
                function a() {
                        this.keys = [], this.values = []
                }
                return a.prototype.get = function (a) {
                        var b, c, d, e, f;
                        for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                                if (c = f[b], c === a) return this.values[b]
                }, a.prototype.set = function (a, b) {
                        var c, d, e, f, g;
                        for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                                if (d = g[c], d === a) return void(this.values[c] = b);
                        return this.keys.push(a), this.values.push(b)
                }, a
        }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
                function a() {
                        "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
                }
                return a.notSupported = !0, a.prototype.observe = function () {}, a
        }()), d = this.getComputedStyle || function (a) {
                return this.getPropertyValue = function (b) {
                        var c;
                        return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
                                return b.toUpperCase()
                        }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
                }, this
        }, e = /(\-([a-z]){1})/g, this.WOW = function () {
                function e(a) {
                        null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
                }
                return e.prototype.defaults = {
                        boxClass: "wow",
                        animateClass: "animated",
                        offset: 0,
                        mobile: !0,
                        live: !0,
                        callback: null,
                        scrollContainer: null
                }, e.prototype.init = function () {
                        var a;
                        return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
                }, e.prototype.start = function () {
                        var b, c, d, e;
                        if (this.stopped = !1, this.boxes = function () {
                                        var a, c, d, e;
                                        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                                        return e
                                }.call(this), this.all = function () {
                                        var a, c, d, e;
                                        for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                                        return e
                                }.call(this), this.boxes.length)
                                if (this.disabled()) this.resetStyle();
                                else
                                        for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
                        return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
                                return function (b) {
                                        var c, d, e, f, g;
                                        for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function () {
                                                var a, b, c, d;
                                                for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                                                return d
                                        }.call(a));
                                        return g
                                }
                        }(this)).observe(document.body, {
                                childList: !0,
                                subtree: !0
                        }) : void 0
                }, e.prototype.stop = function () {
                        return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
                }, e.prototype.sync = function () {
                        return a.notSupported ? this.doSync(this.element) : void 0
                }, e.prototype.doSync = function (a) {
                        var b, c, d, e, f;
                        if (null == a && (a = this.element), 1 === a.nodeType) {
                                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                                return f
                        }
                }, e.prototype.show = function (a) {
                        return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
                }, e.prototype.applyStyle = function (a, b) {
                        var c, d, e;
                        return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
                                return function () {
                                        return f.customStyle(a, b, d, c, e)
                                }
                        }(this))
                }, e.prototype.animate = function () {
                        return "requestAnimationFrame" in window ? function (a) {
                                return window.requestAnimationFrame(a)
                        } : function (a) {
                                return a()
                        }
                }(), e.prototype.resetStyle = function () {
                        var a, b, c, d, e;
                        for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
                        return e
                }, e.prototype.resetAnimation = function (a) {
                        var b;
                        return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
                }, e.prototype.customStyle = function (a, b, c, d, e) {
                        return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                                animationDuration: c
                        }), d && this.vendorSet(a.style, {
                                animationDelay: d
                        }), e && this.vendorSet(a.style, {
                                animationIterationCount: e
                        }), this.vendorSet(a.style, {
                                animationName: b ? "none" : this.cachedAnimationName(a)
                        }), a
                }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
                        var c, d, e, f;
                        d = [];
                        for (c in b) e = b[c], a["" + c] = e, d.push(function () {
                                var b, d, g, h;
                                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                                return h
                        }.call(this));
                        return d
                }, e.prototype.vendorCSS = function (a, b) {
                        var c, e, f, g, h, i;
                        for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
                        return g
                }, e.prototype.animationName = function (a) {
                        var b;
                        try {
                                b = this.vendorCSS(a, "animation-name").cssText
                        } catch (c) {
                                b = d(a).getPropertyValue("animation-name")
                        }
                        return "none" === b ? "" : b
                }, e.prototype.cacheAnimationName = function (a) {
                        return this.animationNameCache.set(a, this.animationName(a))
                }, e.prototype.cachedAnimationName = function (a) {
                        return this.animationNameCache.get(a)
                }, e.prototype.scrollHandler = function () {
                        return this.scrolled = !0
                }, e.prototype.scrollCallback = function () {
                        var a;
                        return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                                var b, c, d, e;
                                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                                return e
                        }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
                }, e.prototype.offsetTop = function (a) {
                        for (var b; void 0 === a.offsetTop;) a = a.parentNode;
                        for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
                        return b
                }, e.prototype.isVisible = function (a) {
                        var b, c, d, e, f;
                        return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
                }, e.prototype.util = function () {
                        return null != this._util ? this._util : this._util = new b
                }, e.prototype.disabled = function () {
                        return !this.config.mobile && this.util().isMobile(navigator.userAgent)
                }, e
        }()
}).call(this);;
(function ($) {
        var $window = $(window);
        var windowHeight = $window.height();
        $window.resize(function () {
                windowHeight = $window.height();
        });
        $.fn.parallax = function (xpos, speedFactor, outerHeight) {
                var $this = $(this);
                var getHeight;
                var firstTop;
                var paddingTop = 0;
                $this.each(function () {
                        firstTop = $this.offset().top;
                });
                if (outerHeight) {
                        getHeight = function (jqo) {
                                return jqo.outerHeight(true);
                        };
                } else {
                        getHeight = function (jqo) {
                                return jqo.height();
                        };
                }
                if (arguments.length < 1 || xpos === null) xpos = "50%";
                if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
                if (arguments.length < 3 || outerHeight === null) outerHeight = true;

                function update() {
                        var pos = $window.scrollTop();
                        $this.each(function () {
                                var $element = $(this);
                                var top = $element.offset().top;
                                var height = getHeight($element);
                                if (top + height < pos || top > pos + windowHeight) {
                                        return;
                                }
                                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
                        });
                }
                $window.bind('scroll', update).resize(update);
                update();
        };
})(jQuery);;
(function (a) {
        typeof define == "function" && define.amd ? define(["jquery"], a) : typeof exports == "object" ? a(require("jquery")) : a(window.jQuery || window.Zepto)
})(function (a) {
        var b = "Close",
                c = "BeforeClose",
                d = "AfterClose",
                e = "BeforeAppend",
                f = "MarkupParse",
                g = "Open",
                h = "Change",
                i = "mfp",
                j = "." + i,
                k = "mfp-ready",
                l = "mfp-removing",
                m = "mfp-prevent-close",
                n, o = function () {},
                p = !!window.jQuery,
                q, r = a(window),
                s, t, u, v, w = function (a, b) {
                        n.ev.on(i + a + j, b)
                },
                x = function (b, c, d, e) {
                        var f = document.createElement("div");
                        return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
                },
                y = function (b, c) {
                        n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
                },
                z = function (b) {
                        if (b !== v || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), v = b;
                        return n.currTemplate.closeBtn
                },
                A = function () {
                        a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
                },
                B = function () {
                        var a = document.createElement("p").style,
                                b = ["ms", "O", "Moz", "Webkit"];
                        if (a.transition !== undefined) return !0;
                        while (b.length)
                                if (b.pop() + "Transition" in a) return !0;
                        return !1
                };
        o.prototype = {
                constructor: o,
                init: function () {
                        var b = navigator.appVersion;
                        n.isLowIE = n.isIE8 = document.all && !document.addEventListener, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = B(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = a(document), n.popupsCache = {}
                },
                open: function (b) {
                        var c;
                        if (b.isObj === !1) {
                                n.items = b.items.toArray(), n.index = 0;
                                var d = b.items,
                                        e;
                                for (c = 0; c < d.length; c++) {
                                        e = d[c], e.parsed && (e = e.el[0]);
                                        if (e === b.el[0]) {
                                                n.index = c;
                                                break
                                        }
                                }
                        } else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
                        if (n.isOpen) {
                                n.updateItemHTML();
                                return
                        }
                        n.types = [], u = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = s, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = x("bg").on("click" + j, function () {
                                n.close()
                        }), n.wrap = x("wrap").attr("tabindex", -1).on("click" + j, function (a) {
                                n._checkIfClose(a.target) && n.close()
                        }), n.container = x("container", n.wrap)), n.contentContainer = x("content"), n.st.preloader && (n.preloader = x("preloader", n.container, n.st.tLoading));
                        var h = a.magnificPopup.modules;
                        for (c = 0; c < h.length; c++) {
                                var i = h[c];
                                i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
                        }
                        y("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (w(f, function (a, b, c, d) {
                                c.close_replaceWith = z(d.type)
                        }), u += " mfp-close-btn-in") : n.wrap.append(z())), n.st.alignTop && (u += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
                                overflow: n.st.overflowY,
                                overflowX: "hidden",
                                overflowY: n.st.overflowY
                        }) : n.wrap.css({
                                top: r.scrollTop(),
                                position: "absolute"
                        }), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
                                height: s.height(),
                                position: "absolute"
                        }), n.st.enableEscapeKey && s.on("keyup" + j, function (a) {
                                a.keyCode === 27 && n.close()
                        }), r.on("resize" + j, function () {
                                n.updateSize()
                        }), n.st.closeOnContentClick || (u += " mfp-auto-cursor"), u && n.wrap.addClass(u);
                        var l = n.wH = r.height(),
                                m = {};
                        if (n.fixedContentPos && n._hasScrollBar(l)) {
                                var o = n._getScrollbarSize();
                                o && (m.marginRight = o)
                        }
                        n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
                        var p = n.st.mainClass;
                        return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), y("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)), n._lastFocusedEl = document.activeElement, setTimeout(function () {
                                n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), s.on("focusin" + j, n._onFocusIn)
                        }, 16), n.isOpen = !0, n.updateSize(l), y(g), b
                },
                close: function () {
                        if (!n.isOpen) return;
                        y(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function () {
                                n._close()
                        }, n.st.removalDelay)) : n._close()
                },
                _close: function () {
                        y(b);
                        var c = l + " " + k + " ";
                        n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
                        if (n.fixedContentPos) {
                                var e = {
                                        marginRight: ""
                                };
                                n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
                        }
                        s.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n.st.autoFocusLast && n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, y(d)
                },
                updateSize: function (a) {
                        if (n.isIOS) {
                                var b = document.documentElement.clientWidth / window.innerWidth,
                                        c = window.innerHeight * b;
                                n.wrap.css("height", c), n.wH = c
                        } else n.wH = a || r.height();
                        n.fixedContentPos || n.wrap.css("height", n.wH), y("Resize")
                },
                updateItemHTML: function () {
                        var b = n.items[n.index];
                        n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
                        var c = b.type;
                        y("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
                        if (!n.currTemplate[c]) {
                                var d = n.st[c] ? n.st[c].markup : !1;
                                y("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
                        }
                        t && t !== b.type && n.container.removeClass("mfp-" + t + "-holder");
                        var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
                        n.appendContent(e, c), b.preloaded = !0, y(h, b), t = b.type, n.container.prepend(n.contentContainer), y("AfterChange")
                },
                appendContent: function (a, b) {
                        n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(z()) : n.content = a : n.content = "", y(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content)
                },
                parseEl: function (b) {
                        var c = n.items[b],
                                d;
                        c.tagName ? c = {
                                el: a(c)
                        } : (d = c.type, c = {
                                data: c,
                                src: c.src
                        });
                        if (c.el) {
                                var e = n.types;
                                for (var f = 0; f < e.length; f++)
                                        if (c.el.hasClass("mfp-" + e[f])) {
                                                d = e[f];
                                                break
                                        }
                                c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"))
                        }
                        return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, y("ElementParse", c), n.items[b]
                },
                addGroup: function (a, b) {
                        var c = function (c) {
                                c.mfpEl = this, n._openClick(c, a, b)
                        };
                        b || (b = {});
                        var d = "click.magnificPopup";
                        b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)))
                },
                _openClick: function (b, c, d) {
                        var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
                        if (!e && (b.which === 2 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey)) return;
                        var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
                        if (f)
                                if (a.isFunction(f)) {
                                        if (!f.call(n)) return !0
                                } else if (r.width() < f) return !0;
                        b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d)
                },
                updateStatus: function (a, b) {
                        if (n.preloader) {
                                q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
                                var c = {
                                        status: a,
                                        text: b
                                };
                                y("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function (a) {
                                        a.stopImmediatePropagation()
                                }), n.container.addClass("mfp-s-" + a), q = a
                        }
                },
                _checkIfClose: function (b) {
                        if (a(b).hasClass(m)) return;
                        var c = n.st.closeOnContentClick,
                                d = n.st.closeOnBgClick;
                        if (c && d) return !0;
                        if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0]) return !0;
                        if (b !== n.content[0] && !a.contains(n.content[0], b)) {
                                if (d && a.contains(document, b)) return !0
                        } else if (c) return !0;
                        return !1
                },
                _addClassToMFP: function (a) {
                        n.bgOverlay.addClass(a), n.wrap.addClass(a)
                },
                _removeClassFromMFP: function (a) {
                        this.bgOverlay.removeClass(a), n.wrap.removeClass(a)
                },
                _hasScrollBar: function (a) {
                        return (n.isIE7 ? s.height() : document.body.scrollHeight) > (a || r.height())
                },
                _setFocus: function () {
                        (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus()
                },
                _onFocusIn: function (b) {
                        if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1
                },
                _parseMarkup: function (b, c, d) {
                        var e;
                        d.data && (c = a.extend(d.data, c)), y(f, [b, c, d]), a.each(c, function (c, d) {
                                if (d === undefined || d === !1) return !0;
                                e = c.split("_");
                                if (e.length > 1) {
                                        var f = b.find(j + "-" + e[0]);
                                        if (f.length > 0) {
                                                var g = e[1];
                                                g === "replaceWith" ? f[0] !== d[0] && f.replaceWith(d) : g === "img" ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                                        }
                                } else b.find(j + "-" + c).html(d)
                        })
                },
                _getScrollbarSize: function () {
                        if (n.scrollbarSize === undefined) {
                                var a = document.createElement("div");
                                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
                        }
                        return n.scrollbarSize
                }
        }, a.magnificPopup = {
                instance: null,
                proto: o.prototype,
                modules: [],
                open: function (b, c) {
                        return A(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
                },
                close: function () {
                        return a.magnificPopup.instance && a.magnificPopup.instance.close()
                },
                registerModule: function (b, c) {
                        c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
                },
                defaults: {
                        disableOn: 0,
                        key: null,
                        midClick: !1,
                        mainClass: "",
                        preloader: !0,
                        focus: "",
                        closeOnContentClick: !1,
                        closeOnBgClick: !0,
                        closeBtnInside: !0,
                        showCloseBtn: !0,
                        enableEscapeKey: !0,
                        modal: !1,
                        alignTop: !1,
                        removalDelay: 0,
                        prependTo: null,
                        fixedContentPos: "auto",
                        fixedBgPos: "auto",
                        overflowY: "auto",
                        closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                        tClose: "Close (Esc)",
                        tLoading: "Loading...",
                        autoFocusLast: !0
                }
        }, a.fn.magnificPopup = function (b) {
                A();
                var c = a(this);
                if (typeof b == "string")
                        if (b === "open") {
                                var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup,
                                        f = parseInt(arguments[1], 10) || 0;
                                e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
                                        mfpEl: d
                                }, c, e)
                        } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
                else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
                return c
        };
        var C = "inline",
                D, E, F, G = function () {
                        F && (E.after(F.addClass(D)).detach(), F = null)
                };
        a.magnificPopup.registerModule(C, {
                options: {
                        hiddenClass: "hide",
                        markup: "",
                        tNotFound: "Content not found"
                },
                proto: {
                        initInline: function () {
                                n.types.push(C), w(b + "." + C, function () {
                                        G()
                                })
                        },
                        getInline: function (b, c) {
                                G();
                                if (b.src) {
                                        var d = n.st.inline,
                                                e = a(b.src);
                                        if (e.length) {
                                                var f = e[0].parentNode;
                                                f && f.tagName && (E || (D = d.hiddenClass, E = x(D), D = "mfp-" + D), F = e.after(E).detach().removeClass(D)), n.updateStatus("ready")
                                        } else n.updateStatus("error", d.tNotFound), e = a("<div>");
                                        return b.inlineElement = e, e
                                }
                                return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c
                        }
                }
        });
        var H = "ajax",
                I, J = function () {
                        I && a(document.body).removeClass(I)
                },
                K = function () {
                        J(), n.req && n.req.abort()
                };
        a.magnificPopup.registerModule(H, {
                options: {
                        settings: null,
                        cursor: "mfp-ajax-cur",
                        tError: '<a href="%url%">The content</a> could not be loaded.'
                },
                proto: {
                        initAjax: function () {
                                n.types.push(H), I = n.st.ajax.cursor, w(b + "." + H, K), w("BeforeChange." + H, K)
                        },
                        getAjax: function (b) {
                                I && a(document.body).addClass(I), n.updateStatus("loading");
                                var c = a.extend({
                                        url: b.src,
                                        success: function (c, d, e) {
                                                var f = {
                                                        data: c,
                                                        xhr: e
                                                };
                                                y("ParseAjax", f), n.appendContent(a(f.data), H), b.finished = !0, J(), n._setFocus(), setTimeout(function () {
                                                        n.wrap.addClass(k)
                                                }, 16), n.updateStatus("ready"), y("AjaxContentAdded")
                                        },
                                        error: function () {
                                                J(), b.finished = b.loadError = !0, n.updateStatus("error", n.st.ajax.tError.replace("%url%", b.src))
                                        }
                                }, n.st.ajax.settings);
                                return n.req = a.ajax(c), ""
                        }
                }
        });
        var L, M = function (b) {
                if (b.data && b.data.title !== undefined) return b.data.title;
                var c = n.st.image.titleSrc;
                if (c) {
                        if (a.isFunction(c)) return c.call(n, b);
                        if (b.el) return b.el.attr(c) || ""
                }
                return ""
        };
        a.magnificPopup.registerModule("image", {
                options: {
                        markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                        cursor: "mfp-zoom-out-cur",
                        titleSrc: "title",
                        verticalFit: !0,
                        tError: '<a href="%url%">The image</a> could not be loaded.'
                },
                proto: {
                        initImage: function () {
                                var c = n.st.image,
                                        d = ".image";
                                n.types.push("image"), w(g + d, function () {
                                        n.currItem.type === "image" && c.cursor && a(document.body).addClass(c.cursor)
                                }), w(b + d, function () {
                                        c.cursor && a(document.body).removeClass(c.cursor), r.off("resize" + j)
                                }), w("Resize" + d, n.resizeImage), n.isLowIE && w("AfterChange", n.resizeImage)
                        },
                        resizeImage: function () {
                                var a = n.currItem;
                                if (!a || !a.img) return;
                                if (n.st.image.verticalFit) {
                                        var b = 0;
                                        n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b)
                                }
                        },
                        _onImageHasSize: function (a) {
                                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1))
                        },
                        findImageSize: function (a) {
                                var b = 0,
                                        c = a.img[0],
                                        d = function (e) {
                                                L && clearInterval(L), L = setInterval(function () {
                                                        if (c.naturalWidth > 0) {
                                                                n._onImageHasSize(a);
                                                                return
                                                        }
                                                        b > 200 && clearInterval(L), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500)
                                                }, e)
                                        };
                                d(1)
                        },
                        getImage: function (b, c) {
                                var d = 0,
                                        e = function () {
                                                b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, y("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()))
                                        },
                                        f = function () {
                                                b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0)
                                        },
                                        g = n.st.image,
                                        h = c.find(".mfp-img");
                                if (h.length) {
                                        var i = document.createElement("img");
                                        i.className = "mfp-img", b.el && b.el.find("img").length && (i.alt = b.el.find("img").attr("alt")), b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1)
                                }
                                return n._parseMarkup(c, {
                                        title: M(b),
                                        img_replaceWith: b.img
                                }, b), n.resizeImage(), b.hasSize ? (L && clearInterval(L), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c)
                        }
                }
        });
        var N, O = function () {
                return N === undefined && (N = document.createElement("p").style.MozTransform !== undefined), N
        };
        a.magnificPopup.registerModule("zoom", {
                options: {
                        enabled: !1,
                        easing: "ease-in-out",
                        duration: 300,
                        opener: function (a) {
                                return a.is("img") ? a : a.find("img")
                        }
                },
                proto: {
                        initZoom: function () {
                                var a = n.st.zoom,
                                        d = ".zoom",
                                        e;
                                if (!a.enabled || !n.supportsTransition) return;
                                var f = a.duration,
                                        g = function (b) {
                                                var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                                        d = "all " + a.duration / 1e3 + "s " + a.easing,
                                                        e = {
                                                                position: "fixed",
                                                                zIndex: 9999,
                                                                left: 0,
                                                                top: 0,
                                                                "-webkit-backface-visibility": "hidden"
                                                        },
                                                        f = "transition";
                                                return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c
                                        },
                                        h = function () {
                                                n.content.css("visibility", "visible")
                                        },
                                        i, j;
                                w("BuildControls" + d, function () {
                                        if (n._allowZoom()) {
                                                clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
                                                if (!e) {
                                                        h();
                                                        return
                                                }
                                                j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function () {
                                                        j.css(n._getOffset(!0)), i = setTimeout(function () {
                                                                h(), setTimeout(function () {
                                                                        j.remove(), e = j = null, y("ZoomAnimationEnded")
                                                                }, 16)
                                                        }, f)
                                                }, 16)
                                        }
                                }), w(c + d, function () {
                                        if (n._allowZoom()) {
                                                clearTimeout(i), n.st.removalDelay = f;
                                                if (!e) {
                                                        e = n._getItemToZoom();
                                                        if (!e) return;
                                                        j = g(e)
                                                }
                                                j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function () {
                                                        j.css(n._getOffset())
                                                }, 16)
                                        }
                                }), w(b + d, function () {
                                        n._allowZoom() && (h(), j && j.remove(), e = null)
                                })
                        },
                        _allowZoom: function () {
                                return n.currItem.type === "image"
                        },
                        _getItemToZoom: function () {
                                return n.currItem.hasSize ? n.currItem.img : !1
                        },
                        _getOffset: function (b) {
                                var c;
                                b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
                                var d = c.offset(),
                                        e = parseInt(c.css("padding-top"), 10),
                                        f = parseInt(c.css("padding-bottom"), 10);
                                d.top -= a(window).scrollTop() - e;
                                var g = {
                                        width: c.width(),
                                        height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e
                                };
                                return O() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g
                        }
                }
        });
        var P = "iframe",
                Q = "//about:blank",
                R = function (a) {
                        if (n.currTemplate[P]) {
                                var b = n.currTemplate[P].find("iframe");
                                b.length && (a || (b[0].src = Q), n.isIE8 && b.css("display", a ? "block" : "none"))
                        }
                };
        a.magnificPopup.registerModule(P, {
                options: {
                        markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                        srcAction: "iframe_src",
                        patterns: {
                                youtube: {
                                        index: "youtube.com",
                                        id: "v=",
                                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                                },
                                vimeo: {
                                        index: "vimeo.com/",
                                        id: "/",
                                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                                },
                                gmaps: {
                                        index: "//maps.google.",
                                        src: "%id%&output=embed"
                                }
                        }
                },
                proto: {
                        initIframe: function () {
                                n.types.push(P), w("BeforeChange", function (a, b, c) {
                                        b !== c && (b === P ? R() : c === P && R(!0))
                                }), w(b + "." + P, function () {
                                        R()
                                })
                        },
                        getIframe: function (b, c) {
                                var d = b.src,
                                        e = n.st.iframe;
                                a.each(e.patterns, function () {
                                        if (d.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length) : d = this.id.call(this, d)), d = this.src.replace("%id%", d), !1
                                });
                                var f = {};
                                return e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus("ready"), c
                        }
                }
        });
        var S = function (a) {
                        var b = n.items.length;
                        return a > b - 1 ? a - b : a < 0 ? b + a : a
                },
                T = function (a, b, c) {
                        return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
                };
        a.magnificPopup.registerModule("gallery", {
                options: {
                        enabled: !1,
                        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                        preload: [0, 2],
                        navigateByImgClick: !0,
                        arrows: !0,
                        tPrev: "Previous (Left arrow key)",
                        tNext: "Next (Right arrow key)",
                        tCounter: "%curr% of %total%"
                },
                proto: {
                        initGallery: function () {
                                var c = n.st.gallery,
                                        d = ".mfp-gallery";
                                n.direction = !0;
                                if (!c || !c.enabled) return !1;
                                u += " mfp-gallery", w(g + d, function () {
                                        c.navigateByImgClick && n.wrap.on("click" + d, ".mfp-img", function () {
                                                if (n.items.length > 1) return n.next(), !1
                                        }), s.on("keydown" + d, function (a) {
                                                a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next()
                                        })
                                }), w("UpdateStatus" + d, function (a, b) {
                                        b.text && (b.text = T(b.text, n.currItem.index, n.items.length))
                                }), w(f + d, function (a, b, d, e) {
                                        var f = n.items.length;
                                        d.counter = f > 1 ? T(c.tCounter, e.index, f) : ""
                                }), w("BuildControls" + d, function () {
                                        if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
                                                var b = c.arrowMarkup,
                                                        d = n.arrowLeft = a(b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(m),
                                                        e = n.arrowRight = a(b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(m);
                                                d.click(function () {
                                                        n.prev()
                                                }), e.click(function () {
                                                        n.next()
                                                }), n.container.append(d.add(e))
                                        }
                                }), w(h + d, function () {
                                        n._preloadTimeout && clearTimeout(n._preloadTimeout), n._preloadTimeout = setTimeout(function () {
                                                n.preloadNearbyImages(), n._preloadTimeout = null
                                        }, 16)
                                }), w(b + d, function () {
                                        s.off(d), n.wrap.off("click" + d), n.arrowRight = n.arrowLeft = null
                                })
                        },
                        next: function () {
                                n.direction = !0, n.index = S(n.index + 1), n.updateItemHTML()
                        },
                        prev: function () {
                                n.direction = !1, n.index = S(n.index - 1), n.updateItemHTML()
                        },
                        goTo: function (a) {
                                n.direction = a >= n.index, n.index = a, n.updateItemHTML()
                        },
                        preloadNearbyImages: function () {
                                var a = n.st.gallery.preload,
                                        b = Math.min(a[0], n.items.length),
                                        c = Math.min(a[1], n.items.length),
                                        d;
                                for (d = 1; d <= (n.direction ? c : b); d++) n._preloadItem(n.index + d);
                                for (d = 1; d <= (n.direction ? b : c); d++) n._preloadItem(n.index - d)
                        },
                        _preloadItem: function (b) {
                                b = S(b);
                                if (n.items[b].preloaded) return;
                                var c = n.items[b];
                                c.parsed || (c = n.parseEl(b)), y("LazyLoad", c), c.type === "image" && (c.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
                                        c.hasSize = !0
                                }).on("error.mfploader", function () {
                                        c.hasSize = !0, c.loadError = !0, y("LazyLoadError", c)
                                }).attr("src", c.src)), c.preloaded = !0
                        }
                }
        });
        var U = "retina";
        a.magnificPopup.registerModule(U, {
                options: {
                        replaceSrc: function (a) {
                                return a.src.replace(/\.\w+$/, function (a) {
                                        return "@2x" + a
                                })
                        },
                        ratio: 1
                },
                proto: {
                        initRetina: function () {
                                if (window.devicePixelRatio > 1) {
                                        var a = n.st.retina,
                                                b = a.ratio;
                                        b = isNaN(b) ? b() : b, b > 1 && (w("ImageHasSize." + U, function (a, c) {
                                                c.img.css({
                                                        "max-width": c.img[0].naturalWidth / b,
                                                        width: "100%"
                                                })
                                        }), w("ElementParse." + U, function (c, d) {
                                                d.src = a.replaceSrc(d, b)
                                        }))
                                }
                        }
                }
        }), A()
});
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
! function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
        "use strict";
        var b = window.Slick || {};
        b = function () {
                function c(c, d) {
                        var f, e = this;
                        e.defaults = {
                                accessibility: !0,
                                adaptiveHeight: !1,
                                appendArrows: a(c),
                                appendDots: a(c),
                                arrows: !0,
                                asNavFor: null,
                                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                                autoplay: !1,
                                autoplaySpeed: 3e3,
                                centerMode: !1,
                                centerPadding: "50px",
                                cssEase: "ease",
                                customPaging: function (b, c) {
                                        return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                                },
                                dots: !1,
                                dotsClass: "slick-dots",
                                draggable: !0,
                                easing: "linear",
                                edgeFriction: .35,
                                fade: !1,
                                focusOnSelect: !1,
                                infinite: !0,
                                initialSlide: 0,
                                lazyLoad: "ondemand",
                                mobileFirst: !1,
                                pauseOnHover: !0,
                                pauseOnFocus: !0,
                                pauseOnDotsHover: !1,
                                respondTo: "window",
                                responsive: null,
                                rows: 1,
                                rtl: !1,
                                slide: "",
                                slidesPerRow: 1,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                speed: 500,
                                swipe: !0,
                                swipeToSlide: !1,
                                touchMove: !0,
                                touchThreshold: 5,
                                useCSS: !0,
                                useTransform: !0,
                                variableWidth: !1,
                                vertical: !1,
                                verticalSwiping: !1,
                                waitForAnimate: !0,
                                zIndex: 1e3
                        }, e.initials = {
                                animating: !1,
                                dragging: !1,
                                autoPlayTimer: null,
                                currentDirection: 0,
                                currentLeft: null,
                                currentSlide: 0,
                                direction: 1,
                                $dots: null,
                                listWidth: null,
                                listHeight: null,
                                loadIndex: 0,
                                $nextArrow: null,
                                $prevArrow: null,
                                slideCount: null,
                                slideWidth: null,
                                $slideTrack: null,
                                $slides: null,
                                sliding: !1,
                                slideOffset: 0,
                                swipeLeft: null,
                                $list: null,
                                touchObject: {},
                                transformsEnabled: !1,
                                unslicked: !1
                        }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
                }
                var b = 0;
                return c
        }(), b.prototype.activateADA = function () {
                var a = this;
                a.$slideTrack.find(".slick-active").attr({
                        "aria-hidden": "false"
                }).find("a, input, button, select").attr({
                        tabindex: "0"
                })
        }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
                var e = this;
                if ("boolean" == typeof c) d = c, c = null;
                else if (0 > c || c >= e.slideCount) return !1;
                e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
                        a(c).attr("data-slick-index", b)
                }), e.$slidesCache = e.$slides, e.reinit()
        }, b.prototype.animateHeight = function () {
                var a = this;
                if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                        a.$list.animate({
                                height: b
                        }, a.options.speed)
                }
        }, b.prototype.animateSlide = function (b, c) {
                var d = {},
                        e = this;
                e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
                        left: b
                }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
                        top: b
                }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
                        animStart: e.currentLeft
                }).animate({
                        animStart: b
                }, {
                        duration: e.options.speed,
                        easing: e.options.easing,
                        step: function (a) {
                                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
                        },
                        complete: function () {
                                c && c.call()
                        }
                })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
                        e.disableTransition(), c.call()
                }, e.options.speed))
        }, b.prototype.getNavTarget = function () {
                var b = this,
                        c = b.options.asNavFor;
                return c && null !== c && (c = a(c).not(b.$slider)), c
        }, b.prototype.asNavFor = function (b) {
                var c = this,
                        d = c.getNavTarget();
                null !== d && "object" == typeof d && d.each(function () {
                        var c = a(this).slick("getSlick");
                        c.unslicked || c.slideHandler(b, !0)
                })
        }, b.prototype.applyTransition = function (a) {
                var b = this,
                        c = {};
                b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.autoPlay = function () {
                var a = this;
                a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
        }, b.prototype.autoPlayClear = function () {
                var a = this;
                a.autoPlayTimer && clearInterval(a.autoPlayTimer)
        }, b.prototype.autoPlayIterator = function () {
                var a = this,
                        b = a.currentSlide + a.options.slidesToScroll;
                a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
        }, b.prototype.buildArrows = function () {
                var b = this;
                b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
                        "aria-disabled": "true",
                        tabindex: "-1"
                }))
        }, b.prototype.buildDots = function () {
                var c, d, b = this;
                if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
                        for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
                        b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
                }
        }, b.prototype.buildOut = function () {
                var b = this;
                b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
                        a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
                }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
        }, b.prototype.buildRows = function () {
                var b, c, d, e, f, g, h, a = this;
                if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
                        for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                                var i = document.createElement("div");
                                for (c = 0; c < a.options.rows; c++) {
                                        var j = document.createElement("div");
                                        for (d = 0; d < a.options.slidesPerRow; d++) {
                                                var k = b * h + (c * a.options.slidesPerRow + d);
                                                g.get(k) && j.appendChild(g.get(k))
                                        }
                                        i.appendChild(j)
                                }
                                e.appendChild(i)
                        }
                        a.$slider.empty().append(e), a.$slider.children().children().children().css({
                                width: 100 / a.options.slidesPerRow + "%",
                                display: "inline-block"
                        })
                }
        }, b.prototype.checkResponsive = function (b, c) {
                var e, f, g, d = this,
                        h = !1,
                        i = d.$slider.width(),
                        j = window.innerWidth || a(window).width();
                if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
                        f = null;
                        for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
                        null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
                }
        }, b.prototype.changeSlide = function (b, c) {
                var f, g, h, d = this,
                        e = a(b.currentTarget);
                switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
                        case "previous":
                                g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                                break;
                        case "next":
                                g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                                break;
                        case "index":
                                var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                                d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                                break;
                        default:
                                return
                }
        }, b.prototype.checkNavigable = function (a) {
                var c, d, b = this;
                if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
                else
                        for (var e in c) {
                                if (a < c[e]) {
                                        a = d;
                                        break
                                }
                                d = c[e]
                        }
                return a
        }, b.prototype.cleanUpEvents = function () {
                var b = this;
                b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.cleanUpSlideEvents = function () {
                var b = this;
                b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
        }, b.prototype.cleanUpRows = function () {
                var b, a = this;
                a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
        }, b.prototype.clickHandler = function (a) {
                var b = this;
                b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
        }, b.prototype.destroy = function (b) {
                var c = this;
                c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                        a(this).attr("style", a(this).data("originalStyling"))
                }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
        }, b.prototype.disableTransition = function (a) {
                var b = this,
                        c = {};
                c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.fadeSlide = function (a, b) {
                var c = this;
                c.cssTransitions === !1 ? (c.$slides.eq(a).css({
                        zIndex: c.options.zIndex
                }), c.$slides.eq(a).animate({
                        opacity: 1
                }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
                        opacity: 1,
                        zIndex: c.options.zIndex
                }), b && setTimeout(function () {
                        c.disableTransition(a), b.call()
                }, c.options.speed))
        }, b.prototype.fadeSlideOut = function (a) {
                var b = this;
                b.cssTransitions === !1 ? b.$slides.eq(a).animate({
                        opacity: 0,
                        zIndex: b.options.zIndex - 2
                }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
                        opacity: 0,
                        zIndex: b.options.zIndex - 2
                }))
        }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
                var b = this;
                null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
        }, b.prototype.focusHandler = function () {
                var b = this;
                b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
                        c.stopImmediatePropagation();
                        var d = a(this);
                        setTimeout(function () {
                                b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
                        }, 0)
                })
        }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
                var a = this;
                return a.currentSlide
        }, b.prototype.getDotCount = function () {
                var a = this,
                        b = 0,
                        c = 0,
                        d = 0;
                if (a.options.infinite === !0)
                        for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
                else if (a.options.centerMode === !0) d = a.slideCount;
                else if (a.options.asNavFor)
                        for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
                else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
                return d - 1
        }, b.prototype.getLeft = function (a) {
                var c, d, f, b = this,
                        e = 0;
                return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
        }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
                var b = this;
                return b.options[a]
        }, b.prototype.getNavigableIndexes = function () {
                var e, a = this,
                        b = 0,
                        c = 0,
                        d = [];
                for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
                return d
        }, b.prototype.getSlick = function () {
                return this
        }, b.prototype.getSlideCount = function () {
                var c, d, e, b = this;
                return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
                        return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
                }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
        }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
                var c = this;
                c.changeSlide({
                        data: {
                                message: "index",
                                index: parseInt(a)
                        }
                }, b)
        }, b.prototype.init = function (b) {
                var c = this;
                a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
        }, b.prototype.initADA = function () {
                var b = this;
                b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
                        "aria-hidden": "true",
                        tabindex: "-1"
                }).find("a, input, button, select").attr({
                        tabindex: "-1"
                }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
                        a(this).attr({
                                role: "option",
                                "aria-describedby": "slick-slide" + b.instanceUid + c
                        })
                }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
                        a(this).attr({
                                role: "presentation",
                                "aria-selected": "false",
                                "aria-controls": "navigation" + b.instanceUid + c,
                                id: "slick-slide" + b.instanceUid + c
                        })
                }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
        }, b.prototype.initArrowEvents = function () {
                var a = this;
                a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
                        message: "previous"
                }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
                        message: "next"
                }, a.changeSlide))
        }, b.prototype.initDotEvents = function () {
                var b = this;
                b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
                        message: "index"
                }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
        }, b.prototype.initSlideEvents = function () {
                var b = this;
                b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
        }, b.prototype.initializeEvents = function () {
                var b = this;
                b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
                        action: "start"
                }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
                        action: "move"
                }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
                        action: "end"
                }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
                        action: "end"
                }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.initUI = function () {
                var a = this;
                a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
        }, b.prototype.keyHandler = function (a) {
                var b = this;
                a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
                        data: {
                                message: b.options.rtl === !0 ? "next" : "previous"
                        }
                }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
                        data: {
                                message: b.options.rtl === !0 ? "previous" : "next"
                        }
                }))
        }, b.prototype.lazyLoad = function () {
                function g(c) {
                        a("img[data-lazy]", c).each(function () {
                                var c = a(this),
                                        d = a(this).attr("data-lazy"),
                                        e = document.createElement("img");
                                e.onload = function () {
                                        c.animate({
                                                opacity: 0
                                        }, 100, function () {
                                                c.attr("src", d).animate({
                                                        opacity: 1
                                                }, 200, function () {
                                                        c.removeAttr("data-lazy").removeClass("slick-loading")
                                                }), b.$slider.trigger("lazyLoaded", [b, c, d])
                                        })
                                }, e.onerror = function () {
                                        c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
                                }, e.src = d
                        })
                }
                var c, d, e, f, b = this;
                b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
        }, b.prototype.loadSlider = function () {
                var a = this;
                a.setPosition(), a.$slideTrack.css({
                        opacity: 1
                }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
        }, b.prototype.next = b.prototype.slickNext = function () {
                var a = this;
                a.changeSlide({
                        data: {
                                message: "next"
                        }
                })
        }, b.prototype.orientationChange = function () {
                var a = this;
                a.checkResponsive(), a.setPosition()
        }, b.prototype.pause = b.prototype.slickPause = function () {
                var a = this;
                a.autoPlayClear(), a.paused = !0
        }, b.prototype.play = b.prototype.slickPlay = function () {
                var a = this;
                a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
        }, b.prototype.postSlide = function (a) {
                var b = this;
                b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
        }, b.prototype.prev = b.prototype.slickPrev = function () {
                var a = this;
                a.changeSlide({
                        data: {
                                message: "previous"
                        }
                })
        }, b.prototype.preventDefault = function (a) {
                a.preventDefault()
        }, b.prototype.progressiveLazyLoad = function (b) {
                b = b || 1;
                var e, f, g, c = this,
                        d = a("img[data-lazy]", c.$slider);
                d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () {
                        e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
                }, g.onerror = function () {
                        3 > b ? setTimeout(function () {
                                c.progressiveLazyLoad(b + 1)
                        }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
                }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
        }, b.prototype.refresh = function (b) {
                var d, e, c = this;
                e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
                        currentSlide: d
                }), c.init(), b || c.changeSlide({
                        data: {
                                message: "index",
                                index: d
                        }
                }, !1)
        }, b.prototype.registerBreakpoints = function () {
                var c, d, e, b = this,
                        f = b.options.responsive || null;
                if ("array" === a.type(f) && f.length) {
                        b.respondTo = b.options.respondTo || "window";
                        for (c in f)
                                if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                                        for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                                        b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                                }
                        b.breakpoints.sort(function (a, c) {
                                return b.options.mobileFirst ? a - c : c - a
                        })
                }
        }, b.prototype.reinit = function () {
                var b = this;
                b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
        }, b.prototype.resize = function () {
                var b = this;
                a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
                        b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
                }, 50))
        }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
                var d = this;
                return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
        }, b.prototype.setCSS = function (a) {
                var d, e, b = this,
                        c = {};
                b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
        }, b.prototype.setDimensions = function () {
                var a = this;
                a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
                        padding: "0px " + a.options.centerPadding
                }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
                        padding: a.options.centerPadding + " 0px"
                })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
                var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
                a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
        }, b.prototype.setFade = function () {
                var c, b = this;
                b.$slides.each(function (d, e) {
                        c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
                                position: "relative",
                                right: c,
                                top: 0,
                                zIndex: b.options.zIndex - 2,
                                opacity: 0
                        }) : a(e).css({
                                position: "relative",
                                left: c,
                                top: 0,
                                zIndex: b.options.zIndex - 2,
                                opacity: 0
                        })
                }), b.$slides.eq(b.currentSlide).css({
                        zIndex: b.options.zIndex - 1,
                        opacity: 1
                })
        }, b.prototype.setHeight = function () {
                var a = this;
                if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                        a.$list.css("height", b)
                }
        }, b.prototype.setOption = b.prototype.slickSetOption = function () {
                var c, d, e, f, h, b = this,
                        g = !1;
                if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
                else if ("multiple" === h) a.each(e, function (a, c) {
                        b.options[a] = c
                });
                else if ("responsive" === h)
                        for (d in f)
                                if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
                                else {
                                        for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
                                        b.options.responsive.push(f[d])
                                }
                g && (b.unload(), b.reinit())
        }, b.prototype.setPosition = function () {
                var a = this;
                a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
        }, b.prototype.setProps = function () {
                var a = this,
                        b = document.body.style;
                a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
        }, b.prototype.setSlideClasses = function (a) {
                var c, d, e, f, b = this;
                d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
                        d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
        }, b.prototype.setupInfinite = function () {
                var c, d, e, b = this;
                if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
                        for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
                        for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
                        b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                                a(this).attr("id", "")
                        })
                }
        }, b.prototype.interrupt = function (a) {
                var b = this;
                a || b.autoPlay(), b.interrupted = a
        }, b.prototype.selectHandler = function (b) {
                var c = this,
                        d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
                        e = parseInt(d.attr("data-slick-index"));
                return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
        }, b.prototype.slideHandler = function (a, b, c) {
                var d, e, f, g, j, h = null,
                        i = this;
                return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
                        i.postSlide(d)
                }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
                        i.postSlide(d)
                }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
                        i.postSlide(e)
                })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function () {
                        i.postSlide(e)
                }) : i.postSlide(e))))
        }, b.prototype.startLoad = function () {
                var a = this;
                a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
        }, b.prototype.swipeDirection = function () {
                var a, b, c, d, e = this;
                return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
        }, b.prototype.swipeEnd = function (a) {
                var c, d, b = this;
                if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
                if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
                        switch (d = b.swipeDirection()) {
                                case "left":
                                case "down":
                                        c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
                                        break;
                                case "right":
                                case "up":
                                        c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
                        }
                        "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
                } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
        }, b.prototype.swipeHandler = function (a) {
                var b = this;
                if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
                        case "start":
                                b.swipeStart(a);
                                break;
                        case "move":
                                b.swipeMove(a);
                                break;
                        case "end":
                                b.swipeEnd(a)
                }
        }, b.prototype.swipeMove = function (a) {
                var d, e, f, g, h, b = this;
                return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
        }, b.prototype.swipeStart = function (a) {
                var c, b = this;
                return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
        }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
                var a = this;
                null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
        }, b.prototype.unload = function () {
                var b = this;
                a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, b.prototype.unslick = function (a) {
                var b = this;
                b.$slider.trigger("unslick", [b, a]), b.destroy()
        }, b.prototype.updateArrows = function () {
                var b, a = this;
                b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, b.prototype.updateDots = function () {
                var a = this;
                null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, b.prototype.visibility = function () {
                var a = this;
                a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
        }, a.fn.slick = function () {
                var f, g, a = this,
                        c = arguments[0],
                        d = Array.prototype.slice.call(arguments, 1),
                        e = a.length;
                for (f = 0; e > f; f++)
                        if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
                return a
        }
});;;
if (typeof jQuery != 'undefined') {
        var __ycamObj = jQuery.noConflict();
}
if (typeof __ycamObj != 'undefined') {
        __ycamObj(document).ready(function () {
                var isSafari = /constructor/i.test(window.HTMLElement);
                if (isSafari) {
                        jQuery('body').addClass('safari');
                }
                __ycamObj('.sp-wrap').smoothproducts();
                __ycamObj('.tab-type1').easyResponsiveTabs({
                        type: 'default',
                        width: 'auto',
                        fit: true,
                        closed: 'accordion',
                        activate: function (event) {
                                var __ycamObjtab = __ycamObj(this);
                                var __ycamObjinfo = __ycamObj('#tabInfo');
                                var __ycamObjname = __ycamObj('span', __ycamObjinfo);
                                __ycamObjname.text(__ycamObjtab.text());
                                __ycamObjinfo.show();
                        }
                });
                __ycamObj('.tab-type2').easyResponsiveTabs({
                        type: 'default',
                        width: 'auto',
                        fit: true,
                        closed: 'accordion',
                        activate: function (event) {
                                var __ycamObjtab = __ycamObj(this);
                                var __ycamObjinfo = __ycamObj('#tabInfo1');
                                var __ycamObjname = __ycamObj('span', __ycamObjinfo);
                                __ycamObjname.text(__ycamObjtab.text());
                                __ycamObjinfo.show();
                        }
                });
                var carousel = __ycamObj(".custom_key_features");
                carousel.owlCarousel({
                        autoPlay: 7000,
                        items: 1,
                        navigation: true
                });
                __ycamObj("#scrollblog").owlCarousel({
                        autoPlay: 7000,
                        items: 4,
                        itemsDesktop: [1199, 3],
                        itemsDesktopSmall: [979, 3],
                        itemsTablet: [768, 1],
                        navigation: true
                });
                __ycamObj("#review-scroll").owlCarousel({
                        autoPlay: 7000,
                        pagination: false,
                        singleItem: true,
                        transitionStyle: "fade"
                });
                __ycamObj("#pressreviews").owlCarousel({
                        autoPlay: 7000,
                        pagination: false,
                        singleItem: true,
                        transitionStyle: "fade"
                });
                __ycamObj("#saidaboutus").owlCarousel({
                        autoPlay: 7000,
                        pagination: false,
                        singleItem: true,
                        transitionStyle: "fade"
                });

                function resetForm() {
                        __ycamObj('#commentform').reset();
                        validator.resetForm();
                }

                function validateForm() {
                        if (validator.form()) {
                                __ycamObj('#commentform').submit();
                        }
                }
                validator = __ycamObj("#commentform").validate({
                        rules: {
                                title: "required",
                                email: {
                                        required: true,
                                        email: true
                                },
                                author: "required",
                                comment: "required"
                        },
                        messages: {
                                title: "Please enter your title",
                                author: "Please enter your name",
                                email: {
                                        required: "Please enter an email address",
                                        email: "Please enter a valid email address"
                                },
                                comment: "Please include your comment"
                        }
                });
                __ycamObj(function (e) {
                        __ycamObj('#customCookies').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#customPolicy').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#customTerms').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('.need-help-scroll a,.scroll-to-section a,.tell-link a,.pro-all-link p a').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top - 78
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#custom_write_review').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#hdn_custom_write_review').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#custom_write_review').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#hdn_custom_write_review').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#custom_read_all_reviews').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#my_custom_read_all_reviews_new').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#my_custom_read_all_reviews').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#custom_read_all_reviews_new').on('click', function (e) {
                                e.preventDefault();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                __ycamObj(function (e) {
                        __ycamObj('#switchtab').on('click', function (e) {
                                __ycamObj('.custom-reviews-tab').click();
                                __ycamObj('html,body').animate({
                                        scrollTop: __ycamObj(this.hash).offset().top
                                }, 700);
                        });
                });
                if (__ycamObj('#txt_hidden_counter_val') != null) {
                        var my_counter = __ycamObj('#txt_hidden_counter_val').val();
                }
                if (my_counter != null) {
                        window.setInterval(function () {
                                my_counter = parseInt(my_counter) + 13;
                                my_counter_length = my_counter.toString().length;
                                if (my_counter_length <= 9) {
                                        padd_len = 9 - my_counter_length;
                                        for (var i = 1; i <= padd_len; i++) {
                                                my_counter = 0 + my_counter.toString();
                                        }
                                        for (j = 0; j < 9; j++) {
                                                if (j == 2 || j == 5) {
                                                        for (k = 1; k <= 8; k++) {
                                                                var count_box_id = j + 1;
                                                                __ycamObj('#count_space' + 3).html(',');
                                                                __ycamObj('#count_box' + count_box_id).html(my_counter.toString().charAt(j));
                                                                __ycamObj('#count_space' + 6).html(',');
                                                        }
                                                } else {
                                                        var count_box_id = j + 1;
                                                        __ycamObj('#count_box' + count_box_id).html(my_counter.toString().charAt(j));
                                                }
                                        }
                                }
                                if (my_counter_length == 10) {
                                        __ycamObj('#count_box10').css('display', 'block');
                                        for (j = 0; j < my_counter_length; j++) {
                                                if (j == 0 || j == 3 || j == 6) {
                                                        for (k = 1; k <= 8; k++) {
                                                                var count_box_id = j + 1;
                                                                __ycamObj('#count_box' + count_box_id).html(my_counter.toString().charAt(j));
                                                                __ycamObj('#count_space' + 1).html(',');
                                                                __ycamObj('#count_space' + 4).html(',');
                                                                __ycamObj('#count_space' + 7).html(',');
                                                        }
                                                } else {
                                                        var count_box_id = j + 1;
                                                        __ycamObj('#count_box' + count_box_id).html(my_counter.toString().charAt(j));
                                                }
                                        }
                                }
                                if (my_counter_length == 11) {
                                        __ycamObj('#count_box10').css('display', 'block');
                                        __ycamObj('#count_box11').css('display', 'block');
                                        get_div_structure();
                                }
                                if (my_counter_length >= 12) {
                                        my_counter = parseInt(my_counter) - 13;
                                        __ycamObj('#count_box10').css('display', 'block');
                                        __ycamObj('#count_box11').css('display', 'block');
                                        get_div_structure();
                                        return false;
                                }

                                function get_div_structure() {
                                        for (j = 0; j < my_counter_length; j++) {
                                                if (j == 1 || j == 4 || j == 7) {
                                                        for (k = 1; k <= 2; k++) {
                                                                var count_box_id = j + 1;
                                                                __ycamObj('#count_box' + count_box_id).html(my_counter.toString().charAt(j));
                                                                __ycamObj('#count_space' + 2).html(',');
                                                                __ycamObj('#count_space' + 5).html(',');
                                                                __ycamObj('#count_space' + 8).html(',');
                                                        }
                                                } else {
                                                        var count_box_id = j + 1;
                                                        __ycamObj('#count_box' + count_box_id).html(my_counter.toString().charAt(j));
                                                }
                                        }
                                }
                        }, 1000);
                }
                __ycamObj('ul.custom_footer_menu > li:last-child a').attr('style', 'border-right: 0px !important');
        });
}

function increment_quantity(id) {
        __ycamObj('input[name="update_cart"]#custom_cart_class').prop('disabled', false);
        var inc_quantity_value = __ycamObj('#txt_quantity_value' + id).val();
        inc_quantity_value = parseInt(inc_quantity_value) + 1;
        __ycamObj('#txt_quantity_value' + id).val(inc_quantity_value);
}

function decrement_quantity(id) {
        __ycamObj('input[name="update_cart"]#custom_cart_class').prop('disabled', false);
        var dec_quantity_value = __ycamObj('#txt_quantity_value' + id).val();
        dec_quantity_value = parseInt(dec_quantity_value) - 1;
        if (dec_quantity_value <= 1) {
                __ycamObj('#txt_quantity_value' + id).val(1);
        } else {
                __ycamObj('#txt_quantity_value' + id).val(dec_quantity_value);
        }
}

function get_full_contents(id) {
        __ycamObj('#hidden_get_full_contents_' + id).css("display", "block");
        __ycamObj('#get_full_contents_' + id).css("display", "none");
}

function my_get_full_contents(id) {
        __ycamObj('#my_hidden_get_full_contents_' + id).css("display", "block");
        __ycamObj('#my_get_full_contents_' + id).css("display", "none");
}

function get_review_form() {
        __ycamObj('#div_review').css("display", "block");
        __ycamObj('#get_my').css("display", "none");
}

function my_get_review_form() {
        __ycamObj('#my_div_review').css("display", "block");
        __ycamObj('#get_my_form').css("display", "none");
        __ycamObj('.comment-form-rating select').css("display", "none");
        if (typeof __ycamObj('.stars')[0] != 'undefined') __ycamObj('.stars').remove();
        __ycamObj('.comment-form-rating').append('<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>');
}

function read_press_reviews(press_reviews_id) {
        __ycamObj('#hidden_press_reviews_' + press_reviews_id).css("display", "block");
        __ycamObj('#press_reviews_' + press_reviews_id).css("display", "none");
}

function my_read_press_reviews(press_reviews_id) {
        __ycamObj('#my_hidden_press_reviews_' + press_reviews_id).css("display", "block");
        __ycamObj('#my_press_reviews_' + press_reviews_id).css("display", "none");
}

function read_all_reviews() {
        __ycamObj('#hidden_read_all_reviews').css("display", "block");
        __ycamObj('#read_all_reviews').css("display", "none");
}

function my_read_all_reviews() {
        __ycamObj('#my_div_review').css("display", "none");
        __ycamObj('#get_my_form').css("display", "block");
}

function custom_review_your_order() {
        __ycamObj('#custom_review_your_order').css("display", "block");
}

function ChangeImage(a) {
        document.getElementById("viewer").src = a;
}
__ycamObj('#cust_coupon_header div').removeClass('woocommerce-info');
__ycamObj('#custom_chk_login div').removeClass('woocommerce-info');
__ycamObj('#cust_returning div').removeClass('woocommerce-info');
wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 200,
        mobile: false,
        live: true
})
wow.init();
if (__ycamObj('#custom_feature_page') != null) {
        var feature_val = __ycamObj('#custom_feature_page').val();
}
if (feature_val == 'features') {
        var deck = new __ycamObj.scrolldeck({
                buttons: '.nav-button',
                slides: '.slide',
                duration: 600,
                easing: 'easeInOutExpo',
                offset: 0
        });
}
var custom_checkout_left = __ycamObj('.checkout-left').html();
var custom_checkout_right = __ycamObj('.checkout-right').html();
if (__ycamObj(window).width() <= 768) {
        __ycamObj('.checkout-left').html(custom_checkout_right);
        __ycamObj('.checkout-right').html(custom_checkout_left);
        __ycamObj('.checkout-left').css('margin-top', '35px');
}
jQuery(document).ready(function () {
        jQuery('.woocommerce').each(function () {
                if (__ycamObj(window).width() >= 767) {
                        function resi() {
                                var a = jQuery(window).height()
                                var b = jQuery('#login').height()
                                var c = (a - b) / 2;
                                jQuery('#login').css({
                                        "top": c - 25
                                });
                        }
                        resi();
                        jQuery(window).load(function () {
                                resi();
                        });
                        jQuery(window).resize(function () {
                                resi();
                        });

                        function resiregi() {
                                var a = jQuery(window).height()
                                var b = jQuery('#forgot_password').height()
                                var c = (a - b) / 2;
                                jQuery('#forgot_password').css({
                                        "top": c - 25
                                });
                        }
                        resiregi();
                        jQuery(window).load(function () {
                                resiregi();
                        });
                        jQuery(window).resize(function () {
                                resiregi();
                        });

                        function resiforgot() {
                                var a = jQuery(window).height()
                                var b = jQuery('#register').height()
                                var c = (a - b) / 2;
                                jQuery('#register').css({
                                        "top": c - 25
                                });
                        }
                        resiforgot();
                        jQuery(window).load(function () {
                                resiforgot();
                        });
                        jQuery(window).resize(function () {
                                resiforgot();
                        });
                }
        });
        if (__ycamObj(window).width() <= 767) {
                jQuery(window).load(function () {
                        jQuery(".pop-container").css({
                                height: jQuery(window).height()
                        });
                });
                jQuery(window).resize(function () {
                        jQuery(".pop-container").css({
                                height: jQuery(window).height()
                        });
                });
        }
        jQuery(".sow-image-container .so-widget-image").removeAttr("srcset");
});;
! function (a, b) {
        "use strict";

        function c() {
                if (!e) {
                        e = !0;
                        var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                                h = !!navigator.userAgent.match(/Trident.*rv:11\./),
                                i = b.querySelectorAll("iframe.wp-embedded-content");
                        for (c = 0; c < i.length; c++)
                                if (d = i[c], !d.getAttribute("data-secret")) {
                                        if (f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f), g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
                                } else;
                }
        }
        var d = !1,
                e = !1;
        if (b.querySelector)
                if (a.addEventListener) d = !0;
        if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
                if (a.wp.receiveEmbedMessage = function (c) {
                                var d = c.data;
                                if (d.secret || d.message || d.value)
                                        if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                                                var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
                                                        k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                                                for (e = 0; e < k.length; e++) k[e].style.display = "none";
                                                for (e = 0; e < j.length; e++)
                                                        if (f = j[e], c.source === f.contentWindow) {
                                                                if (f.removeAttribute("style"), "height" === d.message) {
                                                                        if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
                                                                        else if (200 > ~~g) g = 200;
                                                                        f.height = g
                                                                }
                                                                if ("link" === d.message)
                                                                        if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
                                                                                if (b.activeElement === f) a.top.location.href = d.value
                                                        } else;
                                        }
                        }, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);
