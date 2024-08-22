/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var j_ = Object.create;
  var rn = Object.defineProperty;
  var z_ = Object.getOwnPropertyDescriptor;
  var K_ = Object.getOwnPropertyNames;
  var Y_ = Object.getPrototypeOf,
    $_ = Object.prototype.hasOwnProperty;
  var de = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Le = (e, t) => {
      for (var r in t) rn(e, r, { get: t[r], enumerable: !0 });
    },
    Rs = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of K_(t))
          !$_.call(e, i) &&
            i !== r &&
            rn(e, i, {
              get: () => t[i],
              enumerable: !(n = z_(t, i)) || n.enumerable,
            });
      return e;
    };
  var ae = (e, t, r) => (
      (r = e != null ? j_(Y_(e)) : {}),
      Rs(
        t || !e || !e.__esModule
          ? rn(r, "default", { value: e, enumerable: !0 })
          : r,
        e
      )
    ),
    Je = (e) => Rs(rn({}, "__esModule", { value: !0 }), e);
  var Cs = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let u = window.getComputedStyle(a, null),
            f = u.getPropertyValue("position"),
            p = u.getPropertyValue("overflow"),
            d = u.getPropertyValue("display");
          (!f || f === "static") && (a.style.position = "relative"),
            p !== "hidden" && (a.style.overflow = "hidden"),
            (!d || d === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            f = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let p in f)
            u.getPropertyValue(p) !== f[p] && (a.style[p] = f[p]);
        },
        o = function (a) {
          let u = a.parentNode;
          n(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let f = a[u].nodeName.toLowerCase();
            if (f === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              f === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var Ls = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                r(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Li = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(l, m) {
        var T = new V.Bare();
        return T.init(l, m);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (m) {
          return "-" + m.toLowerCase();
        });
      }
      function n(l) {
        var m = parseInt(l.slice(1), 16),
          T = (m >> 16) & 255,
          A = (m >> 8) & 255,
          b = 255 & m;
        return [T, A, b];
      }
      function i(l, m, T) {
        return (
          "#" + ((1 << 24) | (l << 16) | (m << 8) | T).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, m) {
        f("Type warning: Expected: [" + l + "] Got: [" + typeof m + "] " + m);
      }
      function a(l, m, T) {
        f("Units do not match [" + l + "]: " + m + ", " + T);
      }
      function u(l, m, T) {
        if ((m !== void 0 && (T = m), l === void 0)) return T;
        var A = T;
        return (
          Ci.test(l) || !en.test(l)
            ? (A = parseInt(l, 10))
            : en.test(l) && (A = 1e3 * parseFloat(l)),
          0 > A && (A = 0),
          A === A ? A : T
        );
      }
      function f(l) {
        se.debug && window && window.console.warn(l);
      }
      function p(l) {
        for (var m = -1, T = l ? l.length : 0, A = []; ++m < T; ) {
          var b = l[m];
          b && A.push(b);
        }
        return A;
      }
      var d = (function (l, m, T) {
          function A(te) {
            return typeof te == "object";
          }
          function b(te) {
            return typeof te == "function";
          }
          function x() {}
          function Y(te, le) {
            function H() {
              var we = new re();
              return b(we.init) && we.init.apply(we, arguments), we;
            }
            function re() {}
            le === T && ((le = te), (te = Object)), (H.Bare = re);
            var ie,
              he = (x[l] = te[l]),
              Ze = (re[l] = H[l] = new x());
            return (
              (Ze.constructor = H),
              (H.mixin = function (we) {
                return (re[l] = H[l] = Y(H, we)[l]), H;
              }),
              (H.open = function (we) {
                if (
                  ((ie = {}),
                  b(we) ? (ie = we.call(H, Ze, he, H, te)) : A(we) && (ie = we),
                  A(ie))
                )
                  for (var hr in ie) m.call(ie, hr) && (Ze[hr] = ie[hr]);
                return b(Ze.init) || (Ze.init = te), H;
              }),
              H.open(le)
            );
          }
          return Y;
        })("prototype", {}.hasOwnProperty),
        h = {
          ease: [
            "ease",
            function (l, m, T, A) {
              var b = (l /= A) * l,
                x = b * l;
              return (
                m +
                T * (-2.75 * x * b + 11 * b * b + -15.5 * x + 8 * b + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, m, T, A) {
              var b = (l /= A) * l,
                x = b * l;
              return m + T * (-1 * x * b + 3 * b * b + -3 * x + 2 * b);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, m, T, A) {
              var b = (l /= A) * l,
                x = b * l;
              return (
                m +
                T * (0.3 * x * b + -1.6 * b * b + 2.2 * x + -1.8 * b + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, m, T, A) {
              var b = (l /= A) * l,
                x = b * l;
              return m + T * (2 * x * b + -5 * b * b + 2 * x + 2 * b);
            },
          ],
          linear: [
            "linear",
            function (l, m, T, A) {
              return (T * l) / A + m;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, m, T, A) {
              return T * (l /= A) * l + m;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, m, T, A) {
              return -T * (l /= A) * (l - 2) + m;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, m, T, A) {
              return (l /= A / 2) < 1
                ? (T / 2) * l * l + m
                : (-T / 2) * (--l * (l - 2) - 1) + m;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, m, T, A) {
              return T * (l /= A) * l * l + m;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, m, T, A) {
              return T * ((l = l / A - 1) * l * l + 1) + m;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, m, T, A) {
              return (l /= A / 2) < 1
                ? (T / 2) * l * l * l + m
                : (T / 2) * ((l -= 2) * l * l + 2) + m;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, m, T, A) {
              return T * (l /= A) * l * l * l + m;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, m, T, A) {
              return -T * ((l = l / A - 1) * l * l * l - 1) + m;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, m, T, A) {
              return (l /= A / 2) < 1
                ? (T / 2) * l * l * l * l + m
                : (-T / 2) * ((l -= 2) * l * l * l - 2) + m;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, m, T, A) {
              return T * (l /= A) * l * l * l * l + m;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, m, T, A) {
              return T * ((l = l / A - 1) * l * l * l * l + 1) + m;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, m, T, A) {
              return (l /= A / 2) < 1
                ? (T / 2) * l * l * l * l * l + m
                : (T / 2) * ((l -= 2) * l * l * l * l + 2) + m;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, m, T, A) {
              return -T * Math.cos((l / A) * (Math.PI / 2)) + T + m;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, m, T, A) {
              return T * Math.sin((l / A) * (Math.PI / 2)) + m;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, m, T, A) {
              return (-T / 2) * (Math.cos((Math.PI * l) / A) - 1) + m;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, m, T, A) {
              return l === 0 ? m : T * Math.pow(2, 10 * (l / A - 1)) + m;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, m, T, A) {
              return l === A
                ? m + T
                : T * (-Math.pow(2, (-10 * l) / A) + 1) + m;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, m, T, A) {
              return l === 0
                ? m
                : l === A
                ? m + T
                : (l /= A / 2) < 1
                ? (T / 2) * Math.pow(2, 10 * (l - 1)) + m
                : (T / 2) * (-Math.pow(2, -10 * --l) + 2) + m;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, m, T, A) {
              return -T * (Math.sqrt(1 - (l /= A) * l) - 1) + m;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, m, T, A) {
              return T * Math.sqrt(1 - (l = l / A - 1) * l) + m;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, m, T, A) {
              return (l /= A / 2) < 1
                ? (-T / 2) * (Math.sqrt(1 - l * l) - 1) + m
                : (T / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + m;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, m, T, A, b) {
              return (
                b === void 0 && (b = 1.70158),
                T * (l /= A) * l * ((b + 1) * l - b) + m
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, m, T, A, b) {
              return (
                b === void 0 && (b = 1.70158),
                T * ((l = l / A - 1) * l * ((b + 1) * l + b) + 1) + m
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, m, T, A, b) {
              return (
                b === void 0 && (b = 1.70158),
                (l /= A / 2) < 1
                  ? (T / 2) * l * l * (((b *= 1.525) + 1) * l - b) + m
                  : (T / 2) *
                      ((l -= 2) * l * (((b *= 1.525) + 1) * l + b) + 2) +
                    m
              );
            },
          ],
        },
        E = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        y = document,
        _ = window,
        q = "bkwld-tram",
        I = /[\-\.0-9]/g,
        S = /[A-Z]/,
        w = "number",
        L = /^(rgb|#)/,
        P = /(em|cm|mm|in|pt|pc|px)$/,
        N = /(em|cm|mm|in|pt|pc|px|%)$/,
        B = /(deg|rad|turn)$/,
        j = "unitless",
        z = /(all|none) 0s ease 0s/,
        Q = /^(width|height)$/,
        U = " ",
        O = y.createElement("a"),
        v = ["Webkit", "Moz", "O", "ms"],
        R = ["-webkit-", "-moz-", "-o-", "-ms-"],
        M = function (l) {
          if (l in O.style) return { dom: l, css: l };
          var m,
            T,
            A = "",
            b = l.split("-");
          for (m = 0; m < b.length; m++)
            A += b[m].charAt(0).toUpperCase() + b[m].slice(1);
          for (m = 0; m < v.length; m++)
            if (((T = v[m] + A), T in O.style))
              return { dom: T, css: R[m] + l };
        },
        G = (t.support = {
          bind: Function.prototype.bind,
          transform: M("transform"),
          transition: M("transition"),
          backface: M("backface-visibility"),
          timing: M("transition-timing-function"),
        });
      if (G.transition) {
        var Z = G.timing.dom;
        if (((O.style[Z] = h["ease-in-back"][0]), !O.style[Z]))
          for (var J in E) h[J][0] = E[J];
      }
      var D = (t.frame = (function () {
          var l =
            _.requestAnimationFrame ||
            _.webkitRequestAnimationFrame ||
            _.mozRequestAnimationFrame ||
            _.oRequestAnimationFrame ||
            _.msRequestAnimationFrame;
          return l && G.bind
            ? l.bind(_)
            : function (m) {
                _.setTimeout(m, 16);
              };
        })()),
        X = (t.now = (function () {
          var l = _.performance,
            m = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return m && G.bind
            ? m.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        K = d(function (l) {
          function m(ee, oe) {
            var ge = p(("" + ee).split(U)),
              ue = ge[0];
            oe = oe || {};
            var Ae = vr[ue];
            if (!Ae) return f("Unsupported property: " + ue);
            if (!oe.weak || !this.props[ue]) {
              var Ve = Ae[0],
                Ce = this.props[ue];
              return (
                Ce || (Ce = this.props[ue] = new Ve.Bare()),
                Ce.init(this.$el, ge, Ae, oe),
                Ce
              );
            }
          }
          function T(ee, oe, ge) {
            if (ee) {
              var ue = typeof ee;
              if (
                (oe ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ue == "number" && oe)
              )
                return (
                  (this.timer = new ne({
                    duration: ee,
                    context: this,
                    complete: x,
                  })),
                  void (this.active = !0)
                );
              if (ue == "string" && oe) {
                switch (ee) {
                  case "hide":
                    H.call(this);
                    break;
                  case "stop":
                    Y.call(this);
                    break;
                  case "redraw":
                    re.call(this);
                    break;
                  default:
                    m.call(this, ee, ge && ge[1]);
                }
                return x.call(this);
              }
              if (ue == "function") return void ee.call(this, this);
              if (ue == "object") {
                var Ae = 0;
                Ze.call(
                  this,
                  ee,
                  function (ye, B_) {
                    ye.span > Ae && (Ae = ye.span), ye.stop(), ye.animate(B_);
                  },
                  function (ye) {
                    "wait" in ye && (Ae = u(ye.wait, 0));
                  }
                ),
                  he.call(this),
                  Ae > 0 &&
                    ((this.timer = new ne({ duration: Ae, context: this })),
                    (this.active = !0),
                    oe && (this.timer.complete = x));
                var Ve = this,
                  Ce = !1,
                  tn = {};
                D(function () {
                  Ze.call(Ve, ee, function (ye) {
                    ye.active && ((Ce = !0), (tn[ye.name] = ye.nextStyle));
                  }),
                    Ce && Ve.$el.css(tn);
                });
              }
            }
          }
          function A(ee) {
            (ee = u(ee, 0)),
              this.active
                ? this.queue.push({ options: ee })
                : ((this.timer = new ne({
                    duration: ee,
                    context: this,
                    complete: x,
                  })),
                  (this.active = !0));
          }
          function b(ee) {
            return this.active
              ? (this.queue.push({ options: ee, args: arguments }),
                void (this.timer.complete = x))
              : f(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function x() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ee = this.queue.shift();
              T.call(this, ee.options, !0, ee.args);
            }
          }
          function Y(ee) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var oe;
            typeof ee == "string"
              ? ((oe = {}), (oe[ee] = 1))
              : (oe = typeof ee == "object" && ee != null ? ee : this.props),
              Ze.call(this, oe, we),
              he.call(this);
          }
          function te(ee) {
            Y.call(this, ee), Ze.call(this, ee, hr, X_);
          }
          function le(ee) {
            typeof ee != "string" && (ee = "block"),
              (this.el.style.display = ee);
          }
          function H() {
            Y.call(this), (this.el.style.display = "none");
          }
          function re() {
            this.el.offsetHeight;
          }
          function ie() {
            Y.call(this), e.removeData(this.el, q), (this.$el = this.el = null);
          }
          function he() {
            var ee,
              oe,
              ge = [];
            this.upstream && ge.push(this.upstream);
            for (ee in this.props)
              (oe = this.props[ee]), oe.active && ge.push(oe.string);
            (ge = ge.join(",")),
              this.style !== ge &&
                ((this.style = ge), (this.el.style[G.transition.dom] = ge));
          }
          function Ze(ee, oe, ge) {
            var ue,
              Ae,
              Ve,
              Ce,
              tn = oe !== we,
              ye = {};
            for (ue in ee)
              (Ve = ee[ue]),
                ue in Qe
                  ? (ye.transform || (ye.transform = {}),
                    (ye.transform[ue] = Ve))
                  : (S.test(ue) && (ue = r(ue)),
                    ue in vr
                      ? (ye[ue] = Ve)
                      : (Ce || (Ce = {}), (Ce[ue] = Ve)));
            for (ue in ye) {
              if (((Ve = ye[ue]), (Ae = this.props[ue]), !Ae)) {
                if (!tn) continue;
                Ae = m.call(this, ue);
              }
              oe.call(this, Ae, Ve);
            }
            ge && Ce && ge.call(this, Ce);
          }
          function we(ee) {
            ee.stop();
          }
          function hr(ee, oe) {
            ee.set(oe);
          }
          function X_(ee) {
            this.$el.css(ee);
          }
          function Ue(ee, oe) {
            l[ee] = function () {
              return this.children
                ? W_.call(this, oe, arguments)
                : (this.el && oe.apply(this, arguments), this);
            };
          }
          function W_(ee, oe) {
            var ge,
              ue = this.children.length;
            for (ge = 0; ue > ge; ge++) ee.apply(this.children[ge], oe);
            return this;
          }
          (l.init = function (ee) {
            if (
              ((this.$el = e(ee)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              se.keepInherited && !se.fallback)
            ) {
              var oe = $e(this.el, "transition");
              oe && !z.test(oe) && (this.upstream = oe);
            }
            G.backface &&
              se.hideBackface &&
              Ge(this.el, G.backface.css, "hidden");
          }),
            Ue("add", m),
            Ue("start", T),
            Ue("wait", A),
            Ue("then", b),
            Ue("next", x),
            Ue("stop", Y),
            Ue("set", te),
            Ue("show", le),
            Ue("hide", H),
            Ue("redraw", re),
            Ue("destroy", ie);
        }),
        V = d(K, function (l) {
          function m(T, A) {
            var b = e.data(T, q) || e.data(T, q, new K.Bare());
            return b.el || b.init(T), A ? b.start(A) : b;
          }
          l.init = function (T, A) {
            var b = e(T);
            if (!b.length) return this;
            if (b.length === 1) return m(b[0], A);
            var x = [];
            return (
              b.each(function (Y, te) {
                x.push(m(te, A));
              }),
              (this.children = x),
              this
            );
          };
        }),
        F = d(function (l) {
          function m() {
            var x = this.get();
            this.update("auto");
            var Y = this.get();
            return this.update(x), Y;
          }
          function T(x, Y, te) {
            return Y !== void 0 && (te = Y), x in h ? x : te;
          }
          function A(x) {
            var Y = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(x);
            return (Y ? i(Y[1], Y[2], Y[3]) : x).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var b = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (x, Y, te, le) {
            (this.$el = x), (this.el = x[0]);
            var H = Y[0];
            te[2] && (H = te[2]),
              gr[H] && (H = gr[H]),
              (this.name = H),
              (this.type = te[1]),
              (this.duration = u(Y[1], this.duration, b.duration)),
              (this.ease = T(Y[2], this.ease, b.ease)),
              (this.delay = u(Y[3], this.delay, b.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = Q.test(this.name)),
              (this.unit = le.unit || this.unit || se.defaultUnit),
              (this.angle = le.angle || this.angle || se.defaultAngle),
              se.fallback || le.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    U +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? U + h[this.ease][0] : "") +
                    (this.delay ? U + this.delay + "ms" : "")));
          }),
            (l.set = function (x) {
              (x = this.convert(x, this.type)), this.update(x), this.redraw();
            }),
            (l.transition = function (x) {
              (this.active = !0),
                (x = this.convert(x, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  x == "auto" && (x = m.call(this))),
                (this.nextStyle = x);
            }),
            (l.fallback = function (x) {
              var Y =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (x = this.convert(x, this.type)),
                this.auto &&
                  (Y == "auto" && (Y = this.convert(this.get(), this.type)),
                  x == "auto" && (x = m.call(this))),
                (this.tween = new C({
                  from: Y,
                  to: x,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return $e(this.el, this.name);
            }),
            (l.update = function (x) {
              Ge(this.el, this.name, x);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                Ge(this.el, this.name, this.get()));
              var x = this.tween;
              x && x.context && x.destroy();
            }),
            (l.convert = function (x, Y) {
              if (x == "auto" && this.auto) return x;
              var te,
                le = typeof x == "number",
                H = typeof x == "string";
              switch (Y) {
                case w:
                  if (le) return x;
                  if (H && x.replace(I, "") === "") return +x;
                  te = "number(unitless)";
                  break;
                case L:
                  if (H) {
                    if (x === "" && this.original) return this.original;
                    if (Y.test(x))
                      return x.charAt(0) == "#" && x.length == 7 ? x : A(x);
                  }
                  te = "hex or rgb string";
                  break;
                case P:
                  if (le) return x + this.unit;
                  if (H && Y.test(x)) return x;
                  te = "number(px) or string(unit)";
                  break;
                case N:
                  if (le) return x + this.unit;
                  if (H && Y.test(x)) return x;
                  te = "number(px) or string(unit or %)";
                  break;
                case B:
                  if (le) return x + this.angle;
                  if (H && Y.test(x)) return x;
                  te = "number(deg) or string(angle)";
                  break;
                case j:
                  if (le || (H && N.test(x))) return x;
                  te = "number(unitless) or string(unit or %)";
              }
              return s(te, x), x;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        g = d(F, function (l, m) {
          l.init = function () {
            m.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), L));
          };
        }),
        k = d(F, function (l, m) {
          (l.init = function () {
            m.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (T) {
              this.$el[this.name](T);
            });
        }),
        W = d(F, function (l, m) {
          function T(A, b) {
            var x, Y, te, le, H;
            for (x in A)
              (le = Qe[x]),
                (te = le[0]),
                (Y = le[1] || x),
                (H = this.convert(A[x], te)),
                b.call(this, Y, H, te);
          }
          (l.init = function () {
            m.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                Qe.perspective &&
                  se.perspective &&
                  ((this.current.perspective = se.perspective),
                  Ge(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (A) {
              T.call(this, A, function (b, x) {
                this.current[b] = x;
              }),
                Ge(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (A) {
              var b = this.values(A);
              this.tween = new Ee({
                current: this.current,
                values: b,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var x,
                Y = {};
              for (x in this.current) Y[x] = x in b ? b[x] : this.current[x];
              (this.active = !0), (this.nextStyle = this.style(Y));
            }),
            (l.fallback = function (A) {
              var b = this.values(A);
              this.tween = new Ee({
                current: this.current,
                values: b,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              Ge(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (A) {
              var b,
                x = "";
              for (b in A) x += b + "(" + A[b] + ") ";
              return x;
            }),
            (l.values = function (A) {
              var b,
                x = {};
              return (
                T.call(this, A, function (Y, te, le) {
                  (x[Y] = te),
                    this.current[Y] === void 0 &&
                      ((b = 0),
                      ~Y.indexOf("scale") && (b = 1),
                      (this.current[Y] = this.convert(b, le)));
                }),
                x
              );
            });
        }),
        C = d(function (l) {
          function m(H) {
            te.push(H) === 1 && D(T);
          }
          function T() {
            var H,
              re,
              ie,
              he = te.length;
            if (he)
              for (D(T), re = X(), H = he; H--; )
                (ie = te[H]), ie && ie.render(re);
          }
          function A(H) {
            var re,
              ie = e.inArray(H, te);
            ie >= 0 &&
              ((re = te.slice(ie + 1)),
              (te.length = ie),
              re.length && (te = te.concat(re)));
          }
          function b(H) {
            return Math.round(H * le) / le;
          }
          function x(H, re, ie) {
            return i(
              H[0] + ie * (re[0] - H[0]),
              H[1] + ie * (re[1] - H[1]),
              H[2] + ie * (re[2] - H[2])
            );
          }
          var Y = { ease: h.ease[1], from: 0, to: 1 };
          (l.init = function (H) {
            (this.duration = H.duration || 0), (this.delay = H.delay || 0);
            var re = H.ease || Y.ease;
            h[re] && (re = h[re][1]),
              typeof re != "function" && (re = Y.ease),
              (this.ease = re),
              (this.update = H.update || o),
              (this.complete = H.complete || o),
              (this.context = H.context || this),
              (this.name = H.name);
            var ie = H.from,
              he = H.to;
            ie === void 0 && (ie = Y.from),
              he === void 0 && (he = Y.to),
              (this.unit = H.unit || ""),
              typeof ie == "number" && typeof he == "number"
                ? ((this.begin = ie), (this.change = he - ie))
                : this.format(he, ie),
              (this.value = this.begin + this.unit),
              (this.start = X()),
              H.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = X()), (this.active = !0), m(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), A(this));
            }),
            (l.render = function (H) {
              var re,
                ie = H - this.start;
              if (this.delay) {
                if (ie <= this.delay) return;
                ie -= this.delay;
              }
              if (ie < this.duration) {
                var he = this.ease(ie, 0, 1, this.duration);
                return (
                  (re = this.startRGB
                    ? x(this.startRGB, this.endRGB, he)
                    : b(this.begin + he * this.change)),
                  (this.value = re + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (re = this.endHex || this.begin + this.change),
                (this.value = re + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (H, re) {
              if (((re += ""), (H += ""), H.charAt(0) == "#"))
                return (
                  (this.startRGB = n(re)),
                  (this.endRGB = n(H)),
                  (this.endHex = H),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ie = re.replace(I, ""),
                  he = H.replace(I, "");
                ie !== he && a("tween", re, H), (this.unit = ie);
              }
              (re = parseFloat(re)),
                (H = parseFloat(H)),
                (this.begin = this.value = re),
                (this.change = H - re);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var te = [],
            le = 1e3;
        }),
        ne = d(C, function (l) {
          (l.init = function (m) {
            (this.duration = m.duration || 0),
              (this.complete = m.complete || o),
              (this.context = m.context),
              this.play();
          }),
            (l.render = function (m) {
              var T = m - this.start;
              T < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        Ee = d(C, function (l, m) {
          (l.init = function (T) {
            (this.context = T.context),
              (this.update = T.update),
              (this.tweens = []),
              (this.current = T.current);
            var A, b;
            for (A in T.values)
              (b = T.values[A]),
                this.current[A] !== b &&
                  this.tweens.push(
                    new C({
                      name: A,
                      from: this.current[A],
                      to: b,
                      duration: T.duration,
                      delay: T.delay,
                      ease: T.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (T) {
              var A,
                b,
                x = this.tweens.length,
                Y = !1;
              for (A = x; A--; )
                (b = this.tweens[A]),
                  b.context &&
                    (b.render(T), (this.current[b.name] = b.value), (Y = !0));
              return Y
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((m.destroy.call(this), this.tweens)) {
                var T,
                  A = this.tweens.length;
                for (T = A; T--; ) this.tweens[T].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        se = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !G.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!G.transition) return (se.fallback = !0);
        se.agentTests.push("(" + l + ")");
        var m = new RegExp(se.agentTests.join("|"), "i");
        se.fallback = m.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new C(l);
        }),
        (t.delay = function (l, m, T) {
          return new ne({ complete: m, duration: l, context: T });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var Ge = e.style,
        $e = e.css,
        gr = { transform: G.transform && G.transform.css },
        vr = {
          color: [g, L],
          background: [g, L, "background-color"],
          "outline-color": [g, L],
          "border-color": [g, L],
          "border-top-color": [g, L],
          "border-right-color": [g, L],
          "border-bottom-color": [g, L],
          "border-left-color": [g, L],
          "border-width": [F, P],
          "border-top-width": [F, P],
          "border-right-width": [F, P],
          "border-bottom-width": [F, P],
          "border-left-width": [F, P],
          "border-spacing": [F, P],
          "letter-spacing": [F, P],
          margin: [F, P],
          "margin-top": [F, P],
          "margin-right": [F, P],
          "margin-bottom": [F, P],
          "margin-left": [F, P],
          padding: [F, P],
          "padding-top": [F, P],
          "padding-right": [F, P],
          "padding-bottom": [F, P],
          "padding-left": [F, P],
          "outline-width": [F, P],
          opacity: [F, w],
          top: [F, N],
          right: [F, N],
          bottom: [F, N],
          left: [F, N],
          "font-size": [F, N],
          "text-indent": [F, N],
          "word-spacing": [F, N],
          width: [F, N],
          "min-width": [F, N],
          "max-width": [F, N],
          height: [F, N],
          "min-height": [F, N],
          "max-height": [F, N],
          "line-height": [F, j],
          "scroll-top": [k, w, "scrollTop"],
          "scroll-left": [k, w, "scrollLeft"],
        },
        Qe = {};
      G.transform &&
        ((vr.transform = [W]),
        (Qe = {
          x: [N, "translateX"],
          y: [N, "translateY"],
          rotate: [B],
          rotateX: [B],
          rotateY: [B],
          scale: [w],
          scaleX: [w],
          scaleY: [w],
          skew: [B],
          skewX: [B],
          skewY: [B],
        })),
        G.transform &&
          G.backface &&
          ((Qe.z = [N, "translateZ"]),
          (Qe.rotateZ = [B]),
          (Qe.scaleZ = [w]),
          (Qe.perspective = [P]));
      var Ci = /ms/,
        en = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Ps = c((kk, Ns) => {
    "use strict";
    var Q_ = window.$,
      Z_ = Li() && Q_.tram;
    Ns.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        u = n.toString,
        f = n.hasOwnProperty,
        p = r.forEach,
        d = r.map,
        h = r.reduce,
        E = r.reduceRight,
        y = r.filter,
        _ = r.every,
        q = r.some,
        I = r.indexOf,
        S = r.lastIndexOf,
        w = Array.isArray,
        L = Object.keys,
        P = i.bind,
        N =
          (e.each =
          e.forEach =
            function (v, R, M) {
              if (v == null) return v;
              if (p && v.forEach === p) v.forEach(R, M);
              else if (v.length === +v.length) {
                for (var G = 0, Z = v.length; G < Z; G++)
                  if (R.call(M, v[G], G, v) === t) return;
              } else
                for (var J = e.keys(v), G = 0, Z = J.length; G < Z; G++)
                  if (R.call(M, v[J[G]], J[G], v) === t) return;
              return v;
            });
      (e.map = e.collect =
        function (v, R, M) {
          var G = [];
          return v == null
            ? G
            : d && v.map === d
            ? v.map(R, M)
            : (N(v, function (Z, J, D) {
                G.push(R.call(M, Z, J, D));
              }),
              G);
        }),
        (e.find = e.detect =
          function (v, R, M) {
            var G;
            return (
              B(v, function (Z, J, D) {
                if (R.call(M, Z, J, D)) return (G = Z), !0;
              }),
              G
            );
          }),
        (e.filter = e.select =
          function (v, R, M) {
            var G = [];
            return v == null
              ? G
              : y && v.filter === y
              ? v.filter(R, M)
              : (N(v, function (Z, J, D) {
                  R.call(M, Z, J, D) && G.push(Z);
                }),
                G);
          });
      var B =
        (e.some =
        e.any =
          function (v, R, M) {
            R || (R = e.identity);
            var G = !1;
            return v == null
              ? G
              : q && v.some === q
              ? v.some(R, M)
              : (N(v, function (Z, J, D) {
                  if (G || (G = R.call(M, Z, J, D))) return t;
                }),
                !!G);
          });
      (e.contains = e.include =
        function (v, R) {
          return v == null
            ? !1
            : I && v.indexOf === I
            ? v.indexOf(R) != -1
            : B(v, function (M) {
                return M === R;
              });
        }),
        (e.delay = function (v, R) {
          var M = s.call(arguments, 2);
          return setTimeout(function () {
            return v.apply(null, M);
          }, R);
        }),
        (e.defer = function (v) {
          return e.delay.apply(e, [v, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (v) {
          var R, M, G;
          return function () {
            R ||
              ((R = !0),
              (M = arguments),
              (G = this),
              Z_.frame(function () {
                (R = !1), v.apply(G, M);
              }));
          };
        }),
        (e.debounce = function (v, R, M) {
          var G,
            Z,
            J,
            D,
            X,
            K = function () {
              var V = e.now() - D;
              V < R
                ? (G = setTimeout(K, R - V))
                : ((G = null), M || ((X = v.apply(J, Z)), (J = Z = null)));
            };
          return function () {
            (J = this), (Z = arguments), (D = e.now());
            var V = M && !G;
            return (
              G || (G = setTimeout(K, R)),
              V && ((X = v.apply(J, Z)), (J = Z = null)),
              X
            );
          };
        }),
        (e.defaults = function (v) {
          if (!e.isObject(v)) return v;
          for (var R = 1, M = arguments.length; R < M; R++) {
            var G = arguments[R];
            for (var Z in G) v[Z] === void 0 && (v[Z] = G[Z]);
          }
          return v;
        }),
        (e.keys = function (v) {
          if (!e.isObject(v)) return [];
          if (L) return L(v);
          var R = [];
          for (var M in v) e.has(v, M) && R.push(M);
          return R;
        }),
        (e.has = function (v, R) {
          return f.call(v, R);
        }),
        (e.isObject = function (v) {
          return v === Object(v);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var j = /(.)^/,
        z = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        Q = /\\|'|\r|\n|\u2028|\u2029/g,
        U = function (v) {
          return "\\" + z[v];
        },
        O = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (v, R, M) {
          !R && M && (R = M), (R = e.defaults({}, R, e.templateSettings));
          var G = RegExp(
              [
                (R.escape || j).source,
                (R.interpolate || j).source,
                (R.evaluate || j).source,
              ].join("|") + "|$",
              "g"
            ),
            Z = 0,
            J = "__p+='";
          v.replace(G, function (V, F, g, k, W) {
            return (
              (J += v.slice(Z, W).replace(Q, U)),
              (Z = W + V.length),
              F
                ? (J +=
                    `'+
    ((__t=(` +
                    F +
                    `))==null?'':_.escape(__t))+
    '`)
                : g
                ? (J +=
                    `'+
    ((__t=(` +
                    g +
                    `))==null?'':__t)+
    '`)
                : k &&
                  (J +=
                    `';
    ` +
                    k +
                    `
    __p+='`),
              V
            );
          }),
            (J += `';
    `);
          var D = R.variable;
          if (D) {
            if (!O.test(D))
              throw new Error("variable is not a bare identifier: " + D);
          } else
            (J =
              `with(obj||{}){
    ` +
              J +
              `}
    `),
              (D = "obj");
          J =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    ` +
            J +
            `return __p;
    `;
          var X;
          try {
            X = new Function(R.variable || "obj", "_", J);
          } catch (V) {
            throw ((V.source = J), V);
          }
          var K = function (V) {
            return X.call(this, V, e);
          };
          return (
            (K.source =
              "function(" +
              D +
              `){
    ` +
              J +
              "}"),
            K
          );
        }),
        e
      );
    })();
  });
  var De = c((Hk, ks) => {
    "use strict";
    var ce = {},
      Dt = {},
      Ft = [],
      Pi = window.Webflow || [],
      vt = window.jQuery,
      He = vt(window),
      J_ = vt(document),
      et = vt.isFunction,
      ke = (ce._ = Ps()),
      Ms = (ce.tram = Li() && vt.tram),
      on = !1,
      qi = !1;
    Ms.config.hideBackface = !1;
    Ms.config.keepInherited = !0;
    ce.define = function (e, t, r) {
      Dt[e] && Fs(Dt[e]);
      var n = (Dt[e] = t(vt, ke, r) || {});
      return Ds(n), n;
    };
    ce.require = function (e) {
      return Dt[e];
    };
    function Ds(e) {
      ce.env() &&
        (et(e.design) && He.on("__wf_design", e.design),
        et(e.preview) && He.on("__wf_preview", e.preview)),
        et(e.destroy) && He.on("__wf_destroy", e.destroy),
        e.ready && et(e.ready) && eb(e);
    }
    function eb(e) {
      if (on) {
        e.ready();
        return;
      }
      ke.contains(Ft, e.ready) || Ft.push(e.ready);
    }
    function Fs(e) {
      et(e.design) && He.off("__wf_design", e.design),
        et(e.preview) && He.off("__wf_preview", e.preview),
        et(e.destroy) && He.off("__wf_destroy", e.destroy),
        e.ready && et(e.ready) && tb(e);
    }
    function tb(e) {
      Ft = ke.filter(Ft, function (t) {
        return t !== e.ready;
      });
    }
    ce.push = function (e) {
      if (on) {
        et(e) && e();
        return;
      }
      Pi.push(e);
    };
    ce.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var nn = navigator.userAgent.toLowerCase(),
      Gs = (ce.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      rb = (ce.env.chrome =
        /chrome/.test(nn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(nn.match(/chrome\/(\d+)\./)[1], 10)),
      nb = (ce.env.ios = /(ipod|iphone|ipad)/.test(nn));
    ce.env.safari = /safari/.test(nn) && !rb && !nb;
    var Ni;
    Gs &&
      J_.on("touchstart mousedown", function (e) {
        Ni = e.target;
      });
    ce.validClick = Gs
      ? function (e) {
          return e === Ni || vt.contains(e, Ni);
        }
      : function () {
          return !0;
        };
    var Us = "resize.webflow orientationchange.webflow load.webflow",
      ib = "scroll.webflow " + Us;
    ce.resize = Mi(He, Us);
    ce.scroll = Mi(He, ib);
    ce.redraw = Mi();
    function Mi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = ke.throttle(function (i) {
          ke.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (ke.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = ke.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    ce.location = function (e) {
      window.location = e;
    };
    ce.env() && (ce.location = function () {});
    ce.ready = function () {
      (on = !0), qi ? ob() : ke.each(Ft, qs), ke.each(Pi, qs), ce.resize.up();
    };
    function qs(e) {
      et(e) && e();
    }
    function ob() {
      (qi = !1), ke.each(Dt, Ds);
    }
    var Ot;
    ce.load = function (e) {
      Ot.then(e);
    };
    function Vs() {
      Ot && (Ot.reject(), He.off("load", Ot.resolve)),
        (Ot = new vt.Deferred()),
        He.on("load", Ot.resolve);
    }
    ce.destroy = function (e) {
      (e = e || {}),
        (qi = !0),
        He.triggerHandler("__wf_destroy"),
        e.domready != null && (on = e.domready),
        ke.each(Dt, Fs),
        ce.resize.off(),
        ce.scroll.off(),
        ce.redraw.off(),
        (Ft = []),
        (Pi = []),
        Ot.state() === "pending" && Vs();
    };
    vt(ce.ready);
    Vs();
    ks.exports = window.Webflow = ce;
  });
  var Ws = c((Xk, Xs) => {
    "use strict";
    var Hs = De();
    Hs.define(
      "brand",
      (Xs.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          f;
        t.ready = function () {
          var E = n.attr("data-wf-status"),
            y = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(y) && s.hostname !== y && (E = !0),
            E &&
              !a &&
              ((f = f || d()),
              h(),
              setTimeout(h, 500),
              e(r).off(u, p).on(u, p));
        };
        function p() {
          var E =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(f).attr("style", E ? "display: none !important;" : "");
        }
        
        function h() {
          var E = i.children(o),
            y = E.length && E.get(0) === f,
            _ = Hs.env("editor");
          if (y) {
            _ && E.remove();
            return;
          }
          E.length && E.remove(), _ || i.append(f);
        }
        return t;
      })
    );
  });
  var js = c((Wk, Bs) => {
    "use strict";
    var Di = De();
    Di.define(
      "edit",
      (Bs.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Di.env("test") || Di.env("frame")) && !r.fixture && !ab())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          f = r.load || h,
          p = !1;
        try {
          p =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        p
          ? f()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            f()
          : i.on(a, d).triggerHandler(a);
        function d() {
          u || (/\?edit/.test(s.hash) && f());
        }
        function h() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, d),
            S(function (L) {
              e.ajax({
                url: I("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: E(L),
              });
            });
        }
        function E(L) {
          return function (P) {
            if (!P) {
              console.error("Could not load editor data");
              return;
            }
            (P.thirdPartyCookiesSupported = L),
              y(q(P.bugReporterScriptPath), function () {
                y(q(P.scriptPath), function () {
                  window.WebflowEditor(P);
                });
              });
          };
        }
        function y(L, P) {
          e.ajax({ type: "GET", url: L, dataType: "script", cache: !0 }).then(
            P,
            _
          );
        }
        function _(L, P, N) {
          throw (console.error("Could not load editor script: " + P), N);
        }
        function q(L) {
          return L.indexOf("//") >= 0
            ? L
            : I("https://editor-api.webflow.com" + L);
        }
        function I(L) {
          return L.replace(/([^:])\/\//g, "$1/");
        }
        function S(L) {
          var P = window.document.createElement("iframe");
          (P.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (P.style.display = "none"),
            (P.sandbox = "allow-scripts allow-same-origin");
          var N = function (B) {
            B.data === "WF_third_party_cookies_unsupported"
              ? (w(P, N), L(!1))
              : B.data === "WF_third_party_cookies_supported" &&
                (w(P, N), L(!0));
          };
          (P.onerror = function () {
            w(P, N), L(!1);
          }),
            window.addEventListener("message", N, !1),
            window.document.body.appendChild(P);
        }
        function w(L, P) {
          window.removeEventListener("message", P, !1), L.remove();
        }
        return n;
      })
    );
    function ab() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Ks = c((Bk, zs) => {
    "use strict";
    var sb = De();
    sb.define(
      "focus-visible",
      (zs.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(w) {
            return !!(
              w &&
              w !== document &&
              w.nodeName !== "HTML" &&
              w.nodeName !== "BODY" &&
              "classList" in w &&
              "contains" in w.classList
            );
          }
          function u(w) {
            var L = w.type,
              P = w.tagName;
            return !!(
              (P === "INPUT" && s[L] && !w.readOnly) ||
              (P === "TEXTAREA" && !w.readOnly) ||
              w.isContentEditable
            );
          }
          function f(w) {
            w.getAttribute("data-wf-focus-visible") ||
              w.setAttribute("data-wf-focus-visible", "true");
          }
          function p(w) {
            w.getAttribute("data-wf-focus-visible") &&
              w.removeAttribute("data-wf-focus-visible");
          }
          function d(w) {
            w.metaKey ||
              w.altKey ||
              w.ctrlKey ||
              (a(r.activeElement) && f(r.activeElement), (n = !0));
          }
          function h() {
            n = !1;
          }
          function E(w) {
            a(w.target) && (n || u(w.target)) && f(w.target);
          }
          function y(w) {
            a(w.target) &&
              w.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              p(w.target));
          }
          function _() {
            document.visibilityState === "hidden" && (i && (n = !0), q());
          }
          function q() {
            document.addEventListener("mousemove", S),
              document.addEventListener("mousedown", S),
              document.addEventListener("mouseup", S),
              document.addEventListener("pointermove", S),
              document.addEventListener("pointerdown", S),
              document.addEventListener("pointerup", S),
              document.addEventListener("touchmove", S),
              document.addEventListener("touchstart", S),
              document.addEventListener("touchend", S);
          }
          function I() {
            document.removeEventListener("mousemove", S),
              document.removeEventListener("mousedown", S),
              document.removeEventListener("mouseup", S),
              document.removeEventListener("pointermove", S),
              document.removeEventListener("pointerdown", S),
              document.removeEventListener("pointerup", S),
              document.removeEventListener("touchmove", S),
              document.removeEventListener("touchstart", S),
              document.removeEventListener("touchend", S);
          }
          function S(w) {
            (w.target.nodeName && w.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), I());
          }
          document.addEventListener("keydown", d, !0),
            document.addEventListener("mousedown", h, !0),
            document.addEventListener("pointerdown", h, !0),
            document.addEventListener("touchstart", h, !0),
            document.addEventListener("visibilitychange", _, !0),
            q(),
            r.addEventListener("focus", E, !0),
            r.addEventListener("blur", y, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Qs = c((jk, $s) => {
    "use strict";
    var Ys = De();
    Ys.define(
      "focus",
      ($s.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Ys.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var eu = c((zk, Js) => {
    "use strict";
    var Fi = window.jQuery,
      tt = {},
      an = [],
      Zs = ".w-ix",
      sn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Fi(t).triggerHandler(tt.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Fi(t).triggerHandler(tt.types.OUTRO));
        },
      };
    tt.triggers = {};
    tt.types = { INTRO: "w-ix-intro" + Zs, OUTRO: "w-ix-outro" + Zs };
    tt.init = function () {
      for (var e = an.length, t = 0; t < e; t++) {
        var r = an[t];
        r[0](0, r[1]);
      }
      (an = []), Fi.extend(tt.triggers, sn);
    };
    tt.async = function () {
      for (var e in sn) {
        var t = sn[e];
        sn.hasOwnProperty(e) &&
          (tt.triggers[e] = function (r, n) {
            an.push([t, n]);
          });
      }
    };
    tt.async();
    Js.exports = tt;
  });
  var cn = c((Kk, nu) => {
    "use strict";
    var Gi = eu();
    function tu(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var ub = window.jQuery,
      un = {},
      ru = ".w-ix",
      cb = {
        reset: function (e, t) {
          Gi.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Gi.triggers.intro(e, t), tu(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Gi.triggers.outro(e, t), tu(t, "COMPONENT_INACTIVE");
        },
      };
    un.triggers = {};
    un.types = { INTRO: "w-ix-intro" + ru, OUTRO: "w-ix-outro" + ru };
    ub.extend(un.triggers, cb);
    nu.exports = un;
  });
  var iu = c((Yk, ut) => {
    function Ui(e) {
      return (
        (ut.exports = Ui =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (ut.exports.__esModule = !0),
        (ut.exports.default = ut.exports),
        Ui(e)
      );
    }
    (ut.exports = Ui),
      (ut.exports.__esModule = !0),
      (ut.exports.default = ut.exports);
  });
  var ln = c(($k, yr) => {
    var lb = iu().default;
    function ou(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (ou = function (i) {
        return i ? r : t;
      })(e);
    }
    function fb(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (lb(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = ou(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (yr.exports = fb),
      (yr.exports.__esModule = !0),
      (yr.exports.default = yr.exports);
  });
  var au = c((Qk, Er) => {
    function db(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Er.exports = db),
      (Er.exports.__esModule = !0),
      (Er.exports.default = Er.exports);
  });
  var pe = c((Zk, su) => {
    var fn = function (e) {
      return e && e.Math == Math && e;
    };
    su.exports =
      fn(typeof globalThis == "object" && globalThis) ||
      fn(typeof window == "object" && window) ||
      fn(typeof self == "object" && self) ||
      fn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Gt = c((Jk, uu) => {
    uu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var wt = c((eH, cu) => {
    var pb = Gt();
    cu.exports = !pb(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var dn = c((tH, lu) => {
    var mr = Function.prototype.call;
    lu.exports = mr.bind
      ? mr.bind(mr)
      : function () {
          return mr.apply(mr, arguments);
        };
  });
  var gu = c((pu) => {
    "use strict";
    var fu = {}.propertyIsEnumerable,
      du = Object.getOwnPropertyDescriptor,
      gb = du && !fu.call({ 1: 2 }, 1);
    pu.f = gb
      ? function (t) {
          var r = du(this, t);
          return !!r && r.enumerable;
        }
      : fu;
  });
  var Vi = c((nH, vu) => {
    vu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var Xe = c((iH, yu) => {
    var hu = Function.prototype,
      ki = hu.bind,
      Hi = hu.call,
      vb = ki && ki.bind(Hi);
    yu.exports = ki
      ? function (e) {
          return e && vb(Hi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Hi.apply(e, arguments);
            }
          );
        };
  });
  var _u = c((oH, mu) => {
    var Eu = Xe(),
      hb = Eu({}.toString),
      yb = Eu("".slice);
    mu.exports = function (e) {
      return yb(hb(e), 8, -1);
    };
  });
  var Tu = c((aH, bu) => {
    var Eb = pe(),
      mb = Xe(),
      _b = Gt(),
      bb = _u(),
      Xi = Eb.Object,
      Tb = mb("".split);
    bu.exports = _b(function () {
      return !Xi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return bb(e) == "String" ? Tb(e, "") : Xi(e);
        }
      : Xi;
  });
  var Wi = c((sH, Iu) => {
    var Ib = pe(),
      Ob = Ib.TypeError;
    Iu.exports = function (e) {
      if (e == null) throw Ob("Can't call method on " + e);
      return e;
    };
  });
  var _r = c((uH, Ou) => {
    var wb = Tu(),
      Ab = Wi();
    Ou.exports = function (e) {
      return wb(Ab(e));
    };
  });
  var rt = c((cH, wu) => {
    wu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Ut = c((lH, Au) => {
    var xb = rt();
    Au.exports = function (e) {
      return typeof e == "object" ? e !== null : xb(e);
    };
  });
  var br = c((fH, xu) => {
    var Bi = pe(),
      Sb = rt(),
      Rb = function (e) {
        return Sb(e) ? e : void 0;
      };
    xu.exports = function (e, t) {
      return arguments.length < 2 ? Rb(Bi[e]) : Bi[e] && Bi[e][t];
    };
  });
  var Ru = c((dH, Su) => {
    var Cb = Xe();
    Su.exports = Cb({}.isPrototypeOf);
  });
  var Lu = c((pH, Cu) => {
    var Lb = br();
    Cu.exports = Lb("navigator", "userAgent") || "";
  });
  var Gu = c((gH, Fu) => {
    var Du = pe(),
      ji = Lu(),
      Nu = Du.process,
      Pu = Du.Deno,
      qu = (Nu && Nu.versions) || (Pu && Pu.version),
      Mu = qu && qu.v8,
      We,
      pn;
    Mu &&
      ((We = Mu.split(".")),
      (pn = We[0] > 0 && We[0] < 4 ? 1 : +(We[0] + We[1])));
    !pn &&
      ji &&
      ((We = ji.match(/Edge\/(\d+)/)),
      (!We || We[1] >= 74) &&
        ((We = ji.match(/Chrome\/(\d+)/)), We && (pn = +We[1])));
    Fu.exports = pn;
  });
  var zi = c((vH, Vu) => {
    var Uu = Gu(),
      Nb = Gt();
    Vu.exports =
      !!Object.getOwnPropertySymbols &&
      !Nb(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Uu && Uu < 41)
        );
      });
  });
  var Ki = c((hH, ku) => {
    var Pb = zi();
    ku.exports = Pb && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var Yi = c((yH, Hu) => {
    var qb = pe(),
      Mb = br(),
      Db = rt(),
      Fb = Ru(),
      Gb = Ki(),
      Ub = qb.Object;
    Hu.exports = Gb
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Mb("Symbol");
          return Db(t) && Fb(t.prototype, Ub(e));
        };
  });
  var Wu = c((EH, Xu) => {
    var Vb = pe(),
      kb = Vb.String;
    Xu.exports = function (e) {
      try {
        return kb(e);
      } catch {
        return "Object";
      }
    };
  });
  var ju = c((mH, Bu) => {
    var Hb = pe(),
      Xb = rt(),
      Wb = Wu(),
      Bb = Hb.TypeError;
    Bu.exports = function (e) {
      if (Xb(e)) return e;
      throw Bb(Wb(e) + " is not a function");
    };
  });
  var Ku = c((_H, zu) => {
    var jb = ju();
    zu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : jb(r);
    };
  });
  var $u = c((bH, Yu) => {
    var zb = pe(),
      $i = dn(),
      Qi = rt(),
      Zi = Ut(),
      Kb = zb.TypeError;
    Yu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && Qi((r = e.toString)) && !Zi((n = $i(r, e)))) ||
        (Qi((r = e.valueOf)) && !Zi((n = $i(r, e)))) ||
        (t !== "string" && Qi((r = e.toString)) && !Zi((n = $i(r, e))))
      )
        return n;
      throw Kb("Can't convert object to primitive value");
    };
  });
  var Zu = c((TH, Qu) => {
    Qu.exports = !1;
  });
  var gn = c((IH, ec) => {
    var Ju = pe(),
      Yb = Object.defineProperty;
    ec.exports = function (e, t) {
      try {
        Yb(Ju, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Ju[e] = t;
      }
      return t;
    };
  });
  var vn = c((OH, rc) => {
    var $b = pe(),
      Qb = gn(),
      tc = "__core-js_shared__",
      Zb = $b[tc] || Qb(tc, {});
    rc.exports = Zb;
  });
  var Ji = c((wH, ic) => {
    var Jb = Zu(),
      nc = vn();
    (ic.exports = function (e, t) {
      return nc[e] || (nc[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: Jb ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var ac = c((AH, oc) => {
    var eT = pe(),
      tT = Wi(),
      rT = eT.Object;
    oc.exports = function (e) {
      return rT(tT(e));
    };
  });
  var ht = c((xH, sc) => {
    var nT = Xe(),
      iT = ac(),
      oT = nT({}.hasOwnProperty);
    sc.exports =
      Object.hasOwn ||
      function (t, r) {
        return oT(iT(t), r);
      };
  });
  var eo = c((SH, uc) => {
    var aT = Xe(),
      sT = 0,
      uT = Math.random(),
      cT = aT((1).toString);
    uc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + cT(++sT + uT, 36);
    };
  });
  var to = c((RH, pc) => {
    var lT = pe(),
      fT = Ji(),
      cc = ht(),
      dT = eo(),
      lc = zi(),
      dc = Ki(),
      Vt = fT("wks"),
      At = lT.Symbol,
      fc = At && At.for,
      pT = dc ? At : (At && At.withoutSetter) || dT;
    pc.exports = function (e) {
      if (!cc(Vt, e) || !(lc || typeof Vt[e] == "string")) {
        var t = "Symbol." + e;
        lc && cc(At, e)
          ? (Vt[e] = At[e])
          : dc && fc
          ? (Vt[e] = fc(t))
          : (Vt[e] = pT(t));
      }
      return Vt[e];
    };
  });
  var yc = c((CH, hc) => {
    var gT = pe(),
      vT = dn(),
      gc = Ut(),
      vc = Yi(),
      hT = Ku(),
      yT = $u(),
      ET = to(),
      mT = gT.TypeError,
      _T = ET("toPrimitive");
    hc.exports = function (e, t) {
      if (!gc(e) || vc(e)) return e;
      var r = hT(e, _T),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = vT(r, e, t)), !gc(n) || vc(n))
        )
          return n;
        throw mT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), yT(e, t);
    };
  });
  var ro = c((LH, Ec) => {
    var bT = yc(),
      TT = Yi();
    Ec.exports = function (e) {
      var t = bT(e, "string");
      return TT(t) ? t : t + "";
    };
  });
  var io = c((NH, _c) => {
    var IT = pe(),
      mc = Ut(),
      no = IT.document,
      OT = mc(no) && mc(no.createElement);
    _c.exports = function (e) {
      return OT ? no.createElement(e) : {};
    };
  });
  var oo = c((PH, bc) => {
    var wT = wt(),
      AT = Gt(),
      xT = io();
    bc.exports =
      !wT &&
      !AT(function () {
        return (
          Object.defineProperty(xT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var ao = c((Ic) => {
    var ST = wt(),
      RT = dn(),
      CT = gu(),
      LT = Vi(),
      NT = _r(),
      PT = ro(),
      qT = ht(),
      MT = oo(),
      Tc = Object.getOwnPropertyDescriptor;
    Ic.f = ST
      ? Tc
      : function (t, r) {
          if (((t = NT(t)), (r = PT(r)), MT))
            try {
              return Tc(t, r);
            } catch {}
          if (qT(t, r)) return LT(!RT(CT.f, t, r), t[r]);
        };
  });
  var Tr = c((MH, wc) => {
    var Oc = pe(),
      DT = Ut(),
      FT = Oc.String,
      GT = Oc.TypeError;
    wc.exports = function (e) {
      if (DT(e)) return e;
      throw GT(FT(e) + " is not an object");
    };
  });
  var Ir = c((Sc) => {
    var UT = pe(),
      VT = wt(),
      kT = oo(),
      Ac = Tr(),
      HT = ro(),
      XT = UT.TypeError,
      xc = Object.defineProperty;
    Sc.f = VT
      ? xc
      : function (t, r, n) {
          if ((Ac(t), (r = HT(r)), Ac(n), kT))
            try {
              return xc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw XT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var hn = c((FH, Rc) => {
    var WT = wt(),
      BT = Ir(),
      jT = Vi();
    Rc.exports = WT
      ? function (e, t, r) {
          return BT.f(e, t, jT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var uo = c((GH, Cc) => {
    var zT = Xe(),
      KT = rt(),
      so = vn(),
      YT = zT(Function.toString);
    KT(so.inspectSource) ||
      (so.inspectSource = function (e) {
        return YT(e);
      });
    Cc.exports = so.inspectSource;
  });
  var Pc = c((UH, Nc) => {
    var $T = pe(),
      QT = rt(),
      ZT = uo(),
      Lc = $T.WeakMap;
    Nc.exports = QT(Lc) && /native code/.test(ZT(Lc));
  });
  var co = c((VH, Mc) => {
    var JT = Ji(),
      eI = eo(),
      qc = JT("keys");
    Mc.exports = function (e) {
      return qc[e] || (qc[e] = eI(e));
    };
  });
  var yn = c((kH, Dc) => {
    Dc.exports = {};
  });
  var Hc = c((HH, kc) => {
    var tI = Pc(),
      Vc = pe(),
      lo = Xe(),
      rI = Ut(),
      nI = hn(),
      fo = ht(),
      po = vn(),
      iI = co(),
      oI = yn(),
      Fc = "Object already initialized",
      vo = Vc.TypeError,
      aI = Vc.WeakMap,
      En,
      Or,
      mn,
      sI = function (e) {
        return mn(e) ? Or(e) : En(e, {});
      },
      uI = function (e) {
        return function (t) {
          var r;
          if (!rI(t) || (r = Or(t)).type !== e)
            throw vo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    tI || po.state
      ? ((yt = po.state || (po.state = new aI())),
        (Gc = lo(yt.get)),
        (go = lo(yt.has)),
        (Uc = lo(yt.set)),
        (En = function (e, t) {
          if (go(yt, e)) throw new vo(Fc);
          return (t.facade = e), Uc(yt, e, t), t;
        }),
        (Or = function (e) {
          return Gc(yt, e) || {};
        }),
        (mn = function (e) {
          return go(yt, e);
        }))
      : ((xt = iI("state")),
        (oI[xt] = !0),
        (En = function (e, t) {
          if (fo(e, xt)) throw new vo(Fc);
          return (t.facade = e), nI(e, xt, t), t;
        }),
        (Or = function (e) {
          return fo(e, xt) ? e[xt] : {};
        }),
        (mn = function (e) {
          return fo(e, xt);
        }));
    var yt, Gc, go, Uc, xt;
    kc.exports = { set: En, get: Or, has: mn, enforce: sI, getterFor: uI };
  });
  var Bc = c((XH, Wc) => {
    var ho = wt(),
      cI = ht(),
      Xc = Function.prototype,
      lI = ho && Object.getOwnPropertyDescriptor,
      yo = cI(Xc, "name"),
      fI = yo && function () {}.name === "something",
      dI = yo && (!ho || (ho && lI(Xc, "name").configurable));
    Wc.exports = { EXISTS: yo, PROPER: fI, CONFIGURABLE: dI };
  });
  var $c = c((WH, Yc) => {
    var pI = pe(),
      jc = rt(),
      gI = ht(),
      zc = hn(),
      vI = gn(),
      hI = uo(),
      Kc = Hc(),
      yI = Bc().CONFIGURABLE,
      EI = Kc.get,
      mI = Kc.enforce,
      _I = String(String).split("String");
    (Yc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        (jc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!gI(r, "name") || (yI && r.name !== a)) && zc(r, "name", a),
          (u = mI(r)),
          u.source || (u.source = _I.join(typeof a == "string" ? a : ""))),
        e === pI)
      ) {
        o ? (e[t] = r) : vI(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : zc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (jc(this) && EI(this).source) || hI(this);
    });
  });
  var Eo = c((BH, Qc) => {
    var bI = Math.ceil,
      TI = Math.floor;
    Qc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? TI : bI)(t);
    };
  });
  var Jc = c((jH, Zc) => {
    var II = Eo(),
      OI = Math.max,
      wI = Math.min;
    Zc.exports = function (e, t) {
      var r = II(e);
      return r < 0 ? OI(r + t, 0) : wI(r, t);
    };
  });
  var tl = c((zH, el) => {
    var AI = Eo(),
      xI = Math.min;
    el.exports = function (e) {
      return e > 0 ? xI(AI(e), 9007199254740991) : 0;
    };
  });
  var nl = c((KH, rl) => {
    var SI = tl();
    rl.exports = function (e) {
      return SI(e.length);
    };
  });
  var mo = c((YH, ol) => {
    var RI = _r(),
      CI = Jc(),
      LI = nl(),
      il = function (e) {
        return function (t, r, n) {
          var i = RI(t),
            o = LI(i),
            s = CI(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    ol.exports = { includes: il(!0), indexOf: il(!1) };
  });
  var bo = c(($H, sl) => {
    var NI = Xe(),
      _o = ht(),
      PI = _r(),
      qI = mo().indexOf,
      MI = yn(),
      al = NI([].push);
    sl.exports = function (e, t) {
      var r = PI(e),
        n = 0,
        i = [],
        o;
      for (o in r) !_o(MI, o) && _o(r, o) && al(i, o);
      for (; t.length > n; ) _o(r, (o = t[n++])) && (~qI(i, o) || al(i, o));
      return i;
    };
  });
  var _n = c((QH, ul) => {
    ul.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var ll = c((cl) => {
    var DI = bo(),
      FI = _n(),
      GI = FI.concat("length", "prototype");
    cl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return DI(t, GI);
      };
  });
  var dl = c((fl) => {
    fl.f = Object.getOwnPropertySymbols;
  });
  var gl = c((eX, pl) => {
    var UI = br(),
      VI = Xe(),
      kI = ll(),
      HI = dl(),
      XI = Tr(),
      WI = VI([].concat);
    pl.exports =
      UI("Reflect", "ownKeys") ||
      function (t) {
        var r = kI.f(XI(t)),
          n = HI.f;
        return n ? WI(r, n(t)) : r;
      };
  });
  var hl = c((tX, vl) => {
    var BI = ht(),
      jI = gl(),
      zI = ao(),
      KI = Ir();
    vl.exports = function (e, t) {
      for (var r = jI(t), n = KI.f, i = zI.f, o = 0; o < r.length; o++) {
        var s = r[o];
        BI(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var El = c((rX, yl) => {
    var YI = Gt(),
      $I = rt(),
      QI = /#|\.prototype\./,
      wr = function (e, t) {
        var r = JI[ZI(e)];
        return r == tO ? !0 : r == eO ? !1 : $I(t) ? YI(t) : !!t;
      },
      ZI = (wr.normalize = function (e) {
        return String(e).replace(QI, ".").toLowerCase();
      }),
      JI = (wr.data = {}),
      eO = (wr.NATIVE = "N"),
      tO = (wr.POLYFILL = "P");
    yl.exports = wr;
  });
  var _l = c((nX, ml) => {
    var To = pe(),
      rO = ao().f,
      nO = hn(),
      iO = $c(),
      oO = gn(),
      aO = hl(),
      sO = El();
    ml.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        u,
        f,
        p;
      if (
        (n
          ? (s = To)
          : i
          ? (s = To[r] || oO(r, {}))
          : (s = (To[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((f = t[a]),
            e.noTargetGet ? ((p = rO(s, a)), (u = p && p.value)) : (u = s[a]),
            (o = sO(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && u !== void 0)
          ) {
            if (typeof f == typeof u) continue;
            aO(f, u);
          }
          (e.sham || (u && u.sham)) && nO(f, "sham", !0), iO(s, a, f, e);
        }
    };
  });
  var Tl = c((iX, bl) => {
    var uO = bo(),
      cO = _n();
    bl.exports =
      Object.keys ||
      function (t) {
        return uO(t, cO);
      };
  });
  var Ol = c((oX, Il) => {
    var lO = wt(),
      fO = Ir(),
      dO = Tr(),
      pO = _r(),
      gO = Tl();
    Il.exports = lO
      ? Object.defineProperties
      : function (t, r) {
          dO(t);
          for (var n = pO(r), i = gO(r), o = i.length, s = 0, a; o > s; )
            fO.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var Al = c((aX, wl) => {
    var vO = br();
    wl.exports = vO("document", "documentElement");
  });
  var ql = c((sX, Pl) => {
    var hO = Tr(),
      yO = Ol(),
      xl = _n(),
      EO = yn(),
      mO = Al(),
      _O = io(),
      bO = co(),
      Sl = ">",
      Rl = "<",
      Oo = "prototype",
      wo = "script",
      Ll = bO("IE_PROTO"),
      Io = function () {},
      Nl = function (e) {
        return Rl + wo + Sl + e + Rl + "/" + wo + Sl;
      },
      Cl = function (e) {
        e.write(Nl("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      TO = function () {
        var e = _O("iframe"),
          t = "java" + wo + ":",
          r;
        return (
          (e.style.display = "none"),
          mO.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Nl("document.F=Object")),
          r.close(),
          r.F
        );
      },
      bn,
      Tn = function () {
        try {
          bn = new ActiveXObject("htmlfile");
        } catch {}
        Tn =
          typeof document < "u"
            ? document.domain && bn
              ? Cl(bn)
              : TO()
            : Cl(bn);
        for (var e = xl.length; e--; ) delete Tn[Oo][xl[e]];
        return Tn();
      };
    EO[Ll] = !0;
    Pl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Io[Oo] = hO(t)), (n = new Io()), (Io[Oo] = null), (n[Ll] = t))
            : (n = Tn()),
          r === void 0 ? n : yO(n, r)
        );
      };
  });
  var Dl = c((uX, Ml) => {
    var IO = to(),
      OO = ql(),
      wO = Ir(),
      Ao = IO("unscopables"),
      xo = Array.prototype;
    xo[Ao] == null && wO.f(xo, Ao, { configurable: !0, value: OO(null) });
    Ml.exports = function (e) {
      xo[Ao][e] = !0;
    };
  });
  var Fl = c(() => {
    "use strict";
    var AO = _l(),
      xO = mo().includes,
      SO = Dl();
    AO(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return xO(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    SO("includes");
  });
  var Ul = c((fX, Gl) => {
    var RO = pe(),
      CO = Xe();
    Gl.exports = function (e, t) {
      return CO(RO[e].prototype[t]);
    };
  });
  var kl = c((dX, Vl) => {
    Fl();
    var LO = Ul();
    Vl.exports = LO("Array", "includes");
  });
  var Xl = c((pX, Hl) => {
    var NO = kl();
    Hl.exports = NO;
  });
  var Bl = c((gX, Wl) => {
    var PO = Xl();
    Wl.exports = PO;
  });
  var So = c((vX, jl) => {
    var qO =
      typeof global == "object" && global && global.Object === Object && global;
    jl.exports = qO;
  });
  var Be = c((hX, zl) => {
    var MO = So(),
      DO = typeof self == "object" && self && self.Object === Object && self,
      FO = MO || DO || Function("return this")();
    zl.exports = FO;
  });
  var kt = c((yX, Kl) => {
    var GO = Be(),
      UO = GO.Symbol;
    Kl.exports = UO;
  });
  var Zl = c((EX, Ql) => {
    var Yl = kt(),
      $l = Object.prototype,
      VO = $l.hasOwnProperty,
      kO = $l.toString,
      Ar = Yl ? Yl.toStringTag : void 0;
    function HO(e) {
      var t = VO.call(e, Ar),
        r = e[Ar];
      try {
        e[Ar] = void 0;
        var n = !0;
      } catch {}
      var i = kO.call(e);
      return n && (t ? (e[Ar] = r) : delete e[Ar]), i;
    }
    Ql.exports = HO;
  });
  var ef = c((mX, Jl) => {
    var XO = Object.prototype,
      WO = XO.toString;
    function BO(e) {
      return WO.call(e);
    }
    Jl.exports = BO;
  });
  var Et = c((_X, nf) => {
    var tf = kt(),
      jO = Zl(),
      zO = ef(),
      KO = "[object Null]",
      YO = "[object Undefined]",
      rf = tf ? tf.toStringTag : void 0;
    function $O(e) {
      return e == null
        ? e === void 0
          ? YO
          : KO
        : rf && rf in Object(e)
        ? jO(e)
        : zO(e);
    }
    nf.exports = $O;
  });
  var Ro = c((bX, of) => {
    function QO(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    of.exports = QO;
  });
  var Co = c((TX, af) => {
    var ZO = Ro(),
      JO = ZO(Object.getPrototypeOf, Object);
    af.exports = JO;
  });
  var ct = c((IX, sf) => {
    function ew(e) {
      return e != null && typeof e == "object";
    }
    sf.exports = ew;
  });
  var Lo = c((OX, cf) => {
    var tw = Et(),
      rw = Co(),
      nw = ct(),
      iw = "[object Object]",
      ow = Function.prototype,
      aw = Object.prototype,
      uf = ow.toString,
      sw = aw.hasOwnProperty,
      uw = uf.call(Object);
    function cw(e) {
      if (!nw(e) || tw(e) != iw) return !1;
      var t = rw(e);
      if (t === null) return !0;
      var r = sw.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && uf.call(r) == uw;
    }
    cf.exports = cw;
  });
  var lf = c((No) => {
    "use strict";
    Object.defineProperty(No, "__esModule", { value: !0 });
    No.default = lw;
    function lw(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var ff = c((qo, Po) => {
    "use strict";
    Object.defineProperty(qo, "__esModule", { value: !0 });
    var fw = lf(),
      dw = pw(fw);
    function pw(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Ht;
    typeof self < "u"
      ? (Ht = self)
      : typeof window < "u"
      ? (Ht = window)
      : typeof global < "u"
      ? (Ht = global)
      : typeof Po < "u"
      ? (Ht = Po)
      : (Ht = Function("return this")());
    var gw = (0, dw.default)(Ht);
    qo.default = gw;
  });
  var Mo = c((xr) => {
    "use strict";
    xr.__esModule = !0;
    xr.ActionTypes = void 0;
    xr.default = vf;
    var vw = Lo(),
      hw = gf(vw),
      yw = ff(),
      df = gf(yw);
    function gf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var pf = (xr.ActionTypes = { INIT: "@@redux/INIT" });
    function vf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(vf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function f() {
        a === s && (a = s.slice());
      }
      function p() {
        return o;
      }
      function d(_) {
        if (typeof _ != "function")
          throw new Error("Expected listener to be a function.");
        var q = !0;
        return (
          f(),
          a.push(_),
          function () {
            if (q) {
              (q = !1), f();
              var S = a.indexOf(_);
              a.splice(S, 1);
            }
          }
        );
      }
      function h(_) {
        if (!(0, hw.default)(_))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof _.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, _));
        } finally {
          u = !1;
        }
        for (var q = (s = a), I = 0; I < q.length; I++) q[I]();
        return _;
      }
      function E(_) {
        if (typeof _ != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = _), h({ type: pf.INIT });
      }
      function y() {
        var _,
          q = d;
        return (
          (_ = {
            subscribe: function (S) {
              if (typeof S != "object")
                throw new TypeError("Expected the observer to be an object.");
              function w() {
                S.next && S.next(p());
              }
              w();
              var L = q(w);
              return { unsubscribe: L };
            },
          }),
          (_[df.default] = function () {
            return this;
          }),
          _
        );
      }
      return (
        h({ type: pf.INIT }),
        (n = { dispatch: h, subscribe: d, getState: p, replaceReducer: E }),
        (n[df.default] = y),
        n
      );
    }
  });
  var Fo = c((Do) => {
    "use strict";
    Do.__esModule = !0;
    Do.default = Ew;
    function Ew(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var Ef = c((Go) => {
    "use strict";
    Go.__esModule = !0;
    Go.default = Iw;
    var hf = Mo(),
      mw = Lo(),
      SX = yf(mw),
      _w = Fo(),
      RX = yf(_w);
    function yf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function bw(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Tw(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: hf.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                hf.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Iw(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        Tw(r);
      } catch (u) {
        a = u;
      }
      return function () {
        var f =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          p = arguments[1];
        if (a) throw a;
        if (!1) var d;
        for (var h = !1, E = {}, y = 0; y < o.length; y++) {
          var _ = o[y],
            q = r[_],
            I = f[_],
            S = q(I, p);
          if (typeof S > "u") {
            var w = bw(_, p);
            throw new Error(w);
          }
          (E[_] = S), (h = h || S !== I);
        }
        return h ? E : f;
      };
    }
  });
  var _f = c((Uo) => {
    "use strict";
    Uo.__esModule = !0;
    Uo.default = Ow;
    function mf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Ow(e, t) {
      if (typeof e == "function") return mf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = mf(s, t));
      }
      return n;
    }
  });
  var ko = c((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = ww;
    function ww() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var bf = c((Ho) => {
    "use strict";
    Ho.__esModule = !0;
    var Aw =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Ho.default = Cw;
    var xw = ko(),
      Sw = Rw(xw);
    function Rw(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Cw() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            u = a.dispatch,
            f = [],
            p = {
              getState: a.getState,
              dispatch: function (h) {
                return u(h);
              },
            };
          return (
            (f = t.map(function (d) {
              return d(p);
            })),
            (u = Sw.default.apply(void 0, f)(a.dispatch)),
            Aw({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var Xo = c((Fe) => {
    "use strict";
    Fe.__esModule = !0;
    Fe.compose =
      Fe.applyMiddleware =
      Fe.bindActionCreators =
      Fe.combineReducers =
      Fe.createStore =
        void 0;
    var Lw = Mo(),
      Nw = Xt(Lw),
      Pw = Ef(),
      qw = Xt(Pw),
      Mw = _f(),
      Dw = Xt(Mw),
      Fw = bf(),
      Gw = Xt(Fw),
      Uw = ko(),
      Vw = Xt(Uw),
      kw = Fo(),
      qX = Xt(kw);
    function Xt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Fe.createStore = Nw.default;
    Fe.combineReducers = qw.default;
    Fe.bindActionCreators = Dw.default;
    Fe.applyMiddleware = Gw.default;
    Fe.compose = Vw.default;
  });
  var je,
    Wo,
    nt,
    Hw,
    Xw,
    In,
    Ww,
    Bo = de(() => {
      "use strict";
      (je = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (Wo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (nt = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (Hw = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (Xw = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (In = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (Ww = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Ne,
    Bw,
    On = de(() => {
      "use strict";
      (Ne = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (Bw = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var jw,
    Tf = de(() => {
      "use strict";
      jw = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var zw,
    Kw,
    Yw,
    $w,
    Qw,
    Zw,
    Jw,
    jo,
    If = de(() => {
      "use strict";
      On();
      ({
        TRANSFORM_MOVE: zw,
        TRANSFORM_SCALE: Kw,
        TRANSFORM_ROTATE: Yw,
        TRANSFORM_SKEW: $w,
        STYLE_SIZE: Qw,
        STYLE_FILTER: Zw,
        STYLE_FONT_VARIATION: Jw,
      } = Ne),
        (jo = {
          [zw]: !0,
          [Kw]: !0,
          [Yw]: !0,
          [$w]: !0,
          [Qw]: !0,
          [Zw]: !0,
          [Jw]: !0,
        });
    });
  var me = {};
  Le(me, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => hA,
    IX2_ANIMATION_FRAME_CHANGED: () => lA,
    IX2_CLEAR_REQUESTED: () => sA,
    IX2_ELEMENT_STATE_CHANGED: () => vA,
    IX2_EVENT_LISTENER_ADDED: () => uA,
    IX2_EVENT_STATE_CHANGED: () => cA,
    IX2_INSTANCE_ADDED: () => dA,
    IX2_INSTANCE_REMOVED: () => gA,
    IX2_INSTANCE_STARTED: () => pA,
    IX2_MEDIA_QUERIES_DEFINED: () => EA,
    IX2_PARAMETER_CHANGED: () => fA,
    IX2_PLAYBACK_REQUESTED: () => oA,
    IX2_PREVIEW_REQUESTED: () => iA,
    IX2_RAW_DATA_IMPORTED: () => eA,
    IX2_SESSION_INITIALIZED: () => tA,
    IX2_SESSION_STARTED: () => rA,
    IX2_SESSION_STOPPED: () => nA,
    IX2_STOP_REQUESTED: () => aA,
    IX2_TEST_FRAME_RENDERED: () => mA,
    IX2_VIEWPORT_WIDTH_CHANGED: () => yA,
  });
  var eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    gA,
    vA,
    hA,
    yA,
    EA,
    mA,
    Of = de(() => {
      "use strict";
      (eA = "IX2_RAW_DATA_IMPORTED"),
        (tA = "IX2_SESSION_INITIALIZED"),
        (rA = "IX2_SESSION_STARTED"),
        (nA = "IX2_SESSION_STOPPED"),
        (iA = "IX2_PREVIEW_REQUESTED"),
        (oA = "IX2_PLAYBACK_REQUESTED"),
        (aA = "IX2_STOP_REQUESTED"),
        (sA = "IX2_CLEAR_REQUESTED"),
        (uA = "IX2_EVENT_LISTENER_ADDED"),
        (cA = "IX2_EVENT_STATE_CHANGED"),
        (lA = "IX2_ANIMATION_FRAME_CHANGED"),
        (fA = "IX2_PARAMETER_CHANGED"),
        (dA = "IX2_INSTANCE_ADDED"),
        (pA = "IX2_INSTANCE_STARTED"),
        (gA = "IX2_INSTANCE_REMOVED"),
        (vA = "IX2_ELEMENT_STATE_CHANGED"),
        (hA = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (yA = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (EA = "IX2_MEDIA_QUERIES_DEFINED"),
        (mA = "IX2_TEST_FRAME_RENDERED");
    });
  var Oe = {};
  Le(Oe, {
    ABSTRACT_NODE: () => yx,
    AUTO: () => ax,
    BACKGROUND: () => ex,
    BACKGROUND_COLOR: () => JA,
    BAR_DELIMITER: () => cx,
    BORDER_COLOR: () => tx,
    BOUNDARY_SELECTOR: () => OA,
    CHILDREN: () => lx,
    COLON_DELIMITER: () => ux,
    COLOR: () => rx,
    COMMA_DELIMITER: () => sx,
    CONFIG_UNIT: () => NA,
    CONFIG_VALUE: () => SA,
    CONFIG_X_UNIT: () => RA,
    CONFIG_X_VALUE: () => wA,
    CONFIG_Y_UNIT: () => CA,
    CONFIG_Y_VALUE: () => AA,
    CONFIG_Z_UNIT: () => LA,
    CONFIG_Z_VALUE: () => xA,
    DISPLAY: () => nx,
    FILTER: () => YA,
    FLEX: () => ix,
    FONT_VARIATION_SETTINGS: () => $A,
    HEIGHT: () => ZA,
    HTML_ELEMENT: () => vx,
    IMMEDIATE_CHILDREN: () => fx,
    IX2_ID_DELIMITER: () => _A,
    OPACITY: () => KA,
    PARENT: () => px,
    PLAIN_OBJECT: () => hx,
    PRESERVE_3D: () => gx,
    RENDER_GENERAL: () => mx,
    RENDER_PLUGIN: () => bx,
    RENDER_STYLE: () => _x,
    RENDER_TRANSFORM: () => Ex,
    ROTATE_X: () => HA,
    ROTATE_Y: () => XA,
    ROTATE_Z: () => WA,
    SCALE_3D: () => kA,
    SCALE_X: () => GA,
    SCALE_Y: () => UA,
    SCALE_Z: () => VA,
    SIBLINGS: () => dx,
    SKEW: () => BA,
    SKEW_X: () => jA,
    SKEW_Y: () => zA,
    TRANSFORM: () => PA,
    TRANSLATE_3D: () => FA,
    TRANSLATE_X: () => qA,
    TRANSLATE_Y: () => MA,
    TRANSLATE_Z: () => DA,
    WF_PAGE: () => bA,
    WIDTH: () => QA,
    WILL_CHANGE: () => ox,
    W_MOD_IX: () => IA,
    W_MOD_JS: () => TA,
  });
  var _A,
    bA,
    TA,
    IA,
    OA,
    wA,
    AA,
    xA,
    SA,
    RA,
    CA,
    LA,
    NA,
    PA,
    qA,
    MA,
    DA,
    FA,
    GA,
    UA,
    VA,
    kA,
    HA,
    XA,
    WA,
    BA,
    jA,
    zA,
    KA,
    YA,
    $A,
    QA,
    ZA,
    JA,
    ex,
    tx,
    rx,
    nx,
    ix,
    ox,
    ax,
    sx,
    ux,
    cx,
    lx,
    fx,
    dx,
    px,
    gx,
    vx,
    hx,
    yx,
    Ex,
    mx,
    _x,
    bx,
    wf = de(() => {
      "use strict";
      (_A = "|"),
        (bA = "data-wf-page"),
        (TA = "w-mod-js"),
        (IA = "w-mod-ix"),
        (OA = ".w-dyn-item"),
        (wA = "xValue"),
        (AA = "yValue"),
        (xA = "zValue"),
        (SA = "value"),
        (RA = "xUnit"),
        (CA = "yUnit"),
        (LA = "zUnit"),
        (NA = "unit"),
        (PA = "transform"),
        (qA = "translateX"),
        (MA = "translateY"),
        (DA = "translateZ"),
        (FA = "translate3d"),
        (GA = "scaleX"),
        (UA = "scaleY"),
        (VA = "scaleZ"),
        (kA = "scale3d"),
        (HA = "rotateX"),
        (XA = "rotateY"),
        (WA = "rotateZ"),
        (BA = "skew"),
        (jA = "skewX"),
        (zA = "skewY"),
        (KA = "opacity"),
        (YA = "filter"),
        ($A = "font-variation-settings"),
        (QA = "width"),
        (ZA = "height"),
        (JA = "backgroundColor"),
        (ex = "background"),
        (tx = "borderColor"),
        (rx = "color"),
        (nx = "display"),
        (ix = "flex"),
        (ox = "willChange"),
        (ax = "AUTO"),
        (sx = ","),
        (ux = ":"),
        (cx = "|"),
        (lx = "CHILDREN"),
        (fx = "IMMEDIATE_CHILDREN"),
        (dx = "SIBLINGS"),
        (px = "PARENT"),
        (gx = "preserve-3d"),
        (vx = "HTML_ELEMENT"),
        (hx = "PLAIN_OBJECT"),
        (yx = "ABSTRACT_NODE"),
        (Ex = "RENDER_TRANSFORM"),
        (mx = "RENDER_GENERAL"),
        (_x = "RENDER_STYLE"),
        (bx = "RENDER_PLUGIN");
    });
  var Af = {};
  Le(Af, {
    ActionAppliesTo: () => Bw,
    ActionTypeConsts: () => Ne,
    EventAppliesTo: () => Wo,
    EventBasedOn: () => nt,
    EventContinuousMouseAxes: () => Hw,
    EventLimitAffectedElements: () => Xw,
    EventTypeConsts: () => je,
    IX2EngineActionTypes: () => me,
    IX2EngineConstants: () => Oe,
    InteractionTypeConsts: () => jw,
    QuickEffectDirectionConsts: () => Ww,
    QuickEffectIds: () => In,
    ReducedMotionTypes: () => jo,
  });
  var Pe = de(() => {
    "use strict";
    Bo();
    On();
    Tf();
    If();
    Of();
    wf();
    On();
    Bo();
  });
  var Tx,
    xf,
    Sf = de(() => {
      "use strict";
      Pe();
      ({ IX2_RAW_DATA_IMPORTED: Tx } = me),
        (xf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case Tx:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Wt = c((ve) => {
    "use strict";
    Object.defineProperty(ve, "__esModule", { value: !0 });
    var Ix =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    ve.clone = An;
    ve.addLast = Lf;
    ve.addFirst = Nf;
    ve.removeLast = Pf;
    ve.removeFirst = qf;
    ve.insert = Mf;
    ve.removeAt = Df;
    ve.replaceAt = Ff;
    ve.getIn = xn;
    ve.set = Sn;
    ve.setIn = Rn;
    ve.update = Uf;
    ve.updateIn = Vf;
    ve.merge = kf;
    ve.mergeDeep = Hf;
    ve.mergeIn = Xf;
    ve.omit = Wf;
    ve.addDefaults = Bf;
    var Rf = "INVALID_ARGS";
    function Cf(e) {
      throw new Error(e);
    }
    function zo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var Ox = {}.hasOwnProperty;
    function An(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = zo(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function qe(e, t, r) {
      var n = r;
      n == null && Cf(Rf);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var f = s[u];
        if (f != null) {
          var p = zo(f);
          if (p.length)
            for (var d = 0; d <= p.length; d++) {
              var h = p[d];
              if (!(e && n[h] !== void 0)) {
                var E = f[h];
                t && wn(n[h]) && wn(E) && (E = qe(e, t, n[h], E)),
                  !(E === void 0 || E === n[h]) &&
                    (i || ((i = !0), (n = An(n))), (n[h] = E));
              }
            }
        }
      }
      return n;
    }
    function wn(e) {
      var t = typeof e > "u" ? "undefined" : Ix(e);
      return e != null && (t === "object" || t === "function");
    }
    function Lf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Nf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Pf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function qf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Mf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Df(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Ff(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function xn(e, t) {
      if ((!Array.isArray(t) && Cf(Rf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Sn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = An(i);
      return (o[t] = r), o;
    }
    function Gf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          wn(e) && wn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Gf(s, t, r, n + 1);
      }
      return Sn(e, o, i);
    }
    function Rn(e, t, r) {
      return t.length ? Gf(e, t, r, 0) : r;
    }
    function Uf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Sn(e, t, i);
    }
    function Vf(e, t, r) {
      var n = xn(e, t),
        i = r(n);
      return Rn(e, t, i);
    }
    function kf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : qe(!1, !1, e, t, r, n, i, o);
    }
    function Hf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : qe(!1, !0, e, t, r, n, i, o);
    }
    function Xf(e, t, r, n, i, o, s) {
      var a = xn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          f = arguments.length,
          p = Array(f > 7 ? f - 7 : 0),
          d = 7;
        d < f;
        d++
      )
        p[d - 7] = arguments[d];
      return (
        p.length
          ? (u = qe.call.apply(qe, [null, !1, !1, a, r, n, i, o, s].concat(p)))
          : (u = qe(!1, !1, a, r, n, i, o, s)),
        Rn(e, t, u)
      );
    }
    function Wf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (Ox.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = zo(e), a = 0; a < s.length; a++) {
        var u = s[a];
        r.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Bf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : qe(!0, !1, e, t, r, n, i, o);
    }
    var wx = {
      clone: An,
      addLast: Lf,
      addFirst: Nf,
      removeLast: Pf,
      removeFirst: qf,
      insert: Mf,
      removeAt: Df,
      replaceAt: Ff,
      getIn: xn,
      set: Sn,
      setIn: Rn,
      update: Uf,
      updateIn: Vf,
      merge: kf,
      mergeDeep: Hf,
      mergeIn: Xf,
      omit: Wf,
      addDefaults: Bf,
    };
    ve.default = wx;
  });
  var zf,
    Ax,
    xx,
    Sx,
    Rx,
    Cx,
    jf,
    Kf,
    Yf = de(() => {
      "use strict";
      Pe();
      (zf = ae(Wt())),
        ({
          IX2_PREVIEW_REQUESTED: Ax,
          IX2_PLAYBACK_REQUESTED: xx,
          IX2_STOP_REQUESTED: Sx,
          IX2_CLEAR_REQUESTED: Rx,
        } = me),
        (Cx = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (jf = Object.create(null, {
          [Ax]: { value: "preview" },
          [xx]: { value: "playback" },
          [Sx]: { value: "stop" },
          [Rx]: { value: "clear" },
        })),
        (Kf = (e = Cx, t) => {
          if (t.type in jf) {
            let r = [jf[t.type]];
            return (0, zf.setIn)(e, [r], { ...t.payload });
          }
          return e;
        });
    });
  var xe,
    Lx,
    Nx,
    Px,
    qx,
    Mx,
    Dx,
    Fx,
    Gx,
    Ux,
    Vx,
    $f,
    kx,
    Qf,
    Zf = de(() => {
      "use strict";
      Pe();
      (xe = ae(Wt())),
        ({
          IX2_SESSION_INITIALIZED: Lx,
          IX2_SESSION_STARTED: Nx,
          IX2_TEST_FRAME_RENDERED: Px,
          IX2_SESSION_STOPPED: qx,
          IX2_EVENT_LISTENER_ADDED: Mx,
          IX2_EVENT_STATE_CHANGED: Dx,
          IX2_ANIMATION_FRAME_CHANGED: Fx,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: Gx,
          IX2_VIEWPORT_WIDTH_CHANGED: Ux,
          IX2_MEDIA_QUERIES_DEFINED: Vx,
        } = me),
        ($f = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (kx = 20),
        (Qf = (e = $f, t) => {
          switch (t.type) {
            case Lx: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, xe.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case Nx:
              return (0, xe.set)(e, "active", !0);
            case Px: {
              let {
                payload: { step: r = kx },
              } = t;
              return (0, xe.set)(e, "tick", e.tick + r);
            }
            case qx:
              return $f;
            case Fx: {
              let {
                payload: { now: r },
              } = t;
              return (0, xe.set)(e, "tick", r);
            }
            case Mx: {
              let r = (0, xe.addLast)(e.eventListeners, t.payload);
              return (0, xe.set)(e, "eventListeners", r);
            }
            case Dx: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, xe.setIn)(e, ["eventState", r], n);
            }
            case Gx: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, xe.setIn)(e, ["playbackState", r], n);
            }
            case Ux: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: f } = n[s];
                if (r >= u && r <= f) {
                  o = a;
                  break;
                }
              }
              return (0, xe.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case Vx:
              return (0, xe.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var ed = c((eW, Jf) => {
    function Hx() {
      (this.__data__ = []), (this.size = 0);
    }
    Jf.exports = Hx;
  });
  var Cn = c((tW, td) => {
    function Xx(e, t) {
      return e === t || (e !== e && t !== t);
    }
    td.exports = Xx;
  });
  var Sr = c((rW, rd) => {
    var Wx = Cn();
    function Bx(e, t) {
      for (var r = e.length; r--; ) if (Wx(e[r][0], t)) return r;
      return -1;
    }
    rd.exports = Bx;
  });
  var id = c((nW, nd) => {
    var jx = Sr(),
      zx = Array.prototype,
      Kx = zx.splice;
    function Yx(e) {
      var t = this.__data__,
        r = jx(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : Kx.call(t, r, 1), --this.size, !0;
    }
    nd.exports = Yx;
  });
  var ad = c((iW, od) => {
    var $x = Sr();
    function Qx(e) {
      var t = this.__data__,
        r = $x(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    od.exports = Qx;
  });
  var ud = c((oW, sd) => {
    var Zx = Sr();
    function Jx(e) {
      return Zx(this.__data__, e) > -1;
    }
    sd.exports = Jx;
  });
  var ld = c((aW, cd) => {
    var eS = Sr();
    function tS(e, t) {
      var r = this.__data__,
        n = eS(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    cd.exports = tS;
  });
  var Rr = c((sW, fd) => {
    var rS = ed(),
      nS = id(),
      iS = ad(),
      oS = ud(),
      aS = ld();
    function Bt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Bt.prototype.clear = rS;
    Bt.prototype.delete = nS;
    Bt.prototype.get = iS;
    Bt.prototype.has = oS;
    Bt.prototype.set = aS;
    fd.exports = Bt;
  });
  var pd = c((uW, dd) => {
    var sS = Rr();
    function uS() {
      (this.__data__ = new sS()), (this.size = 0);
    }
    dd.exports = uS;
  });
  var vd = c((cW, gd) => {
    function cS(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    gd.exports = cS;
  });
  var yd = c((lW, hd) => {
    function lS(e) {
      return this.__data__.get(e);
    }
    hd.exports = lS;
  });
  var md = c((fW, Ed) => {
    function fS(e) {
      return this.__data__.has(e);
    }
    Ed.exports = fS;
  });
  var it = c((dW, _d) => {
    function dS(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    _d.exports = dS;
  });
  var Ko = c((pW, bd) => {
    var pS = Et(),
      gS = it(),
      vS = "[object AsyncFunction]",
      hS = "[object Function]",
      yS = "[object GeneratorFunction]",
      ES = "[object Proxy]";
    function mS(e) {
      if (!gS(e)) return !1;
      var t = pS(e);
      return t == hS || t == yS || t == vS || t == ES;
    }
    bd.exports = mS;
  });
  var Id = c((gW, Td) => {
    var _S = Be(),
      bS = _S["__core-js_shared__"];
    Td.exports = bS;
  });
  var Ad = c((vW, wd) => {
    var Yo = Id(),
      Od = (function () {
        var e = /[^.]+$/.exec((Yo && Yo.keys && Yo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function TS(e) {
      return !!Od && Od in e;
    }
    wd.exports = TS;
  });
  var $o = c((hW, xd) => {
    var IS = Function.prototype,
      OS = IS.toString;
    function wS(e) {
      if (e != null) {
        try {
          return OS.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    xd.exports = wS;
  });
  var Rd = c((yW, Sd) => {
    var AS = Ko(),
      xS = Ad(),
      SS = it(),
      RS = $o(),
      CS = /[\\^$.*+?()[\]{}|]/g,
      LS = /^\[object .+?Constructor\]$/,
      NS = Function.prototype,
      PS = Object.prototype,
      qS = NS.toString,
      MS = PS.hasOwnProperty,
      DS = RegExp(
        "^" +
          qS
            .call(MS)
            .replace(CS, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function FS(e) {
      if (!SS(e) || xS(e)) return !1;
      var t = AS(e) ? DS : LS;
      return t.test(RS(e));
    }
    Sd.exports = FS;
  });
  var Ld = c((EW, Cd) => {
    function GS(e, t) {
      return e?.[t];
    }
    Cd.exports = GS;
  });
  var mt = c((mW, Nd) => {
    var US = Rd(),
      VS = Ld();
    function kS(e, t) {
      var r = VS(e, t);
      return US(r) ? r : void 0;
    }
    Nd.exports = kS;
  });
  var Ln = c((_W, Pd) => {
    var HS = mt(),
      XS = Be(),
      WS = HS(XS, "Map");
    Pd.exports = WS;
  });
  var Cr = c((bW, qd) => {
    var BS = mt(),
      jS = BS(Object, "create");
    qd.exports = jS;
  });
  var Fd = c((TW, Dd) => {
    var Md = Cr();
    function zS() {
      (this.__data__ = Md ? Md(null) : {}), (this.size = 0);
    }
    Dd.exports = zS;
  });
  var Ud = c((IW, Gd) => {
    function KS(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Gd.exports = KS;
  });
  var kd = c((OW, Vd) => {
    var YS = Cr(),
      $S = "__lodash_hash_undefined__",
      QS = Object.prototype,
      ZS = QS.hasOwnProperty;
    function JS(e) {
      var t = this.__data__;
      if (YS) {
        var r = t[e];
        return r === $S ? void 0 : r;
      }
      return ZS.call(t, e) ? t[e] : void 0;
    }
    Vd.exports = JS;
  });
  var Xd = c((wW, Hd) => {
    var e0 = Cr(),
      t0 = Object.prototype,
      r0 = t0.hasOwnProperty;
    function n0(e) {
      var t = this.__data__;
      return e0 ? t[e] !== void 0 : r0.call(t, e);
    }
    Hd.exports = n0;
  });
  var Bd = c((AW, Wd) => {
    var i0 = Cr(),
      o0 = "__lodash_hash_undefined__";
    function a0(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = i0 && t === void 0 ? o0 : t),
        this
      );
    }
    Wd.exports = a0;
  });
  var zd = c((xW, jd) => {
    var s0 = Fd(),
      u0 = Ud(),
      c0 = kd(),
      l0 = Xd(),
      f0 = Bd();
    function jt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    jt.prototype.clear = s0;
    jt.prototype.delete = u0;
    jt.prototype.get = c0;
    jt.prototype.has = l0;
    jt.prototype.set = f0;
    jd.exports = jt;
  });
  var $d = c((SW, Yd) => {
    var Kd = zd(),
      d0 = Rr(),
      p0 = Ln();
    function g0() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Kd(),
          map: new (p0 || d0)(),
          string: new Kd(),
        });
    }
    Yd.exports = g0;
  });
  var Zd = c((RW, Qd) => {
    function v0(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Qd.exports = v0;
  });
  var Lr = c((CW, Jd) => {
    var h0 = Zd();
    function y0(e, t) {
      var r = e.__data__;
      return h0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    Jd.exports = y0;
  });
  var tp = c((LW, ep) => {
    var E0 = Lr();
    function m0(e) {
      var t = E0(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    ep.exports = m0;
  });
  var np = c((NW, rp) => {
    var _0 = Lr();
    function b0(e) {
      return _0(this, e).get(e);
    }
    rp.exports = b0;
  });
  var op = c((PW, ip) => {
    var T0 = Lr();
    function I0(e) {
      return T0(this, e).has(e);
    }
    ip.exports = I0;
  });
  var sp = c((qW, ap) => {
    var O0 = Lr();
    function w0(e, t) {
      var r = O0(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    ap.exports = w0;
  });
  var Nn = c((MW, up) => {
    var A0 = $d(),
      x0 = tp(),
      S0 = np(),
      R0 = op(),
      C0 = sp();
    function zt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    zt.prototype.clear = A0;
    zt.prototype.delete = x0;
    zt.prototype.get = S0;
    zt.prototype.has = R0;
    zt.prototype.set = C0;
    up.exports = zt;
  });
  var lp = c((DW, cp) => {
    var L0 = Rr(),
      N0 = Ln(),
      P0 = Nn(),
      q0 = 200;
    function M0(e, t) {
      var r = this.__data__;
      if (r instanceof L0) {
        var n = r.__data__;
        if (!N0 || n.length < q0 - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new P0(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    cp.exports = M0;
  });
  var Qo = c((FW, fp) => {
    var D0 = Rr(),
      F0 = pd(),
      G0 = vd(),
      U0 = yd(),
      V0 = md(),
      k0 = lp();
    function Kt(e) {
      var t = (this.__data__ = new D0(e));
      this.size = t.size;
    }
    Kt.prototype.clear = F0;
    Kt.prototype.delete = G0;
    Kt.prototype.get = U0;
    Kt.prototype.has = V0;
    Kt.prototype.set = k0;
    fp.exports = Kt;
  });
  var pp = c((GW, dp) => {
    var H0 = "__lodash_hash_undefined__";
    function X0(e) {
      return this.__data__.set(e, H0), this;
    }
    dp.exports = X0;
  });
  var vp = c((UW, gp) => {
    function W0(e) {
      return this.__data__.has(e);
    }
    gp.exports = W0;
  });
  var yp = c((VW, hp) => {
    var B0 = Nn(),
      j0 = pp(),
      z0 = vp();
    function Pn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new B0(); ++t < r; ) this.add(e[t]);
    }
    Pn.prototype.add = Pn.prototype.push = j0;
    Pn.prototype.has = z0;
    hp.exports = Pn;
  });
  var mp = c((kW, Ep) => {
    function K0(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    Ep.exports = K0;
  });
  var bp = c((HW, _p) => {
    function Y0(e, t) {
      return e.has(t);
    }
    _p.exports = Y0;
  });
  var Zo = c((XW, Tp) => {
    var $0 = yp(),
      Q0 = mp(),
      Z0 = bp(),
      J0 = 1,
      eR = 2;
    function tR(e, t, r, n, i, o) {
      var s = r & J0,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var f = o.get(e),
        p = o.get(t);
      if (f && p) return f == t && p == e;
      var d = -1,
        h = !0,
        E = r & eR ? new $0() : void 0;
      for (o.set(e, t), o.set(t, e); ++d < a; ) {
        var y = e[d],
          _ = t[d];
        if (n) var q = s ? n(_, y, d, t, e, o) : n(y, _, d, e, t, o);
        if (q !== void 0) {
          if (q) continue;
          h = !1;
          break;
        }
        if (E) {
          if (
            !Q0(t, function (I, S) {
              if (!Z0(E, S) && (y === I || i(y, I, r, n, o))) return E.push(S);
            })
          ) {
            h = !1;
            break;
          }
        } else if (!(y === _ || i(y, _, r, n, o))) {
          h = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), h;
    }
    Tp.exports = tR;
  });
  var Op = c((WW, Ip) => {
    var rR = Be(),
      nR = rR.Uint8Array;
    Ip.exports = nR;
  });
  var Ap = c((BW, wp) => {
    function iR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    wp.exports = iR;
  });
  var Sp = c((jW, xp) => {
    function oR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    xp.exports = oR;
  });
  var Pp = c((zW, Np) => {
    var Rp = kt(),
      Cp = Op(),
      aR = Cn(),
      sR = Zo(),
      uR = Ap(),
      cR = Sp(),
      lR = 1,
      fR = 2,
      dR = "[object Boolean]",
      pR = "[object Date]",
      gR = "[object Error]",
      vR = "[object Map]",
      hR = "[object Number]",
      yR = "[object RegExp]",
      ER = "[object Set]",
      mR = "[object String]",
      _R = "[object Symbol]",
      bR = "[object ArrayBuffer]",
      TR = "[object DataView]",
      Lp = Rp ? Rp.prototype : void 0,
      Jo = Lp ? Lp.valueOf : void 0;
    function IR(e, t, r, n, i, o, s) {
      switch (r) {
        case TR:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case bR:
          return !(e.byteLength != t.byteLength || !o(new Cp(e), new Cp(t)));
        case dR:
        case pR:
        case hR:
          return aR(+e, +t);
        case gR:
          return e.name == t.name && e.message == t.message;
        case yR:
        case mR:
          return e == t + "";
        case vR:
          var a = uR;
        case ER:
          var u = n & lR;
          if ((a || (a = cR), e.size != t.size && !u)) return !1;
          var f = s.get(e);
          if (f) return f == t;
          (n |= fR), s.set(e, t);
          var p = sR(a(e), a(t), n, i, o, s);
          return s.delete(e), p;
        case _R:
          if (Jo) return Jo.call(e) == Jo.call(t);
      }
      return !1;
    }
    Np.exports = IR;
  });
  var qn = c((KW, qp) => {
    function OR(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    qp.exports = OR;
  });
  var be = c((YW, Mp) => {
    var wR = Array.isArray;
    Mp.exports = wR;
  });
  var ea = c(($W, Dp) => {
    var AR = qn(),
      xR = be();
    function SR(e, t, r) {
      var n = t(e);
      return xR(e) ? n : AR(n, r(e));
    }
    Dp.exports = SR;
  });
  var Gp = c((QW, Fp) => {
    function RR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    Fp.exports = RR;
  });
  var ta = c((ZW, Up) => {
    function CR() {
      return [];
    }
    Up.exports = CR;
  });
  var ra = c((JW, kp) => {
    var LR = Gp(),
      NR = ta(),
      PR = Object.prototype,
      qR = PR.propertyIsEnumerable,
      Vp = Object.getOwnPropertySymbols,
      MR = Vp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                LR(Vp(e), function (t) {
                  return qR.call(e, t);
                }));
          }
        : NR;
    kp.exports = MR;
  });
  var Xp = c((e5, Hp) => {
    function DR(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Hp.exports = DR;
  });
  var Bp = c((t5, Wp) => {
    var FR = Et(),
      GR = ct(),
      UR = "[object Arguments]";
    function VR(e) {
      return GR(e) && FR(e) == UR;
    }
    Wp.exports = VR;
  });
  var Nr = c((r5, Kp) => {
    var jp = Bp(),
      kR = ct(),
      zp = Object.prototype,
      HR = zp.hasOwnProperty,
      XR = zp.propertyIsEnumerable,
      WR = jp(
        (function () {
          return arguments;
        })()
      )
        ? jp
        : function (e) {
            return kR(e) && HR.call(e, "callee") && !XR.call(e, "callee");
          };
    Kp.exports = WR;
  });
  var $p = c((n5, Yp) => {
    function BR() {
      return !1;
    }
    Yp.exports = BR;
  });
  var Mn = c((Pr, Yt) => {
    var jR = Be(),
      zR = $p(),
      Jp = typeof Pr == "object" && Pr && !Pr.nodeType && Pr,
      Qp = Jp && typeof Yt == "object" && Yt && !Yt.nodeType && Yt,
      KR = Qp && Qp.exports === Jp,
      Zp = KR ? jR.Buffer : void 0,
      YR = Zp ? Zp.isBuffer : void 0,
      $R = YR || zR;
    Yt.exports = $R;
  });
  var Dn = c((i5, eg) => {
    var QR = 9007199254740991,
      ZR = /^(?:0|[1-9]\d*)$/;
    function JR(e, t) {
      var r = typeof e;
      return (
        (t = t ?? QR),
        !!t &&
          (r == "number" || (r != "symbol" && ZR.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    eg.exports = JR;
  });
  var Fn = c((o5, tg) => {
    var eC = 9007199254740991;
    function tC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= eC;
    }
    tg.exports = tC;
  });
  var ng = c((a5, rg) => {
    var rC = Et(),
      nC = Fn(),
      iC = ct(),
      oC = "[object Arguments]",
      aC = "[object Array]",
      sC = "[object Boolean]",
      uC = "[object Date]",
      cC = "[object Error]",
      lC = "[object Function]",
      fC = "[object Map]",
      dC = "[object Number]",
      pC = "[object Object]",
      gC = "[object RegExp]",
      vC = "[object Set]",
      hC = "[object String]",
      yC = "[object WeakMap]",
      EC = "[object ArrayBuffer]",
      mC = "[object DataView]",
      _C = "[object Float32Array]",
      bC = "[object Float64Array]",
      TC = "[object Int8Array]",
      IC = "[object Int16Array]",
      OC = "[object Int32Array]",
      wC = "[object Uint8Array]",
      AC = "[object Uint8ClampedArray]",
      xC = "[object Uint16Array]",
      SC = "[object Uint32Array]",
      fe = {};
    fe[_C] =
      fe[bC] =
      fe[TC] =
      fe[IC] =
      fe[OC] =
      fe[wC] =
      fe[AC] =
      fe[xC] =
      fe[SC] =
        !0;
    fe[oC] =
      fe[aC] =
      fe[EC] =
      fe[sC] =
      fe[mC] =
      fe[uC] =
      fe[cC] =
      fe[lC] =
      fe[fC] =
      fe[dC] =
      fe[pC] =
      fe[gC] =
      fe[vC] =
      fe[hC] =
      fe[yC] =
        !1;
    function RC(e) {
      return iC(e) && nC(e.length) && !!fe[rC(e)];
    }
    rg.exports = RC;
  });
  var og = c((s5, ig) => {
    function CC(e) {
      return function (t) {
        return e(t);
      };
    }
    ig.exports = CC;
  });
  var sg = c((qr, $t) => {
    var LC = So(),
      ag = typeof qr == "object" && qr && !qr.nodeType && qr,
      Mr = ag && typeof $t == "object" && $t && !$t.nodeType && $t,
      NC = Mr && Mr.exports === ag,
      na = NC && LC.process,
      PC = (function () {
        try {
          var e = Mr && Mr.require && Mr.require("util").types;
          return e || (na && na.binding && na.binding("util"));
        } catch {}
      })();
    $t.exports = PC;
  });
  var Gn = c((u5, lg) => {
    var qC = ng(),
      MC = og(),
      ug = sg(),
      cg = ug && ug.isTypedArray,
      DC = cg ? MC(cg) : qC;
    lg.exports = DC;
  });
  var ia = c((c5, fg) => {
    var FC = Xp(),
      GC = Nr(),
      UC = be(),
      VC = Mn(),
      kC = Dn(),
      HC = Gn(),
      XC = Object.prototype,
      WC = XC.hasOwnProperty;
    function BC(e, t) {
      var r = UC(e),
        n = !r && GC(e),
        i = !r && !n && VC(e),
        o = !r && !n && !i && HC(e),
        s = r || n || i || o,
        a = s ? FC(e.length, String) : [],
        u = a.length;
      for (var f in e)
        (t || WC.call(e, f)) &&
          !(
            s &&
            (f == "length" ||
              (i && (f == "offset" || f == "parent")) ||
              (o &&
                (f == "buffer" || f == "byteLength" || f == "byteOffset")) ||
              kC(f, u))
          ) &&
          a.push(f);
      return a;
    }
    fg.exports = BC;
  });
  var Un = c((l5, dg) => {
    var jC = Object.prototype;
    function zC(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || jC;
      return e === r;
    }
    dg.exports = zC;
  });
  var gg = c((f5, pg) => {
    var KC = Ro(),
      YC = KC(Object.keys, Object);
    pg.exports = YC;
  });
  var Vn = c((d5, vg) => {
    var $C = Un(),
      QC = gg(),
      ZC = Object.prototype,
      JC = ZC.hasOwnProperty;
    function eL(e) {
      if (!$C(e)) return QC(e);
      var t = [];
      for (var r in Object(e)) JC.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    vg.exports = eL;
  });
  var St = c((p5, hg) => {
    var tL = Ko(),
      rL = Fn();
    function nL(e) {
      return e != null && rL(e.length) && !tL(e);
    }
    hg.exports = nL;
  });
  var Dr = c((g5, yg) => {
    var iL = ia(),
      oL = Vn(),
      aL = St();
    function sL(e) {
      return aL(e) ? iL(e) : oL(e);
    }
    yg.exports = sL;
  });
  var mg = c((v5, Eg) => {
    var uL = ea(),
      cL = ra(),
      lL = Dr();
    function fL(e) {
      return uL(e, lL, cL);
    }
    Eg.exports = fL;
  });
  var Tg = c((h5, bg) => {
    var _g = mg(),
      dL = 1,
      pL = Object.prototype,
      gL = pL.hasOwnProperty;
    function vL(e, t, r, n, i, o) {
      var s = r & dL,
        a = _g(e),
        u = a.length,
        f = _g(t),
        p = f.length;
      if (u != p && !s) return !1;
      for (var d = u; d--; ) {
        var h = a[d];
        if (!(s ? h in t : gL.call(t, h))) return !1;
      }
      var E = o.get(e),
        y = o.get(t);
      if (E && y) return E == t && y == e;
      var _ = !0;
      o.set(e, t), o.set(t, e);
      for (var q = s; ++d < u; ) {
        h = a[d];
        var I = e[h],
          S = t[h];
        if (n) var w = s ? n(S, I, h, t, e, o) : n(I, S, h, e, t, o);
        if (!(w === void 0 ? I === S || i(I, S, r, n, o) : w)) {
          _ = !1;
          break;
        }
        q || (q = h == "constructor");
      }
      if (_ && !q) {
        var L = e.constructor,
          P = t.constructor;
        L != P &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof L == "function" &&
            L instanceof L &&
            typeof P == "function" &&
            P instanceof P
          ) &&
          (_ = !1);
      }
      return o.delete(e), o.delete(t), _;
    }
    bg.exports = vL;
  });
  var Og = c((y5, Ig) => {
    var hL = mt(),
      yL = Be(),
      EL = hL(yL, "DataView");
    Ig.exports = EL;
  });
  var Ag = c((E5, wg) => {
    var mL = mt(),
      _L = Be(),
      bL = mL(_L, "Promise");
    wg.exports = bL;
  });
  var Sg = c((m5, xg) => {
    var TL = mt(),
      IL = Be(),
      OL = TL(IL, "Set");
    xg.exports = OL;
  });
  var oa = c((_5, Rg) => {
    var wL = mt(),
      AL = Be(),
      xL = wL(AL, "WeakMap");
    Rg.exports = xL;
  });
  var kn = c((b5, Dg) => {
    var aa = Og(),
      sa = Ln(),
      ua = Ag(),
      ca = Sg(),
      la = oa(),
      Mg = Et(),
      Qt = $o(),
      Cg = "[object Map]",
      SL = "[object Object]",
      Lg = "[object Promise]",
      Ng = "[object Set]",
      Pg = "[object WeakMap]",
      qg = "[object DataView]",
      RL = Qt(aa),
      CL = Qt(sa),
      LL = Qt(ua),
      NL = Qt(ca),
      PL = Qt(la),
      Rt = Mg;
    ((aa && Rt(new aa(new ArrayBuffer(1))) != qg) ||
      (sa && Rt(new sa()) != Cg) ||
      (ua && Rt(ua.resolve()) != Lg) ||
      (ca && Rt(new ca()) != Ng) ||
      (la && Rt(new la()) != Pg)) &&
      (Rt = function (e) {
        var t = Mg(e),
          r = t == SL ? e.constructor : void 0,
          n = r ? Qt(r) : "";
        if (n)
          switch (n) {
            case RL:
              return qg;
            case CL:
              return Cg;
            case LL:
              return Lg;
            case NL:
              return Ng;
            case PL:
              return Pg;
          }
        return t;
      });
    Dg.exports = Rt;
  });
  var Wg = c((T5, Xg) => {
    var fa = Qo(),
      qL = Zo(),
      ML = Pp(),
      DL = Tg(),
      Fg = kn(),
      Gg = be(),
      Ug = Mn(),
      FL = Gn(),
      GL = 1,
      Vg = "[object Arguments]",
      kg = "[object Array]",
      Hn = "[object Object]",
      UL = Object.prototype,
      Hg = UL.hasOwnProperty;
    function VL(e, t, r, n, i, o) {
      var s = Gg(e),
        a = Gg(t),
        u = s ? kg : Fg(e),
        f = a ? kg : Fg(t);
      (u = u == Vg ? Hn : u), (f = f == Vg ? Hn : f);
      var p = u == Hn,
        d = f == Hn,
        h = u == f;
      if (h && Ug(e)) {
        if (!Ug(t)) return !1;
        (s = !0), (p = !1);
      }
      if (h && !p)
        return (
          o || (o = new fa()),
          s || FL(e) ? qL(e, t, r, n, i, o) : ML(e, t, u, r, n, i, o)
        );
      if (!(r & GL)) {
        var E = p && Hg.call(e, "__wrapped__"),
          y = d && Hg.call(t, "__wrapped__");
        if (E || y) {
          var _ = E ? e.value() : e,
            q = y ? t.value() : t;
          return o || (o = new fa()), i(_, q, r, n, o);
        }
      }
      return h ? (o || (o = new fa()), DL(e, t, r, n, i, o)) : !1;
    }
    Xg.exports = VL;
  });
  var da = c((I5, zg) => {
    var kL = Wg(),
      Bg = ct();
    function jg(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Bg(e) && !Bg(t))
        ? e !== e && t !== t
        : kL(e, t, r, n, jg, i);
    }
    zg.exports = jg;
  });
  var Yg = c((O5, Kg) => {
    var HL = Qo(),
      XL = da(),
      WL = 1,
      BL = 2;
    function jL(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var u = a[0],
          f = e[u],
          p = a[1];
        if (s && a[2]) {
          if (f === void 0 && !(u in e)) return !1;
        } else {
          var d = new HL();
          if (n) var h = n(f, p, u, e, t, d);
          if (!(h === void 0 ? XL(p, f, WL | BL, n, d) : h)) return !1;
        }
      }
      return !0;
    }
    Kg.exports = jL;
  });
  var pa = c((w5, $g) => {
    var zL = it();
    function KL(e) {
      return e === e && !zL(e);
    }
    $g.exports = KL;
  });
  var Zg = c((A5, Qg) => {
    var YL = pa(),
      $L = Dr();
    function QL(e) {
      for (var t = $L(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, YL(i)];
      }
      return t;
    }
    Qg.exports = QL;
  });
  var ga = c((x5, Jg) => {
    function ZL(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    Jg.exports = ZL;
  });
  var tv = c((S5, ev) => {
    var JL = Yg(),
      eN = Zg(),
      tN = ga();
    function rN(e) {
      var t = eN(e);
      return t.length == 1 && t[0][2]
        ? tN(t[0][0], t[0][1])
        : function (r) {
            return r === e || JL(r, e, t);
          };
    }
    ev.exports = rN;
  });
  var Fr = c((R5, rv) => {
    var nN = Et(),
      iN = ct(),
      oN = "[object Symbol]";
    function aN(e) {
      return typeof e == "symbol" || (iN(e) && nN(e) == oN);
    }
    rv.exports = aN;
  });
  var Xn = c((C5, nv) => {
    var sN = be(),
      uN = Fr(),
      cN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      lN = /^\w*$/;
    function fN(e, t) {
      if (sN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        uN(e)
        ? !0
        : lN.test(e) || !cN.test(e) || (t != null && e in Object(t));
    }
    nv.exports = fN;
  });
  var av = c((L5, ov) => {
    var iv = Nn(),
      dN = "Expected a function";
    function va(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(dN);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return (r.cache = o.set(i, s) || o), s;
      };
      return (r.cache = new (va.Cache || iv)()), r;
    }
    va.Cache = iv;
    ov.exports = va;
  });
  var uv = c((N5, sv) => {
    var pN = av(),
      gN = 500;
    function vN(e) {
      var t = pN(e, function (n) {
          return r.size === gN && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    sv.exports = vN;
  });
  var lv = c((P5, cv) => {
    var hN = uv(),
      yN =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      EN = /\\(\\)?/g,
      mN = hN(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(yN, function (r, n, i, o) {
            t.push(i ? o.replace(EN, "$1") : n || r);
          }),
          t
        );
      });
    cv.exports = mN;
  });
  var ha = c((q5, fv) => {
    function _N(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    fv.exports = _N;
  });
  var yv = c((M5, hv) => {
    var dv = kt(),
      bN = ha(),
      TN = be(),
      IN = Fr(),
      ON = 1 / 0,
      pv = dv ? dv.prototype : void 0,
      gv = pv ? pv.toString : void 0;
    function vv(e) {
      if (typeof e == "string") return e;
      if (TN(e)) return bN(e, vv) + "";
      if (IN(e)) return gv ? gv.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -ON ? "-0" : t;
    }
    hv.exports = vv;
  });
  var mv = c((D5, Ev) => {
    var wN = yv();
    function AN(e) {
      return e == null ? "" : wN(e);
    }
    Ev.exports = AN;
  });
  var Gr = c((F5, _v) => {
    var xN = be(),
      SN = Xn(),
      RN = lv(),
      CN = mv();
    function LN(e, t) {
      return xN(e) ? e : SN(e, t) ? [e] : RN(CN(e));
    }
    _v.exports = LN;
  });
  var Zt = c((G5, bv) => {
    var NN = Fr(),
      PN = 1 / 0;
    function qN(e) {
      if (typeof e == "string" || NN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -PN ? "-0" : t;
    }
    bv.exports = qN;
  });
  var Wn = c((U5, Tv) => {
    var MN = Gr(),
      DN = Zt();
    function FN(e, t) {
      t = MN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[DN(t[r++])];
      return r && r == n ? e : void 0;
    }
    Tv.exports = FN;
  });
  var Bn = c((V5, Iv) => {
    var GN = Wn();
    function UN(e, t, r) {
      var n = e == null ? void 0 : GN(e, t);
      return n === void 0 ? r : n;
    }
    Iv.exports = UN;
  });
  var wv = c((k5, Ov) => {
    function VN(e, t) {
      return e != null && t in Object(e);
    }
    Ov.exports = VN;
  });
  var xv = c((H5, Av) => {
    var kN = Gr(),
      HN = Nr(),
      XN = be(),
      WN = Dn(),
      BN = Fn(),
      jN = Zt();
    function zN(e, t, r) {
      t = kN(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = jN(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && BN(i) && WN(s, i) && (XN(e) || HN(e)));
    }
    Av.exports = zN;
  });
  var Rv = c((X5, Sv) => {
    var KN = wv(),
      YN = xv();
    function $N(e, t) {
      return e != null && YN(e, t, KN);
    }
    Sv.exports = $N;
  });
  var Lv = c((W5, Cv) => {
    var QN = da(),
      ZN = Bn(),
      JN = Rv(),
      eP = Xn(),
      tP = pa(),
      rP = ga(),
      nP = Zt(),
      iP = 1,
      oP = 2;
    function aP(e, t) {
      return eP(e) && tP(t)
        ? rP(nP(e), t)
        : function (r) {
            var n = ZN(r, e);
            return n === void 0 && n === t ? JN(r, e) : QN(t, n, iP | oP);
          };
    }
    Cv.exports = aP;
  });
  var jn = c((B5, Nv) => {
    function sP(e) {
      return e;
    }
    Nv.exports = sP;
  });
  var ya = c((j5, Pv) => {
    function uP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Pv.exports = uP;
  });
  var Mv = c((z5, qv) => {
    var cP = Wn();
    function lP(e) {
      return function (t) {
        return cP(t, e);
      };
    }
    qv.exports = lP;
  });
  var Fv = c((K5, Dv) => {
    var fP = ya(),
      dP = Mv(),
      pP = Xn(),
      gP = Zt();
    function vP(e) {
      return pP(e) ? fP(gP(e)) : dP(e);
    }
    Dv.exports = vP;
  });
  var _t = c((Y5, Gv) => {
    var hP = tv(),
      yP = Lv(),
      EP = jn(),
      mP = be(),
      _P = Fv();
    function bP(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? EP
        : typeof e == "object"
        ? mP(e)
          ? yP(e[0], e[1])
          : hP(e)
        : _P(e);
    }
    Gv.exports = bP;
  });
  var Ea = c(($5, Uv) => {
    var TP = _t(),
      IP = St(),
      OP = Dr();
    function wP(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!IP(t)) {
          var o = TP(r, 3);
          (t = OP(t)),
            (r = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Uv.exports = wP;
  });
  var ma = c((Q5, Vv) => {
    function AP(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Vv.exports = AP;
  });
  var Hv = c((Z5, kv) => {
    var xP = /\s/;
    function SP(e) {
      for (var t = e.length; t-- && xP.test(e.charAt(t)); );
      return t;
    }
    kv.exports = SP;
  });
  var Wv = c((J5, Xv) => {
    var RP = Hv(),
      CP = /^\s+/;
    function LP(e) {
      return e && e.slice(0, RP(e) + 1).replace(CP, "");
    }
    Xv.exports = LP;
  });
  var zn = c((eB, zv) => {
    var NP = Wv(),
      Bv = it(),
      PP = Fr(),
      jv = 0 / 0,
      qP = /^[-+]0x[0-9a-f]+$/i,
      MP = /^0b[01]+$/i,
      DP = /^0o[0-7]+$/i,
      FP = parseInt;
    function GP(e) {
      if (typeof e == "number") return e;
      if (PP(e)) return jv;
      if (Bv(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Bv(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = NP(e);
      var r = MP.test(e);
      return r || DP.test(e) ? FP(e.slice(2), r ? 2 : 8) : qP.test(e) ? jv : +e;
    }
    zv.exports = GP;
  });
  var $v = c((tB, Yv) => {
    var UP = zn(),
      Kv = 1 / 0,
      VP = 17976931348623157e292;
    function kP(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = UP(e)), e === Kv || e === -Kv)) {
        var t = e < 0 ? -1 : 1;
        return t * VP;
      }
      return e === e ? e : 0;
    }
    Yv.exports = kP;
  });
  var _a = c((rB, Qv) => {
    var HP = $v();
    function XP(e) {
      var t = HP(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    Qv.exports = XP;
  });
  var Jv = c((nB, Zv) => {
    var WP = ma(),
      BP = _t(),
      jP = _a(),
      zP = Math.max;
    function KP(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : jP(r);
      return i < 0 && (i = zP(n + i, 0)), WP(e, BP(t, 3), i);
    }
    Zv.exports = KP;
  });
  var ba = c((iB, eh) => {
    var YP = Ea(),
      $P = Jv(),
      QP = YP($P);
    eh.exports = QP;
  });
  var nh = {};
  Le(nh, {
    ELEMENT_MATCHES: () => ZP,
    FLEX_PREFIXED: () => Ta,
    IS_BROWSER_ENV: () => ze,
    TRANSFORM_PREFIXED: () => bt,
    TRANSFORM_STYLE_PREFIXED: () => Yn,
    withBrowser: () => Kn,
  });
  var rh,
    ze,
    Kn,
    ZP,
    Ta,
    bt,
    th,
    Yn,
    $n = de(() => {
      "use strict";
      (rh = ae(ba())),
        (ze = typeof window < "u"),
        (Kn = (e, t) => (ze ? e() : t)),
        (ZP = Kn(() =>
          (0, rh.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Ta = Kn(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (bt = Kn(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (th = bt.split("transform")[0]),
        (Yn = th ? th + "TransformStyle" : "transformStyle");
    });
  var Ia = c((oB, uh) => {
    var JP = 4,
      eq = 0.001,
      tq = 1e-7,
      rq = 10,
      Ur = 11,
      Qn = 1 / (Ur - 1),
      nq = typeof Float32Array == "function";
    function ih(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function oh(e, t) {
      return 3 * t - 6 * e;
    }
    function ah(e) {
      return 3 * e;
    }
    function Zn(e, t, r) {
      return ((ih(t, r) * e + oh(t, r)) * e + ah(t)) * e;
    }
    function sh(e, t, r) {
      return 3 * ih(t, r) * e * e + 2 * oh(t, r) * e + ah(t);
    }
    function iq(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (o = Zn(s, n, i) - e), o > 0 ? (r = s) : (t = s);
      while (Math.abs(o) > tq && ++a < rq);
      return s;
    }
    function oq(e, t, r, n) {
      for (var i = 0; i < JP; ++i) {
        var o = sh(t, r, n);
        if (o === 0) return t;
        var s = Zn(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    uh.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = nq ? new Float32Array(Ur) : new Array(Ur);
      if (t !== r || n !== i)
        for (var s = 0; s < Ur; ++s) o[s] = Zn(s * Qn, t, n);
      function a(u) {
        for (var f = 0, p = 1, d = Ur - 1; p !== d && o[p] <= u; ++p) f += Qn;
        --p;
        var h = (u - o[p]) / (o[p + 1] - o[p]),
          E = f + h * Qn,
          y = sh(E, t, n);
        return y >= eq ? oq(u, E, t, n) : y === 0 ? E : iq(u, f, f + Qn, t, n);
      }
      return function (f) {
        return t === r && n === i
          ? f
          : f === 0
          ? 0
          : f === 1
          ? 1
          : Zn(a(f), r, i);
      };
    };
  });
  var kr = {};
  Le(kr, {
    bounce: () => kq,
    bouncePast: () => Hq,
    ease: () => aq,
    easeIn: () => sq,
    easeInOut: () => cq,
    easeOut: () => uq,
    inBack: () => Nq,
    inCirc: () => Sq,
    inCubic: () => pq,
    inElastic: () => Mq,
    inExpo: () => wq,
    inOutBack: () => qq,
    inOutCirc: () => Cq,
    inOutCubic: () => vq,
    inOutElastic: () => Fq,
    inOutExpo: () => xq,
    inOutQuad: () => dq,
    inOutQuart: () => Eq,
    inOutQuint: () => bq,
    inOutSine: () => Oq,
    inQuad: () => lq,
    inQuart: () => hq,
    inQuint: () => mq,
    inSine: () => Tq,
    outBack: () => Pq,
    outBounce: () => Lq,
    outCirc: () => Rq,
    outCubic: () => gq,
    outElastic: () => Dq,
    outExpo: () => Aq,
    outQuad: () => fq,
    outQuart: () => yq,
    outQuint: () => _q,
    outSine: () => Iq,
    swingFrom: () => Uq,
    swingFromTo: () => Gq,
    swingTo: () => Vq,
  });
  function lq(e) {
    return Math.pow(e, 2);
  }
  function fq(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function dq(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function pq(e) {
    return Math.pow(e, 3);
  }
  function gq(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function vq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function hq(e) {
    return Math.pow(e, 4);
  }
  function yq(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function Eq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function mq(e) {
    return Math.pow(e, 5);
  }
  function _q(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function bq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function Tq(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function Iq(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function Oq(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function wq(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function Aq(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function xq(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function Sq(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function Rq(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function Cq(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function Lq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Nq(e) {
    let t = lt;
    return e * e * ((t + 1) * e - t);
  }
  function Pq(e) {
    let t = lt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function qq(e) {
    let t = lt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Mq(e) {
    let t = lt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        -(
          n *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / r)
        ));
  }
  function Dq(e) {
    let t = lt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
  }
  function Fq(e) {
    let t = lt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (r || (r = 0.3 * 1.5),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        e < 1
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r) *
              0.5 +
            1);
  }
  function Gq(e) {
    let t = lt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Uq(e) {
    let t = lt;
    return e * e * ((t + 1) * e - t);
  }
  function Vq(e) {
    let t = lt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function kq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Hq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var Vr,
    lt,
    aq,
    sq,
    uq,
    cq,
    Oa = de(() => {
      "use strict";
      (Vr = ae(Ia())),
        (lt = 1.70158),
        (aq = (0, Vr.default)(0.25, 0.1, 0.25, 1)),
        (sq = (0, Vr.default)(0.42, 0, 1, 1)),
        (uq = (0, Vr.default)(0, 0, 0.58, 1)),
        (cq = (0, Vr.default)(0.42, 0, 0.58, 1));
    });
  var lh = {};
  Le(lh, {
    applyEasing: () => Wq,
    createBezierEasing: () => Xq,
    optimizeFloat: () => Hr,
  });
  function Hr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function Xq(e) {
    return (0, ch.default)(...e);
  }
  function Wq(e, t, r) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Hr(r ? (t > 0 ? r(t) : t) : t > 0 && e && kr[e] ? kr[e](t) : t);
  }
  var ch,
    wa = de(() => {
      "use strict";
      Oa();
      ch = ae(Ia());
    });
  var ph = {};
  Le(ph, {
    createElementState: () => dh,
    ixElements: () => iM,
    mergeActionState: () => Aa,
  });
  function dh(e, t, r, n, i) {
    let o =
      r === Bq ? (0, Jt.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Jt.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function Aa(e, t, r, n, i) {
    let o = aM(i);
    return (0, Jt.mergeIn)(e, [t, nM, r], n, o);
  }
  function aM(e) {
    let { config: t } = e;
    return oM.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (r[o] = a), r;
    }, {});
  }
  var Jt,
    sB,
    Bq,
    uB,
    jq,
    zq,
    Kq,
    Yq,
    $q,
    Qq,
    Zq,
    Jq,
    eM,
    tM,
    rM,
    fh,
    nM,
    iM,
    oM,
    gh = de(() => {
      "use strict";
      Jt = ae(Wt());
      Pe();
      ({
        HTML_ELEMENT: sB,
        PLAIN_OBJECT: Bq,
        ABSTRACT_NODE: uB,
        CONFIG_X_VALUE: jq,
        CONFIG_Y_VALUE: zq,
        CONFIG_Z_VALUE: Kq,
        CONFIG_VALUE: Yq,
        CONFIG_X_UNIT: $q,
        CONFIG_Y_UNIT: Qq,
        CONFIG_Z_UNIT: Zq,
        CONFIG_UNIT: Jq,
      } = Oe),
        ({
          IX2_SESSION_STOPPED: eM,
          IX2_INSTANCE_ADDED: tM,
          IX2_ELEMENT_STATE_CHANGED: rM,
        } = me),
        (fh = {}),
        (nM = "refState"),
        (iM = (e = fh, t = {}) => {
          switch (t.type) {
            case eM:
              return fh;
            case tM: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, Jt.getIn)(u, [r, n]) !== n && (u = dh(u, n, s, r, o)),
                Aa(u, r, a, i, o)
              );
            }
            case rM: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return Aa(e, r, n, i, o);
            }
            default:
              return e;
          }
        });
      oM = [
        [jq, $q],
        [zq, Qq],
        [Kq, Zq],
        [Yq, Jq],
      ];
    });
  var vh = c((Te) => {
    "use strict";
    Object.defineProperty(Te, "__esModule", { value: !0 });
    Te.renderPlugin =
      Te.getPluginOrigin =
      Te.getPluginDuration =
      Te.getPluginDestination =
      Te.getPluginConfig =
      Te.createPluginInstance =
      Te.clearPlugin =
        void 0;
    var sM = (e) => e.value;
    Te.getPluginConfig = sM;
    var uM = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Te.getPluginDuration = uM;
    var cM = (e) => e || { value: 0 };
    Te.getPluginOrigin = cM;
    var lM = (e) => ({ value: e.value });
    Te.getPluginDestination = lM;
    var fM = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Te.createPluginInstance = fM;
    var dM = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Te.renderPlugin = dM;
    var pM = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Te.clearPlugin = pM;
  });
  var yh = c((Ie) => {
    "use strict";
    Object.defineProperty(Ie, "__esModule", { value: !0 });
    Ie.renderPlugin =
      Ie.getPluginOrigin =
      Ie.getPluginDuration =
      Ie.getPluginDestination =
      Ie.getPluginConfig =
      Ie.createPluginInstance =
      Ie.clearPlugin =
        void 0;
    var gM = (e) => document.querySelector(`[data-w-id="${e}"]`),
      vM = () => window.Webflow.require("spline"),
      hM = (e, t) => e.filter((r) => !t.includes(r)),
      yM = (e, t) => e.value[t];
    Ie.getPluginConfig = yM;
    var EM = () => null;
    Ie.getPluginDuration = EM;
    var hh = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      mM = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            s = hM(n, o);
          return s.length ? s.reduce((u, f) => ((u[f] = hh[f]), u), e) : e;
        }
        return n.reduce((o, s) => ((o[s] = hh[s]), o), {});
      };
    Ie.getPluginOrigin = mM;
    var _M = (e) => e.value;
    Ie.getPluginDestination = _M;
    var bM = (e, t) => {
      var r, n;
      let i =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (n = r.target) === null ||
        n === void 0
          ? void 0
          : n.pluginElement;
      return i ? gM(i) : null;
    };
    Ie.createPluginInstance = bM;
    var TM = (e, t, r) => {
      let n = vM(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        s = (a) => {
          if (!a) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && a.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: f } = t;
          f.positionX != null && (u.position.x = f.positionX),
            f.positionY != null && (u.position.y = f.positionY),
            f.positionZ != null && (u.position.z = f.positionZ),
            f.rotationX != null && (u.rotation.x = f.rotationX),
            f.rotationY != null && (u.rotation.y = f.rotationY),
            f.rotationZ != null && (u.rotation.z = f.rotationZ),
            f.scaleX != null && (u.scale.x = f.scaleX),
            f.scaleY != null && (u.scale.y = f.scaleY),
            f.scaleZ != null && (u.scale.z = f.scaleZ);
        };
      i ? s(i.spline) : n.setLoadHandler(e, s);
    };
    Ie.renderPlugin = TM;
    var IM = () => null;
    Ie.clearPlugin = IM;
  });
  var mh = c((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    _e.getPluginOrigin =
      _e.getPluginDuration =
      _e.getPluginDestination =
      _e.getPluginConfig =
      _e.createPluginInstance =
      _e.clearPlugin =
        void 0;
    _e.normalizeColor = Eh;
    _e.renderPlugin = void 0;
    function Eh(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase();
      if (o.startsWith("#")) {
        let s = o.substring(1);
        s.length === 3
          ? ((t = parseInt(s[0] + s[0], 16)),
            (r = parseInt(s[1] + s[1], 16)),
            (n = parseInt(s[2] + s[2], 16)))
          : s.length === 6 &&
            ((t = parseInt(s.substring(0, 2), 16)),
            (r = parseInt(s.substring(2, 4), 16)),
            (n = parseInt(s.substring(4, 6), 16)));
      } else if (o.startsWith("rgba")) {
        let s = o.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10)),
          (i = parseFloat(s[3]));
      } else if (o.startsWith("rgb")) {
        let s = o.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10));
      } else if (o.startsWith("hsla")) {
        let s = o.match(/hsla\(([^)]+)\)/)[1].split(","),
          a = parseFloat(s[0]),
          u = parseFloat(s[1].replace("%", "")) / 100,
          f = parseFloat(s[2].replace("%", "")) / 100;
        i = parseFloat(s[3]);
        let p = (1 - Math.abs(2 * f - 1)) * u,
          d = p * (1 - Math.abs(((a / 60) % 2) - 1)),
          h = f - p / 2,
          E,
          y,
          _;
        a >= 0 && a < 60
          ? ((E = p), (y = d), (_ = 0))
          : a >= 60 && a < 120
          ? ((E = d), (y = p), (_ = 0))
          : a >= 120 && a < 180
          ? ((E = 0), (y = p), (_ = d))
          : a >= 180 && a < 240
          ? ((E = 0), (y = d), (_ = p))
          : a >= 240 && a < 300
          ? ((E = d), (y = 0), (_ = p))
          : ((E = p), (y = 0), (_ = d)),
          (t = Math.round((E + h) * 255)),
          (r = Math.round((y + h) * 255)),
          (n = Math.round((_ + h) * 255));
      } else if (o.startsWith("hsl")) {
        let s = o.match(/hsl\(([^)]+)\)/)[1].split(","),
          a = parseFloat(s[0]),
          u = parseFloat(s[1].replace("%", "")) / 100,
          f = parseFloat(s[2].replace("%", "")) / 100,
          p = (1 - Math.abs(2 * f - 1)) * u,
          d = p * (1 - Math.abs(((a / 60) % 2) - 1)),
          h = f - p / 2,
          E,
          y,
          _;
        a >= 0 && a < 60
          ? ((E = p), (y = d), (_ = 0))
          : a >= 60 && a < 120
          ? ((E = d), (y = p), (_ = 0))
          : a >= 120 && a < 180
          ? ((E = 0), (y = p), (_ = d))
          : a >= 180 && a < 240
          ? ((E = 0), (y = d), (_ = p))
          : a >= 240 && a < 300
          ? ((E = d), (y = 0), (_ = p))
          : ((E = p), (y = 0), (_ = d)),
          (t = Math.round((E + h) * 255)),
          (r = Math.round((y + h) * 255)),
          (n = Math.round((_ + h) * 255));
      }
      return (
        (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n)) && `${e}`,
        { red: t, green: r, blue: n, alpha: i }
      );
    }
    var OM = (e, t) => e.value[t];
    _e.getPluginConfig = OM;
    var wM = () => null;
    _e.getPluginDuration = wM;
    var AM = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null) return Eh(i);
    };
    _e.getPluginOrigin = AM;
    var xM = (e) => e.value;
    _e.getPluginDestination = xM;
    var SM = () => null;
    _e.createPluginInstance = SM;
    var RM = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: s, red: a, green: u, blue: f, alpha: p } = o,
        d;
      s != null && (d = s + i),
        a != null &&
          f != null &&
          u != null &&
          p != null &&
          (d = `rgba(${a}, ${u}, ${f}, ${p})`),
        d != null && document.documentElement.style.setProperty(n, d);
    };
    _e.renderPlugin = RM;
    var CM = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    _e.clearPlugin = CM;
  });
  var _h = c((Jn) => {
    "use strict";
    var Sa = ln().default;
    Object.defineProperty(Jn, "__esModule", { value: !0 });
    Jn.pluginMethodMap = void 0;
    var xa = (Pe(), Je(Af)),
      LM = Sa(vh()),
      NM = Sa(yh()),
      PM = Sa(mh()),
      dB = (Jn.pluginMethodMap = new Map([
        [xa.ActionTypeConsts.PLUGIN_LOTTIE, { ...LM }],
        [xa.ActionTypeConsts.PLUGIN_SPLINE, { ...NM }],
        [xa.ActionTypeConsts.PLUGIN_VARIABLE, { ...PM }],
      ]));
  });
  var bh = {};
  Le(bh, {
    clearPlugin: () => qa,
    createPluginInstance: () => MM,
    getPluginConfig: () => Ca,
    getPluginDestination: () => Na,
    getPluginDuration: () => qM,
    getPluginOrigin: () => La,
    isPluginType: () => Ct,
    renderPlugin: () => Pa,
  });
  function Ct(e) {
    return Ra.pluginMethodMap.has(e);
  }
  var Ra,
    Lt,
    Ca,
    La,
    qM,
    Na,
    MM,
    Pa,
    qa,
    Ma = de(() => {
      "use strict";
      $n();
      Ra = ae(_h());
      (Lt = (e) => (t) => {
        if (!ze) return () => null;
        let r = Ra.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (Ca = Lt("getPluginConfig")),
        (La = Lt("getPluginOrigin")),
        (qM = Lt("getPluginDuration")),
        (Na = Lt("getPluginDestination")),
        (MM = Lt("createPluginInstance")),
        (Pa = Lt("renderPlugin")),
        (qa = Lt("clearPlugin"));
    });
  var Ih = c((vB, Th) => {
    function DM(e, t) {
      return e == null || e !== e ? t : e;
    }
    Th.exports = DM;
  });
  var wh = c((hB, Oh) => {
    function FM(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Oh.exports = FM;
  });
  var xh = c((yB, Ah) => {
    function GM(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (r(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Ah.exports = GM;
  });
  var Rh = c((EB, Sh) => {
    var UM = xh(),
      VM = UM();
    Sh.exports = VM;
  });
  var Da = c((mB, Ch) => {
    var kM = Rh(),
      HM = Dr();
    function XM(e, t) {
      return e && kM(e, t, HM);
    }
    Ch.exports = XM;
  });
  var Nh = c((_B, Lh) => {
    var WM = St();
    function BM(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!WM(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    Lh.exports = BM;
  });
  var Fa = c((bB, Ph) => {
    var jM = Da(),
      zM = Nh(),
      KM = zM(jM);
    Ph.exports = KM;
  });
  var Mh = c((TB, qh) => {
    function YM(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    qh.exports = YM;
  });
  var Fh = c((IB, Dh) => {
    var $M = wh(),
      QM = Fa(),
      ZM = _t(),
      JM = Mh(),
      e1 = be();
    function t1(e, t, r) {
      var n = e1(e) ? $M : JM,
        i = arguments.length < 3;
      return n(e, ZM(t, 4), r, i, QM);
    }
    Dh.exports = t1;
  });
  var Uh = c((OB, Gh) => {
    var r1 = ma(),
      n1 = _t(),
      i1 = _a(),
      o1 = Math.max,
      a1 = Math.min;
    function s1(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = i1(r)), (i = r < 0 ? o1(n + i, 0) : a1(i, n - 1))),
        r1(e, n1(t, 3), i, !0)
      );
    }
    Gh.exports = s1;
  });
  var kh = c((wB, Vh) => {
    var u1 = Ea(),
      c1 = Uh(),
      l1 = u1(c1);
    Vh.exports = l1;
  });
  function Hh(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function d1(e, t) {
    if (Hh(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!f1.call(t, r[i]) || !Hh(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var f1,
    Ga,
    Xh = de(() => {
      "use strict";
      f1 = Object.prototype.hasOwnProperty;
      Ga = d1;
    });
  var ay = {};
  Le(ay, {
    cleanupHTMLElement: () => cD,
    clearAllStyles: () => uD,
    clearObjectCache: () => R1,
    getActionListProgress: () => fD,
    getAffectedElements: () => Xa,
    getComputedStyle: () => F1,
    getDestinationValues: () => W1,
    getElementId: () => P1,
    getInstanceId: () => L1,
    getInstanceOrigin: () => V1,
    getItemConfigByKey: () => X1,
    getMaxDurationItemIndex: () => oy,
    getNamespacedParameterId: () => gD,
    getRenderType: () => ry,
    getStyleProp: () => B1,
    mediaQueriesEqual: () => hD,
    observeStore: () => D1,
    reduceListToGroup: () => dD,
    reifyState: () => q1,
    renderHTMLElement: () => j1,
    shallowEqual: () => Ga,
    shouldAllowMediaQuery: () => vD,
    shouldNamespaceEventParameter: () => pD,
    stringifyTarget: () => yD,
  });
  function R1() {
    ei.clear();
  }
  function L1() {
    return "i" + C1++;
  }
  function P1(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + N1++;
  }
  function q1({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, ii.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function D1({ store: e, select: t, onChange: r, comparator: n = M1 }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let f = t(i());
      if (f == null) {
        s();
        return;
      }
      n(f, a) || ((a = f), r(a, e));
    }
    return s;
  }
  function jh(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function Xa({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (O, v) =>
          O.concat(
            Xa({
              config: { target: v },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: f,
        getSiblingElements: p,
        matchSelector: d,
        elementContains: h,
        isSiblingNode: E,
      } = i,
      { target: y } = e;
    if (!y) return [];
    let {
      id: _,
      objectId: q,
      selector: I,
      selectorGuids: S,
      appliesTo: w,
      useEventTarget: L,
    } = jh(y);
    if (q) return [ei.has(q) ? ei.get(q) : ei.set(q, {}).get(q)];
    if (w === Wo.PAGE) {
      let O = s(_);
      return O ? [O] : [];
    }
    let N = (t?.action?.config?.affectedElements ?? {})[_ || I] || {},
      B = !!(N.id || N.selector),
      j,
      z,
      Q,
      U = t && a(jh(t.target));
    if (
      (B
        ? ((j = N.limitAffectedElements), (z = U), (Q = a(N)))
        : (z = Q = a({ id: _, selector: I, selectorGuids: S })),
      t && L)
    ) {
      let O = r && (Q || L === !0) ? [r] : u(U);
      if (Q) {
        if (L === A1) return u(Q).filter((v) => O.some((R) => h(v, R)));
        if (L === Wh) return u(Q).filter((v) => O.some((R) => h(R, v)));
        if (L === Bh) return u(Q).filter((v) => O.some((R) => E(R, v)));
      }
      return O;
    }
    return z == null || Q == null
      ? []
      : ze && n
      ? u(Q).filter((O) => n.contains(O))
      : j === Wh
      ? u(z, Q)
      : j === w1
      ? f(u(z)).filter(d(Q))
      : j === Bh
      ? p(u(z)).filter(d(Q))
      : u(Q);
  }
  function F1({ element: e, actionItem: t }) {
    if (!ze) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case ir:
      case or:
      case ar:
      case sr:
      case ai:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function V1(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = n;
    if (Ct(s)) return La(s)(t[s], n);
    switch (n.actionTypeId) {
      case tr:
      case rr:
      case nr:
      case jr:
        return t[n.actionTypeId] || Wa[n.actionTypeId];
      case zr:
        return G1(t[n.actionTypeId], n.config.filters);
      case Kr:
        return U1(t[n.actionTypeId], n.config.fontVariations);
      case Jh:
        return { value: (0, ft.default)(parseFloat(o(e, ri)), 1) };
      case ir: {
        let a = o(e, ot),
          u = o(e, at),
          f,
          p;
        return (
          n.config.widthUnit === Tt
            ? (f = zh.test(a) ? parseFloat(a) : parseFloat(r.width))
            : (f = (0, ft.default)(parseFloat(a), parseFloat(r.width))),
          n.config.heightUnit === Tt
            ? (p = zh.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (p = (0, ft.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: f, heightValue: p }
        );
      }
      case or:
      case ar:
      case sr:
        return oD({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case ai:
        return { value: (0, ft.default)(o(e, ni), r.display) };
      case S1:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function W1({ element: e, actionItem: t, elementApi: r }) {
    if (Ct(t.actionTypeId)) return Na(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case tr:
      case rr:
      case nr:
      case jr: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case ir: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: f } = t.config;
        if (!ze) return { widthValue: u, heightValue: f };
        if (s === Tt) {
          let p = n(e, ot);
          i(e, ot, ""), (u = o(e, "offsetWidth")), i(e, ot, p);
        }
        if (a === Tt) {
          let p = n(e, at);
          i(e, at, ""), (f = o(e, "offsetHeight")), i(e, at, p);
        }
        return { widthValue: u, heightValue: f };
      }
      case or:
      case ar:
      case sr: {
        let { rValue: n, gValue: i, bValue: o, aValue: s } = t.config;
        return { rValue: n, gValue: i, bValue: o, aValue: s };
      }
      case zr:
        return t.config.filters.reduce(k1, {});
      case Kr:
        return t.config.fontVariations.reduce(H1, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function ry(e) {
    if (/^TRANSFORM_/.test(e)) return Qh;
    if (/^STYLE_/.test(e)) return ka;
    if (/^GENERAL_/.test(e)) return Va;
    if (/^PLUGIN_/.test(e)) return Zh;
  }
  function B1(e, t) {
    return e === ka ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function j1(e, t, r, n, i, o, s, a, u) {
    switch (a) {
      case Qh:
        return Q1(e, t, r, i, s);
      case ka:
        return aD(e, t, r, i, o, s);
      case Va:
        return sD(e, i, s);
      case Zh: {
        let { actionTypeId: f } = i;
        if (Ct(f)) return Pa(f)(u, t, i);
      }
    }
  }
  function Q1(e, t, r, n, i) {
    let o = $1
        .map((a) => {
          let u = Wa[a],
            {
              xValue: f = u.xValue,
              yValue: p = u.yValue,
              zValue: d = u.zValue,
              xUnit: h = "",
              yUnit: E = "",
              zUnit: y = "",
            } = t[a] || {};
          switch (a) {
            case tr:
              return `${v1}(${f}${h}, ${p}${E}, ${d}${y})`;
            case rr:
              return `${h1}(${f}${h}, ${p}${E}, ${d}${y})`;
            case nr:
              return `${y1}(${f}${h}) ${E1}(${p}${E}) ${m1}(${d}${y})`;
            case jr:
              return `${_1}(${f}${h}, ${p}${E})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: s } = i;
    Nt(e, bt, i), s(e, bt, o), eD(n, r) && s(e, Yn, b1);
  }
  function Z1(e, t, r, n) {
    let i = (0, ii.default)(t, (s, a, u) => `${s} ${u}(${a}${Y1(u, r)})`, ""),
      { setStyle: o } = n;
    Nt(e, Xr, n), o(e, Xr, i);
  }
  function J1(e, t, r, n) {
    let i = (0, ii.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = n;
    Nt(e, Wr, n), o(e, Wr, i);
  }
  function eD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === tr && n !== void 0) ||
      (e === rr && n !== void 0) ||
      (e === nr && (t !== void 0 || r !== void 0))
    );
  }
  function iD(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function oD({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = Ha[t],
      o = n(e, i),
      s = rD.test(o) ? o : r[i],
      a = iD(nD, s).split(Br);
    return {
      rValue: (0, ft.default)(parseInt(a[0], 10), 255),
      gValue: (0, ft.default)(parseInt(a[1], 10), 255),
      bValue: (0, ft.default)(parseInt(a[2], 10), 255),
      aValue: (0, ft.default)(parseFloat(a[3]), 1),
    };
  }
  function aD(e, t, r, n, i, o) {
    let { setStyle: s } = o;
    switch (n.actionTypeId) {
      case ir: {
        let { widthUnit: a = "", heightUnit: u = "" } = n.config,
          { widthValue: f, heightValue: p } = r;
        f !== void 0 && (a === Tt && (a = "px"), Nt(e, ot, o), s(e, ot, f + a)),
          p !== void 0 &&
            (u === Tt && (u = "px"), Nt(e, at, o), s(e, at, p + u));
        break;
      }
      case zr: {
        Z1(e, r, n.config, o);
        break;
      }
      case Kr: {
        J1(e, r, n.config, o);
        break;
      }
      case or:
      case ar:
      case sr: {
        let a = Ha[n.actionTypeId],
          u = Math.round(r.rValue),
          f = Math.round(r.gValue),
          p = Math.round(r.bValue),
          d = r.aValue;
        Nt(e, a, o),
          s(e, a, d >= 1 ? `rgb(${u},${f},${p})` : `rgba(${u},${f},${p},${d})`);
        break;
      }
      default: {
        let { unit: a = "" } = n.config;
        Nt(e, i, o), s(e, i, r.value + a);
        break;
      }
    }
  }
  function sD(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case ai: {
        let { value: i } = t.config;
        i === T1 && ze ? n(e, ni, Ta) : n(e, ni, i);
        return;
      }
    }
  }
  function Nt(e, t, r) {
    if (!ze) return;
    let n = ty[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, er);
    if (!s) {
      o(e, er, n);
      return;
    }
    let a = s.split(Br).map(ey);
    a.indexOf(n) === -1 && o(e, er, a.concat(n).join(Br));
  }
  function ny(e, t, r) {
    if (!ze) return;
    let n = ty[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, er);
    !s ||
      s.indexOf(n) === -1 ||
      o(
        e,
        er,
        s
          .split(Br)
          .map(ey)
          .filter((a) => a !== n)
          .join(Br)
      );
  }
  function uD({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    Object.keys(n).forEach((o) => {
      let s = n[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        f = i[u];
      f && Kh({ actionList: f, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Kh({ actionList: i[o], elementApi: t });
      });
  }
  function Kh({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    n &&
      n.forEach((o) => {
        Yh({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            Yh({ actionGroup: a, event: t, elementApi: r });
          });
        });
  }
  function Yh({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      Ct(o)
        ? (a = (u) => qa(o)(u, i))
        : (a = iy({ effect: lD, actionTypeId: o, elementApi: r })),
        Xa({ config: s, event: t, elementApi: r }).forEach(a);
    });
  }
  function cD(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === ir) {
      let { config: s } = t;
      s.widthUnit === Tt && n(e, ot, ""), s.heightUnit === Tt && n(e, at, "");
    }
    i(e, er) && iy({ effect: ny, actionTypeId: o, elementApi: r })(e);
  }
  function lD(e, t, r) {
    let { setStyle: n } = r;
    ny(e, t, r), n(e, t, ""), t === bt && n(e, Yn, "");
  }
  function oy(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          s = o.delay + o.duration;
        s >= t && ((t = s), (r = i));
      }),
      r
    );
  }
  function fD(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      r.forEach((u, f) => {
        if (n && f === 0) return;
        let { actionItems: p } = u,
          d = p[oy(p)],
          { config: h, actionTypeId: E } = d;
        i.id === d.id && (a = s + o);
        let y = ry(E) === Va ? 0 : h.duration;
        s += h.delay + y;
      }),
      s > 0 ? Hr(a / s) : 0
    );
  }
  function dD({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, oi.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      n && n.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: f }) => f.some(s));
        }),
      (0, oi.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function pD(e, { basedOn: t }) {
    return (
      (e === je.SCROLLING_IN_VIEW && (t === nt.ELEMENT || t == null)) ||
      (e === je.MOUSE_MOVE && t === nt.ELEMENT)
    );
  }
  function gD(e, t) {
    return e + x1 + t;
  }
  function vD(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function hD(e, t) {
    return Ga(e && e.sort(), t && t.sort());
  }
  function yD(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Ua + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Ua + r + Ua + n;
  }
  var ft,
    ii,
    ti,
    oi,
    p1,
    g1,
    v1,
    h1,
    y1,
    E1,
    m1,
    _1,
    b1,
    T1,
    ri,
    Xr,
    Wr,
    ot,
    at,
    $h,
    I1,
    O1,
    Wh,
    w1,
    Bh,
    A1,
    ni,
    er,
    Tt,
    Br,
    x1,
    Ua,
    Qh,
    Va,
    ka,
    Zh,
    tr,
    rr,
    nr,
    jr,
    Jh,
    zr,
    Kr,
    ir,
    or,
    ar,
    sr,
    ai,
    S1,
    ey,
    Ha,
    ty,
    ei,
    C1,
    N1,
    M1,
    zh,
    G1,
    U1,
    k1,
    H1,
    X1,
    Wa,
    z1,
    K1,
    Y1,
    $1,
    tD,
    rD,
    nD,
    iy,
    sy = de(() => {
      "use strict";
      (ft = ae(Ih())), (ii = ae(Fh())), (ti = ae(kh())), (oi = ae(Wt()));
      Pe();
      Xh();
      wa();
      Ma();
      $n();
      ({
        BACKGROUND: p1,
        TRANSFORM: g1,
        TRANSLATE_3D: v1,
        SCALE_3D: h1,
        ROTATE_X: y1,
        ROTATE_Y: E1,
        ROTATE_Z: m1,
        SKEW: _1,
        PRESERVE_3D: b1,
        FLEX: T1,
        OPACITY: ri,
        FILTER: Xr,
        FONT_VARIATION_SETTINGS: Wr,
        WIDTH: ot,
        HEIGHT: at,
        BACKGROUND_COLOR: $h,
        BORDER_COLOR: I1,
        COLOR: O1,
        CHILDREN: Wh,
        IMMEDIATE_CHILDREN: w1,
        SIBLINGS: Bh,
        PARENT: A1,
        DISPLAY: ni,
        WILL_CHANGE: er,
        AUTO: Tt,
        COMMA_DELIMITER: Br,
        COLON_DELIMITER: x1,
        BAR_DELIMITER: Ua,
        RENDER_TRANSFORM: Qh,
        RENDER_GENERAL: Va,
        RENDER_STYLE: ka,
        RENDER_PLUGIN: Zh,
      } = Oe),
        ({
          TRANSFORM_MOVE: tr,
          TRANSFORM_SCALE: rr,
          TRANSFORM_ROTATE: nr,
          TRANSFORM_SKEW: jr,
          STYLE_OPACITY: Jh,
          STYLE_FILTER: zr,
          STYLE_FONT_VARIATION: Kr,
          STYLE_SIZE: ir,
          STYLE_BACKGROUND_COLOR: or,
          STYLE_BORDER: ar,
          STYLE_TEXT_COLOR: sr,
          GENERAL_DISPLAY: ai,
          OBJECT_VALUE: S1,
        } = Ne),
        (ey = (e) => e.trim()),
        (Ha = Object.freeze({ [or]: $h, [ar]: I1, [sr]: O1 })),
        (ty = Object.freeze({
          [bt]: g1,
          [$h]: p1,
          [ri]: ri,
          [Xr]: Xr,
          [ot]: ot,
          [at]: at,
          [Wr]: Wr,
        })),
        (ei = new Map());
      C1 = 1;
      N1 = 1;
      M1 = (e, t) => e === t;
      (zh = /px/),
        (G1 = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = z1[n.type]), r),
            e || {}
          )),
        (U1 = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = K1[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          ));
      (k1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (H1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (X1 = (e, t, r) => {
          if (Ct(e)) return Ca(e)(r, t);
          switch (e) {
            case zr: {
              let n = (0, ti.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case Kr: {
              let n = (0, ti.default)(
                r.fontVariations,
                ({ type: i }) => i === t
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        });
      (Wa = {
        [tr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [rr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [nr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [jr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (z1 = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (K1 = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (Y1 = (e, t) => {
          let r = (0, ti.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        ($1 = Object.keys(Wa));
      (tD = "\\(([^)]+)\\)"), (rD = /^rgb/), (nD = RegExp(`rgba?${tD}`));
      iy =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case tr:
            case rr:
            case nr:
            case jr:
              e(n, bt, r);
              break;
            case zr:
              e(n, Xr, r);
              break;
            case Kr:
              e(n, Wr, r);
              break;
            case Jh:
              e(n, ri, r);
              break;
            case ir:
              e(n, ot, r), e(n, at, r);
              break;
            case or:
            case ar:
            case sr:
              e(n, Ha[t], r);
              break;
            case ai:
              e(n, ni, r);
              break;
          }
        };
    });
  var Pt = c((Se) => {
    "use strict";
    var ur = ln().default;
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.IX2VanillaUtils =
      Se.IX2VanillaPlugins =
      Se.IX2ElementsReducer =
      Se.IX2Easings =
      Se.IX2EasingUtils =
      Se.IX2BrowserSupport =
        void 0;
    var ED = ur(($n(), Je(nh)));
    Se.IX2BrowserSupport = ED;
    var mD = ur((Oa(), Je(kr)));
    Se.IX2Easings = mD;
    var _D = ur((wa(), Je(lh)));
    Se.IX2EasingUtils = _D;
    var bD = ur((gh(), Je(ph)));
    Se.IX2ElementsReducer = bD;
    var TD = ur((Ma(), Je(bh)));
    Se.IX2VanillaPlugins = TD;
    var ID = ur((sy(), Je(ay)));
    Se.IX2VanillaUtils = ID;
  });
  var ui,
    dt,
    OD,
    wD,
    AD,
    xD,
    SD,
    RD,
    si,
    uy,
    CD,
    LD,
    Ba,
    ND,
    PD,
    qD,
    MD,
    cy,
    ly = de(() => {
      "use strict";
      Pe();
      (ui = ae(Pt())),
        (dt = ae(Wt())),
        ({
          IX2_RAW_DATA_IMPORTED: OD,
          IX2_SESSION_STOPPED: wD,
          IX2_INSTANCE_ADDED: AD,
          IX2_INSTANCE_STARTED: xD,
          IX2_INSTANCE_REMOVED: SD,
          IX2_ANIMATION_FRAME_CHANGED: RD,
        } = me),
        ({
          optimizeFloat: si,
          applyEasing: uy,
          createBezierEasing: CD,
        } = ui.IX2EasingUtils),
        ({ RENDER_GENERAL: LD } = Oe),
        ({
          getItemConfigByKey: Ba,
          getRenderType: ND,
          getStyleProp: PD,
        } = ui.IX2VanillaUtils),
        (qD = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: f,
              skipMotion: p,
              skipToValue: d,
            } = e,
            { parameters: h } = t.payload,
            E = Math.max(1 - s, 0.01),
            y = h[n];
          y == null && ((E = 1), (y = a));
          let _ = Math.max(y, 0) || 0,
            q = si(_ - r),
            I = p ? d : si(r + q * E),
            S = I * 100;
          if (I === r && e.current) return e;
          let w, L, P, N;
          for (let j = 0, { length: z } = i; j < z; j++) {
            let { keyframe: Q, actionItems: U } = i[j];
            if ((j === 0 && (w = U[0]), S >= Q)) {
              w = U[0];
              let O = i[j + 1],
                v = O && S !== Q;
              (L = v ? O.actionItems[0] : null),
                v && ((P = Q / 100), (N = (O.keyframe - Q) / 100));
            }
          }
          let B = {};
          if (w && !L)
            for (let j = 0, { length: z } = o; j < z; j++) {
              let Q = o[j];
              B[Q] = Ba(u, Q, w.config);
            }
          else if (w && L && P !== void 0 && N !== void 0) {
            let j = (I - P) / N,
              z = w.config.easing,
              Q = uy(z, j, f);
            for (let U = 0, { length: O } = o; U < O; U++) {
              let v = o[U],
                R = Ba(u, v, w.config),
                Z = (Ba(u, v, L.config) - R) * Q + R;
              B[v] = Z;
            }
          }
          return (0, dt.merge)(e, { position: I, current: B });
        }),
        (MD = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: f,
              destinationKeys: p,
              pluginDuration: d,
              instanceDelay: h,
              customEasingFn: E,
              skipMotion: y,
            } = e,
            _ = u.config.easing,
            { duration: q, delay: I } = u.config;
          d != null && (q = d),
            (I = h ?? I),
            s === LD ? (q = 0) : (o || y) && (q = I = 0);
          let { now: S } = t.payload;
          if (r && n) {
            let w = S - (i + I);
            if (a) {
              let j = S - i,
                z = q + I,
                Q = si(Math.min(Math.max(0, j / z), 1));
              e = (0, dt.set)(e, "verboseTimeElapsed", z * Q);
            }
            if (w < 0) return e;
            let L = si(Math.min(Math.max(0, w / q), 1)),
              P = uy(_, L, E),
              N = {},
              B = null;
            return (
              p.length &&
                (B = p.reduce((j, z) => {
                  let Q = f[z],
                    U = parseFloat(n[z]) || 0,
                    v = (parseFloat(Q) - U) * P + U;
                  return (j[z] = v), j;
                }, {})),
              (N.current = B),
              (N.position = L),
              L === 1 && ((N.active = !1), (N.complete = !0)),
              (0, dt.merge)(e, N)
            );
          }
          return e;
        }),
        (cy = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case OD:
              return t.payload.ixInstances || Object.freeze({});
            case wD:
              return Object.freeze({});
            case AD: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: f,
                  isCarrier: p,
                  origin: d,
                  destination: h,
                  immediate: E,
                  verbose: y,
                  continuous: _,
                  parameterId: q,
                  actionGroups: I,
                  smoothing: S,
                  restingValue: w,
                  pluginInstance: L,
                  pluginDuration: P,
                  instanceDelay: N,
                  skipMotion: B,
                  skipToValue: j,
                } = t.payload,
                { actionTypeId: z } = i,
                Q = ND(z),
                U = PD(Q, z),
                O = Object.keys(h).filter(
                  (R) => h[R] != null && typeof h[R] != "string"
                ),
                { easing: v } = i.config;
              return (0, dt.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: d,
                destination: h,
                destinationKeys: O,
                immediate: E,
                verbose: y,
                current: null,
                actionItem: i,
                actionTypeId: z,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: f,
                renderType: Q,
                isCarrier: p,
                styleProp: U,
                continuous: _,
                parameterId: q,
                actionGroups: I,
                smoothing: S,
                restingValue: w,
                pluginInstance: L,
                pluginDuration: P,
                instanceDelay: N,
                skipMotion: B,
                skipToValue: j,
                customEasingFn:
                  Array.isArray(v) && v.length === 4 ? CD(v) : void 0,
              });
            }
            case xD: {
              let { instanceId: r, time: n } = t.payload;
              return (0, dt.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case SD: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== r && (n[a] = e[a]);
              }
              return n;
            }
            case RD: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let s = n[o],
                  a = e[s],
                  u = a.continuous ? qD : MD;
                r = (0, dt.set)(r, s, u(a, t));
              }
              return r;
            }
            default:
              return e;
          }
        });
    });
  var DD,
    FD,
    GD,
    fy,
    dy = de(() => {
      "use strict";
      Pe();
      ({
        IX2_RAW_DATA_IMPORTED: DD,
        IX2_SESSION_STOPPED: FD,
        IX2_PARAMETER_CHANGED: GD,
      } = me),
        (fy = (e = {}, t) => {
          switch (t.type) {
            case DD:
              return t.payload.ixParameters || {};
            case FD:
              return {};
            case GD: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        });
    });
  var vy = {};
  Le(vy, { default: () => VD });
  var py,
    gy,
    UD,
    VD,
    hy = de(() => {
      "use strict";
      py = ae(Xo());
      Sf();
      Yf();
      Zf();
      gy = ae(Pt());
      ly();
      dy();
      ({ ixElements: UD } = gy.IX2ElementsReducer),
        (VD = (0, py.combineReducers)({
          ixData: xf,
          ixRequest: Kf,
          ixSession: Qf,
          ixElements: UD,
          ixInstances: cy,
          ixParameters: fy,
        }));
    });
  var Ey = c((HB, yy) => {
    var kD = Et(),
      HD = be(),
      XD = ct(),
      WD = "[object String]";
    function BD(e) {
      return typeof e == "string" || (!HD(e) && XD(e) && kD(e) == WD);
    }
    yy.exports = BD;
  });
  var _y = c((XB, my) => {
    var jD = ya(),
      zD = jD("length");
    my.exports = zD;
  });
  var Ty = c((WB, by) => {
    var KD = "\\ud800-\\udfff",
      YD = "\\u0300-\\u036f",
      $D = "\\ufe20-\\ufe2f",
      QD = "\\u20d0-\\u20ff",
      ZD = YD + $D + QD,
      JD = "\\ufe0e\\ufe0f",
      eF = "\\u200d",
      tF = RegExp("[" + eF + KD + ZD + JD + "]");
    function rF(e) {
      return tF.test(e);
    }
    by.exports = rF;
  });
  var Ly = c((BB, Cy) => {
    var Oy = "\\ud800-\\udfff",
      nF = "\\u0300-\\u036f",
      iF = "\\ufe20-\\ufe2f",
      oF = "\\u20d0-\\u20ff",
      aF = nF + iF + oF,
      sF = "\\ufe0e\\ufe0f",
      uF = "[" + Oy + "]",
      ja = "[" + aF + "]",
      za = "\\ud83c[\\udffb-\\udfff]",
      cF = "(?:" + ja + "|" + za + ")",
      wy = "[^" + Oy + "]",
      Ay = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      xy = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      lF = "\\u200d",
      Sy = cF + "?",
      Ry = "[" + sF + "]?",
      fF = "(?:" + lF + "(?:" + [wy, Ay, xy].join("|") + ")" + Ry + Sy + ")*",
      dF = Ry + Sy + fF,
      pF = "(?:" + [wy + ja + "?", ja, Ay, xy, uF].join("|") + ")",
      Iy = RegExp(za + "(?=" + za + ")|" + pF + dF, "g");
    function gF(e) {
      for (var t = (Iy.lastIndex = 0); Iy.test(e); ) ++t;
      return t;
    }
    Cy.exports = gF;
  });
  var Py = c((jB, Ny) => {
    var vF = _y(),
      hF = Ty(),
      yF = Ly();
    function EF(e) {
      return hF(e) ? yF(e) : vF(e);
    }
    Ny.exports = EF;
  });
  var My = c((zB, qy) => {
    var mF = Vn(),
      _F = kn(),
      bF = St(),
      TF = Ey(),
      IF = Py(),
      OF = "[object Map]",
      wF = "[object Set]";
    function AF(e) {
      if (e == null) return 0;
      if (bF(e)) return TF(e) ? IF(e) : e.length;
      var t = _F(e);
      return t == OF || t == wF ? e.size : mF(e).length;
    }
    qy.exports = AF;
  });
  var Fy = c((KB, Dy) => {
    var xF = "Expected a function";
    function SF(e) {
      if (typeof e != "function") throw new TypeError(xF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Dy.exports = SF;
  });
  var Ka = c((YB, Gy) => {
    var RF = mt(),
      CF = (function () {
        try {
          var e = RF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Gy.exports = CF;
  });
  var Ya = c(($B, Vy) => {
    var Uy = Ka();
    function LF(e, t, r) {
      t == "__proto__" && Uy
        ? Uy(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Vy.exports = LF;
  });
  var Hy = c((QB, ky) => {
    var NF = Ya(),
      PF = Cn(),
      qF = Object.prototype,
      MF = qF.hasOwnProperty;
    function DF(e, t, r) {
      var n = e[t];
      (!(MF.call(e, t) && PF(n, r)) || (r === void 0 && !(t in e))) &&
        NF(e, t, r);
    }
    ky.exports = DF;
  });
  var By = c((ZB, Wy) => {
    var FF = Hy(),
      GF = Gr(),
      UF = Dn(),
      Xy = it(),
      VF = Zt();
    function kF(e, t, r, n) {
      if (!Xy(e)) return e;
      t = GF(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = VF(t[i]),
          f = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var p = a[u];
          (f = n ? n(p, u, a) : void 0),
            f === void 0 && (f = Xy(p) ? p : UF(t[i + 1]) ? [] : {});
        }
        FF(a, u, f), (a = a[u]);
      }
      return e;
    }
    Wy.exports = kF;
  });
  var zy = c((JB, jy) => {
    var HF = Wn(),
      XF = By(),
      WF = Gr();
    function BF(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = HF(e, s);
        r(a, s) && XF(o, WF(s, e), a);
      }
      return o;
    }
    jy.exports = BF;
  });
  var Yy = c((ej, Ky) => {
    var jF = qn(),
      zF = Co(),
      KF = ra(),
      YF = ta(),
      $F = Object.getOwnPropertySymbols,
      QF = $F
        ? function (e) {
            for (var t = []; e; ) jF(t, KF(e)), (e = zF(e));
            return t;
          }
        : YF;
    Ky.exports = QF;
  });
  var Qy = c((tj, $y) => {
    function ZF(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    $y.exports = ZF;
  });
  var Jy = c((rj, Zy) => {
    var JF = it(),
      e2 = Un(),
      t2 = Qy(),
      r2 = Object.prototype,
      n2 = r2.hasOwnProperty;
    function i2(e) {
      if (!JF(e)) return t2(e);
      var t = e2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !n2.call(e, n))) || r.push(n);
      return r;
    }
    Zy.exports = i2;
  });
  var tE = c((nj, eE) => {
    var o2 = ia(),
      a2 = Jy(),
      s2 = St();
    function u2(e) {
      return s2(e) ? o2(e, !0) : a2(e);
    }
    eE.exports = u2;
  });
  var nE = c((ij, rE) => {
    var c2 = ea(),
      l2 = Yy(),
      f2 = tE();
    function d2(e) {
      return c2(e, f2, l2);
    }
    rE.exports = d2;
  });
  var oE = c((oj, iE) => {
    var p2 = ha(),
      g2 = _t(),
      v2 = zy(),
      h2 = nE();
    function y2(e, t) {
      if (e == null) return {};
      var r = p2(h2(e), function (n) {
        return [n];
      });
      return (
        (t = g2(t)),
        v2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    iE.exports = y2;
  });
  var sE = c((aj, aE) => {
    var E2 = _t(),
      m2 = Fy(),
      _2 = oE();
    function b2(e, t) {
      return _2(e, m2(E2(t)));
    }
    aE.exports = b2;
  });
  var cE = c((sj, uE) => {
    var T2 = Vn(),
      I2 = kn(),
      O2 = Nr(),
      w2 = be(),
      A2 = St(),
      x2 = Mn(),
      S2 = Un(),
      R2 = Gn(),
      C2 = "[object Map]",
      L2 = "[object Set]",
      N2 = Object.prototype,
      P2 = N2.hasOwnProperty;
    function q2(e) {
      if (e == null) return !0;
      if (
        A2(e) &&
        (w2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          x2(e) ||
          R2(e) ||
          O2(e))
      )
        return !e.length;
      var t = I2(e);
      if (t == C2 || t == L2) return !e.size;
      if (S2(e)) return !T2(e).length;
      for (var r in e) if (P2.call(e, r)) return !1;
      return !0;
    }
    uE.exports = q2;
  });
  var fE = c((uj, lE) => {
    var M2 = Ya(),
      D2 = Da(),
      F2 = _t();
    function G2(e, t) {
      var r = {};
      return (
        (t = F2(t, 3)),
        D2(e, function (n, i, o) {
          M2(r, i, t(n, i, o));
        }),
        r
      );
    }
    lE.exports = G2;
  });
  var pE = c((cj, dE) => {
    function U2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    dE.exports = U2;
  });
  var vE = c((lj, gE) => {
    var V2 = jn();
    function k2(e) {
      return typeof e == "function" ? e : V2;
    }
    gE.exports = k2;
  });
  var yE = c((fj, hE) => {
    var H2 = pE(),
      X2 = Fa(),
      W2 = vE(),
      B2 = be();
    function j2(e, t) {
      var r = B2(e) ? H2 : X2;
      return r(e, W2(t));
    }
    hE.exports = j2;
  });
  var mE = c((dj, EE) => {
    var z2 = Be(),
      K2 = function () {
        return z2.Date.now();
      };
    EE.exports = K2;
  });
  var TE = c((pj, bE) => {
    var Y2 = it(),
      $a = mE(),
      _E = zn(),
      $2 = "Expected a function",
      Q2 = Math.max,
      Z2 = Math.min;
    function J2(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        u,
        f = 0,
        p = !1,
        d = !1,
        h = !0;
      if (typeof e != "function") throw new TypeError($2);
      (t = _E(t) || 0),
        Y2(r) &&
          ((p = !!r.leading),
          (d = "maxWait" in r),
          (o = d ? Q2(_E(r.maxWait) || 0, t) : o),
          (h = "trailing" in r ? !!r.trailing : h));
      function E(N) {
        var B = n,
          j = i;
        return (n = i = void 0), (f = N), (s = e.apply(j, B)), s;
      }
      function y(N) {
        return (f = N), (a = setTimeout(I, t)), p ? E(N) : s;
      }
      function _(N) {
        var B = N - u,
          j = N - f,
          z = t - B;
        return d ? Z2(z, o - j) : z;
      }
      function q(N) {
        var B = N - u,
          j = N - f;
        return u === void 0 || B >= t || B < 0 || (d && j >= o);
      }
      function I() {
        var N = $a();
        if (q(N)) return S(N);
        a = setTimeout(I, _(N));
      }
      function S(N) {
        return (a = void 0), h && n ? E(N) : ((n = i = void 0), s);
      }
      function w() {
        a !== void 0 && clearTimeout(a), (f = 0), (n = u = i = a = void 0);
      }
      function L() {
        return a === void 0 ? s : S($a());
      }
      function P() {
        var N = $a(),
          B = q(N);
        if (((n = arguments), (i = this), (u = N), B)) {
          if (a === void 0) return y(u);
          if (d) return clearTimeout(a), (a = setTimeout(I, t)), E(u);
        }
        return a === void 0 && (a = setTimeout(I, t)), s;
      }
      return (P.cancel = w), (P.flush = L), P;
    }
    bE.exports = J2;
  });
  var OE = c((gj, IE) => {
    var eG = TE(),
      tG = it(),
      rG = "Expected a function";
    function nG(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(rG);
      return (
        tG(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        eG(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    IE.exports = nG;
  });
  var AE = {};
  Le(AE, {
    actionListPlaybackChanged: () => lr,
    animationFrameChanged: () => li,
    clearRequested: () => SG,
    elementStateChanged: () => is,
    eventListenerAdded: () => ci,
    eventStateChanged: () => ts,
    instanceAdded: () => rs,
    instanceRemoved: () => ns,
    instanceStarted: () => fi,
    mediaQueriesDefined: () => as,
    parameterChanged: () => cr,
    playbackRequested: () => AG,
    previewRequested: () => wG,
    rawDataImported: () => Qa,
    sessionInitialized: () => Za,
    sessionStarted: () => Ja,
    sessionStopped: () => es,
    stopRequested: () => xG,
    testFrameRendered: () => RG,
    viewportWidthChanged: () => os,
  });
  var wE,
    iG,
    oG,
    aG,
    sG,
    uG,
    cG,
    lG,
    fG,
    dG,
    pG,
    gG,
    vG,
    hG,
    yG,
    EG,
    mG,
    _G,
    bG,
    TG,
    IG,
    OG,
    Qa,
    Za,
    Ja,
    es,
    wG,
    AG,
    xG,
    SG,
    ci,
    RG,
    ts,
    li,
    cr,
    rs,
    fi,
    ns,
    is,
    lr,
    os,
    as,
    di = de(() => {
      "use strict";
      Pe();
      (wE = ae(Pt())),
        ({
          IX2_RAW_DATA_IMPORTED: iG,
          IX2_SESSION_INITIALIZED: oG,
          IX2_SESSION_STARTED: aG,
          IX2_SESSION_STOPPED: sG,
          IX2_PREVIEW_REQUESTED: uG,
          IX2_PLAYBACK_REQUESTED: cG,
          IX2_STOP_REQUESTED: lG,
          IX2_CLEAR_REQUESTED: fG,
          IX2_EVENT_LISTENER_ADDED: dG,
          IX2_TEST_FRAME_RENDERED: pG,
          IX2_EVENT_STATE_CHANGED: gG,
          IX2_ANIMATION_FRAME_CHANGED: vG,
          IX2_PARAMETER_CHANGED: hG,
          IX2_INSTANCE_ADDED: yG,
          IX2_INSTANCE_STARTED: EG,
          IX2_INSTANCE_REMOVED: mG,
          IX2_ELEMENT_STATE_CHANGED: _G,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: bG,
          IX2_VIEWPORT_WIDTH_CHANGED: TG,
          IX2_MEDIA_QUERIES_DEFINED: IG,
        } = me),
        ({ reifyState: OG } = wE.IX2VanillaUtils),
        (Qa = (e) => ({ type: iG, payload: { ...OG(e) } })),
        (Za = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: oG,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Ja = () => ({ type: aG })),
        (es = () => ({ type: sG })),
        (wG = ({ rawData: e, defer: t }) => ({
          type: uG,
          payload: { defer: t, rawData: e },
        })),
        (AG = ({
          actionTypeId: e = Ne.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: cG,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: s,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (xG = (e) => ({ type: lG, payload: { actionListId: e } })),
        (SG = () => ({ type: fG })),
        (ci = (e, t) => ({
          type: dG,
          payload: { target: e, listenerParams: t },
        })),
        (RG = (e = 1) => ({ type: pG, payload: { step: e } })),
        (ts = (e, t) => ({ type: gG, payload: { stateKey: e, newState: t } })),
        (li = (e, t) => ({ type: vG, payload: { now: e, parameters: t } })),
        (cr = (e, t) => ({ type: hG, payload: { key: e, value: t } })),
        (rs = (e) => ({ type: yG, payload: { ...e } })),
        (fi = (e, t) => ({ type: EG, payload: { instanceId: e, time: t } })),
        (ns = (e) => ({ type: mG, payload: { instanceId: e } })),
        (is = (e, t, r, n) => ({
          type: _G,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (lr = ({ actionListId: e, isPlaying: t }) => ({
          type: bG,
          payload: { actionListId: e, isPlaying: t },
        })),
        (os = ({ width: e, mediaQueries: t }) => ({
          type: TG,
          payload: { width: e, mediaQueries: t },
        })),
        (as = () => ({ type: IG }));
    });
  var Re = {};
  Le(Re, {
    elementContains: () => cs,
    getChildElements: () => UG,
    getClosestElement: () => Yr,
    getProperty: () => qG,
    getQuerySelector: () => us,
    getRefType: () => ls,
    getSiblingElements: () => VG,
    getStyle: () => PG,
    getValidDocument: () => DG,
    isSiblingNode: () => GG,
    matchSelector: () => MG,
    queryDocument: () => FG,
    setStyle: () => NG,
  });
  function NG(e, t, r) {
    e.style[t] = r;
  }
  function PG(e, t) {
    return e.style[t];
  }
  function qG(e, t) {
    return e[t];
  }
  function MG(e) {
    return (t) => t[ss](e);
  }
  function us({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(xE) !== -1) {
        let n = e.split(xE),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(RE)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function DG(e) {
    return e == null || e === document.documentElement.getAttribute(RE)
      ? document
      : null;
  }
  function FG(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function cs(e, t) {
    return e.contains(t);
  }
  function GG(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function UG(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function VG(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function ls(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? CG
        : LG
      : null;
  }
  var SE,
    ss,
    xE,
    CG,
    LG,
    RE,
    Yr,
    CE = de(() => {
      "use strict";
      SE = ae(Pt());
      Pe();
      ({ ELEMENT_MATCHES: ss } = SE.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: xE,
          HTML_ELEMENT: CG,
          PLAIN_OBJECT: LG,
          WF_PAGE: RE,
        } = Oe);
      Yr = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[ss] && r[ss](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var fs = c((yj, NE) => {
    var kG = it(),
      LE = Object.create,
      HG = (function () {
        function e() {}
        return function (t) {
          if (!kG(t)) return {};
          if (LE) return LE(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    NE.exports = HG;
  });
  var pi = c((Ej, PE) => {
    function XG() {}
    PE.exports = XG;
  });
  var vi = c((mj, qE) => {
    var WG = fs(),
      BG = pi();
    function gi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    gi.prototype = WG(BG.prototype);
    gi.prototype.constructor = gi;
    qE.exports = gi;
  });
  var GE = c((_j, FE) => {
    var ME = kt(),
      jG = Nr(),
      zG = be(),
      DE = ME ? ME.isConcatSpreadable : void 0;
    function KG(e) {
      return zG(e) || jG(e) || !!(DE && e && e[DE]);
    }
    FE.exports = KG;
  });
  var kE = c((bj, VE) => {
    var YG = qn(),
      $G = GE();
    function UE(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = $G), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? UE(a, t - 1, r, n, i)
            : YG(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    VE.exports = UE;
  });
  var XE = c((Tj, HE) => {
    var QG = kE();
    function ZG(e) {
      var t = e == null ? 0 : e.length;
      return t ? QG(e, 1) : [];
    }
    HE.exports = ZG;
  });
  var BE = c((Ij, WE) => {
    function JG(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    WE.exports = JG;
  });
  var KE = c((Oj, zE) => {
    var eU = BE(),
      jE = Math.max;
    function tU(e, t, r) {
      return (
        (t = jE(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = jE(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return (a[t] = r(s)), eU(e, this, a);
        }
      );
    }
    zE.exports = tU;
  });
  var $E = c((wj, YE) => {
    function rU(e) {
      return function () {
        return e;
      };
    }
    YE.exports = rU;
  });
  var JE = c((Aj, ZE) => {
    var nU = $E(),
      QE = Ka(),
      iU = jn(),
      oU = QE
        ? function (e, t) {
            return QE(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: nU(t),
              writable: !0,
            });
          }
        : iU;
    ZE.exports = oU;
  });
  var tm = c((xj, em) => {
    var aU = 800,
      sU = 16,
      uU = Date.now;
    function cU(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = uU(),
          i = sU - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= aU) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    em.exports = cU;
  });
  var nm = c((Sj, rm) => {
    var lU = JE(),
      fU = tm(),
      dU = fU(lU);
    rm.exports = dU;
  });
  var om = c((Rj, im) => {
    var pU = XE(),
      gU = KE(),
      vU = nm();
    function hU(e) {
      return vU(gU(e, void 0, pU), e + "");
    }
    im.exports = hU;
  });
  var um = c((Cj, sm) => {
    var am = oa(),
      yU = am && new am();
    sm.exports = yU;
  });
  var lm = c((Lj, cm) => {
    function EU() {}
    cm.exports = EU;
  });
  var ds = c((Nj, dm) => {
    var fm = um(),
      mU = lm(),
      _U = fm
        ? function (e) {
            return fm.get(e);
          }
        : mU;
    dm.exports = _U;
  });
  var gm = c((Pj, pm) => {
    var bU = {};
    pm.exports = bU;
  });
  var ps = c((qj, hm) => {
    var vm = gm(),
      TU = Object.prototype,
      IU = TU.hasOwnProperty;
    function OU(e) {
      for (
        var t = e.name + "", r = vm[t], n = IU.call(vm, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    hm.exports = OU;
  });
  var yi = c((Mj, ym) => {
    var wU = fs(),
      AU = pi(),
      xU = 4294967295;
    function hi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = xU),
        (this.__views__ = []);
    }
    hi.prototype = wU(AU.prototype);
    hi.prototype.constructor = hi;
    ym.exports = hi;
  });
  var mm = c((Dj, Em) => {
    function SU(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    Em.exports = SU;
  });
  var bm = c((Fj, _m) => {
    var RU = yi(),
      CU = vi(),
      LU = mm();
    function NU(e) {
      if (e instanceof RU) return e.clone();
      var t = new CU(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = LU(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    _m.exports = NU;
  });
  var Om = c((Gj, Im) => {
    var PU = yi(),
      Tm = vi(),
      qU = pi(),
      MU = be(),
      DU = ct(),
      FU = bm(),
      GU = Object.prototype,
      UU = GU.hasOwnProperty;
    function Ei(e) {
      if (DU(e) && !MU(e) && !(e instanceof PU)) {
        if (e instanceof Tm) return e;
        if (UU.call(e, "__wrapped__")) return FU(e);
      }
      return new Tm(e);
    }
    Ei.prototype = qU.prototype;
    Ei.prototype.constructor = Ei;
    Im.exports = Ei;
  });
  var Am = c((Uj, wm) => {
    var VU = yi(),
      kU = ds(),
      HU = ps(),
      XU = Om();
    function WU(e) {
      var t = HU(e),
        r = XU[t];
      if (typeof r != "function" || !(t in VU.prototype)) return !1;
      if (e === r) return !0;
      var n = kU(r);
      return !!n && e === n[0];
    }
    wm.exports = WU;
  });
  var Cm = c((Vj, Rm) => {
    var xm = vi(),
      BU = om(),
      jU = ds(),
      gs = ps(),
      zU = be(),
      Sm = Am(),
      KU = "Expected a function",
      YU = 8,
      $U = 32,
      QU = 128,
      ZU = 256;
    function JU(e) {
      return BU(function (t) {
        var r = t.length,
          n = r,
          i = xm.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(KU);
          if (i && !s && gs(o) == "wrapper") var s = new xm([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = gs(o),
            u = a == "wrapper" ? jU(o) : void 0;
          u &&
          Sm(u[0]) &&
          u[1] == (QU | YU | $U | ZU) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[gs(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && Sm(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var f = arguments,
            p = f[0];
          if (s && f.length == 1 && zU(p)) return s.plant(p).value();
          for (var d = 0, h = r ? t[d].apply(this, f) : p; ++d < r; )
            h = t[d].call(this, h);
          return h;
        };
      });
    }
    Rm.exports = JU;
  });
  var Nm = c((kj, Lm) => {
    var eV = Cm(),
      tV = eV();
    Lm.exports = tV;
  });
  var qm = c((Hj, Pm) => {
    function rV(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    Pm.exports = rV;
  });
  var Dm = c((Xj, Mm) => {
    var nV = qm(),
      vs = zn();
    function iV(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = vs(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = vs(t)), (t = t === t ? t : 0)),
        nV(vs(e), t, r)
      );
    }
    Mm.exports = iV;
  });
  var Bm,
    jm,
    zm,
    Km,
    oV,
    aV,
    sV,
    uV,
    cV,
    lV,
    fV,
    dV,
    pV,
    gV,
    vV,
    hV,
    yV,
    EV,
    mV,
    Ym,
    $m,
    _V,
    bV,
    TV,
    Qm,
    IV,
    OV,
    Zm,
    wV,
    hs,
    Jm,
    Fm,
    Gm,
    e_,
    Qr,
    AV,
    st,
    t_,
    xV,
    Me,
    Ke,
    Zr,
    r_,
    ys,
    Um,
    Es,
    SV,
    $r,
    RV,
    CV,
    LV,
    n_,
    Vm,
    NV,
    km,
    PV,
    qV,
    MV,
    Hm,
    mi,
    _i,
    Xm,
    Wm,
    i_,
    o_ = de(() => {
      "use strict";
      (Bm = ae(Nm())), (jm = ae(Bn())), (zm = ae(Dm()));
      Pe();
      ms();
      di();
      (Km = ae(Pt())),
        ({
          MOUSE_CLICK: oV,
          MOUSE_SECOND_CLICK: aV,
          MOUSE_DOWN: sV,
          MOUSE_UP: uV,
          MOUSE_OVER: cV,
          MOUSE_OUT: lV,
          DROPDOWN_CLOSE: fV,
          DROPDOWN_OPEN: dV,
          SLIDER_ACTIVE: pV,
          SLIDER_INACTIVE: gV,
          TAB_ACTIVE: vV,
          TAB_INACTIVE: hV,
          NAVBAR_CLOSE: yV,
          NAVBAR_OPEN: EV,
          MOUSE_MOVE: mV,
          PAGE_SCROLL_DOWN: Ym,
          SCROLL_INTO_VIEW: $m,
          SCROLL_OUT_OF_VIEW: _V,
          PAGE_SCROLL_UP: bV,
          SCROLLING_IN_VIEW: TV,
          PAGE_FINISH: Qm,
          ECOMMERCE_CART_CLOSE: IV,
          ECOMMERCE_CART_OPEN: OV,
          PAGE_START: Zm,
          PAGE_SCROLL: wV,
        } = je),
        (hs = "COMPONENT_ACTIVE"),
        (Jm = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Fm } = Oe),
        ({ getNamespacedParameterId: Gm } = Km.IX2VanillaUtils),
        (e_ = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (Qr = e_(({ element: e, nativeEvent: t }) => e === t.target)),
        (AV = e_(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (st = (0, Bm.default)([Qr, AV])),
        (t_ = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !SV[i.eventTypeId]) return i;
          }
          return null;
        }),
        (xV = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!t_(e, n);
        }),
        (Me = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            f = t_(e, u);
          return (
            f &&
              fr({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + Fm + n.split(Fm)[1],
                actionListId: (0, jm.default)(f, "action.config.actionListId"),
              }),
            fr({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            Jr({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            i
          );
        }),
        (Ke = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
        (Zr = { handler: Ke(st, Me) }),
        (r_ = { ...Zr, types: [hs, Jm].join(" ") }),
        (ys = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Um = "mouseover mouseout"),
        (Es = { types: ys }),
        (SV = { PAGE_START: Zm, PAGE_FINISH: Qm }),
        ($r = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, zm.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (RV = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (CV = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(r === "mouseout" && o && s);
        }),
        (LV = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = $r(),
            o = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return RV(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: i - u,
          });
        }),
        (n_ = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [hs, Jm].indexOf(n) !== -1 ? n === hs : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (Vm = (e) => (t, r) => {
          let n = { elementHovered: CV(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (NV = (e) => (t, r) => {
          let n = { ...r, elementVisible: LV(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (km =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = $r(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: f } = s,
              p = f === "PX",
              d = i - o,
              h = Number((n / d).toFixed(2));
            if (r && r.percentTop === h) return r;
            let E = (p ? u : (o * (u || 0)) / 100) / d,
              y,
              _,
              q = 0;
            r &&
              ((y = h > r.percentTop),
              (_ = r.scrollingDown !== y),
              (q = _ ? h : r.anchorTop));
            let I = a === Ym ? h >= q + E : h <= q - E,
              S = {
                ...r,
                percentTop: h,
                inBounds: I,
                anchorTop: q,
                scrollingDown: y,
              };
            return (r && I && (_ || S.inBounds !== r.inBounds) && e(t, S)) || S;
          }),
        (PV = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (qV = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        }),
        (MV = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        }),
        (Hm =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (mi = (e = !0) => ({
          ...r_,
          handler: Ke(
            e ? st : Qr,
            n_((t, r) => (r.isActive ? Zr.handler(t, r) : r))
          ),
        })),
        (_i = (e = !0) => ({
          ...r_,
          handler: Ke(
            e ? st : Qr,
            n_((t, r) => (r.isActive ? r : Zr.handler(t, r)))
          ),
        })),
        (Xm = {
          ...Es,
          handler: NV((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === $m) === r
              ? (Me(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (Wm = 0.05),
        (i_ = {
          [pV]: mi(),
          [gV]: _i(),
          [dV]: mi(),
          [fV]: _i(),
          [EV]: mi(!1),
          [yV]: _i(!1),
          [vV]: mi(),
          [hV]: _i(),
          [OV]: { types: "ecommerce-cart-open", handler: Ke(st, Me) },
          [IV]: { types: "ecommerce-cart-close", handler: Ke(st, Me) },
          [oV]: {
            types: "click",
            handler: Ke(
              st,
              Hm((e, { clickCount: t }) => {
                xV(e) ? t === 1 && Me(e) : Me(e);
              })
            ),
          },
          [aV]: {
            types: "click",
            handler: Ke(
              st,
              Hm((e, { clickCount: t }) => {
                t === 2 && Me(e);
              })
            ),
          },
          [sV]: { ...Zr, types: "mousedown" },
          [uV]: { ...Zr, types: "mouseup" },
          [cV]: {
            types: Um,
            handler: Ke(
              st,
              Vm((e, t) => {
                t.elementHovered && Me(e);
              })
            ),
          },
          [lV]: {
            types: Um,
            handler: Ke(
              st,
              Vm((e, t) => {
                t.elementHovered || Me(e);
              })
            ),
          },
          [mV]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: f,
                  restingState: p = 0,
                } = r,
                {
                  clientX: d = o.clientX,
                  clientY: h = o.clientY,
                  pageX: E = o.pageX,
                  pageY: y = o.pageY,
                } = n,
                _ = a === "X_AXIS",
                q = n.type === "mouseout",
                I = p / 100,
                S = u,
                w = !1;
              switch (s) {
                case nt.VIEWPORT: {
                  I = _
                    ? Math.min(d, window.innerWidth) / window.innerWidth
                    : Math.min(h, window.innerHeight) / window.innerHeight;
                  break;
                }
                case nt.PAGE: {
                  let {
                    scrollLeft: L,
                    scrollTop: P,
                    scrollWidth: N,
                    scrollHeight: B,
                  } = $r();
                  I = _ ? Math.min(L + E, N) / N : Math.min(P + y, B) / B;
                  break;
                }
                case nt.ELEMENT:
                default: {
                  S = Gm(i, u);
                  let L = n.type.indexOf("mouse") === 0;
                  if (L && st({ element: t, nativeEvent: n }) !== !0) break;
                  let P = t.getBoundingClientRect(),
                    { left: N, top: B, width: j, height: z } = P;
                  if (!L && !PV({ left: d, top: h }, P)) break;
                  (w = !0), (I = _ ? (d - N) / j : (h - B) / z);
                  break;
                }
              }
              return (
                q && (I > 1 - Wm || I < Wm) && (I = Math.round(I)),
                (s !== nt.ELEMENT || w || w !== o.elementHovered) &&
                  ((I = f ? 1 - I : I), e.dispatch(cr(S, I))),
                {
                  elementHovered: w,
                  clientX: d,
                  clientY: h,
                  pageX: E,
                  pageY: y,
                }
              );
            },
          },
          [wV]: {
            types: ys,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = $r(),
                a = i / (o - s);
              (a = n ? 1 - a : a), e.dispatch(cr(r, a));
            },
          },
          [TV]: {
            types: ys,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: f,
                } = $r(),
                {
                  basedOn: p,
                  selectedAxis: d,
                  continuousParameterGroupId: h,
                  startsEntering: E,
                  startsExiting: y,
                  addEndOffset: _,
                  addStartOffset: q,
                  addOffsetValue: I = 0,
                  endOffsetValue: S = 0,
                } = r,
                w = d === "X_AXIS";
              if (p === nt.VIEWPORT) {
                let L = w ? o / a : s / u;
                return (
                  L !== i.scrollPercent && t.dispatch(cr(h, L)),
                  { scrollPercent: L }
                );
              } else {
                let L = Gm(n, h),
                  P = e.getBoundingClientRect(),
                  N = (q ? I : 0) / 100,
                  B = (_ ? S : 0) / 100;
                (N = E ? N : 1 - N), (B = y ? B : 1 - B);
                let j = P.top + Math.min(P.height * N, f),
                  Q = P.top + P.height * B - j,
                  U = Math.min(f + Q, u),
                  v = Math.min(Math.max(0, f - j), U) / U;
                return (
                  v !== i.scrollPercent && t.dispatch(cr(L, v)),
                  { scrollPercent: v }
                );
              }
            },
          },
          [$m]: Xm,
          [_V]: Xm,
          [Ym]: {
            ...Es,
            handler: km((e, t) => {
              t.scrollingDown && Me(e);
            }),
          },
          [bV]: {
            ...Es,
            handler: km((e, t) => {
              t.scrollingDown || Me(e);
            }),
          },
          [Qm]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ke(Qr, qV(Me)),
          },
          [Zm]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ke(Qr, MV(Me)),
          },
        });
    });
  var T_ = {};
  Le(T_, {
    observeRequests: () => tk,
    startActionGroup: () => Jr,
    startEngine: () => Ai,
    stopActionGroup: () => fr,
    stopAllActionGroups: () => m_,
    stopEngine: () => xi,
  });
  function tk(e) {
    qt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: ik }),
      qt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: ok }),
      qt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: ak }),
      qt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: sk });
  }
  function rk(e) {
    qt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        xi(e),
          v_({ store: e, elementApi: Re }),
          Ai({ store: e, allowEvents: !0 }),
          h_();
      },
    });
  }
  function nk(e, t) {
    let r = qt({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        t(n), r();
      },
    });
  }
  function ik({ rawData: e, defer: t }, r) {
    let n = () => {
      Ai({ store: r, rawData: e, allowEvents: !0 }), h_();
    };
    t ? setTimeout(n, 0) : n();
  }
  function h_() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function ok(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: f = !0,
      } = e,
      { rawData: p } = e;
    if (n && i && p && a) {
      let d = p.actionLists[n];
      d && (p = WV({ actionList: d, actionItemId: i, rawData: p }));
    }
    if (
      (Ai({ store: t, rawData: p, allowEvents: s, testManual: u }),
      (n && r === Ne.GENERAL_START_ACTION) || _s(r))
    ) {
      fr({ store: t, actionListId: n }),
        E_({ store: t, actionListId: n, eventId: o });
      let d = Jr({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: a,
        verbose: f,
      });
      f && d && t.dispatch(lr({ actionListId: n, isPlaying: !a }));
    }
  }
  function ak({ actionListId: e }, t) {
    e ? fr({ store: t, actionListId: e }) : m_({ store: t }), xi(t);
  }
  function sk(e, t) {
    xi(t), v_({ store: t, elementApi: Re });
  }
  function Ai({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(Qa(t)),
      i.active ||
        (e.dispatch(
          Za({
            hasBoundaryNodes: !!document.querySelector(Ti),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        r &&
          (pk(e), uk(), e.getState().ixSession.hasDefinedMediaQueries && rk(e)),
        e.dispatch(Ja()),
        ck(e, n));
  }
  function uk() {
    let { documentElement: e } = document;
    e.className.indexOf(a_) === -1 && (e.className += ` ${a_}`);
  }
  function ck(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(li(n, o)), t ? nk(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function xi(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      r.forEach(lk), KV(), e.dispatch(es());
    }
  }
  function lk({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function fk({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: f, ixSession: p } = e.getState(),
      { events: d } = f,
      h = d[n],
      { eventTypeId: E } = h,
      y = {},
      _ = {},
      q = [],
      { continuousActionGroups: I } = s,
      { id: S } = s;
    BV(E, i) && (S = jV(t, S));
    let w = p.hasBoundaryNodes && r ? Yr(r, Ti) : null;
    I.forEach((L) => {
      let { keyframe: P, actionItems: N } = L;
      N.forEach((B) => {
        let { actionTypeId: j } = B,
          { target: z } = B.config;
        if (!z) return;
        let Q = z.boundaryMode ? w : null,
          U = YV(z) + bs + j;
        if (((_[U] = dk(_[U], P, B)), !y[U])) {
          y[U] = !0;
          let { config: O } = B;
          Ii({
            config: O,
            event: h,
            eventTarget: r,
            elementRoot: Q,
            elementApi: Re,
          }).forEach((v) => {
            q.push({ element: v, key: U });
          });
        }
      });
    }),
      q.forEach(({ element: L, key: P }) => {
        let N = _[P],
          B = (0, pt.default)(N, "[0].actionItems[0]", {}),
          { actionTypeId: j } = B,
          z = wi(j) ? Is(j)(L, B) : null,
          Q = Ts({ element: L, actionItem: B, elementApi: Re }, z);
        Os({
          store: e,
          element: L,
          eventId: n,
          actionListId: o,
          actionItem: B,
          destination: Q,
          continuous: !0,
          parameterId: S,
          actionGroups: N,
          smoothing: a,
          restingValue: u,
          pluginInstance: z,
        });
      });
  }
  function dk(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function pk(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    y_(e),
      (0, dr.default)(r, (i, o) => {
        let s = i_[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        mk({ logic: s, store: e, events: i });
      });
    let { ixSession: n } = e.getState();
    n.eventListeners.length && vk(e);
  }
  function vk(e) {
    let t = () => {
      y_(e);
    };
    gk.forEach((r) => {
      window.addEventListener(r, t), e.dispatch(ci(window, [r, t]));
    }),
      t();
  }
  function y_(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(os({ width: n, mediaQueries: i }));
    }
  }
  function mk({ logic: e, store: t, events: r }) {
    _k(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = hk(r, Ek);
    if (!(0, c_.default)(a)) return;
    (0, dr.default)(a, (d, h) => {
      let E = r[h],
        { action: y, id: _, mediaQueries: q = o.mediaQueryKeys } = E,
        { actionListId: I } = y.config;
      $V(q, o.mediaQueryKeys) || t.dispatch(as()),
        y.actionTypeId === Ne.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(E.config) ? E.config : [E.config]).forEach((w) => {
            let { continuousParameterGroupId: L } = w,
              P = (0, pt.default)(s, `${I}.continuousParameterGroups`, []),
              N = (0, u_.default)(P, ({ id: z }) => z === L),
              B = (w.smoothing || 0) / 100,
              j = (w.restingState || 0) / 100;
            N &&
              d.forEach((z, Q) => {
                let U = _ + bs + Q;
                fk({
                  store: t,
                  eventStateKey: U,
                  eventTarget: z,
                  eventId: _,
                  eventConfig: w,
                  actionListId: I,
                  parameterGroup: N,
                  smoothing: B,
                  restingValue: j,
                });
              });
          }),
        (y.actionTypeId === Ne.GENERAL_START_ACTION || _s(y.actionTypeId)) &&
          E_({ store: t, actionListId: I, eventId: _ });
    });
    let u = (d) => {
        let { ixSession: h } = t.getState();
        yk(a, (E, y, _) => {
          let q = r[y],
            I = h.eventState[_],
            { action: S, mediaQueries: w = o.mediaQueryKeys } = q;
          if (!Oi(w, h.mediaQueryKey)) return;
          let L = (P = {}) => {
            let N = i(
              {
                store: t,
                element: E,
                event: q,
                eventConfig: P,
                nativeEvent: d,
                eventStateKey: _,
              },
              I
            );
            QV(N, I) || t.dispatch(ts(_, N));
          };
          S.actionTypeId === Ne.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(q.config) ? q.config : [q.config]).forEach(L)
            : L();
        });
      },
      f = (0, p_.default)(u, ek),
      p = ({ target: d = document, types: h, throttle: E }) => {
        h.split(" ")
          .filter(Boolean)
          .forEach((y) => {
            let _ = E ? f : u;
            d.addEventListener(y, _), t.dispatch(ci(d, [y, _]));
          });
      };
    Array.isArray(n) ? n.forEach(p) : typeof n == "string" && p(e);
  }
  function _k(e) {
    if (!JV) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        s = us(o);
      t[s] ||
        ((i === je.MOUSE_CLICK || i === je.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (r += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      (n.textContent = r), document.body.appendChild(n);
    }
  }
  function E_({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = n,
      a = s[r],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let f = (0, pt.default)(u, "actionItemGroups[0].actionItems", []),
        p = (0, pt.default)(a, "mediaQueries", n.mediaQueryKeys);
      if (!Oi(p, i.mediaQueryKey)) return;
      f.forEach((d) => {
        let { config: h, actionTypeId: E } = d,
          y =
            h?.target?.useEventTarget === !0 && h?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : h,
          _ = Ii({ config: y, event: a, elementApi: Re }),
          q = wi(E);
        _.forEach((I) => {
          let S = q ? Is(E)(I, d) : null;
          Os({
            destination: Ts({ element: I, actionItem: d, elementApi: Re }, S),
            immediate: !0,
            store: e,
            element: I,
            eventId: r,
            actionItem: d,
            actionListId: t,
            pluginInstance: S,
          });
        });
      });
    }
  }
  function m_({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, dr.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        ws(r, e), i && e.dispatch(lr({ actionListId: n, isPlaying: !1 }));
      }
    });
  }
  function fr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && r ? Yr(r, Ti) : null;
    (0, dr.default)(o, (u) => {
      let f = (0, pt.default)(u, "actionItem.config.target.boundaryMode"),
        p = n ? u.eventStateKey === n : !0;
      if (u.actionListId === i && u.eventId === t && p) {
        if (a && f && !cs(a, u.element)) return;
        ws(u, e),
          u.verbose && e.dispatch(lr({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function Jr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: f } = e.getState(),
      { events: p } = u,
      d = p[t] || {},
      { mediaQueries: h = u.mediaQueryKeys } = d,
      E = (0, pt.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: y, useFirstGroupAsInitialState: _ } = E;
    if (!y || !y.length) return !1;
    o >= y.length && (0, pt.default)(d, "config.loop") && (o = 0),
      o === 0 && _ && o++;
    let I =
        (o === 0 || (o === 1 && _)) && _s(d.action?.actionTypeId)
          ? d.config.delay
          : void 0,
      S = (0, pt.default)(y, [o, "actionItems"], []);
    if (!S.length || !Oi(h, f.mediaQueryKey)) return !1;
    let w = f.hasBoundaryNodes && r ? Yr(r, Ti) : null,
      L = kV(S),
      P = !1;
    return (
      S.forEach((N, B) => {
        let { config: j, actionTypeId: z } = N,
          Q = wi(z),
          { target: U } = j;
        if (!U) return;
        let O = U.boundaryMode ? w : null;
        Ii({
          config: j,
          event: d,
          eventTarget: r,
          elementRoot: O,
          elementApi: Re,
        }).forEach((R, M) => {
          let G = Q ? Is(z)(R, N) : null,
            Z = Q ? ZV(z)(R, N) : null;
          P = !0;
          let J = L === B && M === 0,
            D = HV({ element: R, actionItem: N }),
            X = Ts({ element: R, actionItem: N, elementApi: Re }, G);
          Os({
            store: e,
            element: R,
            actionItem: N,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: J,
            computedStyle: D,
            destination: X,
            immediate: s,
            verbose: a,
            pluginInstance: G,
            pluginDuration: Z,
            instanceDelay: I,
          });
        });
      }),
      P
    );
  }
  function Os(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: f,
        eventId: p,
      } = n,
      d = !u,
      h = UV(),
      { ixElements: E, ixSession: y, ixData: _ } = t.getState(),
      q = GV(E, i),
      { refState: I } = E[q] || {},
      S = ls(i),
      w = y.reducedMotion && jo[o.actionTypeId],
      L;
    if (w && u)
      switch (_.events[p]?.eventTypeId) {
        case je.MOUSE_MOVE:
        case je.MOUSE_MOVE_IN_VIEWPORT:
          L = f;
          break;
        default:
          L = 0.5;
          break;
      }
    let P = XV(i, I, r, o, Re, a);
    if (
      (t.dispatch(
        rs({
          instanceId: h,
          elementId: q,
          origin: P,
          refType: S,
          skipMotion: w,
          skipToValue: L,
          ...n,
        })
      ),
      __(document.body, "ix2-animation-started", h),
      s)
    ) {
      bk(t, h);
      return;
    }
    qt({ store: t, select: ({ ixInstances: N }) => N[h], onChange: b_ }),
      d && t.dispatch(fi(h, y.tick));
  }
  function ws(e, t) {
    __(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[r] || {};
    s === g_ && zV(o, n, Re), t.dispatch(ns(e.id));
  }
  function __(e, t, r) {
    let n = document.createEvent("CustomEvent");
    n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
  }
  function bk(e, t) {
    let { ixParameters: r } = e.getState();
    e.dispatch(fi(t, 0)), e.dispatch(li(performance.now(), r));
    let { ixInstances: n } = e.getState();
    b_(n[t], e);
  }
  function b_(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: f,
        groupIndex: p,
        eventId: d,
        eventTarget: h,
        eventStateKey: E,
        actionListId: y,
        isCarrier: _,
        styleProp: q,
        verbose: I,
        pluginInstance: S,
      } = e,
      { ixData: w, ixSession: L } = t.getState(),
      { events: P } = w,
      N = P[d] || {},
      { mediaQueries: B = w.mediaQueryKeys } = N;
    if (Oi(B, L.mediaQueryKey) && (n || r || i)) {
      if (f || (u === FV && i)) {
        t.dispatch(is(o, a, f, s));
        let { ixElements: j } = t.getState(),
          { ref: z, refType: Q, refState: U } = j[o] || {},
          O = U && U[a];
        (Q === g_ || wi(a)) && VV(z, U, O, d, s, q, Re, u, S);
      }
      if (i) {
        if (_) {
          let j = Jr({
            store: t,
            eventId: d,
            eventTarget: h,
            eventStateKey: E,
            actionListId: y,
            groupIndex: p + 1,
            verbose: I,
          });
          I && !j && t.dispatch(lr({ actionListId: y, isPlaying: !1 }));
        }
        ws(e, t);
      }
    }
  }
  var u_,
    pt,
    c_,
    l_,
    f_,
    d_,
    dr,
    p_,
    bi,
    DV,
    _s,
    bs,
    Ti,
    g_,
    FV,
    a_,
    Ii,
    GV,
    Ts,
    qt,
    UV,
    VV,
    v_,
    kV,
    HV,
    XV,
    WV,
    BV,
    jV,
    Oi,
    zV,
    KV,
    YV,
    $V,
    QV,
    wi,
    Is,
    ZV,
    s_,
    JV,
    ek,
    gk,
    hk,
    yk,
    Ek,
    ms = de(() => {
      "use strict";
      (u_ = ae(ba())),
        (pt = ae(Bn())),
        (c_ = ae(My())),
        (l_ = ae(sE())),
        (f_ = ae(cE())),
        (d_ = ae(fE())),
        (dr = ae(yE())),
        (p_ = ae(OE()));
      Pe();
      bi = ae(Pt());
      di();
      CE();
      o_();
      (DV = Object.keys(In)),
        (_s = (e) => DV.includes(e)),
        ({
          COLON_DELIMITER: bs,
          BOUNDARY_SELECTOR: Ti,
          HTML_ELEMENT: g_,
          RENDER_GENERAL: FV,
          W_MOD_IX: a_,
        } = Oe),
        ({
          getAffectedElements: Ii,
          getElementId: GV,
          getDestinationValues: Ts,
          observeStore: qt,
          getInstanceId: UV,
          renderHTMLElement: VV,
          clearAllStyles: v_,
          getMaxDurationItemIndex: kV,
          getComputedStyle: HV,
          getInstanceOrigin: XV,
          reduceListToGroup: WV,
          shouldNamespaceEventParameter: BV,
          getNamespacedParameterId: jV,
          shouldAllowMediaQuery: Oi,
          cleanupHTMLElement: zV,
          clearObjectCache: KV,
          stringifyTarget: YV,
          mediaQueriesEqual: $V,
          shallowEqual: QV,
        } = bi.IX2VanillaUtils),
        ({
          isPluginType: wi,
          createPluginInstance: Is,
          getPluginDuration: ZV,
        } = bi.IX2VanillaPlugins),
        (s_ = navigator.userAgent),
        (JV = s_.match(/iPad/i) || s_.match(/iPhone/)),
        (ek = 12);
      gk = ["resize", "orientationchange"];
      (hk = (e, t) => (0, l_.default)((0, d_.default)(e, t), f_.default)),
        (yk = (e, t) => {
          (0, dr.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let s = n + bs + o;
              t(i, n, s);
            });
          });
        }),
        (Ek = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Ii({ config: t, elementApi: Re });
        });
    });
  var O_ = c((gt) => {
    "use strict";
    var Tk = ln().default,
      Ik = au().default;
    Object.defineProperty(gt, "__esModule", { value: !0 });
    gt.actions = void 0;
    gt.destroy = I_;
    gt.init = Sk;
    gt.setEnv = xk;
    gt.store = void 0;
    Bl();
    var Ok = Xo(),
      wk = Ik((hy(), Je(vy))),
      As = (ms(), Je(T_)),
      Ak = Tk((di(), Je(AE)));
    gt.actions = Ak;
    var xs = (gt.store = (0, Ok.createStore)(wk.default));
    function xk(e) {
      e() && (0, As.observeRequests)(xs);
    }
    function Sk(e) {
      I_(), (0, As.startEngine)({ store: xs, rawData: e, allowEvents: !0 });
    }
    function I_() {
      (0, As.stopEngine)(xs);
    }
  });
  var S_ = c((Zj, x_) => {
    "use strict";
    var w_ = De(),
      A_ = O_();
    A_.setEnv(w_.env);
    w_.define(
      "ix2",
      (x_.exports = function () {
        return A_;
      })
    );
  });
  var C_ = c((Jj, R_) => {
    "use strict";
    var pr = De();
    pr.define(
      "links",
      (R_.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = pr.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          f = /index\.(html|php)$/,
          p = /\/$/,
          d,
          h;
        r.ready = r.design = r.preview = E;
        function E() {
          (i = o && pr.env("design")),
            (h = pr.env("slug") || s.pathname || ""),
            pr.scroll.off(_),
            (d = []);
          for (var I = document.links, S = 0; S < I.length; ++S) y(I[S]);
          d.length && (pr.scroll.on(_), _());
        }
        function y(I) {
          if (!I.getAttribute("hreflang")) {
            var S =
              (i && I.getAttribute("href-disabled")) || I.getAttribute("href");
            if (((a.href = S), !(S.indexOf(":") >= 0))) {
              var w = e(I);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var L = e(a.hash);
                L.length && d.push({ link: w, sec: L, active: !1 });
                return;
              }
              if (!(S === "#" || S === "")) {
                var P =
                  a.href === s.href || S === h || (f.test(S) && p.test(h));
                q(w, u, P);
              }
            }
          }
        }
        function _() {
          var I = n.scrollTop(),
            S = n.height();
          t.each(d, function (w) {
            if (!w.link.attr("hreflang")) {
              var L = w.link,
                P = w.sec,
                N = P.offset().top,
                B = P.outerHeight(),
                j = S * 0.5,
                z = P.is(":visible") && N + B - j >= I && N + j <= I + S;
              w.active !== z && ((w.active = z), q(L, u, z));
            }
          });
        }
        function q(I, S, w) {
          var L = I.hasClass(S);
          (w && L) || (!w && !L) || (w ? I.addClass(S) : I.removeClass(S));
        }
        return r;
      })
    );
  });
  var N_ = c((ez, L_) => {
    "use strict";
    var Si = De();
    Si.define(
      "scroll",
      (L_.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = y() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (O) {
              window.setTimeout(O, 15);
            },
          u = Si.env("editor") ? ".w-editor-body" : "body",
          f =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          p = 'a[href="#"]',
          d = 'a[href*="#"]:not(.w-tab-link):not(' + p + ")",
          h = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          E = document.createElement("style");
        E.appendChild(document.createTextNode(h));
        function y() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var _ = /^#[a-zA-Z0-9][\w:.-]*$/;
        function q(O) {
          return _.test(O.hash) && O.host + O.pathname === r.host + r.pathname;
        }
        let I =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function S() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            I.matches
          );
        }
        function w(O, v) {
          var R;
          switch (v) {
            case "add":
              (R = O.attr("tabindex")),
                R
                  ? O.attr("data-wf-tabindex-swap", R)
                  : O.attr("tabindex", "-1");
              break;
            case "remove":
              (R = O.attr("data-wf-tabindex-swap")),
                R
                  ? (O.attr("tabindex", R),
                    O.removeAttr("data-wf-tabindex-swap"))
                  : O.removeAttr("tabindex");
              break;
          }
          O.toggleClass("wf-force-outline-none", v === "add");
        }
        function L(O) {
          var v = O.currentTarget;
          if (
            !(
              Si.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(v.className))
            )
          ) {
            var R = q(v) ? v.hash : "";
            if (R !== "") {
              var M = e(R);
              M.length &&
                (O && (O.preventDefault(), O.stopPropagation()),
                P(R, O),
                window.setTimeout(
                  function () {
                    N(M, function () {
                      w(M, "add"),
                        M.get(0).focus({ preventScroll: !0 }),
                        w(M, "remove");
                    });
                  },
                  O ? 0 : 300
                ));
            }
          }
        }
        function P(O) {
          if (
            r.hash !== O &&
            n &&
            n.pushState &&
            !(Si.env.chrome && r.protocol === "file:")
          ) {
            var v = n.state && n.state.hash;
            v !== O && n.pushState({ hash: O }, "", O);
          }
        }
        function N(O, v) {
          var R = i.scrollTop(),
            M = B(O);
          if (R !== M) {
            var G = j(O, R, M),
              Z = Date.now(),
              J = function () {
                var D = Date.now() - Z;
                window.scroll(0, z(R, M, D, G)),
                  D <= G ? a(J) : typeof v == "function" && v();
              };
            a(J);
          }
        }
        function B(O) {
          var v = e(f),
            R = v.css("position") === "fixed" ? v.outerHeight() : 0,
            M = O.offset().top - R;
          if (O.data("scroll") === "mid") {
            var G = i.height() - R,
              Z = O.outerHeight();
            Z < G && (M -= Math.round((G - Z) / 2));
          }
          return M;
        }
        function j(O, v, R) {
          if (S()) return 0;
          var M = 1;
          return (
            s.add(O).each(function (G, Z) {
              var J = parseFloat(Z.getAttribute("data-scroll-time"));
              !isNaN(J) && J >= 0 && (M = J);
            }),
            (472.143 * Math.log(Math.abs(v - R) + 125) - 2e3) * M
          );
        }
        function z(O, v, R, M) {
          return R > M ? v : O + (v - O) * Q(R / M);
        }
        function Q(O) {
          return O < 0.5
            ? 4 * O * O * O
            : (O - 1) * (2 * O - 2) * (2 * O - 2) + 1;
        }
        function U() {
          var { WF_CLICK_EMPTY: O, WF_CLICK_SCROLL: v } = t;
          o.on(v, d, L),
            o.on(O, p, function (R) {
              R.preventDefault();
            }),
            document.head.insertBefore(E, document.head.firstChild);
        }
        return { ready: U };
      })
    );
  });
  var q_ = c((tz, P_) => {
    "use strict";
    var Rk = De();
    Rk.define(
      "touch",
      (P_.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            f,
            p;
          o.addEventListener("touchstart", d, !1),
            o.addEventListener("touchmove", h, !1),
            o.addEventListener("touchend", E, !1),
            o.addEventListener("touchcancel", y, !1),
            o.addEventListener("mousedown", d, !1),
            o.addEventListener("mousemove", h, !1),
            o.addEventListener("mouseup", E, !1),
            o.addEventListener("mouseout", y, !1);
          function d(q) {
            var I = q.touches;
            (I && I.length > 1) ||
              ((s = !0),
              I ? ((a = !0), (f = I[0].clientX)) : (f = q.clientX),
              (p = f));
          }
          function h(q) {
            if (s) {
              if (a && q.type === "mousemove") {
                q.preventDefault(), q.stopPropagation();
                return;
              }
              var I = q.touches,
                S = I ? I[0].clientX : q.clientX,
                w = S - p;
              (p = S),
                Math.abs(w) > u &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", q, { direction: w > 0 ? "right" : "left" }), y());
            }
          }
          function E(q) {
            if (s && ((s = !1), a && q.type === "mouseup")) {
              q.preventDefault(), q.stopPropagation(), (a = !1);
              return;
            }
          }
          function y() {
            s = !1;
          }
          function _() {
            o.removeEventListener("touchstart", d, !1),
              o.removeEventListener("touchmove", h, !1),
              o.removeEventListener("touchend", E, !1),
              o.removeEventListener("touchcancel", y, !1),
              o.removeEventListener("mousedown", d, !1),
              o.removeEventListener("mousemove", h, !1),
              o.removeEventListener("mouseup", E, !1),
              o.removeEventListener("mouseout", y, !1),
              (o = null);
          }
          this.destroy = _;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var F_ = c((rz, D_) => {
    "use strict";
    var Mt = De(),
      Ck = cn(),
      Ye = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      M_ = !0,
      Lk = /^#[a-zA-Z0-9\-_]+$/;
    Mt.define(
      "dropdown",
      (D_.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          i = Mt.env(),
          o = !1,
          s,
          a = Mt.env.touch,
          u = ".w-dropdown",
          f = "w--open",
          p = Ck.triggers,
          d = 900,
          h = "focusout" + u,
          E = "keydown" + u,
          y = "mouseenter" + u,
          _ = "mousemove" + u,
          q = "mouseleave" + u,
          I = (a ? "click" : "mouseup") + u,
          S = "w-close" + u,
          w = "setting" + u,
          L = e(document),
          P;
        (n.ready = N),
          (n.design = function () {
            o && v(), (o = !1), N();
          }),
          (n.preview = function () {
            (o = !0), N();
          });
        function N() {
          (s = i && Mt.env("design")), (P = L.find(u)), P.each(B);
        }
        function B(g, k) {
          var W = e(k),
            C = e.data(k, u);
          C ||
            (C = e.data(k, u, {
              open: !1,
              el: W,
              config: {},
              selectedIdx: -1,
            })),
            (C.toggle = C.el.children(".w-dropdown-toggle")),
            (C.list = C.el.children(".w-dropdown-list")),
            (C.links = C.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (C.complete = G(C)),
            (C.mouseLeave = J(C)),
            (C.mouseUpOutside = M(C)),
            (C.mouseMoveOutside = D(C)),
            j(C);
          var ne = C.toggle.attr("id"),
            Ee = C.list.attr("id");
          ne || (ne = "w-dropdown-toggle-" + g),
            Ee || (Ee = "w-dropdown-list-" + g),
            C.toggle.attr("id", ne),
            C.toggle.attr("aria-controls", Ee),
            C.toggle.attr("aria-haspopup", "menu"),
            C.toggle.attr("aria-expanded", "false"),
            C.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            C.toggle.prop("tagName") !== "BUTTON" &&
              (C.toggle.attr("role", "button"),
              C.toggle.attr("tabindex") || C.toggle.attr("tabindex", "0")),
            C.list.attr("id", Ee),
            C.list.attr("aria-labelledby", ne),
            C.links.each(function (Ge, $e) {
              $e.hasAttribute("tabindex") || $e.setAttribute("tabindex", "0"),
                Lk.test($e.hash) &&
                  $e.addEventListener("click", O.bind(null, C));
            }),
            C.el.off(u),
            C.toggle.off(u),
            C.nav && C.nav.off(u);
          var se = Q(C, M_);
          s && C.el.on(w, z(C)),
            s ||
              (i && ((C.hovering = !1), O(C)),
              C.config.hover && C.toggle.on(y, Z(C)),
              C.el.on(S, se),
              C.el.on(E, X(C)),
              C.el.on(h, F(C)),
              C.toggle.on(I, se),
              C.toggle.on(E, V(C)),
              (C.nav = C.el.closest(".w-nav")),
              C.nav.on(S, se));
        }
        function j(g) {
          var k = Number(g.el.css("z-index"));
          (g.manageZ = k === d || k === d + 1),
            (g.config = {
              hover: g.el.attr("data-hover") === "true" && !a,
              delay: g.el.attr("data-delay"),
            });
        }
        function z(g) {
          return function (k, W) {
            (W = W || {}),
              j(g),
              W.open === !0 && U(g, !0),
              W.open === !1 && O(g, { immediate: !0 });
          };
        }
        function Q(g, k) {
          return r(function (W) {
            if (g.open || (W && W.type === "w-close"))
              return O(g, { forceClose: k });
            U(g);
          });
        }
        function U(g) {
          if (!g.open) {
            R(g),
              (g.open = !0),
              g.list.addClass(f),
              g.toggle.addClass(f),
              g.toggle.attr("aria-expanded", "true"),
              p.intro(0, g.el[0]),
              Mt.redraw.up(),
              g.manageZ && g.el.css("z-index", d + 1);
            var k = Mt.env("editor");
            s || L.on(I, g.mouseUpOutside),
              g.hovering && !k && g.el.on(q, g.mouseLeave),
              g.hovering && k && L.on(_, g.mouseMoveOutside),
              window.clearTimeout(g.delayId);
          }
        }
        function O(g, { immediate: k, forceClose: W } = {}) {
          if (g.open && !(g.config.hover && g.hovering && !W)) {
            g.toggle.attr("aria-expanded", "false"), (g.open = !1);
            var C = g.config;
            if (
              (p.outro(0, g.el[0]),
              L.off(I, g.mouseUpOutside),
              L.off(_, g.mouseMoveOutside),
              g.el.off(q, g.mouseLeave),
              window.clearTimeout(g.delayId),
              !C.delay || k)
            )
              return g.complete();
            g.delayId = window.setTimeout(g.complete, C.delay);
          }
        }
        function v() {
          L.find(u).each(function (g, k) {
            e(k).triggerHandler(S);
          });
        }
        function R(g) {
          var k = g.el[0];
          P.each(function (W, C) {
            var ne = e(C);
            ne.is(k) || ne.has(k).length || ne.triggerHandler(S);
          });
        }
        function M(g) {
          return (
            g.mouseUpOutside && L.off(I, g.mouseUpOutside),
            r(function (k) {
              if (g.open) {
                var W = e(k.target);
                if (!W.closest(".w-dropdown-toggle").length) {
                  var C = e.inArray(g.el[0], W.parents(u)) === -1,
                    ne = Mt.env("editor");
                  if (C) {
                    if (ne) {
                      var Ee =
                          W.parents().length === 1 &&
                          W.parents("svg").length === 1,
                        se = W.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (Ee || se) return;
                    }
                    O(g);
                  }
                }
              }
            })
          );
        }
        function G(g) {
          return function () {
            g.list.removeClass(f),
              g.toggle.removeClass(f),
              g.manageZ && g.el.css("z-index", "");
          };
        }
        function Z(g) {
          return function () {
            (g.hovering = !0), U(g);
          };
        }
        function J(g) {
          return function () {
            (g.hovering = !1), g.links.is(":focus") || O(g);
          };
        }
        function D(g) {
          return r(function (k) {
            if (g.open) {
              var W = e(k.target),
                C = e.inArray(g.el[0], W.parents(u)) === -1;
              if (C) {
                var ne = W.parents(".w-editor-bem-EditorHoverControls").length,
                  Ee = W.parents(".w-editor-bem-RTToolbar").length,
                  se = e(".w-editor-bem-EditorOverlay"),
                  Ge =
                    se.find(".w-editor-edit-outline").length ||
                    se.find(".w-editor-bem-RTToolbar").length;
                if (ne || Ee || Ge) return;
                (g.hovering = !1), O(g);
              }
            }
          });
        }
        function X(g) {
          return function (k) {
            if (!(s || !g.open))
              switch (
                ((g.selectedIdx = g.links.index(document.activeElement)),
                k.keyCode)
              ) {
                case Ye.HOME:
                  return g.open
                    ? ((g.selectedIdx = 0), K(g), k.preventDefault())
                    : void 0;
                case Ye.END:
                  return g.open
                    ? ((g.selectedIdx = g.links.length - 1),
                      K(g),
                      k.preventDefault())
                    : void 0;
                case Ye.ESCAPE:
                  return O(g), g.toggle.focus(), k.stopPropagation();
                case Ye.ARROW_RIGHT:
                case Ye.ARROW_DOWN:
                  return (
                    (g.selectedIdx = Math.min(
                      g.links.length - 1,
                      g.selectedIdx + 1
                    )),
                    K(g),
                    k.preventDefault()
                  );
                case Ye.ARROW_LEFT:
                case Ye.ARROW_UP:
                  return (
                    (g.selectedIdx = Math.max(-1, g.selectedIdx - 1)),
                    K(g),
                    k.preventDefault()
                  );
              }
          };
        }
        function K(g) {
          g.links[g.selectedIdx] && g.links[g.selectedIdx].focus();
        }
        function V(g) {
          var k = Q(g, M_);
          return function (W) {
            if (!s) {
              if (!g.open)
                switch (W.keyCode) {
                  case Ye.ARROW_UP:
                  case Ye.ARROW_DOWN:
                    return W.stopPropagation();
                }
              switch (W.keyCode) {
                case Ye.SPACE:
                case Ye.ENTER:
                  return k(), W.stopPropagation(), W.preventDefault();
              }
            }
          };
        }
        function F(g) {
          return r(function (k) {
            var { relatedTarget: W, target: C } = k,
              ne = g.el[0],
              Ee = ne.contains(W) || ne.contains(C);
            return Ee || O(g), k.stopPropagation();
          });
        }
        return n;
      })
    );
  });
  var G_ = c((Ss) => {
    "use strict";
    Object.defineProperty(Ss, "__esModule", { value: !0 });
    Ss.default = Nk;
    function Nk(e, t, r, n, i, o, s, a, u, f, p, d, h) {
      return function (E) {
        e(E);
        var y = E.form,
          _ = {
            name: y.attr("data-name") || y.attr("name") || "Untitled Form",
            pageId: y.attr("data-wf-page-id") || "",
            elementId: y.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              y.html()
            ),
            trackingCookies: n(),
          };
        let q = y.attr("data-wf-flow");
        q && (_.wfFlow = q), i(E);
        var I = o(y, _.fields);
        if (I) return s(I);
        if (((_.fileUploads = a(y)), u(E), !f)) {
          p(E);
          return;
        }
        d.ajax({
          url: h,
          type: "POST",
          data: _,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (S) {
            S && S.code === 200 && (E.success = !0), p(E);
          })
          .fail(function () {
            p(E);
          });
      };
    }
  });
  var V_ = c((iz, U_) => {
    "use strict";
    var Ri = De();
    Ri.define(
      "forms",
      (U_.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          u,
          f = /e(-)?mail/i,
          p = /^\S+@\S+$/,
          d = window.alert,
          h = Ri.env(),
          E,
          y,
          _,
          q = /list-manage[1-9]?.com/i,
          I = t.debounce(function () {
            d(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              S(), !h && !E && L();
            };
        function S() {
          (u = e("html").attr("data-wf-site")),
            (y = "https://webflow.com/api/v1/form/" + u),
            s &&
              y.indexOf("https://webflow.com") >= 0 &&
              (y = y.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (_ = `${y}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(w);
        }
        function w(D, X) {
          var K = e(X),
            V = e.data(X, a);
          V || (V = e.data(X, a, { form: K })), P(V);
          var F = K.closest("div.w-form");
          (V.done = F.find("> .w-form-done")),
            (V.fail = F.find("> .w-form-fail")),
            (V.fileUploads = F.find(".w-file-upload")),
            V.fileUploads.each(function (W) {
              G(W, V);
            });
          var g =
            V.form.attr("aria-label") || V.form.attr("data-name") || "Form";
          V.done.attr("aria-label") || V.form.attr("aria-label", g),
            V.done.attr("tabindex", "-1"),
            V.done.attr("role", "region"),
            V.done.attr("aria-label") ||
              V.done.attr("aria-label", g + " success"),
            V.fail.attr("tabindex", "-1"),
            V.fail.attr("role", "region"),
            V.fail.attr("aria-label") ||
              V.fail.attr("aria-label", g + " failure");
          var k = (V.action = K.attr("action"));
          if (
            ((V.handler = null),
            (V.redirect = K.attr("data-redirect")),
            q.test(k))
          ) {
            V.handler = v;
            return;
          }
          if (!k) {
            if (u) {
              V.handler = (() => {
                let W = G_().default;
                return W(P, o, Ri, Q, M, B, d, j, N, u, R, e, y);
              })();
              return;
            }
            I();
          }
        }
        function L() {
          (E = !0),
            n.on("submit", a + " form", function (W) {
              var C = e.data(this, a);
              C.handler && ((C.evt = W), C.handler(C));
            });
          let D = ".w-checkbox-input",
            X = ".w-radio-input",
            K = "w--redirected-checked",
            V = "w--redirected-focus",
            F = "w--redirected-focus-visible",
            g = ":focus-visible, [data-wf-focus-visible]",
            k = [
              ["checkbox", D],
              ["radio", X],
            ];
          n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + D + ")",
            (W) => {
              e(W.target).siblings(D).toggleClass(K);
            }
          ),
            n.on("change", a + ' form input[type="radio"]', (W) => {
              e(`input[name="${W.target.name}"]:not(${D})`).map((ne, Ee) =>
                e(Ee).siblings(X).removeClass(K)
              );
              let C = e(W.target);
              C.hasClass("w-radio-input") || C.siblings(X).addClass(K);
            }),
            k.forEach(([W, C]) => {
              n.on(
                "focus",
                a + ` form input[type="${W}"]:not(` + C + ")",
                (ne) => {
                  e(ne.target).siblings(C).addClass(V),
                    e(ne.target).filter(g).siblings(C).addClass(F);
                }
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${W}"]:not(` + C + ")",
                  (ne) => {
                    e(ne.target).siblings(C).removeClass(`${V} ${F}`);
                  }
                );
            });
        }
        function P(D) {
          var X = (D.btn = D.form.find(':input[type="submit"]'));
          (D.wait = D.btn.attr("data-wait") || null),
            (D.success = !1),
            X.prop("disabled", !1),
            D.label && X.val(D.label);
        }
        function N(D) {
          var X = D.btn,
            K = D.wait;
          X.prop("disabled", !0), K && ((D.label = X.val()), X.val(K));
        }
        function B(D, X) {
          var K = null;
          return (
            (X = X || {}),
            D.find(':input:not([type="submit"]):not([type="file"])').each(
              function (V, F) {
                var g = e(F),
                  k = g.attr("type"),
                  W =
                    g.attr("data-name") || g.attr("name") || "Field " + (V + 1),
                  C = g.val();
                if (k === "checkbox") C = g.is(":checked");
                else if (k === "radio") {
                  if (X[W] === null || typeof X[W] == "string") return;
                  C =
                    D.find(
                      'input[name="' + g.attr("name") + '"]:checked'
                    ).val() || null;
                }
                typeof C == "string" && (C = e.trim(C)),
                  (X[W] = C),
                  (K = K || U(g, k, W, C));
              }
            ),
            K
          );
        }
        function j(D) {
          var X = {};
          return (
            D.find(':input[type="file"]').each(function (K, V) {
              var F = e(V),
                g = F.attr("data-name") || F.attr("name") || "File " + (K + 1),
                k = F.attr("data-value");
              typeof k == "string" && (k = e.trim(k)), (X[g] = k);
            }),
            X
          );
        }
        let z = { _mkto_trk: "marketo" };
        function Q() {
          return document.cookie.split("; ").reduce(function (X, K) {
            let V = K.split("="),
              F = V[0];
            if (F in z) {
              let g = z[F],
                k = V.slice(1).join("=");
              X[g] = k;
            }
            return X;
          }, {});
        }
        function U(D, X, K, V) {
          var F = null;
          return (
            X === "password"
              ? (F = "Passwords cannot be submitted.")
              : D.attr("required")
              ? V
                ? f.test(D.attr("type")) &&
                  (p.test(V) ||
                    (F = "Please enter a valid email address for: " + K))
                : (F = "Please fill out the required field: " + K)
              : K === "g-recaptcha-response" &&
                !V &&
                (F = "Please confirm you\u2019re not a robot."),
            F
          );
        }
        function O(D) {
          M(D), R(D);
        }
        function v(D) {
          P(D);
          var X = D.form,
            K = {};
          if (/^https/.test(o.href) && !/^https/.test(D.action)) {
            X.attr("method", "post");
            return;
          }
          M(D);
          var V = B(X, K);
          if (V) return d(V);
          N(D);
          var F;
          t.each(K, function (C, ne) {
            f.test(ne) && (K.EMAIL = C),
              /^((full[ _-]?)?name)$/i.test(ne) && (F = C),
              /^(first[ _-]?name)$/i.test(ne) && (K.FNAME = C),
              /^(last[ _-]?name)$/i.test(ne) && (K.LNAME = C);
          }),
            F &&
              !K.FNAME &&
              ((F = F.split(" ")),
              (K.FNAME = F[0]),
              (K.LNAME = K.LNAME || F[1]));
          var g = D.action.replace("/post?", "/post-json?") + "&c=?",
            k = g.indexOf("u=") + 2;
          k = g.substring(k, g.indexOf("&", k));
          var W = g.indexOf("id=") + 3;
          (W = g.substring(W, g.indexOf("&", W))),
            (K["b_" + k + "_" + W] = ""),
            e
              .ajax({ url: g, data: K, dataType: "jsonp" })
              .done(function (C) {
                (D.success = C.result === "success" || /already/.test(C.msg)),
                  D.success || console.info("MailChimp error: " + C.msg),
                  R(D);
              })
              .fail(function () {
                R(D);
              });
        }
        function R(D) {
          var X = D.form,
            K = D.redirect,
            V = D.success;
          if (V && K) {
            Ri.location(K);
            return;
          }
          D.done.toggle(V),
            D.fail.toggle(!V),
            V ? D.done.focus() : D.fail.focus(),
            X.toggle(!V),
            P(D);
        }
        function M(D) {
          D.evt && D.evt.preventDefault(), (D.evt = null);
        }
        function G(D, X) {
          if (!X.fileUploads || !X.fileUploads[D]) return;
          var K,
            V = e(X.fileUploads[D]),
            F = V.find("> .w-file-upload-default"),
            g = V.find("> .w-file-upload-uploading"),
            k = V.find("> .w-file-upload-success"),
            W = V.find("> .w-file-upload-error"),
            C = F.find(".w-file-upload-input"),
            ne = F.find(".w-file-upload-label"),
            Ee = ne.children(),
            se = W.find(".w-file-upload-error-msg"),
            Ge = k.find(".w-file-upload-file"),
            $e = k.find(".w-file-remove-link"),
            gr = Ge.find(".w-file-upload-file-name"),
            vr = se.attr("data-w-size-error"),
            Qe = se.attr("data-w-type-error"),
            Ci = se.attr("data-w-generic-error");
          if (
            (h ||
              ne.on("click keydown", function (b) {
                (b.type === "keydown" && b.which !== 13 && b.which !== 32) ||
                  (b.preventDefault(), C.click());
              }),
            ne.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            $e.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            h)
          )
            C.on("click", function (b) {
              b.preventDefault();
            }),
              ne.on("click", function (b) {
                b.preventDefault();
              }),
              Ee.on("click", function (b) {
                b.preventDefault();
              });
          else {
            $e.on("click keydown", function (b) {
              if (b.type === "keydown") {
                if (b.which !== 13 && b.which !== 32) return;
                b.preventDefault();
              }
              C.removeAttr("data-value"),
                C.val(""),
                gr.html(""),
                F.toggle(!0),
                k.toggle(!1),
                ne.focus();
            }),
              C.on("change", function (b) {
                (K = b.target && b.target.files && b.target.files[0]),
                  K &&
                    (F.toggle(!1),
                    W.toggle(!1),
                    g.toggle(!0),
                    g.focus(),
                    gr.text(K.name),
                    A() || N(X),
                    (X.fileUploads[D].uploading = !0),
                    Z(K, m));
              });
            var en = ne.outerHeight();
            C.height(en), C.width(1);
          }
          function l(b) {
            var x = b.responseJSON && b.responseJSON.msg,
              Y = Ci;
            typeof x == "string" && x.indexOf("InvalidFileTypeError") === 0
              ? (Y = Qe)
              : typeof x == "string" &&
                x.indexOf("MaxFileSizeError") === 0 &&
                (Y = vr),
              se.text(Y),
              C.removeAttr("data-value"),
              C.val(""),
              g.toggle(!1),
              F.toggle(!0),
              W.toggle(!0),
              W.focus(),
              (X.fileUploads[D].uploading = !1),
              A() || P(X);
          }
          function m(b, x) {
            if (b) return l(b);
            var Y = x.fileName,
              te = x.postData,
              le = x.fileId,
              H = x.s3Url;
            C.attr("data-value", le), J(H, te, K, Y, T);
          }
          function T(b) {
            if (b) return l(b);
            g.toggle(!1),
              k.css("display", "inline-block"),
              k.focus(),
              (X.fileUploads[D].uploading = !1),
              A() || P(X);
          }
          function A() {
            var b = (X.fileUploads && X.fileUploads.toArray()) || [];
            return b.some(function (x) {
              return x.uploading;
            });
          }
        }
        function Z(D, X) {
          var K = new URLSearchParams({ name: D.name, size: D.size });
          e.ajax({ type: "GET", url: `${_}?${K}`, crossDomain: !0 })
            .done(function (V) {
              X(null, V);
            })
            .fail(function (V) {
              X(V);
            });
        }
        function J(D, X, K, V, F) {
          var g = new FormData();
          for (var k in X) g.append(k, X[k]);
          g.append("file", K, V),
            e
              .ajax({
                type: "POST",
                url: D,
                data: g,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                F(null);
              })
              .fail(function (W) {
                F(W);
              });
        }
        return r;
      })
    );
  });
  var H_ = c((oz, k_) => {
    "use strict";
    var It = De(),
      Pk = cn();
    It.define(
      "tabs",
      (k_.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          s = It.env,
          a = s.safari,
          u = s(),
          f = "data-w-tab",
          p = "data-w-pane",
          d = ".w-tabs",
          h = "w--current",
          E = "w--tab-active",
          y = Pk.triggers,
          _ = !1;
        (t.ready = t.design = t.preview = q),
          (t.redraw = function () {
            (_ = !0), q(), (_ = !1);
          }),
          (t.destroy = function () {
            (i = n.find(d)), i.length && (i.each(w), I());
          });
        function q() {
          (o = u && It.env("design")),
            (i = n.find(d)),
            i.length &&
              (i.each(L), It.env("preview") && !_ && i.each(w), I(), S());
        }
        function I() {
          It.redraw.off(t.redraw);
        }
        function S() {
          It.redraw.on(t.redraw);
        }
        function w(U, O) {
          var v = e.data(O, d);
          v &&
            (v.links && v.links.each(y.reset),
            v.panes && v.panes.each(y.reset));
        }
        function L(U, O) {
          var v = d.substr(1) + "-" + U,
            R = e(O),
            M = e.data(O, d);
          if (
            (M || (M = e.data(O, d, { el: R, config: {} })),
            (M.current = null),
            (M.tabIdentifier = v + "-" + f),
            (M.paneIdentifier = v + "-" + p),
            (M.menu = R.children(".w-tab-menu")),
            (M.links = M.menu.children(".w-tab-link")),
            (M.content = R.children(".w-tab-content")),
            (M.panes = M.content.children(".w-tab-pane")),
            M.el.off(d),
            M.links.off(d),
            M.menu.attr("role", "tablist"),
            M.links.attr("tabindex", "-1"),
            P(M),
            !o)
          ) {
            M.links.on("click" + d, B(M)), M.links.on("keydown" + d, j(M));
            var G = M.links.filter("." + h),
              Z = G.attr(f);
            Z && z(M, { tab: Z, immediate: !0 });
          }
        }
        function P(U) {
          var O = {};
          O.easing = U.el.attr("data-easing") || "ease";
          var v = parseInt(U.el.attr("data-duration-in"), 10);
          v = O.intro = v === v ? v : 0;
          var R = parseInt(U.el.attr("data-duration-out"), 10);
          (R = O.outro = R === R ? R : 0),
            (O.immediate = !v && !R),
            (U.config = O);
        }
        function N(U) {
          var O = U.current;
          return Array.prototype.findIndex.call(
            U.links,
            (v) => v.getAttribute(f) === O,
            null
          );
        }
        function B(U) {
          return function (O) {
            O.preventDefault();
            var v = O.currentTarget.getAttribute(f);
            v && z(U, { tab: v });
          };
        }
        function j(U) {
          return function (O) {
            var v = N(U),
              R = O.key,
              M = {
                ArrowLeft: v - 1,
                ArrowUp: v - 1,
                ArrowRight: v + 1,
                ArrowDown: v + 1,
                End: U.links.length - 1,
                Home: 0,
              };
            if (R in M) {
              O.preventDefault();
              var G = M[R];
              G === -1 && (G = U.links.length - 1),
                G === U.links.length && (G = 0);
              var Z = U.links[G],
                J = Z.getAttribute(f);
              J && z(U, { tab: J });
            }
          };
        }
        function z(U, O) {
          O = O || {};
          var v = U.config,
            R = v.easing,
            M = O.tab;
          if (M !== U.current) {
            U.current = M;
            var G;
            U.links.each(function (F, g) {
              var k = e(g);
              if (O.immediate || v.immediate) {
                var W = U.panes[F];
                g.id || (g.id = U.tabIdentifier + "-" + F),
                  W.id || (W.id = U.paneIdentifier + "-" + F),
                  (g.href = "#" + W.id),
                  g.setAttribute("role", "tab"),
                  g.setAttribute("aria-controls", W.id),
                  g.setAttribute("aria-selected", "false"),
                  W.setAttribute("role", "tabpanel"),
                  W.setAttribute("aria-labelledby", g.id);
              }
              g.getAttribute(f) === M
                ? ((G = g),
                  k
                    .addClass(h)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(y.intro))
                : k.hasClass(h) &&
                  k
                    .removeClass(h)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(y.outro);
            });
            var Z = [],
              J = [];
            U.panes.each(function (F, g) {
              var k = e(g);
              g.getAttribute(f) === M ? Z.push(g) : k.hasClass(E) && J.push(g);
            });
            var D = e(Z),
              X = e(J);
            if (O.immediate || v.immediate) {
              D.addClass(E).each(y.intro),
                X.removeClass(E),
                _ || It.redraw.up();
              return;
            } else {
              var K = window.scrollX,
                V = window.scrollY;
              G.focus(), window.scrollTo(K, V);
            }
            X.length && v.outro
              ? (X.each(y.outro),
                r(X)
                  .add("opacity " + v.outro + "ms " + R, { fallback: a })
                  .start({ opacity: 0 })
                  .then(() => Q(v, X, D)))
              : Q(v, X, D);
          }
        }
        function Q(U, O, v) {
          if (
            (O.removeClass(E).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            v.addClass(E).each(y.intro),
            It.redraw.up(),
            !U.intro)
          )
            return r(v).set({ opacity: 1 });
          r(v)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + U.intro + "ms " + U.easing, { fallback: a })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  Cs();
  Ls();
  Ws();
  js();
  Ks();
  Qs();
  cn();
  S_();
  C_();
  N_();
  q_();
  F_();
  V_();
  H_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:
    
    timm/lib/timm.js:
      (*!
       * Timm
       *
       * Immutability helpers with fast reads and acceptable writes.
       *
       * @copyright Guillermo Grau Panea 2016
       * @license MIT
       *)
    */
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-80",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button-2",
        originalId:
          "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button-2",
          originalId:
            "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690394338442,
    },
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-519",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button-2",
        originalId:
          "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button-2",
          originalId:
            "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690394338473,
    },
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-8",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184552",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184552",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690819124326,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184552",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184552",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690819124328,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-12",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".play-pause-button",
        originalId:
          "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184554",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".play-pause-button",
          originalId:
            "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184554",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690840329484,
    },
    "e-12": {
      id: "e-12",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-11",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".play-pause-button",
        originalId:
          "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184554",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".play-pause-button",
          originalId:
            "650daf38170a105f82911bfa|a3d0dbd9-9ddc-88e3-9046-93bb0f184554",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690840329487,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-16",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bda|f7987d0e-5ed0-d7e1-8db8-1c3255f2d57e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bda|f7987d0e-5ed0-d7e1-8db8-1c3255f2d57e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691148747489,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-15",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bda|f7987d0e-5ed0-d7e1-8db8-1c3255f2d57e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bda|f7987d0e-5ed0-d7e1-8db8-1c3255f2d57e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691148747489,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691157603096,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-21",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691157603096,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-24",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691157660187,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-23",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314f7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691157660231,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-26",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691158376719,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-25",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|6f2a31c4-e911-0950-5bcf-5717994314fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691158376719,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-28" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: null,
        originalId:
          "650daf38170a105f82911bd8|4304194b-7b46-57db-f0bb-f1e4c9537b49",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-500",
          originalId:
            "650daf38170a105f82911bd8|4304194b-7b46-57db-f0bb-f1e4c9537b49",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1691093753921,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeOut", autoStopEventId: "e-27" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: null,
        originalId:
          "650daf38170a105f82911bd8|4304194b-7b46-57db-f0bb-f1e4c9537b49",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-500",
          originalId:
            "650daf38170a105f82911bd8|4304194b-7b46-57db-f0bb-f1e4c9537b49",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 50,
        direction: null,
        effectIn: false,
      },
      createdOn: 1691093753922,
    },
    "e-40": {
      id: "e-40",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-42",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".opacity-hover",
        originalId:
          "650daf38170a105f82911bd8|ba0b2306-3411-1dfc-4a91-d81da4284307",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".opacity-hover",
          originalId:
            "650daf38170a105f82911bd8|ba0b2306-3411-1dfc-4a91-d81da4284307",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691150704506,
    },
    "e-42": {
      id: "e-42",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-40",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".opacity-hover",
        originalId:
          "650daf38170a105f82911bd8|ba0b2306-3411-1dfc-4a91-d81da4284307",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".opacity-hover",
          originalId:
            "650daf38170a105f82911bd8|ba0b2306-3411-1dfc-4a91-d81da4284307",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691150704507,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeOut", autoStopEventId: "e-100" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: null,
        originalId:
          "650daf38170a105f82911bd8|970125ed-9447-dab6-59a3-f51f15473583",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-100",
          originalId:
            "650daf38170a105f82911bd8|970125ed-9447-dab6-59a3-f51f15473583",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 50,
        direction: null,
        effectIn: false,
      },
      createdOn: 1691093753922,
    },
    "e-54": {
      id: "e-54",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-51" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: null,
        originalId:
          "650daf38170a105f82911bd8|970125ed-9447-dab6-59a3-f51f15473583",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-100",
          originalId:
            "650daf38170a105f82911bd8|970125ed-9447-dab6-59a3-f51f15473583",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1691093753921,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-63",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691166148982,
    },
    "e-64": {
      id: "e-64",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-65" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|a7723823-02a9-8d58-5655-e41441740b52",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|a7723823-02a9-8d58-5655-e41441740b52",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1691166291969,
    },
    "e-68": {
      id: "e-68",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-69",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bd5|c48a6bb0-cd18-b48e-4b36-ca5091fdd652",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bd5|c48a6bb0-cd18-b48e-4b36-ca5091fdd652",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691166660325,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-71",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bdc",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bdc",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691166954896,
    },
    "e-72": {
      id: "e-72",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInLeft", autoStopEventId: "e-73" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|e48981c6-c862-b41f-101b-12718bfb9b1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|e48981c6-c862-b41f-101b-12718bfb9b1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 48,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "LEFT",
        effectIn: true,
      },
      createdOn: 1691167683157,
    },
    "e-75": {
      id: "e-75",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInRight", autoStopEventId: "e-76" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bda|dbb55f10-eae0-237d-b0f7-2543f81f2830",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bda|dbb55f10-eae0-237d-b0f7-2543f81f2830",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: "RIGHT",
        effectIn: true,
      },
      createdOn: 1691168106902,
    },
    "e-79": {
      id: "e-79",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-80",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|4d319f4c-9a14-a893-a41c-2551557641d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|4d319f4c-9a14-a893-a41c-2551557641d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1606862675728,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-79",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|4d319f4c-9a14-a893-a41c-2551557641d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|4d319f4c-9a14-a893-a41c-2551557641d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1606862675729,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-82",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|0435679b-0220-db51-2794-f7f91b139bac",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|0435679b-0220-db51-2794-f7f91b139bac",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691170883068,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|0435679b-0220-db51-2794-f7f91b139bac",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|0435679b-0220-db51-2794-f7f91b139bac",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691170883068,
    },
    "e-83": {
      id: "e-83",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-84",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|5c5967e8-62f2-63d3-bb19-ee90e96f9f21",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|5c5967e8-62f2-63d3-bb19-ee90e96f9f21",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691170883766,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-83",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|5c5967e8-62f2-63d3-bb19-ee90e96f9f21",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|5c5967e8-62f2-63d3-bb19-ee90e96f9f21",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691170883766,
    },
    "e-85": {
      id: "e-85",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-86",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|04d63941-9fef-e3b6-ad94-bd217d1c395e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|04d63941-9fef-e3b6-ad94-bd217d1c395e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691170884552,
    },
    "e-86": {
      id: "e-86",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-85",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bfa|04d63941-9fef-e3b6-ad94-bd217d1c395e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bfa|04d63941-9fef-e3b6-ad94-bd217d1c395e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691170884552,
    },
    "e-90": {
      id: "e-90",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-100",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button-3",
        originalId:
          "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button-3",
          originalId:
            "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690394338442,
    },
    "e-93": {
      id: "e-93",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-504",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".social-media-icon",
        originalId:
          "64c4e976198e3ed3fd638274|712d8834-cb43-111e-e2b5-b246fda00cce",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".social-media-icon",
          originalId:
            "64c4e976198e3ed3fd638274|712d8834-cb43-111e-e2b5-b246fda00cce",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1689948771123,
    },
    "e-96": {
      id: "e-96",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-97",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        selector: ".brand-logo",
        originalId:
          "64c4e976198e3ed3fd638274|8e071ce5-3e74-1438-c4e8-b1bf73b7b69f",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".brand-logo",
          originalId:
            "64c4e976198e3ed3fd638274|8e071ce5-3e74-1438-c4e8-b1bf73b7b69f",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691003477634,
    },
    "e-97": {
      id: "e-97",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-96",
        },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        selector: ".brand-logo",
        originalId:
          "64c4e976198e3ed3fd638274|8e071ce5-3e74-1438-c4e8-b1bf73b7b69f",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".brand-logo",
          originalId:
            "64c4e976198e3ed3fd638274|8e071ce5-3e74-1438-c4e8-b1bf73b7b69f",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691003477630,
    },
    "e-98": {
      id: "e-98",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-502",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".social-media-icon",
        originalId:
          "64c4e976198e3ed3fd638274|712d8834-cb43-111e-e2b5-b246fda00cce",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".social-media-icon",
          originalId:
            "64c4e976198e3ed3fd638274|712d8834-cb43-111e-e2b5-b246fda00cce",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1689948771123,
    },
    "e-100": {
      id: "e-100",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-519",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button-3",
        originalId:
          "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button-3",
          originalId:
            "64c4e976198e3ed3fd638274|2392cdb8-8e8d-ec47-aaca-3abfe0a907bd",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690394338473,
    },
    "e-107": {
      id: "e-107",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-108",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "9ca196a7-2d4c-2ed0-fe0d-08fadd3aae30",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9ca196a7-2d4c-2ed0-fe0d-08fadd3aae30",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691248950822,
    },
    "e-109": {
      id: "e-109",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-110",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "261e55cf-504d-1026-4cdd-3f72350921e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "261e55cf-504d-1026-4cdd-3f72350921e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691248982961,
    },
    "e-111": {
      id: "e-111",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-112",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "ed495e4a-14ef-2667-7c1d-9f342987aabc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ed495e4a-14ef-2667-7c1d-9f342987aabc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691250729935,
    },
    "e-113": {
      id: "e-113",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-114",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10c18cff-304c-4553-efbe-987617c1bbd5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10c18cff-304c-4553-efbe-987617c1bbd5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691250740085,
    },
    "e-115": {
      id: "e-115",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-116",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-in-100",
        originalId:
          "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-100",
          originalId:
            "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691518039848,
    },
    "e-117": {
      id: "e-117",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-118",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-in-200",
        originalId:
          "650daf38170a105f82911bfa|0387ff70-3be5-9f4e-0fea-1df4a0b3cacc",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-200",
          originalId:
            "650daf38170a105f82911bfa|0387ff70-3be5-9f4e-0fea-1df4a0b3cacc",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691518141686,
    },
    "e-119": {
      id: "e-119",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-120",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-in-300",
        originalId:
          "650daf38170a105f82911bfa|f68099c6-7f6e-4266-c73d-72d73ae5eecc",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-300",
          originalId:
            "650daf38170a105f82911bfa|f68099c6-7f6e-4266-c73d-72d73ae5eecc",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691518179615,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-122",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-in-400",
        originalId:
          "650daf38170a105f82911bfa|534c1315-8893-4a53-acad-cbddac11d6d9",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-400",
          originalId:
            "650daf38170a105f82911bfa|534c1315-8893-4a53-acad-cbddac11d6d9",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691518249801,
    },
    "e-123": {
      id: "e-123",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-124",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-in-500",
        originalId:
          "650daf38170a105f82911bfa|16378668-73ad-eab8-106c-0c4cd15e8aac",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-500",
          originalId:
            "650daf38170a105f82911bfa|16378668-73ad-eab8-106c-0c4cd15e8aac",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691518430943,
    },
    "e-125": {
      id: "e-125",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-126",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-in-600",
        originalId:
          "650daf38170a105f82911bfa|b16ce215-733b-9ecc-d6ff-7e47b463a7b0",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in-600",
          originalId:
            "650daf38170a105f82911bfa|b16ce215-733b-9ecc-d6ff-7e47b463a7b0",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691518454086,
    },
    "e-131": {
      id: "e-131",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-43",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-132",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".games-item",
        originalId:
          "650daf38170a105f82911bd5|582837ae-e1c4-9a10-3761-e107b810510f",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".games-item",
          originalId:
            "650daf38170a105f82911bd5|582837ae-e1c4-9a10-3761-e107b810510f",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1692023726052,
    },
    "e-132": {
      id: "e-132",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-131",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".games-item",
        originalId:
          "650daf38170a105f82911bd5|582837ae-e1c4-9a10-3761-e107b810510f",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".games-item",
          originalId:
            "650daf38170a105f82911bd5|582837ae-e1c4-9a10-3761-e107b810510f",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692023726053,
    },
    "e-133": {
      id: "e-133",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-134",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "650daf38170a105f82911bdb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "650daf38170a105f82911bdb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692633986248,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Scale out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64c4e976198e3ed3fd638274|7b7e3d18-2752-8859-a4d0-1c4e23ec666a",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "64c4e976198e3ed3fd638274|7b7e3d18-2752-8859-a4d0-1c4e23ec666a",
                },
                xValue: 1.1,
                yValue: 1.1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1689947485221,
    },
    "a-2": {
      id: "a-2",
      title: "Scale in",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "64c4e976198e3ed3fd638274|7b7e3d18-2752-8859-a4d0-1c4e23ec666a",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1689947625726,
    },
    "a-5": {
      id: "a-5",
      title: "Play Button Show",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".play-pause-button",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf716"],
                },
                value: "none",
              },
            },
            {
              id: "a-5-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".play-pause-button",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf716"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".play-pause-button",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf716"],
                },
                value: "block",
              },
            },
            {
              id: "a-5-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".play-pause-button",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf716"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690819135561,
    },
    "a-6": {
      id: "a-6",
      title: "Play Button Hide",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".play-pause-button",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf716"],
                },
                value: "none",
              },
            },
            {
              id: "a-6-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".play-pause-button",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf716"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1690819135561,
    },
    "a-7": {
      id: "a-7",
      title: "Video Overlay Hide On Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".video-overlay",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf719"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".video-overlay",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf719"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690818236143,
    },
    "a-8": {
      id: "a-8",
      title: "Video Overlay Show On Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".video-overlay",
                  selectorGuids: ["8b181706-84a7-9c3c-ddee-a60070ddf719"],
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1690818236143,
    },
    "a-10": {
      id: "a-10",
      title: "Show Tab Border",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".about-us-tab-border",
                  selectorGuids: ["c65d6016-7035-d134-a0b0-66a549799748"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-10-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector:
                    ".text-lg.font-bold.font-poppins.text-slate-grey.uppercase.tab-number",
                  selectorGuids: [
                    "9c422bf2-6759-b7c0-d454-484e65f59327",
                    "064e2145-218a-622a-b5d4-c74ab19855f9",
                    "c19bc321-66cc-c437-66e4-7fc4e19c85df",
                    "88e7ed37-87de-7ac0-175c-964759fa69b1",
                    "9309ca51-a2a9-6f07-9232-1a115515b3a6",
                    "20ccbb47-2760-617b-c2ed-1b89ac514b5a",
                  ],
                },
                globalSwatchId: "9882d682",
                rValue: 131,
                bValue: 131,
                gValue: 131,
                aValue: 1,
              },
            },
            {
              id: "a-10-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector:
                    ".text-lg.font-bold.font-poppins.text-slate-grey.uppercase.tab-head",
                  selectorGuids: [
                    "9c422bf2-6759-b7c0-d454-484e65f59327",
                    "064e2145-218a-622a-b5d4-c74ab19855f9",
                    "c19bc321-66cc-c437-66e4-7fc4e19c85df",
                    "88e7ed37-87de-7ac0-175c-964759fa69b1",
                    "9309ca51-a2a9-6f07-9232-1a115515b3a6",
                    "350f5d25-a39c-4b41-78cc-6a9fddff9968",
                  ],
                },
                globalSwatchId: "9882d682",
                rValue: 131,
                bValue: 131,
                gValue: 131,
                aValue: 1,
              },
            },
            {
              id: "a-10-n-8",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector:
                    ".text-small.font-bold.font-poppins.text-slate-grey.tab-headsub",
                  selectorGuids: [
                    "8d2c022f-2ff0-faf5-d813-f9104e5ca0da",
                    "ca0caeb4-d788-79fb-2378-d7f2b8e97623",
                    "fe4e7934-fba3-bd90-32b4-e44acf2a5e16",
                    "dd615ad8-85ca-ace8-0ee4-20a99068c638",
                    "428bd1f3-e6c4-a5c6-dfb6-ba315f8cf4f1",
                  ],
                },
                globalSwatchId: "9882d682",
                rValue: 131,
                bValue: 131,
                gValue: 131,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-10-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".about-us-tab-border",
                  selectorGuids: ["c65d6016-7035-d134-a0b0-66a549799748"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-10-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector:
                    ".text-lg.font-bold.font-poppins.text-slate-grey.uppercase.tab-number",
                  selectorGuids: [
                    "9c422bf2-6759-b7c0-d454-484e65f59327",
                    "064e2145-218a-622a-b5d4-c74ab19855f9",
                    "c19bc321-66cc-c437-66e4-7fc4e19c85df",
                    "88e7ed37-87de-7ac0-175c-964759fa69b1",
                    "9309ca51-a2a9-6f07-9232-1a115515b3a6",
                    "20ccbb47-2760-617b-c2ed-1b89ac514b5a",
                  ],
                },
                globalSwatchId: "54540309",
                rValue: 148,
                bValue: 255,
                gValue: 64,
                aValue: 1,
              },
            },
            {
              id: "a-10-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector:
                    ".text-lg.font-bold.font-poppins.text-slate-grey.uppercase.tab-head",
                  selectorGuids: [
                    "9c422bf2-6759-b7c0-d454-484e65f59327",
                    "064e2145-218a-622a-b5d4-c74ab19855f9",
                    "c19bc321-66cc-c437-66e4-7fc4e19c85df",
                    "88e7ed37-87de-7ac0-175c-964759fa69b1",
                    "9309ca51-a2a9-6f07-9232-1a115515b3a6",
                    "350f5d25-a39c-4b41-78cc-6a9fddff9968",
                  ],
                },
                globalSwatchId: "512f11cb",
                rValue: 238,
                bValue: 250,
                gValue: 236,
                aValue: 1,
              },
            },
            {
              id: "a-10-n-7",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector:
                    ".text-small.font-bold.font-poppins.text-slate-grey.tab-headsub",
                  selectorGuids: [
                    "8d2c022f-2ff0-faf5-d813-f9104e5ca0da",
                    "ca0caeb4-d788-79fb-2378-d7f2b8e97623",
                    "fe4e7934-fba3-bd90-32b4-e44acf2a5e16",
                    "dd615ad8-85ca-ace8-0ee4-20a99068c638",
                    "428bd1f3-e6c4-a5c6-dfb6-ba315f8cf4f1",
                  ],
                },
                globalSwatchId: "512f11cb",
                rValue: 238,
                bValue: 250,
                gValue: 236,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691157402193,
    },
    "a-11": {
      id: "a-11",
      title: "Hide Tab Border",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".about-us-tab-border",
                  selectorGuids: ["c65d6016-7035-d134-a0b0-66a549799748"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-11-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector:
                    ".text-lg.font-bold.font-poppins.text-slate-grey.uppercase.tab-number",
                  selectorGuids: [
                    "9c422bf2-6759-b7c0-d454-484e65f59327",
                    "064e2145-218a-622a-b5d4-c74ab19855f9",
                    "c19bc321-66cc-c437-66e4-7fc4e19c85df",
                    "88e7ed37-87de-7ac0-175c-964759fa69b1",
                    "9309ca51-a2a9-6f07-9232-1a115515b3a6",
                    "20ccbb47-2760-617b-c2ed-1b89ac514b5a",
                  ],
                },
                globalSwatchId: "9882d682",
                rValue: 131,
                bValue: 131,
                gValue: 131,
                aValue: 1,
              },
            },
            {
              id: "a-11-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector:
                    ".text-lg.font-bold.font-poppins.text-slate-grey.uppercase.tab-head",
                  selectorGuids: [
                    "9c422bf2-6759-b7c0-d454-484e65f59327",
                    "064e2145-218a-622a-b5d4-c74ab19855f9",
                    "c19bc321-66cc-c437-66e4-7fc4e19c85df",
                    "88e7ed37-87de-7ac0-175c-964759fa69b1",
                    "9309ca51-a2a9-6f07-9232-1a115515b3a6",
                    "350f5d25-a39c-4b41-78cc-6a9fddff9968",
                  ],
                },
                globalSwatchId: "9882d682",
                rValue: 131,
                bValue: 131,
                gValue: 131,
                aValue: 1,
              },
            },
            {
              id: "a-11-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector:
                    ".text-small.font-bold.font-poppins.text-slate-grey.tab-headsub",
                  selectorGuids: [
                    "8d2c022f-2ff0-faf5-d813-f9104e5ca0da",
                    "ca0caeb4-d788-79fb-2378-d7f2b8e97623",
                    "fe4e7934-fba3-bd90-32b4-e44acf2a5e16",
                    "dd615ad8-85ca-ace8-0ee4-20a99068c638",
                    "428bd1f3-e6c4-a5c6-dfb6-ba315f8cf4f1",
                  ],
                },
                globalSwatchId: "9882d682",
                rValue: 131,
                bValue: 131,
                gValue: 131,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691157402193,
    },
    "a-18": {
      id: "a-18",
      title: "Link Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd8|ba0b2306-3411-1dfc-4a91-d81da4284307",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-18-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inSine",
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd8|ba0b2306-3411-1dfc-4a91-d81da4284307",
                },
                value: 0.6,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691150707451,
    },
    "a-19": {
      id: "a-19",
      title: "Link Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outSine",
                duration: 600,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd8|ba0b2306-3411-1dfc-4a91-d81da4284307",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691150707451,
    },
    "a-20": {
      id: "a-20",
      title: "Text Scroll Left",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".big-scroll-text",
                  selectorGuids: ["a7545c2e-e1b0-e3eb-5be2-9c992fc9d21e"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-20-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 10000,
                target: {
                  selector: ".big-scroll-text",
                  selectorGuids: ["a7545c2e-e1b0-e3eb-5be2-9c992fc9d21e"],
                },
                xValue: -25,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-20-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 10000,
                target: {
                  selector: ".big-scroll-text",
                  selectorGuids: ["a7545c2e-e1b0-e3eb-5be2-9c992fc9d21e"],
                },
                xValue: 25,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691166073665,
    },
    "a-21": {
      id: "a-21",
      title: "Pink Bar Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd5|c48a6bb0-cd18-b48e-4b36-ca5091fdd652",
                },
                xValue: 1,
                yValue: 0,
                locked: false,
              },
            },
            {
              id: "a-21-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd5|c48a6bb0-cd18-b48e-4b36-ca5091fdd652",
                },
                yValue: -50,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 400,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd5|c48a6bb0-cd18-b48e-4b36-ca5091fdd652",
                },
                xValue: 1,
                yValue: 1,
                locked: false,
              },
            },
            {
              id: "a-21-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 400,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd5|c48a6bb0-cd18-b48e-4b36-ca5091fdd652",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691166664033,
    },
    "a-24": {
      id: "a-24",
      title: "Accordion open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|4d319f4c-9a14-a893-a41c-2551557641d7",
                },
                heightValue: 80,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-24-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".accordion-icon",
                  selectorGuids: ["a38c7ba7-62a5-a15a-c5b4-7c17e04c35db"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|4d319f4c-9a14-a893-a41c-2551557641d7",
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-24-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".accordion-icon",
                  selectorGuids: ["a38c7ba7-62a5-a15a-c5b4-7c17e04c35db"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1606862693281,
    },
    "a-25": {
      id: "a-25",
      title: "Accordion close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|4d319f4c-9a14-a893-a41c-2551557641d7",
                },
                heightValue: 80,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-25-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".accordion-icon",
                  selectorGuids: ["a38c7ba7-62a5-a15a-c5b4-7c17e04c35db"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1606866824674,
    },
    "a-30": {
      id: "a-30",
      title: "Opacity 30% gain",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-30-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: true,
                  id: "64c4e976198e3ed3fd638274|a94e8ea5-ffa1-e2e7-6ec7-c84dd49f7495",
                },
                value: 0.7,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "64c4e976198e3ed3fd638274|a94e8ea5-ffa1-e2e7-6ec7-c84dd49f7495",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1689948268891,
    },
    "a-28": {
      id: "a-28",
      title: "Opacity 30% lose",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: true,
                  id: "64c4e976198e3ed3fd638274|a94e8ea5-ffa1-e2e7-6ec7-c84dd49f7495",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "64c4e976198e3ed3fd638274|a94e8ea5-ffa1-e2e7-6ec7-c84dd49f7495",
                },
                value: 0.7,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1689948185602,
    },
    "a-32": {
      id: "a-32",
      title: "Mobile Menu Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-32-n-10",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                value: "none",
              },
            },
            {
              id: "a-32-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                xValue: 101,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-32-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".show-mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c72"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-32-n-13",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                value: "block",
              },
            },
            {
              id: "a-32-n-15",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeIn",
                duration: 400,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-32-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeIn",
                duration: 400,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-32-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".show-mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c72"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-32-n-16",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".mobile-menu-close",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c80"],
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691009193528,
    },
    "a-33": {
      id: "a-33",
      title: "Mobile Menu Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-33-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeOut",
                duration: 400,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-33-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeOut",
                duration: 400,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                xValue: 101,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-33-n-10",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c77"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-33-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".mobile-menu-close",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c80"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-33-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".show-mobile-menu-open",
                  selectorGuids: ["41f0b810-714e-87a6-e7d4-c5cc2dd09c72"],
                },
                value: "block",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691009193528,
    },
    "a-34": {
      id: "a-34",
      title: "Fade In 100",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-34-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-34-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 60,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-34-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-34-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691518047839,
    },
    "a-35": {
      id: "a-35",
      title: "Fade In 200",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-35-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-35-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 60,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-35-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-35-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691518047839,
    },
    "a-36": {
      id: "a-36",
      title: "Fade In 300",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-36-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-36-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 60,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-36-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 600,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-36-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 600,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691518047839,
    },
    "a-37": {
      id: "a-37",
      title: "Fade In 400",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-37-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-37-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 60,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-37-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 800,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-37-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 800,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691518047839,
    },
    "a-38": {
      id: "a-38",
      title: "Fade In 500",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-38-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-38-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 60,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-38-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-38-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691518047839,
    },
    "a-39": {
      id: "a-39",
      title: "Fade In 600",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-39-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-39-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 60,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-39-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-39-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "outQuint",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bfa|6a98e977-8a8b-719d-cc11-51fef9e8bc1b",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691518047839,
    },
    "a-43": {
      id: "a-43",
      title: "Games Card Opacity Loss",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-43-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd5|582837ae-e1c4-9a10-3761-e107b810510f",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-43-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd5|582837ae-e1c4-9a10-3761-e107b810510f",
                },
                value: 0.6,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692023748663,
    },
    "a-44": {
      id: "a-44",
      title: "Games Card Opacity Gain",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: true,
                  id: "650daf38170a105f82911bd5|582837ae-e1c4-9a10-3761-e107b810510f",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692023748663,
    },
    fadeIn: {
      id: "fadeIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    fadeOut: {
      id: "fadeOut",
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
      ],
    },
    slideInRight: {
      id: "slideInRight",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
    slideInLeft: {
      id: "slideInLeft",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: -100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
