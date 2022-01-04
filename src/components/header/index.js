import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'gatsby';

import MobileMenu from './MobileMenu.js';
import Search from '../search';

const Header = ({ siteTitle, show = false, hasSidebar = false, fullPage = false }) => {
  if (!show) return null;

  const _header_class_names = cx('sg global header', {
    fullPage: fullPage,
    'has-sidebar': hasSidebar
  });
  const onClick = () => {
    const _anchor = document.getElementById('content');

    if (_anchor) {
      // _anchor.querySelectorAll('h1')[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });

      const _first_focusable_el = _anchor.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
      )[0];

      if (_first_focusable_el) {
        window.scroll({ top: _anchor.querySelectorAll('h1')[0].offsetTop, left: 0, behavior: 'smooth' });
        _first_focusable_el.focus();
      }
    } else {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  if (fullPage) {
    return (
      <header className={_header_class_names}>
        <button type="button" className="if axe skip-to-content" onClick={onClick}>
          Skip to content
        </button>
        <div className="if container">
          <Link className="sg homeLink" to="/" aria-label={siteTitle} title="Takes you to the frontpage" />
          <nav className="sg header nav">
            <ul className="sg header menu">
              <li className="if">
                <Link to="/design">Design</Link>
              </li>
              <li className="if">
                <Link to="/develop">Develop</Link>
              </li>
              <li className="if">
                <Link to="/components">Components</Link>
              </li>
              <li className="if" style={{ marginRight: '1.5rem' }}>
                <Link to="/resources">Resources</Link>
              </li>

              <Search />
            </ul>
          </nav>
          <MobileMenu />
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={_header_class_names}>
        <button type="button" className="if axe skip-to-content" onClick={onClick}>
          Skip to content
        </button>
        <Link className="sg homeLink" to="/" aria-label={siteTitle} title="Takes you to the frontpage" />
        <nav className="sg header nav">
          <ul className="sg header menu">
            <li className="if">
              <Link to="/design">Design</Link>
            </li>
            <li className="if">
              <Link to="/develop">Develop</Link>
            </li>
            <li className="if">
              <Link to="/components">Components</Link>
            </li>
            <li className="if">
              <Link to="/resources">Resources</Link>
            </li>

            <Search />
          </ul>
        </nav>
        <MobileMenu />
      </header>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  show: PropTypes.bool,
  fullPage: PropTypes.bool,
  hasSidebar: PropTypes.bool,
  searchIndex: PropTypes.shape({
    fields: PropTypes.array,
    pipeline: PropTypes.array,
    ref: PropTypes.string,
    version: PropTypes.string
  })
};

Header.defaultProps = {
  siteTitle: ''
};

export default Header;
