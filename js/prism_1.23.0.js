/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /npm/prismjs@1.23.0/prism.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function(e) {
        var t = /\blang(?:uage)?-([\w-]+)\b/i,
            a = 0,
            n = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(t) {
                        return t instanceof r ? new r(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++a
                        }), e.__id
                    },
                    clone: function e(t, a) {
                        var r, s;
                        switch (a = a || {}, n.util.type(t)) {
                            case "Object":
                                if (s = n.util.objId(t), a[s]) return a[s];
                                for (var i in r = {}, a[s] = r, t) t.hasOwnProperty(i) && (r[i] = e(t[i], a));
                                return r;
                            case "Array":
                                return s = n.util.objId(t), a[s] ? a[s] : (r = [], a[s] = r, t.forEach((function(t, n) {
                                    r[n] = e(t, a)
                                })), r);
                            default:
                                return t
                        }
                    },
                    getLanguage: function(e) {
                        for (; e && !t.test(e.className);) e = e.parentElement;
                        return e ? (e.className.match(t) || [, "none"])[1].toLowerCase() : "none"
                    },
                    currentScript: function() {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw new Error
                        } catch (n) {
                            var e = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(n.stack) || [])[1];
                            if (e) {
                                var t = document.getElementsByTagName("script");
                                for (var a in t)
                                    if (t[a].src == e) return t[a]
                            }
                            return null
                        }
                    },
                    isActive: function(e, t, a) {
                        for (var n = "no-" + t; e;) {
                            var r = e.classList;
                            if (r.contains(t)) return !0;
                            if (r.contains(n)) return !1;
                            e = e.parentElement
                        }
                        return !!a
                    }
                },
                languages: {
                    extend: function(e, t) {
                        var a = n.util.clone(n.languages[e]);
                        for (var r in t) a[r] = t[r];
                        return a
                    },
                    insertBefore: function(e, t, a, r) {
                        var s = (r = r || n.languages)[e],
                            i = {};
                        for (var l in s)
                            if (s.hasOwnProperty(l)) {
                                if (l == t)
                                    for (var o in a) a.hasOwnProperty(o) && (i[o] = a[o]);
                                a.hasOwnProperty(l) || (i[l] = s[l])
                            } var u = r[e];
                        return r[e] = i, n.languages.DFS(n.languages, (function(t, a) {
                            a === u && t != e && (this[t] = i)
                        })), i
                    },
                    DFS: function e(t, a, r, s) {
                        s = s || {};
                        var i = n.util.objId;
                        for (var l in t)
                            if (t.hasOwnProperty(l)) {
                                a.call(t, l, t[l], r || l);
                                var o = t[l],
                                    u = n.util.type(o);
                                "Object" !== u || s[i(o)] ? "Array" !== u || s[i(o)] || (s[i(o)] = !0, e(o, a, l, s)) : (s[i(o)] = !0, e(o, a, null, s))
                            }
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    n.highlightAllUnder(document, e, t)
                },
                highlightAllUnder: function(e, t, a) {
                    var r = {
                        callback: a,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    n.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), n.hooks.run("before-all-elements-highlight", r);
                    for (var s, i = 0; s = r.elements[i++];) n.highlightElement(s, !0 === t, r.callback)
                },
                highlightElement: function(a, r, s) {
                    var i = n.util.getLanguage(a),
                        l = n.languages[i];
                    a.className = a.className.replace(t, "").replace(/\s+/g, " ") + " language-" + i;
                    var o = a.parentElement;
                    o && "pre" === o.nodeName.toLowerCase() && (o.className = o.className.replace(t, "").replace(/\s+/g, " ") + " language-" + i);
                    var u = {
                        element: a,
                        language: i,
                        grammar: l,
                        code: a.textContent
                    };

                    function g(e) {
                        u.highlightedCode = e, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, n.hooks.run("after-highlight", u), n.hooks.run("complete", u), s && s.call(u.element)
                    }
                    if (n.hooks.run("before-sanity-check", u), !u.code) return n.hooks.run("complete", u), void(s && s.call(u.element));
                    if (n.hooks.run("before-highlight", u), u.grammar)
                        if (r && e.Worker) {
                            var c = new Worker(n.filename);
                            c.onmessage = function(e) {
                                g(e.data)
                            }, c.postMessage(JSON.stringify({
                                language: u.language,
                                code: u.code,
                                immediateClose: !0
                            }))
                        } else g(n.highlight(u.code, u.grammar, u.language));
                    else g(n.util.encode(u.code))
                },
                highlight: function(e, t, a) {
                    var s = {
                        code: e,
                        grammar: t,
                        language: a
                    };
                    return n.hooks.run("before-tokenize", s), s.tokens = n.tokenize(s.code, s.grammar), n.hooks.run("after-tokenize", s), r.stringify(n.util.encode(s.tokens), s.language)
                },
                tokenize: function(e, t) {
                    var a = t.rest;
                    if (a) {
                        for (var n in a) t[n] = a[n];
                        delete t.rest
                    }
                    var r = new l;
                    return o(r, r.head, e), i(e, r, t, r.head, 0),
                        function(e) {
                            var t = [],
                                a = e.head.next;
                            for (; a !== e.tail;) t.push(a.value), a = a.next;
                            return t
                        }(r)
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var a = n.hooks.all;
                        a[e] = a[e] || [], a[e].push(t)
                    },
                    run: function(e, t) {
                        var a = n.hooks.all[e];
                        if (a && a.length)
                            for (var r, s = 0; r = a[s++];) r(t)
                    }
                },
                Token: r
            };

        function r(e, t, a, n) {
            this.type = e, this.content = t, this.alias = a, this.length = 0 | (n || "").length
        }

        function s(e, t, a, n) {
            e.lastIndex = t;
            var r = e.exec(a);
            if (r && n && r[1]) {
                var s = r[1].length;
                r.index += s, r[0] = r[0].slice(s)
            }
            return r
        }

        function i(e, t, a, l, g, c) {
            for (var d in a)
                if (a.hasOwnProperty(d) && a[d]) {
                    var p = a[d];
                    p = Array.isArray(p) ? p : [p];
                    for (var m = 0; m < p.length; ++m) {
                        if (c && c.cause == d + "," + m) return;
                        var f = p[m],
                            h = f.inside,
                            v = !!f.lookbehind,
                            y = !!f.greedy,
                            b = f.alias;
                        if (y && !f.pattern.global) {
                            var F = f.pattern.toString().match(/[imsuy]*$/)[0];
                            f.pattern = RegExp(f.pattern.source, F + "g")
                        }
                        for (var k = f.pattern || f, x = l.next, w = g; x !== t.tail && !(c && w >= c.reach); w += x.value.length, x = x.next) {
                            var A = x.value;
                            if (t.length > e.length) return;
                            if (!(A instanceof r)) {
                                var P, $ = 1;
                                if (y) {
                                    if (!(P = s(k, w, e, v))) break;
                                    var S = P.index,
                                        E = P.index + P[0].length,
                                        _ = w;
                                    for (_ += x.value.length; S >= _;) _ += (x = x.next).value.length;
                                    if (w = _ -= x.value.length, x.value instanceof r) continue;
                                    for (var j = x; j !== t.tail && (_ < E || "string" == typeof j.value); j = j.next) $++, _ += j.value.length;
                                    $--, A = e.slice(w, _), P.index -= w
                                } else if (!(P = s(k, 0, A, v))) continue;
                                S = P.index;
                                var C = P[0],
                                    O = A.slice(0, S),
                                    z = A.slice(S + C.length),
                                    T = w + A.length;
                                c && T > c.reach && (c.reach = T);
                                var N = x.prev;
                                O && (N = o(t, N, O), w += O.length), u(t, N, $), x = o(t, N, new r(d, h ? n.tokenize(C, h) : C, b, C)), z && o(t, x, z), $ > 1 && i(e, t, a, x.prev, w, {
                                    cause: d + "," + m,
                                    reach: T
                                })
                            }
                        }
                    }
                }
        }

        function l() {
            var e = {
                    value: null,
                    prev: null,
                    next: null
                },
                t = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = t, this.head = e, this.tail = t, this.length = 0
        }

        function o(e, t, a) {
            var n = t.next,
                r = {
                    value: a,
                    prev: t,
                    next: n
                };
            return t.next = r, n.prev = r, e.length++, r
        }

        function u(e, t, a) {
            for (var n = t.next, r = 0; r < a && n !== e.tail; r++) n = n.next;
            t.next = n, n.prev = t, e.length -= r
        }
        if (e.Prism = n, r.stringify = function e(t, a) {
                if ("string" == typeof t) return t;
                if (Array.isArray(t)) {
                    var r = "";
                    return t.forEach((function(t) {
                        r += e(t, a)
                    })), r
                }
                var s = {
                        type: t.type,
                        content: e(t.content, a),
                        tag: "span",
                        classes: ["token", t.type],
                        attributes: {},
                        language: a
                    },
                    i = t.alias;
                i && (Array.isArray(i) ? Array.prototype.push.apply(s.classes, i) : s.classes.push(i)), n.hooks.run("wrap", s);
                var l = "";
                for (var o in s.attributes) l += " " + o + '="' + (s.attributes[o] || "").replace(/"/g, "&quot;") + '"';
                return "<" + s.tag + ' class="' + s.classes.join(" ") + '"' + l + ">" + s.content + "</" + s.tag + ">"
            }, !e.document) return e.addEventListener ? (n.disableWorkerMessageHandler || e.addEventListener("message", (function(t) {
            var a = JSON.parse(t.data),
                r = a.language,
                s = a.code,
                i = a.immediateClose;
            e.postMessage(n.highlight(s, n.languages[r], r)), i && e.close()
        }), !1), n) : n;
        var g = n.util.currentScript();

        function c() {
            n.manual || n.highlightAll()
        }
        if (g && (n.filename = g.src, g.hasAttribute("data-manual") && (n.manual = !0)), !n.manual) {
            var d = document.readyState;
            "loading" === d || "interactive" === d && g && g.defer ? document.addEventListener("DOMContentLoaded", c) : window.requestAnimationFrame ? window.requestAnimationFrame(c) : window.setTimeout(c, 16)
        }
        return n
    }(_self);
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
        comment: /<!--[\s\S]*?-->/,
        prolog: /<\?[\s\S]+?\?>/,
        doctype: {
            pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
                "internal-subset": {
                    pattern: /(\[)[\s\S]+(?=\]>$)/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: null
                },
                string: {
                    pattern: /"[^"]*"|'[^']*'/,
                    greedy: !0
                },
                punctuation: /^<!|>$|[[\]]/,
                "doctype-tag": /^DOCTYPE/,
                name: /[^\s<>'"]+/
            }
        },
        cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
        tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: {
                        punctuation: /^<\/?/,
                        namespace: /^[^\s>\/:]+:/
                    }
                },
                "attr-value": {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        punctuation: [{
                            pattern: /^=/,
                            alias: "attr-equals"
                        }, /"|'/]
                    }
                },
                punctuation: /\/?>/,
                "attr-name": {
                    pattern: /[^\s>\/]+/,
                    inside: {
                        namespace: /^[^\s>\/:]+:/
                    }
                }
            }
        },
        entity: [{
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
        }, /&#x?[\da-f]{1,8};/i]
    }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", (function(e) {
        "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
    })), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function(e, t) {
            var a = {};
            a["language-" + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[t]
            }, a.cdata = /^<!\[CDATA\[|\]\]>$/i;
            var n = {
                "included-cdata": {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: a
                }
            };
            n["language-" + t] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[t]
            };
            var r = {};
            r[e] = {
                pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, (function() {
                    return e
                })), "i"),
                lookbehind: !0,
                greedy: !0,
                inside: n
            }, Prism.languages.insertBefore("markup", "cdata", r)
        }
    }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml,
    function(e) {
        var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
        e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                    rule: /^@[\w-]+/,
                    "selector-function-argument": {
                        pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                        lookbehind: !0,
                        alias: "selector"
                    },
                    keyword: {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: !0
                    }
                }
            },
            url: {
                pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
                greedy: !0,
                inside: {
                    function: /^url/i,
                    punctuation: /^\(|\)$/,
                    string: {
                        pattern: RegExp("^" + t.source + "$"),
                        alias: "url"
                    }
                }
            },
            selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
            string: {
                pattern: t,
                greedy: !0
            },
            property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/
        }, e.languages.css.atrule.inside.rest = e.languages.css;
        var a = e.languages.markup;
        a && (a.tag.addInlined("style", "css"), e.languages.insertBefore("inside", "attr-value", {
            "style-attr": {
                pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
                lookbehind: !0,
                inside: {
                    "attr-value": {
                        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                        inside: {
                            style: {
                                pattern: /(["'])[\s\S]+(?=["']$)/,
                                lookbehind: !0,
                                alias: "language-css",
                                inside: e.languages.css
                            },
                            punctuation: [{
                                pattern: /^=/,
                                alias: "attr-equals"
                            }, /"|'/]
                        }
                    },
                    "attr-name": /^style/i
                }
            }
        }, a.tag))
    }(Prism), Prism.languages.clike = {
        comment: [{
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: !0,
            greedy: !0
        }],
        string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0
        },
        "class-name": {
            pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: {
                punctuation: /[.\\]/
            }
        },
        keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /\w+(?=\()/,
        number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        punctuation: /[{}[\];(),.:]/
    }, Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [Prism.languages.clike["class-name"], {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
            lookbehind: !0
        }],
        keyword: [{
            pattern: /((?:^|})\s*)(?:catch|finally)\b/,
            lookbehind: !0
        }, {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0
        }],
        function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                "regex-source": {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: "language-regex",
                    inside: Prism.languages.regex
                },
                "regex-flags": /[a-z]+$/,
                "regex-delimiter": /^\/|\/$/
            }
        },
        "function-variable": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: "function"
        },
        parameter: [{
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            inside: Prism.languages.javascript
        }, {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }, {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Prism.languages.javascript
        }],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), Prism.languages.insertBefore("javascript", "string", {
        "template-string": {
            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
                "template-punctuation": {
                    pattern: /^`|`$/,
                    alias: "string"
                },
                interpolation: {
                    pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                    lookbehind: !0,
                    inside: {
                        "interpolation-punctuation": {
                            pattern: /^\${|}$/,
                            alias: "punctuation"
                        },
                        rest: Prism.languages.javascript
                    }
                },
                string: /[\s\S]+/
            }
        }
    }), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript,
    function() {
        if ("undefined" != typeof self && self.Prism && self.document) {
            Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
            var e = window.Prism,
                t = {
                    js: "javascript",
                    py: "python",
                    rb: "ruby",
                    ps1: "powershell",
                    psm1: "powershell",
                    sh: "bash",
                    bat: "batch",
                    h: "c",
                    tex: "latex"
                },
                a = "data-src-status",
                n = "loading",
                r = "loaded",
                s = 'pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])',
                i = /\blang(?:uage)?-([\w-]+)\b/i;
            e.hooks.add("before-highlightall", (function(e) {
                e.selector += ", " + s
            })), e.hooks.add("before-sanity-check", (function(i) {
                var l = i.element;
                if (l.matches(s)) {
                    i.code = "", l.setAttribute(a, n);
                    var u = l.appendChild(document.createElement("CODE"));
                    u.textContent = "Loading…";
                    var g = l.getAttribute("data-src"),
                        c = i.language;
                    if ("none" === c) {
                        var d = (/\.(\w+)$/.exec(g) || [, "none"])[1];
                        c = t[d] || d
                    }
                    o(u, c), o(l, c);
                    var p = e.plugins.autoloader;
                    p && p.loadLanguages(c);
                    var m = new XMLHttpRequest;
                    m.open("GET", g, !0), m.onreadystatechange = function() {
                        var t, n;
                        4 == m.readyState && (m.status < 400 && m.responseText ? (l.setAttribute(a, r), u.textContent = m.responseText, e.highlightElement(u)) : (l.setAttribute(a, "failed"), m.status >= 400 ? u.textContent = (t = m.status, n = m.statusText, "✖ Error " + t + " while fetching file: " + n) : u.textContent = "✖ Error: File does not exist or is empty"))
                    }, m.send(null)
                }
            })), e.plugins.fileHighlight = {
                highlight: function(t) {
                    for (var a, n = (t || document).querySelectorAll(s), r = 0; a = n[r++];) e.highlightElement(a)
                }
            };
            var l = !1;
            e.fileHighlight = function() {
                l || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), l = !0), e.plugins.fileHighlight.highlight.apply(this, arguments)
            }
        }

        function o(e, t) {
            var a = e.className;
            a = a.replace(i, " ") + " language-" + t, e.className = a.replace(/\s+/g, " ").trim()
        }
    }();
//# sourceMappingURL=/sm/cf645f926d7f3ab451d252499958740691c6b09fc70d703bb996d731009c2c91.map