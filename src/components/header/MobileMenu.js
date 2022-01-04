import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useStaticQuery, graphql } from 'gatsby';

import MobileMenuListItem from './components/MobileMenuListItem.js';
import { getDataForCategory } from '../drawer/lib/helpers';

const MobileMenu = () => {
  const data = useStaticQuery(graphql`
    query {
      content: allMarkdownRemark(
        filter: { frontmatter: { hideTitle: { ne: true } }, fields: {} }
        sort: { fields: frontmatter___order }
      ) {
        edges {
          node {
            frontmatter {
              title
              subCategory
              order
              customPath
              componentName
              category
              navOrder
              notAPage
            }
          }
        }
      }
    }
  `);
  const _navigation = getDataForCategory(data);
  const _sorted_navigation = (_navigation || []).sort((a, b) => {
    if (a.navOrder && b.navOrder) {
      if (a.navOrder === b.navOrder) return 0;

      return a.navOrder < b.navOrder ? -1 : 1;
    } else {
      if (a.order === b.order) return 0;

      return a.order < b.order ? -1 : 1;
    }
  });
  const [isMobileDrawerOpen, toggleMobileDrawer] = useState(false);
  const handleClick = e => {
    if (e.key && e.key === 'Enter') {
      toggleMobileDrawer(!isMobileDrawerOpen);
    } else {
      toggleMobileDrawer(!isMobileDrawerOpen);
    }
  };
  const toggleMobileDrawerButtonClassNames = classNames({
    sg: true,
    'global-menu-button': true,
    'is-open': isMobileDrawerOpen
  });
  const globalMenuDrawerClassNames = classNames({
    sg: true,
    if: true,
    'global-menu-drawer': true,
    'is-open': isMobileDrawerOpen
  });
  const globalAccordionMenuClassNames = classNames({
    if: true,
    'accordion-menu': true,
    'is-open': isMobileDrawerOpen
  });
  const globalAccordionMenuListClassNames = classNames({
    if: true,
    'is-open': isMobileDrawerOpen
  });

  return (
    <>
      <div className="sg if global-menu-control">
        <button type="button" onClick={handleClick} className={toggleMobileDrawerButtonClassNames}></button>
        <div className={globalMenuDrawerClassNames}>
          <nav className={globalAccordionMenuClassNames}>
            <ul className={globalAccordionMenuListClassNames}>
              <li role="presentation" className="if">
                <Link activeClassName="is-active" role="menuitem" className="if" to="/about">
                  About
                </Link>
              </li>
              <li role="presentation" className="if">
                <Link activeClassName="is-active" role="menuitem" className="if" to="/blog">
                  News
                </Link>
              </li>
              {_sorted_navigation.map((page, index) => (
                <MobileMenuListItem type="accordion" page={page} key={`key-listitem-${index}`} />
              ))}
              <li role="presentation" className="if">
                <Link activeClassName="is-active" role="menuitem" className="if" to="/changelog">
                  Changelog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
