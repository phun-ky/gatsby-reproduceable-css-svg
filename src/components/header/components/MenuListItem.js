import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'gatsby';
import { globalHistory } from '@reach/router';

const MenuListItem = ({ level, type = 'dropdown', page, parent = '/' }) => {
  const { children, customPath, notAPage, isGrouped, title, id } = page;
  const [isOpen, toggleMenu] = React.useState(globalHistory.location.pathname.indexOf(customPath) !== -1);
  const _current_level = level;
  const _next_level = level + 1;

  let _sorted_children = [];
  let _title_to_use = title;

  if (_current_level >= 5) {
    return null;
  }

  if (
    (customPath.indexOf('/css') !== -1 ||
      customPath.indexOf('/js') !== -1 ||
      customPath.indexOf('/webcomponent') !== -1) &&
    notAPage
  ) {
    return null;
  }

  if (page.order === 1) {
    if (customPath.indexOf('css') !== -1) {
      _title_to_use = 'CSS';
    } else if (customPath.indexOf('js') !== -1) {
      _title_to_use = 'JavaScript';
    } else if (customPath.indexOf('webcomponent') !== -1) {
      _title_to_use = 'Web Component';
    }
  }

  if (children && children.length !== 0) {
    _sorted_children = children.sort((a, b) => {
      if (a.navOrder && b.navOrder) {
        if (a.navOrder === b.navOrder) return 0;

        return a.navOrder < b.navOrder ? -1 : 1;
      } else {
        if (a.order === b.order) return 0;

        return a.order < b.order ? -1 : 1;
      }
    });
  }

  const _part_of_current_location = globalHistory.location.pathname.indexOf(customPath) !== -1;
  const _has_children = _sorted_children && _sorted_children.length !== 0;
  const _menu_list_item_class_names = cx('if', {
    'is-active': _part_of_current_location || isOpen,
    'is-parent': _has_children,
    'is-grouped': isGrouped,
    'is-open': isOpen,
    'hasno-page': notAPage
  });
  const _to = customPath + (isGrouped ? `#${id}` : '');
  const _menu_holder_el_class_names = cx('if', {
    'sidebar-menu': type == 'sidebar',
    'dropdown-menu': type == 'dropdown',
    'accordion-menu': type == 'accordion',
    'is-open': isOpen
  });
  const _is_not_max_level = _next_level <= 4 && _has_children;

  return (
    <li data-id={id} role="presentation" className={_menu_list_item_class_names} data-parent={parent}>
      <>
        {notAPage && (
          <button
            role="menuitem"
            onClick={() => {
              toggleMenu(!isOpen);
            }}
            aria-expanded={isOpen ? true : false}
            className="if hasno-page">
            {_title_to_use}
          </button>
        )}

        {!notAPage && (
          <Link role="menuitem" className="if" to={_to}>
            {_title_to_use}
          </Link>
        )}
        {_is_not_max_level && (
          <div className={_menu_holder_el_class_names} role="menu">
            <ul role="presentation" className="if">
              {_sorted_children.map((child, index) => (
                <MenuListItem
                  level={_next_level}
                  type={type}
                  page={child}
                  key={`key-listitem-${index}`}
                  parent={customPath}
                />
              ))}
            </ul>
          </div>
        )}
      </>
    </li>
  );
};

export default MenuListItem;

MenuListItem.propTypes = {
  type: PropTypes.string,
  level: PropTypes.number,
  parent: PropTypes.string,
  page: PropTypes.shape()
};
