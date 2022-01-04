!(function (t) {
  'function' == typeof define && define.amd ? define(t) : t();
})(function () {
  'use strict';
  const t = t => (t % 4 == 0 && t % 100 != 0) || t % 400 == 0,
    e = (e, a) =>
      1 === e || 3 === e || 5 === e || 7 === e || 8 === e || 10 === e || 12 === e
        ? 31
        : 4 === e || 6 === e || 9 === e || 11 === e
          ? 30
          : 2 === e && t(a)
            ? 29
            : 2 !== e || t(a)
              ? void 0
              : 28;
  var a = Object.freeze({
    __proto__: null,
    isLeapYear: t,
    getMonthDays: e,
    generateDayArray: (t, a, s) => {
      let i;
      const n = t.getDay(),
        l = t.getMonth() + 1,
        r = t.getFullYear();
      let o = e(l, r);
      t.setDate(t.getDate() - 1);
      const d = t.getMonth() + 1,
        h = t.getFullYear();
      let c = e(d, h);
      if (0 === n) for (i = 0; i < 6; i++) a.unshift(c), c--, s.push(!0);
      else for (i = 0; i < n - 1; i++) a.unshift(c), c--, s.push(!0);
      for (i = 0; i < o; i++) a.push(i + 1), s.push(!1);
      const u = 42 - a.length;
      for (i = 0; i < u; i++) a.push(i + 1), s.push(!0);
    },
    getDayNames: (t = 'en', e = 'short') => {
      const a = new Intl.DateTimeFormat(t, { weekday: e }),
        s = [1, 2, 3, 4, 5, 6, 7].map(t => new Date(`2021-03-${t < 10 ? `0${t}` : t}T00:00:00+00:00`));
      return 'lv' === t && 'short' === e
        ? s.map((t, e) => (6 !== e ? a.format(t).slice(0, 1) : a.format(t).slice(0, 2)))
        : s.map(t => a.format(t));
    },
    getMonthNames: (t = 'en', e = 'long') => {
      const a = new Intl.DateTimeFormat(t, { month: e });
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        .map(t => new Date(`2017-${t < 10 ? `0${t}` : t}-01T00:00:00+00:00`))
        .map(t => a.format(t));
    },
    getDaysOfPreviousMonth: (t, a) => (0 === t ? ((t = 11), a--) : t--, e(t + 1, a)),
    isWeekend: (t, e, a) => {
      const s = new Date(t, e);
      s.setDate(a);
      const i = s.getDay();
      return 6 === i || 0 === i;
    }
  });
  const s = t => {
      const e = t.target,
        a = e.getAttribute('title');
      a && null !== a && '' !== a && (e.setAttribute('data-tooltip', a), e.removeAttribute('title'));
    },
    i = t => {
      const e = t.target,
        a = e.getAttribute('data-tooltip');
      a && null !== a && '' !== a && e.setAttribute('title', a);
    },
    n = () => {
      document.querySelectorAll('abbr').forEach(t => {
        t.removeEventListener('mouseenter', s),
        t.removeEventListener('mouseleave', i),
        t.addEventListener('mouseenter', s),
        t.addEventListener('mouseleave', i);
      });
    };
  var l = Object.freeze({ __proto__: null, mouseenter: s, mouseleave: i, init: n, default: n });
  var r = Object.freeze({
    __proto__: null,
    create: t => {
      const e = new Date(t);
      if (e instanceof Date && !isNaN(e.valueOf())) return e;
      throw Error('Invalid Date');
    },
    isValid: (t, a, s) => {
      if (a < 1 || a > 12) return !1;
      const i = e(a, s);
      return !(t < 1 || t > i);
    },
    getNewDateObject: (t, e, a) => {
      const s = new Date(t, e);
      return s.setDate(a), s;
    }
  });
  const o = t => {
      const e = t.parentElement.querySelector('.if.open');
      if (!e) return;
      const a = t.parentElement.getBoundingClientRect(),
        s = t.getBoundingClientRect(),
        i = e.getBoundingClientRect();
      (e.style.top = s.top - a.top + s.height / 2 - i.height / 2 + 'px'), (e.style.left = s.width - 48 + 'px');
    },
    d = t => {
      window.addEventListener('resize', () => {
        window.requestAnimationFrame(function () {
          o(t);
        });
      });
    },
    h = t => {
      const e = () => {
        o(t);
      };
      'loading' === document.readyState
        ? (document.removeEventListener('DOMContentLoaded', e), document.addEventListener('DOMContentLoaded', e))
        : o(t);
    };
  var c = Object.freeze({
    __proto__: null,
    position: o,
    onResize: d,
    onDOMContentLoaded: h,
    init: t => {
      d(t), h(t);
    }
  });
  const u = {
    no: { format: 'DD.MM.YYYY', example: '10.11.1983', regex: '(\\d{1,2})[.](\\d{1,2})[.](\\d{4})' },
    sv: { format: 'YYYY-MM-DD', example: '1983-11-10', regex: '(\\d{4})[-](\\d{1,2})[-](\\d{1,2})' },
    da: { format: 'DD.MM.YYYY', example: '10.11.1983', regex: '(\\d{1,2})[.](\\d{1,2})[.](\\d{4})' },
    fi: { format: 'DD.MM.YYYY', example: '10.11.1983', regex: '(\\d{1,2})[.](\\d{1,2})[.](\\d{4})' },
    et: { format: 'DD.MM.YYYY', example: '10.11.1983', regex: '(\\d{1,2})[.](\\d{1,2})[.](\\d{4})' },
    lv: { format: 'DD.MM.YYYY', example: '10.11.1983', regex: '(\\d{1,2})[.](\\d{1,2})[.](\\d{4})' },
    lt: { format: 'YYYY-MM-DD', example: '1983-11-10', regex: '(\\d{4})[-](\\d{1,2})[-](\\d{1,2})' },
    ru: { format: 'DD.MM.YYYY', example: '10.11.1983', regex: '(\\d{1,2})[.](\\d{1,2})[.](\\d{4})' },
    kl: { format: 'YYYY-MM-DD', example: '1983-11-10', regex: '(\\d{4})[-](\\d{1,2})[-](\\d{1,2})' },
    en: { format: 'DD/MM/YYYY', example: '10/11/1983', regex: '(\\d{1,2})[/](\\d{1,2})[/](\\d{4})' }
  };
  var y = Object.freeze({
    __proto__: null,
    list: u,
    getFormatByLocale: t => (['no', 'sv', 'da', 'fi', 'et', 'lv', 'lt', 'ru', 'kl', 'en'].includes(t) ? u[t] : u.no)
  });
  const p = function (t) {
    function e() {}
    return (
      (e.el = t),
      (e.from = function (t) {
        this.fromEl = t;
        const e = this;
        return (
          requestAnimationFrame(function () {
            (e.fromElRect = e.fromEl.getBoundingClientRect()),
            (e.el.style.top = e.fromEl.offsetTop + e.fromElRect.height - 1 + 'px');
          }),
          this
        );
      }),
      e
    );
  };
  class m extends HTMLElement {
    constructor() {
      super(),
      (this.MQSmall = window.matchMedia('screen and (min-width: 60rem)')),
      (this.isLargerThanMobile = !0),
      (this._shadowRoot = this.attachShadow({ mode: 'open' })),
      (this.locale = navigator.language || 'en'),
      (this.dayNames = a.getDayNames(this.locale)),
      (this.dayNamesLong = a.getDayNames(this.locale, 'long')),
      (this.monthNames = a.getMonthNames(this.locale)),
      (this.persistOnSelect = !1),
      (this.longPressThreshold = 500),
      (this.longPressInterval = 150),
      (this.currentYear = null),
      (this.initDate = null),
      (this.initOpen = !1),
      (this.disableWeekend = !1),
      (this.usePatternValidation = !1),
      (this.minDate = null),
      (this.maxDate = null),
      (this.ignoreOnFocus = !1),
      (this._inputStrIsValidDate = !1),
      (this._longPressIntervalIds = []),
      (this._longPressTimerIds = []),
      (this._calTemplate =
          '\n    <style>\n    @font-face{font-display:swap;font-family:If Sans Thin;font-style:normal;font-weight:400;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Thin Italic;font-weight:400;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Light;font-style:normal;font-weight:400;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Light Italic;font-weight:400;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff")}@font-face{font-family:If Sans Fallback;font-style:normal;font-weight:400;src:url(fonts/IfSans-Regular.woff2) format("woff2"),url(fonts/IfSans-Regular.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans;font-style:normal;font-weight:400;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Italic;font-weight:400;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Medium;font-style:normal;font-weight:400;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Medium Italic;font-weight:400;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Bold;font-style:normal;font-weight:400;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff")}@font-face{font-display:swap;font-family:If Sans Bold Italic;font-weight:400;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff")}.if.datepicker{box-sizing:border-box}.if.datepicker *,.if.datepicker ::after,.if.datepicker ::before{box-sizing:border-box;margin:0;padding:0}.if.datepicker{background-color:#faf9f7;border-radius:0;bottom:0;box-shadow:0 8px 4px -2px #6e625e14,0 20px 32px #6e625e3d;color:#331e11;display:none;font-family:If Sans,Arial,sans-serif;font-size:1.125rem;font-variation-settings:"wght" 78;font-weight:400;height:auto;left:0;margin:0;max-height:none;max-width:none;padding:3.75rem 1.5rem 1.5rem;position:fixed;top:auto;width:100%;z-index:900}@media screen and (min-width:60rem){.if.datepicker{border:1pt solid #6e625e33;bottom:auto;box-shadow:0 8px 4px -2px #6e625e14,0 16px 24px #6e625e33;height:auto;left:auto;padding:.75rem;position:absolute;top:calc(100% - 1px);width:320px;z-index:600}}input[type=date].if.has-external-initiator,input[type=text].if.date.has-external-initiator{background-image:none;cursor:text}input[type=date].if.has-external-initiator~label.if,input[type=text].if.date.has-external-initiator~label.if{order:1}input[type=date].if.has-external-initiator~.if.input-error,input[type=date].if.has-external-initiator~.if.input-help,input[type=text].if.date.has-external-initiator~.if.input-error,input[type=text].if.date.has-external-initiator~.if.input-help{order:3}input[type=date].if.has-external-initiator~.if.open,input[type=text].if.date.has-external-initiator~.if.open{background-color:initial;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cg class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'1.5\' fill=\'none\' stroke=\'%23331e11\' stroke-miterlimit=\'10\'%3E%3Cpath data-color=\'color-2\' d=\'M9 1v4M23 1v4\'/%3E%3Cpath data-cap=\'butt\' data-color=\'color-2\' stroke-linecap=\'butt\' d=\'M31 11H1\'/%3E%3Cpath d=\'M1 5h30v24H1z\'/%3E%3C/g%3E%3C/svg%3E");background-position:right .75rem center;background-repeat:no-repeat;background-size:1.5rem 1.5rem;border:none;cursor:pointer;height:3rem;order:2;position:absolute;width:3rem}.if.datepicker .if.close{background-color:initial;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cg class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'2.5\' fill=\'none\' stroke=\'%23331e11\' stroke-miterlimit=\'10\'%3E%3Cpath d=\'M27 5 5 27M27 27 5 5\'/%3E%3C/g%3E%3C/svg%3E");background-position:50%;background-repeat:no-repeat;background-size:1.25rem 1.25rem;border:none;cursor:pointer;display:block;height:1.25rem;margin:0;padding:0;position:absolute;right:1.5rem;top:1.5rem;width:1.25rem}.if.datepicker .if.close::after{background:#0000;content:"";display:block;height:3rem;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:3rem}@media screen and (min-width:60rem){.if.datepicker .if.close{display:none}}.if.backdrop.is-open+.if.datepicker,.if.datepicker.is-open{animation:ifKeyframesShowDatepicker .3s ease-in-out forwards;display:block}.if.datepicker>.if.header{align-items:center;background-color:initial;display:flex;height:2.25rem;justify-content:center;margin:0;min-height:auto;overflow:visible;padding:0;position:relative;width:100%}.if.datepicker>.if.header .if.title{appearance:none;-webkit-appearance:none;background-color:initial;border:none;border-radius:0;cursor:pointer;flex-grow:1;font-family:If Sans Bold,Arial,sans-serif;font-size:1.125rem;font-variation-settings:"wght" 126;font-variation-settings:"wgth" 126;font-weight:400;margin:0;padding:0;text-align:center;text-transform:capitalize;white-space:nowrap}.if.datepicker>.if.header button.if.next,.if.datepicker>.if.header button.if.previous{background-color:initial;background-position:50%;background-repeat:no-repeat;background-size:2rem 2rem;border:none;bottom:auto;cursor:pointer;flex-grow:0;flex-shrink:0;height:2rem;left:auto;margin:0;position:relative;right:auto;top:auto;transform:none;width:2rem}.if.datepicker>.if.header button.if.next::after,.if.datepicker>.if.header button.if.previous::after{background:#0000;content:"";display:block;height:3rem;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:3rem}@media screen and (min-width:60rem){.if.datepicker>.if.header button.if.next,.if.datepicker>.if.header button.if.previous{background-size:1.5rem 1.5rem}}.if.datepicker>.if.header .if.next.month{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'none\' stroke-miterlimit=\'10\' d=\'m13 10 6 6-6 6\' class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'2\' stroke=\'%230054f0\'/%3E%3C/svg%3E");left:auto;position:relative;right:auto;transform:none}.if.datepicker>.if.header .if.previous.month{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'none\' stroke-miterlimit=\'10\' d=\'m19 22-6-6 6-6\' class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'2\' stroke=\'%230054f0\'/%3E%3C/svg%3E");left:auto;position:relative;right:auto;transform:none}.if.datepicker>.if.header .if.next.year{background-color:initial;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'none\' stroke-miterlimit=\'10\' d=\'m13 10 6 6-6 6\' class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'2\' stroke=\'%230054f0\'/%3E%3C/svg%3E"),url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'none\' stroke-miterlimit=\'10\' d=\'m13 10 6 6-6 6\' class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'2\' stroke=\'%230054f0\'/%3E%3C/svg%3E");background-position:left -3px center,left 3px center;background-size:2rem 2rem,2rem 2rem;left:auto;position:relative;right:auto;transform:none}@media screen and (min-width:60rem){.if.datepicker>.if.header .if.next.year{background-position:left 2px center,left 7px center;background-size:1.5rem 1.5rem,1.5rem 1.5rem}}.if.datepicker>.if.header .if.previous.year{background-color:initial;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'none\' stroke-miterlimit=\'10\' d=\'m19 22-6-6 6-6\' class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'2\' stroke=\'%230054f0\'/%3E%3C/svg%3E"),url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'none\' stroke-miterlimit=\'10\' d=\'m19 22-6-6 6-6\' class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'2\' stroke=\'%230054f0\'/%3E%3C/svg%3E");background-position:left -3px center,left 3px center;background-size:2rem 2rem,2rem 2rem;left:auto;position:relative;right:auto;transform:none}@media screen and (min-width:60rem){.if.datepicker>.if.header .if.previous.year{background-position:left 2px center,left 7px center;background-size:1.5rem 1.5rem,1.5rem 1.5rem}}.if.datepicker>table.if.calendar{background-color:initial;border:none;border-collapse:collapse;border-spacing:0;box-shadow:none;margin:0 auto;max-width:100%;padding:0;position:relative;table-layout:fixed;width:100%}.if.datepicker>table.if.calendar>thead.if>tr.if>th.if{background-color:initial;border:none;color:#6e625ecc;cursor:auto;font-family:If Sans Bold,Arial,sans-serif;font-size:.9375rem;font-variation-settings:"wght" 126;font-variation-settings:"wgth" 126;font-weight:400;letter-spacing:normal;line-height:1.5rem;padding:.5rem 0;position:relative;text-align:center;text-transform:uppercase;transition:all .1s cubic-bezier(.4,0,.2,1);vertical-align:top}@media screen and (min-width:60rem){.if.datepicker>table.if.calendar>thead.if>tr.if>th.if{height:2.25rem;width:2.25rem}}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if{background-color:initial;border:1px solid #f1ece8;color:#331e11;cursor:pointer;font-family:If Sans,Arial,sans-serif;font-size:1.125rem;font-variation-settings:"wght" 78;font-weight:400;letter-spacing:normal;line-height:1.5rem;padding:0;position:relative;text-align:center;transition:all .1s cubic-bezier(.4,0,.2,1);user-select:none;vertical-align:top}@media screen and (min-width:60rem){.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if{height:2.25rem;width:2.25rem}}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.today{background-color:inherit;color:inherit;outline:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.today::before{font-family:If Sans Bold,Arial,sans-serif;font-variation-settings:"wght" 126;font-weight:400}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-active{background-color:#0054f0;border:none;color:#faf9f7}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-selecting,.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-selecting-start{background-color:#0054f033;border:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-selecting-end{background-color:#0054f033;border:none;color:#331e11}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-selected-start{background-color:#0054f0;border:none;color:#faf9f7;outline:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-selected{background-color:#e8e0d9;border:none;color:#331e11;outline:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-selected-end{background-color:#0054f0;border:none;color:#faf9f7;outline:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-hidden{display:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-special-day:not(.is-active):not(.is-selected){background-color:#ffc9a6;color:#331e11}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-hovered,.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if:hover{background-color:#0054f033;border:none;color:#331e11;outline:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.non-selectable-day{border:none;color:#6e625e66;pointer-events:none;user-select:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.non-selectable-day.is-hovered,.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.non-selectable-day:hover{background-color:none}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if::before{align-items:center;bottom:0;content:attr(data-day);display:flex;font-family:If Sans,Arial,sans-serif;font-variation-settings:"wght" 78;font-weight:400;justify-content:center;left:0;position:absolute;right:0;top:0}.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if::after{content:"";display:block;margin-top:100%}@media screen and (min-width:60rem){.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if::after{content:none}}@-moz-keyframes ifKeyframesShowDatepicker{0%{display:none;opacity:0}1%{display:flex;opacity:0}to{display:flex;opacity:1}}@-webkit-keyframes ifKeyframesShowDatepicker{0%{display:none;opacity:0}1%{display:flex;opacity:0}to{display:flex;opacity:1}}@-o-keyframes ifKeyframesShowDatepicker{0%{display:none;opacity:0}1%{display:flex;opacity:0}to{display:flex;opacity:1}}@keyframes ifKeyframesShowDatepicker{0%{display:none;opacity:0}1%{display:flex;opacity:0}to{display:flex;opacity:1}}.if.datepicker .if.close.is-focused,.if.datepicker .if.close:focus,.if.datepicker>.if.header button.if.next.is-focused,.if.datepicker>.if.header button.if.next:focus,.if.datepicker>.if.header button.if.previous.is-focused,.if.datepicker>.if.header button.if.previous:focus,.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-focused,.if.datepicker>table.if.calendar>tbody.if>tr.if>td.if:focus{box-shadow:inset 0 0 0 .25rem #0054f0;outline:none;outline-offset:0}.if.datepicker>table.if.table>tbody>tr.is-focused-within,.if.datepicker>table.if.table>tbody>tr:focus-within,.if.datepicker>table.if>tbody>tr.is-focused-within,.if.datepicker>table.if>tbody>tr:focus-within{outline:none}[data-whatintent=mouse] .if.datepicker .if.close.is-focused,[data-whatintent=mouse] .if.datepicker .if.close:focus,[data-whatintent=mouse] .if.datepicker>.if.header button.if.next.is-focused,[data-whatintent=mouse] .if.datepicker>.if.header button.if.next:focus,[data-whatintent=mouse] .if.datepicker>.if.header button.if.previous.is-focused,[data-whatintent=mouse] .if.datepicker>.if.header button.if.previous:focus,[data-whatintent=mouse] .if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-focused,[data-whatintent=mouse] .if.datepicker>table.if.calendar>tbody.if>tr.if>td.if:focus,[data-whatintent=touch] .if.datepicker .if.close.is-focused,[data-whatintent=touch] .if.datepicker .if.close:focus,[data-whatintent=touch] .if.datepicker>.if.header button.if.next.is-focused,[data-whatintent=touch] .if.datepicker>.if.header button.if.next:focus,[data-whatintent=touch] .if.datepicker>.if.header button.if.previous.is-focused,[data-whatintent=touch] .if.datepicker>.if.header button.if.previous:focus,[data-whatintent=touch] .if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-focused,[data-whatintent=touch] .if.datepicker>table.if.calendar>tbody.if>tr.if>td.if:focus{box-shadow:none;outline:none}[data-whatinput=keyboard] .if.datepicker .if.close.is-focused,[data-whatinput=keyboard] .if.datepicker .if.close:focus,[data-whatinput=keyboard] .if.datepicker>.if.header button.if.next.is-focused,[data-whatinput=keyboard] .if.datepicker>.if.header button.if.next:focus,[data-whatinput=keyboard] .if.datepicker>.if.header button.if.previous.is-focused,[data-whatinput=keyboard] .if.datepicker>.if.header button.if.previous:focus{box-shadow:none;outline:3px solid #f09c00;outline-offset:0}[data-whatinput=keyboard] .if.datepicker>table.if.calendar>tbody.if>tr.if>td.if.is-focused,[data-whatinput=keyboard] .if.datepicker>table.if.calendar>tbody.if>tr.if>td.if:focus{box-shadow:inset 0 0 0 3px #f09c00;outline:none;outline-offset:0}.if.backdrop{background-color:#6e625e66;bottom:0;display:block;left:0;opacity:0;pointer-events:none;position:fixed;right:0;top:0;transition:all .3s ease-in;z-index:700}.if.backdrop.is-open{animation:ifKeyframesShowBackdrop .2s ease-in forwards;pointer-events:auto}@-moz-keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{display:block;opacity:1}}@-webkit-keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{display:block;opacity:1}}@-o-keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{display:block;opacity:1}}@keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{display:block;opacity:1}}\n    </style>\n    <div class="if backdrop" role="presentation"></div>\n    <div class="if datepicker" tabindex="0" aria-labelledby="ids-datepicker-control-title" aria-modal="true" role="dialog" aria-live="polite">\n    <button type="button" class="if close" aria-label="Close"></button>\n    <div class="if header">\n      <button id="ids-datepicker-control-prev-year" class="if previous year control" type="button" aria-label="Previous year"></button>\n      <button id="ids-datepicker-control-prev-month" class="if previous month control" type="button" aria-label="Previous month"></button>\n      <button type="button" aria-live="polite" class="if title" id="ids-datepicker-control-title"></button>\n      <button id="ids-datepicker-control-next-month" class="if next month control" type="button" aria-label="Next month"></button>\n      <button id="ids-datepicker-control-next-year" class="if next year control" type="button" aria-label="Next year"></button>\n    </div>\n      <table class="if calendar" role="grid">\n      <thead class="if">\n        <tr class="if">\n          <th class="if dayName" scope="col"></th>\n          <th class="if dayName" scope="col"></th>\n          <th class="if dayName" scope="col"></th>\n          <th class="if dayName" scope="col"></th>\n          <th class="if dayName" scope="col"></th>\n          <th class="if dayName" scope="col"></th>\n          <th class="if dayName" scope="col"></th>\n        </tr>\n      </thead>\n        <tbody class="if">\n        <tr class="if">\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        </tr>\n        <tr class="if">\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        </tr>\n        <tr class="if">\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        </tr>\n        <tr class="if">\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        </tr>\n        <tr class="if">\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        </tr>\n        <tr class="if">\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        <td class="if day"></td>\n        </tr>\n        </tbody>\n      </table>\n    </div>');
    }
    static get observedAttributes() {
      return [
        'data-min-date',
        'data-max-date',
        'data-locale',
        'data-disable-weekend',
        'data-init-date',
        'data-use-pattern',
        'data-open',
        'data-ignore-on-focus',
        'data-persist-on-select'
      ];
    }
    disconnectedCallback() {}
    updateLocale(t) {
      (this.locale = t),
      (this.dayNames = a.getDayNames(this.locale)),
      (this.dayNamesLong = a.getDayNames(this.locale, 'long')),
      (this.monthNames = a.getMonthNames(this.locale)),
      this._populateDayNames(),
      this._setPlaceholderValue(),
      this._updateInputLocaleValue(),
      l.init();
    }
    _updateInputLocaleValue() {
      const t = this.textInputElement.getAttribute('data-iso-value');
      if (t) {
        const e = new Date(t);
        this.setInputValue(this._returnDateString(e));
      }
    }
    attributeChangedCallback(t, e, s) {
      'data-init-date' === t
        ? (this.initDate = s)
        : 'data-min-date' === t
          ? (this.minDate = s)
          : 'data-disable-weekend' === t
            ? (this.disableWeekend = !0)
            : 'data-use-pattern' === t
              ? (this.usePatternValidation = !0)
              : 'data-open' === t
                ? (this.initOpen = !0)
                : 'data-max-date' === t
                  ? (this.maxDate = s)
                  : 'data-locale' === t
                    ? ((this.locale = s),
                    (this.dayNames = a.getDayNames(this.locale)),
                    (this.dayNamesLong = a.getDayNames(this.locale, 'long')),
                    (this.monthNames = a.getMonthNames(this.locale)),
                    l.init())
                    : 'data-ignore-on-focus' === t
                      ? (this.ignoreOnFocus = !0)
                      : 'data-persist-on-select' === t && (this.persistOnSelect = !0);
    }
    connectedCallback() {
      setTimeout(() => {
        this.init();
      }, 0);
    }
    init() {
      const t = '_' + Math.random().toString(36).substr(2, 9);
      if (
        ((this.container = this.parentElement),
        (this.inputLabelEl = this.container.querySelector('label')),
        (this.labelId = this.inputLabelEl.getAttribute('id') || `ids-datepicker-label-${t}`),
        (this.textInputElement = this.container.querySelector('input')),
        (this.tableId = `ids-datepicker-table-${t}`),
        (this.containerId = `ids-datepicker-container-${t}`),
        (this.headerId = `ids-datepicker-header-${t}`),
        (this.backdropId = `ids-datepicker-backdrop-${t}`),
        null === this.textInputElement)
      )
        return;
      const e = document.createElement('template');
      if (
        ((e.innerHTML = this._calTemplate),
        this.textInputElement.setAttribute('data-lpignore', 'true'),
        this._shadowRoot.appendChild(e.content),
        (this.titleEl = this._shadowRoot.querySelector('.if.title')),
        (this.headerEl = this._shadowRoot.querySelector('.if.header')),
        this.headerEl.setAttribute('id', this.headerId),
        (this.closeEl = this._shadowRoot.querySelector('.if.close')),
        (this.tableEl = this._shadowRoot.querySelector('table')),
        this.tableEl.setAttribute('id', this.tableId),
        this.tableEl.setAttribute('aria-labelledby', this.labelId),
        (this.backdropEl = this._shadowRoot.querySelector('.if.backdrop')),
        this.backdropEl.setAttribute('id', this.backdropId),
        (this.datepickerContainerEl = this._shadowRoot.querySelector('.if.datepicker')),
        this.datepickerContainerEl.setAttribute('id', this.containerId),
        this.datepickerContainerEl.setAttribute('aria-labelledby', this.labelId),
        (this.dateObj = new Date()),
        (this.todayDateObj = new Date()),
        (this.todaysDay = this.todayDateObj.getDate()),
        this.usePatternValidation)
      ) {
        const t = y.getFormatByLocale(this.locale);
        this.textInputElement.setAttribute('pattern', t.regex);
      }
      var a;
      null !== this.initDate
        ? (a = this._parseAndValidateInputStr(this.initDate)).valid
          ? ((this.dateObj = new Date(a.year, a.month, a.day)),
          (this._inputStrIsValidDate = !0),
          this.setInputValue(this._returnDateString(this.dateObj)))
          : 'current' === this.initDate &&
            ((this._inputStrIsValidDate = !0), this.setInputValue(this._returnDateString(this.dateObj)))
        : (a = this._parseAndValidateInputStr(this.textInputElement.value)).valid
          ? ((this.dateObj = new Date(a.year, a.month, a.day)), (this._inputStrIsValidDate = !0))
          : (this._inputStrIsValidDate = !1),
      (this.initDate = null),
      (this.displayedMonth = this.dateObj.getMonth()),
      (this.displayedYear = this.dateObj.getFullYear()),
      (this.currentDay = this.dateObj.getDate()),
      (this.datepickerContainerEl.style.display = 'none'),
      this.datepickerContainerEl.setAttribute('aria-hidden', !0),
      this._populateDayNames(),
      this._addHeaderEventHandlers(),
      this._renderCalendar(),
      this.ignoreOnFocus
        ? ((this.externalInitiatorEl = document.createElement('button')),
        this.externalInitiatorEl.setAttribute('type', 'button'),
        this.externalInitiatorEl.classList.add('if'),
        this.externalInitiatorEl.classList.add('open'),
        this.container.appendChild(this.externalInitiatorEl),
        this.textInputElement.classList.add('has-external-initiator'),
        c.init(this.textInputElement),
        (this.externalInitiatorEl.onclick = this.setFocusOnCal),
        (this.externalInitiatorEl.onclick = this.externalInitiatorEl.onclick.bind(this)))
        : ((this.textInputElement.onfocus = this._inputOnFocusHandler),
        (this.textInputElement.onfocus = this.textInputElement.onfocus.bind(this))),
      (this.closeEl.onclick = this.close),
      (this.closeEl.onclick = this.closeEl.onclick.bind(this)),
      (this.textInputElement.oninput = this._inputOnInputHandler),
      (this.textInputElement.oninput = this.textInputElement.oninput.bind(this)),
      (this.textInputElement.onkeydown = this._inputOnKeyDownHandler),
      (this.textInputElement.onkeydown = this.textInputElement.onkeydown.bind(this)),
      (this.textInputElement.onblur = this._blurHandler),
      (this.textInputElement.onblur = this.textInputElement.onblur.bind(this)),
      (this.datepickerContainerEl.onblur = this._blurHandler),
      (this.datepickerContainerEl.onblur = this.datepickerContainerEl.onblur.bind(this)),
      (this.titleEl.onblur = this._blurHandler),
      (this.titleEl.onblur = this.titleEl.onblur.bind(this)),
      (this.datepickerContainerEl.onkeydown = this._containerKeyDownEventHandler),
      (this.datepickerContainerEl.onkeydown = this.datepickerContainerEl.onkeydown.bind(this)),
      this._setPlaceholderValue();
      const s = t => {
        t.matches
          ? ((this.isLargerThanMobile = !0),
          this.backdropEl.classList.remove('is-open'),
          this._cancelScrollLock(),
          'true' != this.datepickerContainerEl.getAttribute('aria-hidden') &&
              p(this.datepickerContainerEl).from(this.textInputElement))
          : ((this.isLargerThanMobile = !1),
          (this.datepickerContainerEl.style.top = 'auto'),
          'true' != this.datepickerContainerEl.getAttribute('aria-hidden') &&
              (this.backdropEl.classList.add('is-open'), this._scrollLock()));
      };
      this.MQSmall.addListener(s), s(this.MQSmall), this.initOpen && this.isLargerThanMobile && this.open();
    }
    _preventDefault(t) {
      t.preventDefault();
    }
    _cancelScrollLock() {
      if (this.isLargerThanMobile) return;
      const t = document.body;
      (t.style.position = ''), (t.style.top = '');
      const e = this.container.getBoundingClientRect();
      window.scrollTo({ top: e.top - e.height + window.scrollY, left: 0 });
    }
    _scrollLock() {
      this.isLargerThanMobile ||
        setTimeout(function () {
          const t = document.documentElement.style.getPropertyValue('--scroll-y'),
            e = document.body;
          (e.style.position = 'fixed'), (e.style.top = `-${t}`);
        }, 500);
    }
    open() {
      if (this.datepickerContainerEl)
        if (
          ((this.datepickerContainerEl.style.display = 'block'),
          this.datepickerContainerEl.setAttribute('aria-hidden', !1),
          this.isLargerThanMobile)
        )
          p(this.datepickerContainerEl).from(this.textInputElement);
        else {
          const t = this.container.getBoundingClientRect();
          window.scrollTo({ top: t.top - t.height + window.scrollY, left: 0, behavior: 'smooth' }),
          this._scrollLock(),
          (this.datepickerContainerEl.style.top = 'auto'),
          this.backdropEl.classList.add('is-open'),
          this.textInputElement.setAttribute('inputmode', 'none'),
          (this.textInputElement.style.caretColor = 'transparent');
        }
    }
    setFocusOnCal() {
      this.open(), this.datepickerContainerEl && this.datepickerContainerEl.focus();
    }
    setInputValue(t) {
      (this.textInputElement.value = t),
      this.textInputElement.setAttribute('data-iso-value', this.dateObj.toISOString());
    }
    _dayClickedEventHandler(t) {
      (this._inputStrIsValidDate = !0),
      this._setNewDateValue(t.target.getAttribute('data-day'), this.displayedMonth, this.displayedYear),
      this.setInputValue(this._returnDateString(this.dateObj)),
      this.textInputElement.dispatchEvent(new CustomEvent('dateselect')),
      this._removeSelectedDays(),
      this._renderCalendar(),
      this.persistOnSelect || this._hideCalendar();
    }
    _calEnterKeyDownEventHandler(t) {
      t &&
        ((this._inputStrIsValidDate = !0),
        this._setNewDateValue(t.getAttribute('data-day'), this.displayedMonth, this.displayedYear),
        this.setInputValue(this._returnDateString(this.dateObj)),
        this.textInputElement.dispatchEvent(new CustomEvent('dateselect')),
        this._removeSelectedDays(),
        this._renderCalendar(),
        this.persistOnSelect || this._hideCalendar());
    }
    _hideCalendar() {
      try {
        this.shadowRoot.activeElement.blur();
      } catch (t) {
        this._blurHandler();
      }
      this.isLargerThanMobile || this.backdropEl.classList.remove('is-open');
    }
    _calKeyDownEventHandler(t) {
      'Enter' === t.key && this._dayClickedEventHandler(event);
    }
    _blurHandler() {
      setTimeout(() => {
        var t;
        ((t = this).shadowRoot.activeElement &&
          (t.shadowRoot.activeElement.classList.contains('datepicker') ||
            t.shadowRoot.activeElement.classList.contains('control') ||
            t.shadowRoot.activeElement.classList.contains('close') ||
            t.shadowRoot.activeElement.classList.contains('title') ||
            t.shadowRoot.activeElement.classList.contains('backdrop') ||
            t.shadowRoot.activeElement.classList.contains('day') ||
            document.activeElement.isSameNode(t.textInputElement))) ||
          (t.close.bind(t), t.close());
      }, 0);
    }
    _titleElClickHandler(t) {
      const e = Array.from(this.datepickerContainerEl.querySelectorAll('td.if.is-selecting'));
      'Enter' === t.key && e.length
        ? (this._stopIt(t), this._calEnterKeyDownEventHandler(e[0]))
        : 'Enter' != t.key || e.length
          ? 'keydown' !== t.type && this._showNow()
          : (this._stopIt(t), this._showNow());
    }
    _addHeaderEventHandlers() {
      var t = this.datepickerContainerEl.querySelectorAll('.control').entries(),
        e = t.next();
      for (
        this.titleEl.onfocus = this._controlFocusEventHandler,
        this.titleEl.onfocus = this.titleEl.onfocus.bind(this),
        this.titleEl.onclick = this._titleElClickHandler,
        this.titleEl.onclick = this.titleEl.onclick.bind(this),
        this.titleEl.onkeydown = this._titleElClickHandler,
        this.titleEl.onkeydown = this.titleEl.onkeydown.bind(this);
        !1 === e.done;

      )
        (e.value[1].tabIndex = 0),
        (e.value[1].onfocus = this._controlFocusEventHandler),
        (e.value[1].onfocus = e.value[1].onfocus.bind(this)),
        (e.value[1].onblur = this._blurHandler),
        (e.value[1].onblur = e.value[1].onblur.bind(this)),
        (e.value[1].onclick = this._controlKeyDownEventHandler),
        (e.value[1].onclick = e.value[1].onclick.bind(this)),
        (e.value[1].onkeydown = this._controlKeyDownEventHandler),
        (e.value[1].onkeydown = e.value[1].onkeydown.bind(this)),
        (e.value[1].onmousedown = this._mouseDownEventHandler),
        (e.value[1].onmousedown = e.value[1].onmousedown.bind(this)),
        (e.value[1].onmouseup = this._mouseUpEventHandler),
        (e.value[1].onmouseup = e.value[1].onmouseup.bind(this)),
        (e.value[1].onmouseleave = this._mouseUpEventHandler),
        (e.value[1].onmouseleave = e.value[1].onmouseleave.bind(this)),
        (e.value[1].ontouchstart = this._mouseDownEventHandler),
        (e.value[1].ontouchstart = e.value[1].ontouchstart.bind(this)),
        (e.value[1].ontouchend = this._mouseUpEventHandler),
        (e.value[1].ontouchend = e.value[1].ontouchend.bind(this)),
        (e.value[1].ontouchcancel = this._mouseUpEventHandler),
        (e.value[1].ontouchcancel = e.value[1].ontouchcancel.bind(this)),
        (e = t.next());
    }
    _startLongPressAction(t) {
      this._longPressIntervalIds.push(
        setInterval(() => {
          this._controlKeyDownEventHandler(t);
        }, this.longPressInterval)
      ),
      (this.container.querySelector('#' + t.target.id).onclick = () => {
        this._onClickHandlerAfterLongPress(event, this);
      });
    }
    _onClickHandlerAfterLongPress(t, e) {
      (e.querySelector('#' + t.target.id).onclick = e._controlKeyDownEventHandler),
      (e.querySelector('#' + t.target.id).onclick = e.querySelector('#' + t.target.id).onclick.bind(e));
    }
    _mouseDownEventHandler(t) {
      this._longPressTimerIds.push(
        setTimeout(() => {
          this._startLongPressAction(t);
        }, this.longPressThreshold)
      );
    }
    _mouseUpEventHandler() {
      this._longPressTimerIds.forEach(clearTimeout),
      (this._longPressTimerIds = []),
      this._longPressIntervalIds.forEach(clearInterval),
      (this._longPressIntervalIds = []);
    }
    _parseAndValidateInputStr(t) {
      var e = {};
      if (!t || (t && 0 === t.length) || (t && '' === t)) return (e.valid = !1), e;
      const a = y.getFormatByLocale(this.locale);
      var s = t.match(new RegExp('^' + a.regex + '$'));
      if (null === s)
        try {
          const a = r.create(t);
          var i, n, l;
          (i = Number(a.getDate())),
          (n = Number(a.getMonth())),
          (l = Number(a.getFullYear())),
          (e.valid = !0),
          (e.day = i),
          (e.month = n),
          (e.year = l);
        } catch (t) {
          e.valid = !1;
        }
      else
        (i = Number(s[1])),
        (n = Number(s[2])),
        (l = Number(s[3])),
        r.isValid(i, n, l) ? ((e.valid = !0), (e.day = i), (e.month = n - 1), (e.year = l)) : (e.valid = !1);
      return e;
    }
    _inputOnInputHandler() {
      var t = this._parseAndValidateInputStr(this.textInputElement.value);
      t.valid
        ? ((this._inputStrIsValidDate = !0),
        this._setNewDateValue(t.day, t.month, t.year),
        (this.displayedMonth = t.month),
        (this.displayedYear = t.year),
        this.textInputElement.dispatchEvent(new CustomEvent('dateselect')),
        this._removeSelectedDays(),
        this._renderCalendar())
        : (this._inputStrIsValidDate = !1);
    }
    _containerKeyDownEventHandler(t) {
      const e = Array.from(this.datepickerContainerEl.querySelectorAll('td.if.is-selecting'));
      'Escape' === t.key
        ? (this._stopIt(t), this._hideCalendar())
        : t.shiftKey && 'Home' === t.key
          ? (this._stopIt(t), this._showNow())
          : 'Home' === t.key
            ? (this._stopIt(t), this._selectFirstDayOfWeek())
            : 'End' === t.key
              ? (this._stopIt(t), this._selectLastDayOfWeek())
              : t.shiftKey && 'PageUp' === t.key
                ? (this._stopIt(t), this._showPrevYear())
                : 'PageUp' === t.key
                  ? (this._stopIt(t), this._showPrevMonth())
                  : t.shiftKey && 'PageDown' === t.key
                    ? (this._stopIt(t), this._showNextYear())
                    : 'PageDown' === t.key
                      ? (this._stopIt(t), this._showNextMonth())
                      : 'ArrowUp' === t.key
                        ? (this._stopIt(t), this._selectDayPrevWeek())
                        : 'ArrowDown' === t.key
                          ? (this._stopIt(t), this._selectDayNextWeek())
                          : 'ArrowRight' === t.key
                            ? (this._stopIt(t), this._selectDayNext())
                            : 'ArrowLeft' === t.key
                              ? (this._stopIt(t), this._selectDayPrev())
                              : 'Enter' === t.key && e && (this._stopIt(t), this._calEnterKeyDownEventHandler(e[0]));
    }
    _controlFocusEventHandler() {
      this._removeSelectedDays();
    }
    _controlKeyDownEventHandler(t) {
      const e = Array.from(this.datepickerContainerEl.querySelectorAll('td.if.is-selecting'));
      if (('Enter' === t.key && !e.length) || 'keydown' !== t.type)
        switch ((this._stopIt(t), t.target.id)) {
          case 'ids-datepicker-control-prev-year':
            this._showPrevYear();
            break;
          case 'ids-datepicker-control-next-year':
            this._showNextYear();
            break;
          case 'ids-datepicker-control-prev-month':
            this._showPrevMonth();
            break;
          case 'ids-datepicker-control-next-month':
            this._showNextMonth();
        }
      else 'Enter' === t.key && e && (this._stopIt(t), this._calEnterKeyDownEventHandler(e[0]));
    }
    _inputOnFocusHandler() {
      this._inputOnInputHandler(), this.open();
    }
    _selectFirstDayOfWeek() {
      this._removeSelectedDays();
      let t = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`,
        e = this.datepickerContainerEl.querySelector(t);
      if (!e) return;
      let a = e.closest('tr').querySelector('td:first-of-type');
      const s = a.getAttribute('data-day');
      s > this.currentDay &&
        (this._showPrevMonth(),
        (this.currentDay = s),
        this._adjustCurrentDay(),
        (t = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`),
        (a = this.datepickerContainerEl.querySelector(t))),
      (this.currentDay = Number(s)),
      this._adjustCurrentDay(),
      (t = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`),
      (a = this.datepickerContainerEl.querySelector(t)),
      a && a.classList.add('is-selecting');
    }
    _selectLastDayOfWeek() {
      this._removeSelectedDays();
      let t = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`,
        e = this.datepickerContainerEl.querySelector(t);
      if (!e) return;
      let a = e.closest('tr').querySelector('td:last-of-type');
      const s = a.getAttribute('data-day');
      s < this.currentDay &&
        (this._showNextMonth(),
        (this.currentDay = s),
        this._adjustCurrentDay('down'),
        (t = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`),
        (a = this.datepickerContainerEl.querySelector(t))),
      (this.currentDay = Number(s)),
      this._adjustCurrentDay('down'),
      (t = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`),
      (a = this.datepickerContainerEl.querySelector(t)),
      a && a.classList.add('is-selecting');
    }
    _selectDayOnInputEnter() {
      this._inputStrIsValidDate = !0;
      const t = this.datepickerContainerEl.querySelector('td.if.is-selecting');
      t &&
        (this._setNewDateValue(t.getAttribute('data-day'), this.displayedMonth, this.displayedYear),
        this.setInputValue(this._returnDateString(this.dateObj)),
        this.textInputElement.dispatchEvent(new CustomEvent('dateselect')),
        this._removeSelectedDays(),
        this._renderCalendar(),
        this.persistOnSelect || this._hideCalendar());
    }
    _selectDayPrevWeek() {
      this._removeSelectedDays();
      const t = this.currentDay - 7;
      if (t <= 0) {
        const t = a.getDaysOfPreviousMonth(this.displayedMonth, this.displayedYear);
        this._showPrevMonth(), (this.currentDay = this.currentDay + t - 7);
      } else this.currentDay = t;
      this._adjustCurrentDay('down');
      const e = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`,
        s = this.datepickerContainerEl.querySelector(e);
      s && s.classList.add('is-selecting');
    }
    _selectDayNextWeek() {
      this._removeSelectedDays();
      const t = this.currentDay + 7,
        e = a.getMonthDays(this.displayedMonth + 1, this.displayedYear);
      t > e ? (this._showNextMonth(), (this.currentDay = t - e)) : (this.currentDay = t), this._adjustCurrentDay();
      const s = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`,
        i = this.datepickerContainerEl.querySelector(s);
      i && i.classList.add('is-selecting');
    }
    _selectDayNext() {
      this._removeSelectedDays(), this.currentDay++;
      const t = a.getMonthDays(this.displayedMonth + 1, this.displayedYear);
      this.currentDay > t && (this._showNextMonth(), (this.currentDay = 1)), this._adjustCurrentDay('up');
      const e = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`,
        s = this.datepickerContainerEl.querySelector(e);
      s && s.classList.add('is-selecting');
    }
    _removeSelectedDays() {
      this.datepickerContainerEl
        .querySelectorAll('td.if.is-selecting')
        .forEach(t => t.classList.remove('is-selecting'));
    }
    _removeActiveDays() {
      this.datepickerContainerEl.querySelectorAll('td.if.is-active').forEach(t => {
        t.classList.remove('is-active'), t.removeAttribute('aria-selected');
      });
    }
    _removeSpecialDays() {
      this.datepickerContainerEl.querySelectorAll('td.if.is-special-day').forEach(t => {
        t.classList.remove('is-special-day'), t.removeAttribute('data-special-day');
      });
    }
    _selectDayPrev() {
      if ((this._removeSelectedDays(), this.currentDay--, this.currentDay <= 0)) {
        this._showPrevMonth();
        const t = a.getMonthDays(this.displayedMonth + 1, this.displayedYear);
        this.currentDay = t;
      }
      this._adjustCurrentDay('down');
      const t = `td[data-day="${this.currentDay}"]:not(.non-selectable-day)`,
        e = this.datepickerContainerEl.querySelector(t);
      e && e.classList.add('is-selecting');
    }
    _stopIt(t) {
      t.preventDefault(), t.stopPropagation();
    }
    _inputOnKeyDownHandler(t) {
      this.ignoreOnFocus ||
        ('Enter' === t.key
          ? (this._stopIt(t), this._selectDayOnInputEnter())
          : 'Escape' === t.key
            ? (this._stopIt(t), this._hideCalendar())
            : t.shiftKey && 'Home' === t.key
              ? (this._stopIt(t), this._showNow())
              : 'Home' === t.key
                ? (this._stopIt(t), this._selectFirstDayOfWeek())
                : 'End' === t.key
                  ? (this._stopIt(t), this._selectLastDayOfWeek())
                  : t.shiftKey && 'PageUp' === t.key
                    ? (this._stopIt(t), this._showPrevYear())
                    : 'PageUp' === t.key
                      ? (this._stopIt(t), this._showPrevMonth())
                      : t.shiftKey && 'PageDown' === t.key
                        ? (this._stopIt(t), this._showNextYear())
                        : 'PageDown' === t.key
                          ? (this._stopIt(t), this._showNextMonth())
                          : 'ArrowUp' === t.key
                            ? (this._stopIt(t), this._selectDayPrevWeek())
                            : 'ArrowDown' === t.key
                              ? (this._stopIt(t), this._selectDayNextWeek())
                              : 'ArrowRight' === t.key
                                ? (this._stopIt(t), this._selectDayNext())
                                : 'ArrowLeft' === t.key && (this._stopIt(t), this._selectDayPrev()));
    }
    _showNextYear() {
      this.displayedYear++, this._renderCalendar();
    }
    _showNow() {
      (this.displayedMonth = this.todayDateObj.getMonth()),
      (this.displayedYear = this.todayDateObj.getFullYear()),
      this._renderCalendar();
    }
    _showPrevYear() {
      this.displayedYear--, this._renderCalendar();
    }
    _showNextMonth() {
      11 === this.displayedMonth ? ((this.displayedMonth = 0), this.displayedYear++) : this.displayedMonth++,
      this._renderCalendar();
    }
    _showPrevMonth() {
      0 === this.displayedMonth ? ((this.displayedMonth = 11), this.displayedYear--) : this.displayedMonth--,
      this._renderCalendar();
    }
    _adjustCurrentDay(t) {
      this._adjustCurrentDayOfDateRange(), this._adjustCurrentDayWithDisabledWeekends(t);
    }
    close() {
      if (
        ((this.datepickerContainerEl.style.display = 'none'),
        this._cancelScrollLock(),
        this.datepickerContainerEl.setAttribute('aria-hidden', !0),
        this.textInputElement.removeAttribute('inputmode'),
        this.textInputElement.style.removeProperty('caret-color'),
        this.isLargerThanMobile || this.backdropEl.classList.remove('is-open'),
        this._mouseUpEventHandler(),
        this._inputStrIsValidDate)
      ) {
        if (this.textInputElement.required || (!this.textInputElement.required && '' !== this.textInputElement.value)) {
          const t = new CustomEvent('ids:datepicker:valid', {
            bubbles: !0,
            detail: {
              source: 'IDS_DATEPICKER',
              type: 'IDS_DATEPICKER_VALID',
              payload: { value: this.textInputElement.value }
            }
          });
          this.textInputElement.dispatchEvent(t);
        }
      } else (this.textInputElement.required || (!this.textInputElement.required && '' !== this.textInputElement.value)) && this.textInputElement.dispatchEvent(new Event('invalid'));
    }
    _setPlaceholderValue() {
      this.textInputElement.setAttribute(
        'placeholder',
        this._returnDateString(r.getNewDateObject(this.displayedYear, this.displayedMonth, this.currentDay))
      );
    }
    _adjustCurrentDayWithDisabledWeekends(t) {
      if (this.disableWeekend) {
        let e = a.getMonthDays(this.displayedMonth + 1, this.displayedYear),
          s = r.getNewDateObject(this.displayedYear, this.displayedMonth, this.currentDay),
          i = s.getDay();
        'up' === t
          ? (6 === i ? (this.currentDay = this.currentDay + 2) : 0 === i && (this.currentDay = this.currentDay + 1),
          this.currentDay > e &&
              (this._showNextMonth(),
              (this.currentDay = 1),
              (s = r.getNewDateObject(this.displayedYear, this.displayedMonth, this.currentDay)),
              (i = s.getDay()),
              6 === i ? (this.currentDay = this.currentDay + 2) : 0 === i && (this.currentDay = this.currentDay + 1)))
          : (6 === i ? (this.currentDay = this.currentDay - 1) : 0 === i && (this.currentDay = this.currentDay - 2),
          this.currentDay <= 0 &&
              (this._showPrevMonth(),
              (e = a.getMonthDays(this.displayedMonth + 1, this.displayedYear)),
              (this.currentDay = e),
              (s = r.getNewDateObject(this.displayedYear, this.displayedMonth, this.currentDay)),
              (i = s.getDay()),
              6 === i ? (this.currentDay = this.currentDay - 1) : 0 === i && (this.currentDay = this.currentDay - 2)));
      }
    }
    _adjustCurrentDayOfDateRange() {
      if (this.minDate && this.maxDate) {
        const t = this._parseAndValidateInputStr(this.minDate),
          e = this._parseAndValidateInputStr(this.maxDate);
        this.displayedYear == t.year &&
          this.displayedMonth == t.month &&
          this.currentDay < t.day &&
          (this.currentDay = t.day),
        this.displayedYear == e.year &&
            this.displayedMonth == e.month &&
            this.currentDay > e.day &&
            (this.currentDay = e.day);
      }
    }
    _adjustDateRange(t, e) {
      if (this.minDate && this.maxDate) {
        const a = this._parseAndValidateInputStr(this.minDate),
          s = this._parseAndValidateInputStr(this.maxDate),
          i = new Date(a.year, a.month);
        i.setDate(a.day);
        const n = new Date(s.year, s.month);
        n.setDate(s.day);
        const l = new Date(this.displayedYear, this.displayedMonth);
        l.setDate(e), (l < i || l > n) && t.classList.add('non-selectable-day');
      }
    }
    _dispatchYearEvent() {
      if (this.currentYear !== this.displayedYear) {
        this.currentYear = this.displayedYear;
        const t = new CustomEvent('ids:send:datepicker', {
          bubbles: !0,
          detail: { source: 'IDS_DATEPICKER', type: 'IDS_DATEPICKER_YEAR_SHOWN', payload: { year: this.currentYear } }
        });
        document.dispatchEvent(t);
      }
    }
    _checkForSpecialDay(t, e, a) {
      if (this.specialDays && !a) {
        const a = r.getNewDateObject(this.displayedYear, this.displayedMonth, t),
          s = this.specialDays[a.getTime()];
        if (s) {
          const { name: t } = s;
          e.classList.add('is-special-day'), e.setAttribute('data-special-day', t);
        }
      }
    }
    _renderCalendar() {
      var t = new Date(this.displayedYear, this.displayedMonth);
      this._dispatchYearEvent(),
      this._removeSpecialDays(),
      this._removeActiveDays(),
      t.setDate(1),
      (this.titleEl.innerHTML = this.monthNames[this.displayedMonth] + ' ' + this.displayedYear);
      var e = [],
        s = [];
      a.generateDayArray(t, e, s);
      for (var i = this.datepickerContainerEl.querySelectorAll('.day').entries(), n = i.next(); !1 === n.done; )
        n.value[1].classList.remove('non-selectable-day'),
        n.value[1].classList.remove('is-selecting'),
        n.value[1].classList.remove('today'),
        n.value[1].classList.remove('is-hidden'),
        (n.value[1].onclick = null),
        (n.value[1].onblur = null),
        (n.value[1].onkeydown = null),
        s[n.value[0]] && n.value[1].classList.add('non-selectable-day'),
        this.disableWeekend &&
            a.isWeekend(this.displayedYear, this.displayedMonth, e[n.value[0]]) &&
            n.value[1].classList.add('non-selectable-day'),
        this._adjustDateRange(n.value[1], e[n.value[0]]),
        n.value[1].setAttribute('data-day', e[n.value[0]]),
        this._checkForSpecialDay(e[n.value[0]], n.value[1], s[n.value[0]]),
        this.displayedMonth !== this.dateObj.getMonth() ||
            this.displayedYear !== this.dateObj.getFullYear() ||
            e[n.value[0]] !== this.dateObj.getDate() ||
            s[n.value[0]] ||
            (this.displayedMonth !== this.todayDateObj.getMonth() ||
            this.displayedYear !== this.todayDateObj.getFullYear() ||
            e[n.value[0]] !== this.todayDateObj.getDate() ||
            s[n.value[0]]
              ? (n.value[1].classList.add('is-active'), n.value[1].setAttribute('aria-selected', !0))
              : n.value[1].classList.add('today')),
        this.displayedMonth !== this.todayDateObj.getMonth() ||
            this.displayedYear !== this.todayDateObj.getFullYear() ||
            e[n.value[0]] !== this.todayDateObj.getDate() ||
            s[n.value[0]] ||
            n.value[1].classList.add('today'),
        s[n.value[0]]
          ? n.value[1].removeAttribute('tabindex')
          : ((n.value[1].onclick = this._dayClickedEventHandler),
          (n.value[1].onclick = n.value[1].onclick.bind(this)),
          (n.value[1].onkeydown = this._calKeyDownEventHandler),
          (n.value[1].onkeydown = n.value[1].onkeydown.bind(this)),
          (n.value[1].tabIndex = -1),
          (n.value[1].onblur = this._blurHandler),
          (n.value[1].onblur = n.value[1].onblur.bind(this))),
        (n = i.next());
      if (s.slice(35, 42).every(t => !0 === t))
        for (n = (i = this.datepickerContainerEl.querySelectorAll('.day').entries()).next(); !1 === n.done; )
          n.value[0] > 34 && n.value[1].classList.add('is-hidden'), (n = i.next());
      l.init();
    }
    getDateString() {
      return this._inputStrIsValidDate ? this._returnDateString(this.dateObj) : null;
    }
    getDateObject() {
      return this._inputStrIsValidDate ? this.dateObj : null;
    }
    getLang() {
      return this.locale ? this.locale : null != navigator.languages ? navigator.languages[0] : navigator.language;
    }
    _setNewDateValue(t, e, a) {
      (t = Number(t)),
      (e = Number(e)),
      (a = Number(a)),
      (t === this.dateObj.getDate() && e === this.dateObj.getMonth() && a === this.dateObj.getFullYear()) ||
          (this.dateObj.setFullYear(a), this.dateObj.setMonth(e, t));
    }
    _returnDateString(t) {
      let e = this.getLang();
      return 'lv' == e && (e = 'la-LV'), new Intl.DateTimeFormat(e).format(t);
    }
    _populateDayNames() {
      var t, e;
      (t = this.dayNames.slice()), (e = this.dayNamesLong.slice());
      for (
        var a = this.datepickerContainerEl.querySelectorAll('.if.calendar thead tr th').entries(), s = a.next();
        !1 === s.done;

      )
        (s.value[1].innerHTML = `<abbr title="${e[s.value[0]]}">${t[s.value[0]]}</abbr>`), (s = a.next());
    }
  }
  customElements.define('ids-datepicker', m),
  window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  });
});
