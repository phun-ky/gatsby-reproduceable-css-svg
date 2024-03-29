if (!window.noat) {
  window.noat = {};
}

window.noat.cookieConsent = {
  text: 'We\'re using cookies for usage statistics with Google Analytics, to be able to create better documentation',
  privacyPolicyText: 'Cookie policy',
  privacyPolicyUrl: 'https://www.if-insurance.com/about-the-website/cookies',
  denyText: 'Deny',
  allowText: 'Allow',
  useCustomCSS: true
};

!(function (e) {
  var t = {};

  function n(o) {
    if (t[o]) return t[o].exports;

    var r = (t[o] = { i: o, l: !1, exports: {} });

    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
  (n.c = t),
  (n.d = function (e, t, o) {
    n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: o });
  }),
  (n.r = function (e) {
    Object.defineProperty(e, '__esModule', { value: !0 });
  }),
  (n.n = function (e) {
    var t =
        e && e.__esModule
          ? function () {
            return e.default;
          }
          : function () {
            return e;
          };

    return n.d(t, 'a', t), t;
  }),
  (n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }),
  (n.p = ''),
  n((n.s = 3));
})([
  function (e, t, n) {
    'use strict';
    n.r(t),
    n.d(t, 'h', function () {
      return a;
    }),
    n.d(t, 'createElement', function () {
      return a;
    }),
    n.d(t, 'cloneElement', function () {
      return c;
    }),
    n.d(t, 'Component', function () {
      return L;
    }),
    n.d(t, 'render', function () {
      return A;
    }),
    n.d(t, 'rerender', function () {
      return f;
    }),
    n.d(t, 'options', function () {
      return o;
    });

    var o = {};
    var r = [];
    var i = [];

    function a(e, t) {
      var n;
      var a;
      var l;
      var s;
      var c = i;

      for (s = arguments.length; s-- > 2; ) r.push(arguments[s]);
      for (t && null != t.children && (r.length || r.push(t.children), delete t.children); r.length; )
        if ((a = r.pop()) && void 0 !== a.pop) for (s = a.length; s--; ) r.push(a[s]);
        else
          'boolean' == typeof a && (a = null),
          (l = 'function' != typeof e) &&
              (null == a ? (a = '') : 'number' == typeof a ? (a = String(a)) : 'string' != typeof a && (l = !1)),
          l && n ? (c[c.length - 1] += a) : c === i ? (c = [a]) : c.push(a),
          (n = l);

      var u = new (function () {})();

      return (
        (u.nodeName = e),
        (u.children = c),
        (u.attributes = null == t ? void 0 : t),
        (u.key = null == t ? void 0 : t.key),
        void 0 !== o.vnode && o.vnode(u),
        u
      );
    }
    function l(e, t) {
      for (var n in t) e[n] = t[n];

      return e;
    }

    var s = 'function' == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

    function c(e, t) {
      return a(e.nodeName, l(l({}, e.attributes), t), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
    }

    var u = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var p = [];

    function d(e) {
      !e._dirty && (e._dirty = !0) && 1 == p.push(e) && (o.debounceRendering || s)(f);
    }
    function f() {
      var e;
      var t = p;

      for (p = []; (e = t.pop()); ) e._dirty && M(e);
    }
    function m(e, t) {
      return e.normalizedNodeName === t || e.nodeName.toLowerCase() === t.toLowerCase();
    }
    function h(e) {
      var t = l({}, e.attributes);

      t.children = e.children;

      var n = e.nodeName.defaultProps;

      if (void 0 !== n) for (var o in n) void 0 === t[o] && (t[o] = n[o]);

      return t;
    }
    function v(e) {
      var t = e.parentNode;

      t && t.removeChild(e);
    }
    function y(e, t, n, o, r) {
      if (('className' === t && (t = 'class'), 'key' === t));
      else if ('ref' === t) n && n(null), o && o(e);
      else if ('class' !== t || r)
        if ('style' === t) {
          if (
            ((o && 'string' != typeof o && 'string' != typeof n) || (e.style.cssText = o || ''),
            o && 'object' == typeof o)
          ) {
            if ('string' != typeof n) for (var i in n) i in o || (e.style[i] = '');

            for (var i in o) e.style[i] = 'number' == typeof o[i] && !1 === u.test(i) ? o[i] + 'px' : o[i];
          }
        } else if ('dangerouslySetInnerHTML' === t) o && (e.innerHTML = o.__html || '');
        else if ('o' == t[0] && 'n' == t[1]) {
          var a = t !== (t = t.replace(/Capture$/, ''));

          (t = t.toLowerCase().substring(2)),
          o ? n || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a),
          ((e._listeners || (e._listeners = {}))[t] = o);
        } else if ('list' !== t && 'type' !== t && !r && t in e)
          !(function (e, t, n) {
            try {
              e[t] = n;
            } catch (e) {}
          })(e, t, null == o ? '' : o),
          (null != o && !1 !== o) || e.removeAttribute(t);
        else {
          var l = r && t !== (t = t.replace(/^xlink:?/, ''));

          null == o || !1 === o
            ? l
              ? e.removeAttributeNS('http://www.w3.org/1999/xlink', t.toLowerCase())
              : e.removeAttribute(t)
            : 'function' != typeof o &&
              (l ? e.setAttributeNS('http://www.w3.org/1999/xlink', t.toLowerCase(), o) : e.setAttribute(t, o));
        }
      else e.className = o || '';
    }
    function _(e) {
      return this._listeners[e.type]((o.event && o.event(e)) || e);
    }

    var w = [];
    var b = 0;
    var g = !1;
    var x = !1;

    function C() {
      for (var e; (e = w.pop()); ) o.afterMount && o.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
    function k(e, t, n, o, r, i) {
      b++ || ((g = null != r && void 0 !== r.ownerSVGElement), (x = null != e && !('__preactattr_' in e)));

      var a = S(e, t, n, o, i);

      return r && a.parentNode !== r && r.appendChild(a), --b || ((x = !1), i || C()), a;
    }
    function S(e, t, n, o, r) {
      var i = e;
      var a = g;

      if (((null != t && 'boolean' != typeof t) || (t = ''), 'string' == typeof t || 'number' == typeof t))
        return (
          e && void 0 !== e.splitText && e.parentNode && (!e._component || r)
            ? e.nodeValue != t && (e.nodeValue = t)
            : ((i = document.createTextNode(t)), e && (e.parentNode && e.parentNode.replaceChild(i, e), N(e, !0))),
          (i.__preactattr_ = !0),
          i
        );

      var l;
      var s;
      var c = t.nodeName;

      if ('function' == typeof c)
        return (function (e, t, n, o) {
          var r = e && e._component;
          var i = r;
          var a = e;
          var l = r && e._componentConstructor === t.nodeName;
          var s = l;
          var c = h(t);

          for (; r && !s && (r = r._parentComponent); ) s = r.constructor === t.nodeName;
          r && s && (!o || r._component)
            ? (O(r, c, 3, n, o), (e = r.base))
            : (i && !l && (j(i), (e = a = null)),
            (r = E(t.nodeName, c, n)),
            e && !r.nextBase && ((r.nextBase = e), (a = null)),
            O(r, c, 1, n, o),
            (e = r.base),
            a && e !== a && ((a._component = null), N(a, !1)));

          return e;
        })(e, t, n, o);

      if (
        ((g = 'svg' === c || ('foreignObject' !== c && g)),
        (c = String(c)),
        (!e || !m(e, c)) &&
          ((l = c),
          ((s = g
            ? document.createElementNS('http://www.w3.org/2000/svg', l)
            : document.createElement(l)).normalizedNodeName = l),
          (i = s),
          e))
      ) {
        for (; e.firstChild; ) i.appendChild(e.firstChild);
        e.parentNode && e.parentNode.replaceChild(i, e), N(e, !0);
      }

      var u = i.firstChild;
      var p = i.__preactattr_;
      var d = t.children;

      if (null == p) {
        p = i.__preactattr_ = {};
        for (var f = i.attributes, _ = f.length; _--; ) p[f[_].name] = f[_].value;
      }

      return (
        !x &&
        d &&
        1 === d.length &&
        'string' == typeof d[0] &&
        null != u &&
        void 0 !== u.splitText &&
        null == u.nextSibling
          ? u.nodeValue != d[0] && (u.nodeValue = d[0])
          : ((d && d.length) || null != u) &&
            (function (e, t, n, o, r) {
              var i;
              var a;
              var l;
              var s;
              var c;
              var u = e.childNodes;
              var p = [];
              var d = {};
              var f = 0;
              var h = 0;
              var y = u.length;
              var _ = 0;
              var w = t ? t.length : 0;

              if (0 !== y)
                for (var b = 0; b < y; b++) {
                  var g = u[b];
                  var x = g.__preactattr_;
                  var C = w && x ? (g._component ? g._component.__key : x.key) : null;

                  null != C
                    ? (f++, (d[C] = g))
                    : (x || (void 0 !== g.splitText ? !r || g.nodeValue.trim() : r)) && (p[_++] = g);
                }

              if (0 !== w)
                for (var b = 0; b < w; b++) {
                  (s = t[b]), (c = null);

                  var C = s.key;

                  if (null != C) f && void 0 !== d[C] && ((c = d[C]), (d[C] = void 0), f--);
                  else if (!c && h < _)
                    for (i = h; i < _; i++)
                      if (
                        void 0 !== p[i] &&
                        ((k = a = p[i]),
                        (P = r),
                        'string' == typeof (T = s) || 'number' == typeof T
                          ? void 0 !== k.splitText
                          : 'string' == typeof T.nodeName
                            ? !k._componentConstructor && m(k, T.nodeName)
                            : P || k._componentConstructor === T.nodeName)
                      ) {
                        (c = a), (p[i] = void 0), i === _ - 1 && _--, i === h && h++;
                        break;
                      }

                  (c = S(c, s, n, o)),
                  (l = u[b]),
                  c &&
                      c !== e &&
                      c !== l &&
                      (null == l ? e.appendChild(c) : c === l.nextSibling ? v(l) : e.insertBefore(c, l));
                }

              var k;
              var T;
              var P;

              if (f) for (var b in d) void 0 !== d[b] && N(d[b], !1);

              for (; h <= _; ) void 0 !== (c = p[_--]) && N(c, !1);
            })(i, d, n, o, x || null != p.dangerouslySetInnerHTML),
        (function (e, t, n) {
          var o;

          for (o in n) (t && null != t[o]) || null == n[o] || y(e, o, n[o], (n[o] = void 0), g);
          for (o in t)
            'children' === o ||
              'innerHTML' === o ||
              (o in n && t[o] === ('value' === o || 'checked' === o ? e[o] : n[o])) ||
              y(e, o, n[o], (n[o] = t[o]), g);
        })(i, t.attributes, p),
        (g = a),
        i
      );
    }
    function N(e, t) {
      var n = e._component;

      n
        ? j(n)
        : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null),
        (!1 !== t && null != e.__preactattr_) || v(e),
        T(e));
    }
    function T(e) {
      for (e = e.lastChild; e; ) {
        var t = e.previousSibling;

        N(e, !0), (e = t);
      }
    }

    var P = {};

    function E(e, t, n) {
      var o;
      var r = P[e.name];

      if (
        (e.prototype && e.prototype.render
          ? ((o = new e(t, n)), L.call(o, t, n))
          : (((o = new L(t, n)).constructor = e), (o.render = U)),
        r)
      )
        for (var i = r.length; i--; )
          if (r[i].constructor === e) {
            (o.nextBase = r[i].nextBase), r.splice(i, 1);
            break;
          }

      return o;
    }
    function U(e, t, n) {
      return this.constructor(e, n);
    }
    function O(e, t, n, r, i) {
      e._disable ||
        ((e._disable = !0),
        (e.__ref = t.ref) && delete t.ref,
        (e.__key = t.key) && delete t.key,
        !e.base || i
          ? e.componentWillMount && e.componentWillMount()
          : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r),
        r && r !== e.context && (e.prevContext || (e.prevContext = e.context), (e.context = r)),
        e.prevProps || (e.prevProps = e.props),
        (e.props = t),
        (e._disable = !1),
        0 !== n && (1 !== n && !1 === o.syncComponentUpdates && e.base ? d(e) : M(e, 1, i)),
        e.__ref && e.__ref(e));
    }
    function M(e, t, n, r) {
      if (!e._disable) {
        var i;
        var a;
        var s;
        var c = e.props;
        var u = e.state;
        var p = e.context;
        var d = e.prevProps || c;
        var f = e.prevState || u;
        var m = e.prevContext || p;
        var v = e.base;
        var y = e.nextBase;
        var _ = v || y;
        var g = e._component;
        var x = !1;

        if (
          (v &&
            ((e.props = d),
            (e.state = f),
            (e.context = m),
            2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, u, p)
              ? (x = !0)
              : e.componentWillUpdate && e.componentWillUpdate(c, u, p),
            (e.props = c),
            (e.state = u),
            (e.context = p)),
          (e.prevProps = e.prevState = e.prevContext = e.nextBase = null),
          (e._dirty = !1),
          !x)
        ) {
          (i = e.render(c, u, p)), e.getChildContext && (p = l(l({}, p), e.getChildContext()));

          var S;
          var T;
          var P = i && i.nodeName;

          if ('function' == typeof P) {
            var U = h(i);

            (a = g) && a.constructor === P && U.key == a.__key
              ? O(a, U, 1, p, !1)
              : ((S = a),
              (e._component = a = E(P, U, p)),
              (a.nextBase = a.nextBase || y),
              (a._parentComponent = e),
              O(a, U, 0, p, !1),
              M(a, 1, n, !0)),
            (T = a.base);
          } else
            (s = _),
            (S = g) && (s = e._component = null),
            (_ || 1 === t) && (s && (s._component = null), (T = k(s, i, p, n || !v, _ && _.parentNode, !0)));

          if (_ && T !== _ && a !== g) {
            var L = _.parentNode;

            L && T !== L && (L.replaceChild(T, _), S || ((_._component = null), N(_, !1)));
          }

          if ((S && j(S), (e.base = T), T && !r)) {
            for (var A = e, D = e; (D = D._parentComponent); ) (A = D).base = T;
            (T._component = A), (T._componentConstructor = A.constructor);
          }
        }

        if (
          (!v || n
            ? w.unshift(e)
            : x || (e.componentDidUpdate && e.componentDidUpdate(d, f, m), o.afterUpdate && o.afterUpdate(e)),
          null != e._renderCallbacks)
        )
          for (; e._renderCallbacks.length; ) e._renderCallbacks.pop().call(e);

        b || r || C();
      }
    }
    function j(e) {
      o.beforeUnmount && o.beforeUnmount(e);

      var t = e.base;

      (e._disable = !0), e.componentWillUnmount && e.componentWillUnmount(), (e.base = null);

      var n = e._component;

      n
        ? j(n)
        : t &&
          (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null),
          (e.nextBase = t),
          v(t),
          (function (e) {
            var t = e.constructor.name;

            (P[t] || (P[t] = [])).push(e);
          })(e),
          T(t)),
      e.__ref && e.__ref(null);
    }
    function L(e, t) {
      (this._dirty = !0), (this.context = t), (this.props = e), (this.state = this.state || {});
    }
    function A(e, t, n) {
      return k(n, e, {}, !1, t, !1);
    }
    l(L.prototype, {
      setState: function (e, t) {
        var n = this.state;

        this.prevState || (this.prevState = l({}, n)),
        l(n, 'function' == typeof e ? e(n, this.props) : e),
        t && (this._renderCallbacks = this._renderCallbacks || []).push(t),
        d(this);
      },
      forceUpdate: function (e) {
        e && (this._renderCallbacks = this._renderCallbacks || []).push(e), M(this, 2);
      },
      render: function () {}
    });

    var D = { h: a, createElement: a, cloneElement: c, Component: L, render: A, rerender: f, options: o };

    t.default = D;
  },
  function (e, t, n) {
    'use strict';
    t.__esModule = !0;

    var o =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];

          for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }

        return e;
      };
    var r = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];

          (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
        }
      }

      return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
      };
    })();
    var i = n(0);
    var a = (function (e) {
      function t() {
        !(function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        })(this, t);

        var n = (function (e, t) {
          if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');

          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
        })(this, e.call(this, window));

        return (
          (n.state = { answered: !1 }),
          (n.handleAllow = n.handleAllow.bind(n)),
          (n.handleDeny = n.handleDeny.bind(n)),
          n
        );
      }

      return (
        (function (e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function, not ' + typeof t);

          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
          })),
          t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        })(t, e),
        (t.prototype.handleAllow = function () {
          var e = new Date();

          e.setDate(e.getDate() + 30),
          (document.cookie = 'cookieconsent_status=allow; expires=' + e.toUTCString()),
          this.setState({ answered: !0 });
        }),
        (t.prototype.handleDeny = function () {
          (document.cookie = 'cookieconsent_status=deny'), this.setState({ answered: !0 });
        }),
        (t.prototype.render = function () {
          var e = window.noat && window.noat.cookieConsent && window.noat.cookieConsent.useCustomCSS ? {} : null;
          var t = window.innerWidth < 640;

          return (0, i.h)(
            'div',
            {
              className: `noat-cookie__consent ${this.state.answered ? 'is-answered' : ''}`,
              style:
                e ||
                o(
                  {
                    position: 'fixed',
                    zIndex: 2147483647,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    transition: 'transform .3s ease-out',
                    transform: 'translateY(' + (this.state.answered ? '100%' : '0') + ')'
                  },
                  {}
                )
            },
            (0, i.h)(
              'div',
              {
                className: 'noat-cookie-consent__banner',
                style:
                  e ||
                  o(
                    {
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '1em',
                      fontFamily: 'Sans-Serif',
                      background: 'rgba(0,0,0,.8)',
                      color: ' #fafafa'
                    },
                    t ? { flexFlow: 'column' } : {}
                  )
              },
              (0, i.h)(
                'span',
                { className: 'noat-cookie-consent-banner__text', style: e || o({ alignSelf: 'center' }, {}) },
                this.text
              ),
              (0, i.h)(
                'span',
                {
                  className: 'noat-cookie-consent-banner__other-actions',
                  style:
                    e ||
                    o(
                      {
                        flexGrow: 1,
                        padding: '0 2em',
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'center',
                        whiteSpace: 'nowrap',
                        opacity: 0.8,
                        fontSize: '75%'
                      },
                      t ? { padding: '1em 0' } : {}
                    )
                },
                (0, i.h)(
                  'a',
                  {
                    className: 'noat-cookie-consent-banner-other-actions__privacy-policy if button text',
                    style: e || o({ color: 'inherit' }, {}),
                    target: 'newPricayPolicy',
                    href: this.privacyPolicyUrl
                  },
                  this.privacyPolicyText
                ),
                (0, i.h)(
                  'a',
                  {
                    className: 'noat-cookie-consent-banner-other-actions__deny if button text',
                    style: e || o({ color: 'inherit' }, {}),
                    href: '#',
                    onClick: this.handleDeny
                  },
                  this.denyText
                )
              ),
              (0, i.h)(
                'button',
                {
                  type: 'button',
                  tabindex: 0,
                  className: 'noat-cookie-consent-banner__allow if button secondary',
                  style:
                    e ||
                    o(
                      {
                        display: 'flex',
                        alignItems: 'center',
                        alignSelf: 'center',
                        maxHeight: '5em',
                        minHeight: '5em',
                        padding: '0 2em',
                        background: '#38e',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      },
                      t ? { justifyContent: 'center', alignSelf: 'auto' } : {}
                    ),
                  onClick: this.handleAllow
                },
                this.allowText
              )
            )
          );
        }),
        r(t, [
          {
            key: 'text',
            get: function () {
              return (
                (window.noat && window.noat.cookieConsent && window.noat.cookieConsent.text) ||
                'This website is using Cookies to improve your browsing experience.'
              );
            }
          },
          {
            key: 'privacyPolicyText',
            get: function () {
              return (
                (window.noat && window.noat.cookieConsent && window.noat.cookieConsent.privacyPolicyText) ||
                'Cookie Policy'
              );
            }
          },
          {
            key: 'privacyPolicyUrl',
            get: function () {
              return (
                (window.noat && window.noat.cookieConsent && window.noat.cookieConsent.privacyPolicyUrl) ||
                '/disclaimer'
              );
            }
          },
          {
            key: 'denyText',
            get: function () {
              return (
                (window.noat && window.noat.cookieConsent && window.noat.cookieConsent.denyText) || 'Disable Cookies'
              );
            }
          },
          {
            key: 'allowText',
            get: function () {
              return (window.noat && window.noat.cookieConsent && window.noat.cookieConsent.allowText) || 'Accept';
            }
          }
        ]),
        t
      );
    })(i.Component);

    t.default = a;
  },
  function (e, t, n) {
    'use strict';
    /*!
     * cookie
     * Copyright(c) 2012-2014 Roman Shtylman
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     */
    (t.parse = function (e, t) {
      if ('string' != typeof e) throw new TypeError('argument str must be a string');

      for (var n = {}, r = t || {}, a = e.split(i), s = r.decode || o, c = 0; c < a.length; c++) {
        var u = a[c];
        var p = u.indexOf('=');

        if (!(p < 0)) {
          var d = u.substr(0, p).trim();
          var f = u.substr(++p, u.length).trim();

          '"' == f[0] && (f = f.slice(1, -1)), void 0 == n[d] && (n[d] = l(f, s));
        }
      }

      return n;
    }),
    (t.serialize = function (e, t, n) {
      var o = n || {};
      var i = o.encode || r;

      if ('function' != typeof i) throw new TypeError('option encode is invalid');

      if (!a.test(e)) throw new TypeError('argument name is invalid');

      var l = i(t);

      if (l && !a.test(l)) throw new TypeError('argument val is invalid');

      var s = e + '=' + l;

      if (null != o.maxAge) {
        var c = o.maxAge - 0;

        if (isNaN(c)) throw new Error('maxAge should be a Number');

        s += '; Max-Age=' + Math.floor(c);
      }

      if (o.domain) {
        if (!a.test(o.domain)) throw new TypeError('option domain is invalid');

        s += '; Domain=' + o.domain;
      }

      if (o.path) {
        if (!a.test(o.path)) throw new TypeError('option path is invalid');

        s += '; Path=' + o.path;
      }

      if (o.expires) {
        if ('function' != typeof o.expires.toUTCString) throw new TypeError('option expires is invalid');

        s += '; Expires=' + o.expires.toUTCString();
      }

      o.httpOnly && (s += '; HttpOnly');
      o.secure && (s += '; Secure');

      if (o.sameSite) {
        var u = 'string' == typeof o.sameSite ? o.sameSite.toLowerCase() : o.sameSite;

        switch (u) {
          case !0:
            s += '; SameSite=Strict';
            break;
          case 'lax':
            s += '; SameSite=Lax';
            break;
          case 'strict':
            s += '; SameSite=Strict';
            break;
          default:
            throw new TypeError('option sameSite is invalid');
        }
      }

      return s;
    });

    var o = decodeURIComponent;
    var r = encodeURIComponent;
    var i = /; */;
    var a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

    function l(e, t) {
      try {
        return t(e);
      } catch (t) {
        return e;
      }
    }
  },
  function (e, t, n) {
    'use strict';

    var o = n(0);
    var r = a(n(2));
    var i = a(n(1));

    function a(e) {
      return e && e.__esModule ? e : { default: e };
    }
    window.addEventListener('load', function () {
      var e = r.default.parse(document.cookie);
      var t =
        window.document.getElementById('noat-cookie-consent__setup') ||
        window.document.querySelector('.noat-cookie-consent__setup');

      t &&
        t.addEventListener('click', function (e) {
          e.stopPropagation(), (0, o.render)((0, o.h)(i.default, null), document.body);
        }),
      e.cookieconsent_status || (0, o.render)((0, o.h)(i.default, null), document.body);
    });
  }
]);
