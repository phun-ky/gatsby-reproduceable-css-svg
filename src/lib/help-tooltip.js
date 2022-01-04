class IDSHelpTooltip extends HTMLElement {
  constructor() {
    super();

    const UUID = '_' + Math.random().toString(36).substr(2, 9);

    const _title_content = this.getAttribute('data-title');
    const _text_content = this.getAttribute('data-text');
    const _is_standalone = this.getAttribute('data-standalone');
    const _is_open = this.getAttribute('data-open');
    const _persist = this.getAttribute('data-persist');

    const _medium_mq = window.matchMedia('screen and (min-width: 400px)');
    let _is_medium_mq = true;

    const _handleMedium = mql => {
      if (mql.matches) {
        _is_medium_mq = true;
      } else {
        _is_medium_mq = false;
      }
    };

    _medium_mq.addListener(_handleMedium);

    _handleMedium(_medium_mq);

    const _shadow_root = this.attachShadow({ mode: 'open' });
    const _button_el = document.createElement('button');

    _button_el.classList.add('if');
    _button_el.classList.add('help-tooltip-button');
    _button_el.classList.add('webcomponent');
    _button_el.setAttribute('type', 'button');
    _button_el.setAttribute('aria-label', 'More information');

    if (_is_standalone && _is_standalone !== null) {
      _button_el.classList.add('is-standalone');
    }

    const _createPopover = ({ title, text, size }) => {
      const _popover_el = document.createElement('div');
      const _close_el = document.createElement('button');
      const _text_el = document.createElement('span');

      _popover_el.classList.add('if');
      _popover_el.classList.add('help-tooltip-popover');
      _popover_el.classList.add('webcomponent');
      if (size && size !== '' && size === 'bottom') {
        _popover_el.classList.add(size);
      }

      _popover_el.setAttribute('aria-hidden', true);
      _popover_el.setAttribute('aria-labelledby', `popover-title-${UUID}`);
      _popover_el.setAttribute('aria-describedby', `popover-text-${UUID}`);
      _popover_el.setAttribute('role', 'dialog');

      _close_el.classList.add('if');
      _close_el.classList.add('close');
      _close_el.setAttribute('type', 'button');
      _close_el.setAttribute('aria-label', 'Close');

      _close_el.addEventListener('click', () => {
        _closePopover(_popover_el);
      });

      _text_el.classList.add('if');
      _text_el.classList.add('text');
      _text_el.setAttribute('id', `popover-text-${UUID}`);

      const _text = document.createTextNode(text);

      _text_el.appendChild(_text);
      _popover_el.appendChild(_close_el);

      if (title && title !== '') {
        const _title_el = document.createElement('span');
        _title_el.classList.add('if');
        _title_el.classList.add('title');
        _title_el.setAttribute('id', `popover-title-${UUID}`);
        const titleText = document.createTextNode(title);
        _title_el.appendChild(titleText);
        _popover_el.appendChild(_title_el);
      }
      _popover_el.appendChild(_text_el);

      return _popover_el;
    };

    const _popover_el = _createPopover({
      title: _title_content,
      text: _text_content
    });
    const _setPosition = () => {
      const _button_rect = _button_el.getBoundingClientRect();
      const _popover_rect = _popover_el.getBoundingClientRect();
      const _arrow_left_if_popover_overflow = _button_el.offsetLeft + _button_rect.width / 2 - 12;

      const VH = window.innerHeight;
      if (!_is_medium_mq) {
        const _mobile_popover_rect = _popover_el.getBoundingClientRect();

        _popover_el.style.left = `${_popover_el.getBoundingClientRect().left - _popover_el.offsetLeft - 24}px`;

        if (VH / 2 - _mobile_popover_rect.height < _button_rect.top) {
          _popover_el.style.top = `${_button_el.offsetTop - _mobile_popover_rect.height - _button_rect.height}px`;
          _popover_el.classList.remove('bottom');
        } else {
          _popover_el.style.top = `${_button_rect.height + 24}px`;
          _popover_el.classList.add('bottom');
        }

        _popover_el.style.setProperty('--ids-popover-arrow-vertical-position', `${_button_el.offsetTop}px`);
        _popover_el.style.setProperty(
          '--ids-popover-arrow-horizontal-position',
          `${_arrow_left_if_popover_overflow < 0 ? 0 : _arrow_left_if_popover_overflow}px`
        );
      } else {
        _popover_el.style.setProperty('--ids-popover-arrow-vertical-position', 'calc(50% - 12px)');
        _popover_el.style.setProperty('--ids-popover-arrow-horizontal-position', 'calc(50% - 12px)');
        _popover_el.style.left = _button_el.offsetLeft + _button_rect.width / 2 - _popover_rect.width / 2 + 'px';

        if (_popover_el.getBoundingClientRect().left < 24) {
          _popover_el.style.left = '0px';
          _popover_el.style.setProperty('--ids-popover-arrow-vertical-position', `${_button_el.offsetTop}px`);
          _popover_el.style.setProperty(
            '--ids-popover-arrow-horizontal-position',
            `${_arrow_left_if_popover_overflow < 0 ? 0 : _arrow_left_if_popover_overflow}px`
          );
        }

        if (VH / 2 - _popover_el.getBoundingClientRect().height < _button_rect.top) {
          _popover_el.style.top = `${
            _button_el.offsetTop - _popover_el.getBoundingClientRect().height - _button_rect.height
          }px`;
          _popover_el.classList.remove('bottom');
        } else {
          _popover_el.style.top = `${_button_rect.height + 24}px`;
          _popover_el.classList.add('bottom');
        }
      }
    };

    const _toggleAriaHidden = () => {
      _popover_el.setAttribute('aria-hidden', _popover_el.getAttribute('aria-hidden') != 'true' ? 'true' : 'false');
    };

    // Create some CSS to apply to the shadow dom
    const _style = document.createElement('style');

    _style.textContent =
      'html.if{min-height:100%;-webkit-text-size-adjust:100%}body.if{min-height:100vh;color:#331e11;background-color:#faf9f7}.if,.if::after,.if::before,body.if{box-sizing:border-box;line-height:28px}.if,.if::after,.if::before{margin:0;padding:0}.if.is-focused,.if:focus{outline:4px solid #0054f0}[data-whatintent=mouse] .if.is-focused,[data-whatintent=mouse] .if:focus{outline:none}[data-whatinput=keyboard] .if.is-focused,[data-whatinput=keyboard] .if:focus{outline:3px solid #f09c00;outline-offset:0}[data-whatintent=mouse] input.if.is-focused,[data-whatintent=mouse] input.if:focus{outline:none}[data-whatinput=keyboard] input.if.is-focused,[data-whatinput=keyboard] input.if:focus{outline:2px solid #0054f0;border:1px solid #0054f0;outline-offset:0}@-moz-keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{opacity:1;display:block}}@-webkit-keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{opacity:1;display:block}}@-o-keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{opacity:1;display:block}}@keyframes ifKeyframesShowBackdrop{0%{display:none;opacity:0}1%{display:block;opacity:0}to{opacity:1;display:block}}@font-face{font-family:If Sans Thin;src:url(fonts/IfSans-Thin.woff2) format("woff2"),url(fonts/IfSans-Thin.woff) format("woff");font-weight:100;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Thin;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}}@font-face{font-family:If Sans Thin Italic;src:url(fonts/IfSans-ThinItalic.woff2) format("woff2"),url(fonts/IfSans-ThinItalic.woff) format("woff");font-weight:100;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Thin Italic;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff");font-weight:400;font-display:swap}}@font-face{font-family:If Sans Light;src:url(fonts/IfSans-Light.woff2) format("woff2"),url(fonts/IfSans-Light.woff) format("woff");font-weight:300;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Light;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}}@font-face{font-family:If Sans Light Italic;src:url(fonts/IfSans-LightItalic.woff2) format("woff2"),url(fonts/IfSans-LightItalic.woff) format("woff");font-weight:300;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Light Italic;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff");font-weight:400;font-display:swap}}@font-face{font-family:If Sans;src:url(fonts/IfSans-Regular.woff2) format("woff2"),url(fonts/IfSans-Regular.woff) format("woff");font-weight:400;font-style:normal}@font-face{font-family:If Sans Fallback;src:url(fonts/IfSans-Regular.woff2) format("woff2"),url(fonts/IfSans-Regular.woff) format("woff");font-weight:400;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}}@font-face{font-family:If Sans Italic;src:url(fonts/IfSans-Italic.woff2) format("woff2"),url(fonts/IfSans-Italic.woff) format("woff");font-weight:400;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Italic;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff");font-weight:400;font-display:swap}}@font-face{font-family:If Sans Medium;src:url(fonts/IfSans-Medium.woff2) format("woff2"),url(fonts/IfSans-Medium.woff) format("woff");font-weight:500;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Medium;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}}@font-face{font-family:If Sans Medium Italic;src:url(fonts/IfSans-MediumItalic.woff2) format("woff2"),url(fonts/IfSans-MediumItalic.woff) format("woff");font-weight:500;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Medium Italic;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff");font-weight:400;font-display:swap}}@font-face{font-family:If Sans Bold;src:url(fonts/IfSans-Bold.woff2) format("woff2"),url(fonts/IfSans-Bold.woff) format("woff");font-weight:700;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Bold;src:url(fonts/IfSans-Variable.woff2) format("woff2"),url(fonts/IfSans-Variable.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}}@font-face{font-family:If Sans Bold Italic;src:url(fonts/IfSans-BoldItalic.woff2) format("woff2"),url(fonts/IfSans-BoldItalic.woff) format("woff");font-weight:700;font-style:normal}@supports (display:grid){@font-face{font-family:If Sans Bold Italic;src:url(fonts/IfSans-VariableItalic.woff2) format("woff2"),url(fonts/IfSans-VariableItalic.woff) format("woff");font-weight:400;font-display:swap}}.if.help-tooltip-button{background-size:1.5rem 1.5rem;cursor:pointer;height:3rem;width:3rem;max-width:none;min-width:3rem;transition:all .2s cubic-bezier(.4,0,.2,1);transform:translateY(-.125rem);min-width:0;transition:none;vertical-align:middle;padding:0;margin:0 0 0 1ch;cursor:help;flex-grow:0;flex-shrink:0;appearance:none;-webkit-appearance:none;display:inline-block;height:1.25rem;width:1.25rem;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cg class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'1.5\' fill=\'%23331e11\' stroke=\'%23331e11\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'15\' fill=\'none\' stroke-miterlimit=\'10\'/%3E%3Ccircle data-color=\'color-2\' data-stroke=\'none\' cx=\'16\' cy=\'24.5\' r=\'1.5\' stroke=\'none\'/%3E%3Cpath data-color=\'color-2\' d=\'M12.908 7.79c2.792-1.235 6.412-1.09 7.647.91s.382 4.324-1.735 6.118S16 17.588 16 19\' fill=\'none\' stroke-miterlimit=\'10\'/%3E%3C/g%3E%3C/svg%3E");background-position:50%;background-size:1.25rem 1.25rem;background-repeat:no-repeat;background-color:transparent;background-clip:border-box;border:none;box-shadow:none;user-select:none;position:relative;z-index:0;text-decoration:none;overflow:hidden;text-indent:-99999px}.if.help-tooltip-button.is-standalone{margin:0;transform:none}.if.help-tooltip-button::after{content:"";width:3rem;height:3rem;background:transparent;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.if.help-tooltip-button.is-active,.if.help-tooltip-button.is-hovered,.if.help-tooltip-button:active,.if.help-tooltip-button:hover{box-shadow:none;color:transparent;border-color:transparent}.if.help-tooltip-popover{--ids-popover-arrow-horizontal-position:50%;--ids-popover-arrow-vertical-position:50%;background-color:#331e11;font-family:If Sans,Arial,sans-serif;font-weight:400;font-size:.875rem;line-height:1.5rem;letter-spacing:normal;font-variation-settings:"wght" 85;border:none;border-radius:0;position:absolute;align-items:center;justify-content:center;flex-direction:column;text-align:left;width:calc(100vw - 48px);max-width:none;min-height:3.5rem;padding:1.25rem 3.5rem 1.25rem 1.25rem;margin:0;z-index:950;display:none;box-shadow:0 8px 4px -2px rgba(51,30,17,.08),0 20px 32px rgba(51,30,17,.32)}@supports (display:grid){.if.help-tooltip-popover{font-weight:400;font-variation-settings:"wght" 78}}@media screen and (min-width:25rem){.if.help-tooltip-popover{font-size:.9375rem}}@media screen and (min-width:75rem){.if.help-tooltip-popover{font-size:1rem;font-variation-settings:"wght" 82}}@media screen and (min-width:25rem){.if.help-tooltip-popover{width:320px}}.if.help-tooltip-popover.is-open{display:flex}.if.help-tooltip-popover .if.close{position:absolute;cursor:pointer;height:1.25rem;width:1.25rem;top:1.25rem;right:1.25rem;display:block;background-color:transparent;border:none;margin:0;padding:0;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cg class=\'nc-icon-wrapper\' stroke-linecap=\'square\' stroke-width=\'1.5\' fill=\'none\' stroke=\'%23faf9f7\' stroke-miterlimit=\'10\'%3E%3Cpath d=\'M27 5L5 27M27 27L5 5\'/%3E%3C/g%3E%3C/svg%3E");background-size:16px 16px;background-repeat:no-repeat;background-size:1.25rem 1.25rem;background-position:50%}.if.help-tooltip-popover .if.title{font-family:If Sans Bold,Arial,sans-serif;font-weight:700;font-size:.875rem;line-height:1.5rem;letter-spacing:normal;color:#faf9f7;margin-bottom:1rem;width:100%;display:inline-block;white-space:normal;position:static;text-align:left;padding-right:4rem}@supports (display:grid){.if.help-tooltip-popover .if.title{font-weight:400;font-variation-settings:"wght" 126}}@media screen and (min-width:25rem){.if.help-tooltip-popover .if.title{font-size:.9375rem}}@media screen and (min-width:75rem){.if.help-tooltip-popover .if.title{font-size:1rem}}.if.help-tooltip-popover .if.text{font-family:If Sans,Arial,sans-serif;font-weight:400;font-size:.875rem;line-height:1.5rem;letter-spacing:normal;font-variation-settings:"wght" 85;color:#faf9f7;margin:0;padding:0;white-space:normal;width:100%;display:inline-block}@supports (display:grid){.if.help-tooltip-popover .if.text{font-weight:400;font-variation-settings:"wght" 78}}@media screen and (min-width:25rem){.if.help-tooltip-popover .if.text{font-size:.9375rem}}@media screen and (min-width:75rem){.if.help-tooltip-popover .if.text{font-size:1rem;font-variation-settings:"wght" 82}}.if.help-tooltip-popover::before{content:" ";height:0;width:0;position:absolute;pointer-events:none;right:auto;top:100%;bottom:auto;left:var(--ids-popover-arrow-horizontal-position);border:.75rem solid transparent;border-top-color:#331e11}.if.help-tooltip-popover.bottom::before{right:auto;top:auto;bottom:100%;left:var(--ids-popover-arrow-horizontal-position);border-color:transparent transparent #331e11}.if.help-tooltip-button.is-focused,.if.help-tooltip-button:focus,.if.help-tooltip-popover .if.close.is-focused,.if.help-tooltip-popover .if.close:focus{color:transparent;outline:.25rem solid #0054f0}[data-whatintent=mouse] .if.help-tooltip-button.is-focused,[data-whatintent=mouse] .if.help-tooltip-button:focus,[data-whatintent=mouse] .if.help-tooltip-popover .if.close.is-focused,[data-whatintent=mouse] .if.help-tooltip-popover .if.close:focus{color:transparent;outline:none}.if.webcomponent.help-tooltip-button.is-focused,.if.webcomponent.help-tooltip-button:focus,.if.webcomponent.help-tooltip-popover .if.close.is-focused,.if.webcomponent.help-tooltip-popover .if.close:focus,[data-whatinput=keyboard] .if.help-tooltip-button.is-focused,[data-whatinput=keyboard] .if.help-tooltip-button:focus,[data-whatinput=keyboard] .if.help-tooltip-popover .if.close.is-focused,[data-whatinput=keyboard] .if.help-tooltip-popover .if.close:focus{color:transparent;outline:3px solid #f09c00;outline-offset:1px}';

    const _dispatchEvent = (id, isOpen) => {
      const _event = new CustomEvent('ids:send:help-tooltip', {
        bubbles: true,
        detail: {
          source: 'IDS_HELP_TOOLTIP',
          type: isOpen ? 'HELP_TOOLTIP_OPENED' : 'HELP_TOOLTIP_CLOSED',
          payload: {
            id: id
          }
        }
      });
      document.dispatchEvent(_event);
    };

    const _handleClickOutside = e => {
      if (_persist && _persist !== null) return;
      if (!this.contains(e.target)) {
        _closePopover();
      }
    };

    const _handleKeyEsc = e => {
      if (_persist && _persist !== null) return;
      if (e.key && e.key === 'Escape') {
        _closePopover();
        _button_el.focus();
      }
    };

    const _closePopover = () => {
      _popover_el.classList.remove('is-open');
      _popover_el.style.visibility = 'hidden';
      _toggleAriaHidden();

      _dispatchEvent(UUID, false);
      document.removeEventListener('keyup', _handleKeyEsc);
      document.removeEventListener('click', _handleClickOutside);
    };

    const _openPopover = () => {
      _popover_el.classList.add('is-open');
      _setPosition();

      _popover_el.style.visibility = 'visible';
      _toggleAriaHidden();
      _dispatchEvent(UUID, true);
      document.removeEventListener('keyup', _handleKeyEsc);
      document.removeEventListener('click', _handleClickOutside);
      document.addEventListener('click', _handleClickOutside);
      document.addEventListener('keyup', _handleKeyEsc);
    };

    const _togglePopover = () => {
      const _is_open = _popover_el.classList.contains('is-open');
      if (_is_open) {
        _closePopover();
      } else {
        _openPopover();
      }
    };

    let _touched = false;
    let _touch_ended = true;

    _button_el.addEventListener('touchstart', e => {
      _touch_ended = false;

      e.preventDefault();

      _openPopover();

      setTimeout(function () {
        if (!_touch_ended) {
          _touched = true;
        }
      }, 300);
    });

    _button_el.addEventListener('touchend', () => {
      if (_touched) {
        _touched = false;
        _closePopover();
        _touch_ended = true;
      }
    });
    _button_el.addEventListener('click', () => {
      if (_touched || (_persist && _persist !== null)) return;
      _togglePopover();
    });

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(function () {
        _setPosition();
      });
    });

    // Attach the created els to the shadow dom
    _shadow_root.appendChild(_style);
    _shadow_root.appendChild(_button_el);
    _shadow_root.appendChild(_popover_el);
    _popover_el.style.visibility = 'hidden';
    if (_is_open && _is_open !== null) {
      _openPopover();
      setTimeout(function () {
        _setPosition();
      }, 200);
    }
  }
}

// Define the new el
if (!customElements.get('ids-help-tooltip')) {
  customElements.define('ids-help-tooltip', IDSHelpTooltip);
}
