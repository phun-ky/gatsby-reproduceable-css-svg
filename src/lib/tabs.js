const isOverflownHorizontally = element => element.scrollWidth > element.clientWidth;

const position = function (el) {
  function n() {}

  n.el = el;
  n.toTop = function (to) {
    this.toEl = to;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.toElRect = _that.toEl.getBoundingClientRect();
      _that.el.style.top = `${_that.elRect.top - _that.toElRect.top - _that.elRect.height}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };
  n.fromTop = function (from) {
    this.fromEl = from;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.fromElRect = _that.fromEl.getBoundingClientRect();
      _that.el.style.top = `${_that.elRect.top - _that.fromElRect.top}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };
  n.toBottom = function (to) {
    this.toEl = to;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.toElRect = _that.toEl.getBoundingClientRect();
      _that.el.style.top = `${_that.elRect.top - _that.toElRect.top + _that.toElRect.height - _that.elRect.height}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };
  n.fromBottom = function (from) {
    this.fromEl = from;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.fromElRect = _that.fromEl.getBoundingClientRect();
      _that.el.style.top = `${_that.elRect.top - _that.fromElRect.top + _that.fromElRect.height}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };
  n.toLeft = function (to) {
    this.toEl = to;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.toElRect = _that.toEl.getBoundingClientRect();
      _that.el.style.left = `${_that.elRect.left - _that.toElRect.left - _that.elRect.width}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };
  n.fromLeft = function (from) {
    this.fromEl = from;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.fromElRect = _that.fromEl.getBoundingClientRect();
      _that.el.style.left = `${_that.elRect.left - _that.fromElRect.left}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };
  n.toRight = function (to) {
    this.toEl = to;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.toElRect = _that.toEl.getBoundingClientRect();
      _that.el.style.left = `${_that.elRect.left - _that.toElRect.left + _that.toElRect.width - _that.elRect.width}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };
  n.fromRight = function (from) {
    this.fromEl = from;
    const _that = this;
    const _position = function () {
      _that.elRect = _that.el.getBoundingClientRect();
      _that.fromElRect = _that.fromEl.getBoundingClientRect();
      _that.el.style.left = `${_that.elRect.left - _that.fromElRect.left + _that.fromElRect.width}px`;
    };
    requestAnimationFrame(_position);
    return this;
  };

  return n;
};

const debounce = function (func, wait, immediate) {
  let _timeout;
  return function () {
    const _context = this;
    const _args = arguments;
    const _later = function () {
      _timeout = null;
      if (!immediate) func.apply(_context, _args);
    };
    const _call_now = immediate && !_timeout;
    clearTimeout(_timeout);
    _timeout = setTimeout(_later, wait);
    if (_call_now) func.apply(_context, _args);
  };
};

// The tab switching function
const switchTab = (tabs, panels, oldTab, newTab) => {
  newTab.focus();
  // Make the active tab focusable by the user (Tab key)
  newTab.removeAttribute('tabindex');
  // Set the selected state
  newTab.setAttribute('aria-selected', 'true');
  oldTab.removeAttribute('aria-selected');
  oldTab.setAttribute('tabindex', '-1');
  // Get the indices of the new and old tabs to find the correct
  // tab panels to show and hide
  let _index = Array.prototype.indexOf.call(tabs, newTab);
  let _old_index = Array.prototype.indexOf.call(tabs, oldTab);
  panels[_old_index].hidden = true;
  panels[_index].hidden = false;
};

const handleClick = (e, tabs, panels, tablist) => {
  e.preventDefault();
  let _current_tab = tablist.querySelector('[aria-selected]');
  if (e.currentTarget !== _current_tab) {
    switchTab(tabs, panels, _current_tab, e.currentTarget);
  }
};

const handleKeyDown = (e, tabs, panels, i) => {
  // Get the index of the current tab in the tabs node list
  let _index = Array.prototype.indexOf.call(tabs, e.currentTarget);
  // Work out which key the user is pressing and
  // Calculate the new tab's index where appropriate
  let _direction =
    e.key === 'ArrowLeft' ? _index - 1 : e.key === 'ArrowRight' ? _index + 1 : e.key === 'ArrowDown' ? 'down' : null;
  if (_direction !== null) {
    e.preventDefault();
    // If the down key is pressed, move focus to the open panel,
    // otherwise switch to the adjacent tab
    _direction === 'down'
      ? panels[i].focus()
      : tabs[_direction]
        ? switchTab(tabs, panels, e.currentTarget, tabs[_direction])
        : void 0;
  }
};

const init = () => {
  const _tab_els = document.querySelectorAll('.if.tabs');

  _tab_els.forEach(function (tabElement) {
    const _scrollbar_width = window.innerWidth - document.body.offsetWidth;
    tabElement.style.setProperty('--ids-scrollbar-width', `${_scrollbar_width}px`);
    // Get relevant elements and collections
    const _tablist_el = tabElement.querySelector('ul');
    const _tab_item_els = _tablist_el.querySelectorAll('a,button:not(.contextual-menu-button)');
    const _panel_els = tabElement.querySelectorAll('[id^="section"]');

    Array.from(tabElement.querySelectorAll('.if.shadow-left,.if.shadow-right')).forEach(el => el.remove());

    if (isOverflownHorizontally(_tablist_el)) {
      const _left_shadow_el = document.createElement('span');
      _left_shadow_el.classList.add('if');
      _left_shadow_el.classList.add('shadow-left');
      _left_shadow_el.setAttribute('role', 'presentation');

      tabElement.appendChild(_left_shadow_el);

      position(_left_shadow_el).fromLeft(tabElement);

      const _right_shadow_el = document.createElement('span');
      _right_shadow_el.classList.add('if');
      _right_shadow_el.classList.add('shadow-right');
      _right_shadow_el.setAttribute('role', 'presentation');

      tabElement.appendChild(_right_shadow_el);
      position(_right_shadow_el).toRight(tabElement);
    }

    // Add the tablist role to the first <ul> in the .tabElement container
    _tablist_el.setAttribute('role', 'tablist');

    // Add semantics are remove user focusability for each tab
    Array.prototype.forEach.call(_tab_item_els, (tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', 'tab' + (i + 1));
      tab.setAttribute('tabindex', '-1');
      tab.removeAttribute('aria-selected');
      tab.parentNode.setAttribute('role', 'presentation');

      // Handle clicking of tabs for mouse users
      tab.addEventListener('click', e => {
        handleClick(e, _tab_item_els, _panel_els, _tablist_el);
      });

      // Handle keydown events for keyboard users
      tab.addEventListener('keydown', e => {
        handleKeyDown(e, _tab_item_els, _panel_els, i);
      });
    });

    // Add tab panel semantics and hide them all
    Array.prototype.forEach.call(_panel_els, (panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', _tab_item_els[i].id);
      panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    _tab_item_els[0].removeAttribute('tabindex');
    _tab_item_els[0].setAttribute('aria-selected', 'true');
    _panel_els[0].hidden = false;

    if (isOverflownHorizontally(_tablist_el)) {
      tabElement.classList.add('is-overflowed');
    } else {
      tabElement.classList.remove('is-overflowed');
    }
  });
};

export default init;
