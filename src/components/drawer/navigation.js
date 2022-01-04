import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { getDataForCategory } from './lib/helpers';

import MenuListItem from '../header/components/MenuListItem.js';

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query {
      content: allMarkdownRemark(
        filter: { frontmatter: { hideTitle: { ne: true }, order: { eq: 1 } }, fields: {} }
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

  return (
    <nav id="menu" role="menu" className="sg if sidebar-menu">
      <ul className="if" role="presentation">
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
          <MenuListItem level={1} type="sidebar" page={page} key={`key-listitem-${index}`} />
        ))}

        <li role="presentation" className="if">
          <Link activeClassName="is-active" role="menuitem" className="if" to="/changelog">
            Changelog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
