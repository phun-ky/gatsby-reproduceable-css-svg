const removePreviouslySelectedMenuItem = el => {
  const _selected_el = el.querySelectorAll('.is-focused');

  _selected_el.forEach(li => {
    li.classList.remove('is-focused');
    li.setAttribute('aria-selected', false);
  });
};

export const init = _contextual_menu_trigger_el => {
  let _index_of_menu_items = 0;
  let _all_menu_items = null;

  const _adjustMenuPlacement = function () {
    window.requestAnimationFrame(function () {
      const _contextual_menu_holder_el = _contextual_menu_trigger_el.parentElement;
      const _contextual_menu_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu');
      const _contextual_menu_trigger_el_rect = _contextual_menu_trigger_el.getBoundingClientRect();
      const _contextual_menu_holder_elRect = _contextual_menu_holder_el.getBoundingClientRect();

      _contextual_menu_el.style.top =
        _contextual_menu_holder_elRect.top -
        _contextual_menu_trigger_el_rect.top +
        _contextual_menu_trigger_el_rect.height +
        'px';
    });
  };
  const _handleClickOutsideContextualMenu = e => {
    if (e.target == _contextual_menu_trigger_el) return;

    const _contextual_menu_holder_el = _contextual_menu_trigger_el.parentElement;
    const _contextual_menu_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu');
    const _contextual_menu_list_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu > ul.if');

    if (_contextual_menu_el.classList.contains('is-open')) {
      if (!_contextual_menu_list_el.contains(e.target)) {
        _closeMenu();
      }
    }
  };
  const _closeMenu = () => {
    const _contextual_menu_holder_el = _contextual_menu_trigger_el.parentElement;
    const _contextual_menu_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu');
    const _contextual_menu_list_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu > ul.if');

    _resetIndexOfMenuItems();
    removePreviouslySelectedMenuItem(_contextual_menu_list_el);
    _contextual_menu_el.classList.remove('is-open');
    _contextual_menu_list_el.classList.remove('is-open');
    _contextual_menu_trigger_el.setAttribute('aria-expanded', false);
    window.removeEventListener('resize', _adjustMenuPlacement);
    document.removeEventListener('click', _handleClickOutsideContextualMenu);
  };
  const _openMenu = () => {
    const _contextual_menu_holder_el = _contextual_menu_trigger_el.parentElement;
    const _contextual_menu_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu');
    const _contextual_menu_list_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu > ul.if');

    _updateAllStringSuggestions(_contextual_menu_list_el.querySelectorAll('li:not(.separator)'));
    _contextual_menu_el.classList.add('is-open');
    _contextual_menu_list_el.classList.add('is-open');
    _contextual_menu_trigger_el.setAttribute('aria-expanded', true);
    document.removeEventListener('click', _handleClickOutsideContextualMenu);
    document.addEventListener('click', _handleClickOutsideContextualMenu);
    window.removeEventListener('resize', _adjustMenuPlacement);
    window.addEventListener('resize', _adjustMenuPlacement);
  };
  const _handleContextualMenuClick = e => {
    const _contextual_menu_trigger_el = e.target;
    const _contextual_menu_holder_el = _contextual_menu_trigger_el.parentElement;
    const contextualMenu = _contextual_menu_holder_el.querySelector('.if.contextual-menu');

    if (contextualMenu.classList.contains('is-open')) {
      _closeMenu();
    } else {
      _openMenu();
    }
  };
  const _updateAllStringSuggestions = nodes => {
    _all_menu_items = Array.prototype.slice.call(nodes).filter(node => !node.querySelector('[disabled]'));
  };
  const _resetIndexOfMenuItems = () => {
    _index_of_menu_items = 0;
  };
  const _handleContextualMenuKeypress = e => {
    const _contextual_menu_trigger_el = e.target;
    const _contextual_menu_holder_el = _contextual_menu_trigger_el.parentElement;
    const _contextual_menu_list_el = _contextual_menu_holder_el.querySelector('.if.contextual-menu > ul.if');

    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();

      const _selected_menu_item_el = _contextual_menu_list_el.querySelector('li.is-focused');

      if (_contextual_menu_list_el.classList.contains('is-open') && _selected_menu_item_el) {
        _resetIndexOfMenuItems();
        _closeMenu();
      }

      return false;
    }

    if (_contextual_menu_list_el.classList.contains('is-open')) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        return false;
      }

      if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        let _next_menu_item_el;

        e.preventDefault();

        if (e.key == 'ArrowUp') {
          _next_menu_item_el = _all_menu_items[--_index_of_menu_items];

          if (!_next_menu_item_el) {
            _index_of_menu_items = _all_menu_items.length - 1;
            _next_menu_item_el = _all_menu_items[_index_of_menu_items];
          }

          removePreviouslySelectedMenuItem(_contextual_menu_list_el);
          _next_menu_item_el.classList.add('is-focused');
          _next_menu_item_el.setAttribute('aria-selected', true);
        } else if (e.key == 'ArrowDown') {
          _next_menu_item_el = _all_menu_items[++_index_of_menu_items];

          if (!_next_menu_item_el) {
            _index_of_menu_items = 0;
            _next_menu_item_el = _all_menu_items[_index_of_menu_items];
          }

          removePreviouslySelectedMenuItem(_contextual_menu_list_el);
          _next_menu_item_el.classList.add('is-focused');
          _next_menu_item_el.setAttribute('aria-selected', true);
        }
      }
    }
  };

  _adjustMenuPlacement();

  _contextual_menu_trigger_el.removeEventListener('click', _handleContextualMenuClick);
  _contextual_menu_trigger_el.removeEventListener('keyup', _handleContextualMenuKeypress);
  _contextual_menu_trigger_el.addEventListener('click', _handleContextualMenuClick);
  _contextual_menu_trigger_el.addEventListener('keyup', _handleContextualMenuKeypress);
};
