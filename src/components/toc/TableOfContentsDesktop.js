import React from 'react';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import { globalHistory } from '@reach/router';

import Scroll from '../scroll';
import Bug from '../bug';

const TableOfContentsDesktop = ({ headings }) => {
  const showBug = globalHistory.location.pathname.indexOf('/components') === 0;
  const children_idx = headings.map(h => h.id);

  if (headings.length <= 2 || children_idx.length <= 2) return null;

  return (
    <nav role="menu" className="sg section if navigation sidebar-menu pageNavigation">
      <Scrollspy
        aria-role="presentation"
        className="if"
        items={children_idx}
        currentClassName="is-active"
        offset={-142}>
        {headings.map((h, i) => {
          const _level = +h.nodeName.replace('H', '');

          if (_level >= 4) return;

          const _link_class_names = `if level-${_level}`;

          return (
            <li className="if" key={`toc-item-${i}`}>
              <Scroll type="id" offset={-200} element={h.id}>
                <a data-scroll-id={h.id} href={`#${h.id}`} className={_link_class_names}>
                  {h.firstChild.data || h.innerText}
                </a>
              </Scroll>
            </li>
          );
        })}
        {showBug && (
          <li className="if bug">
            <Bug />
          </li>
        )}
      </Scrollspy>
    </nav>
  );
};

export default TableOfContentsDesktop;

TableOfContentsDesktop.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string
    })
  )
};

TableOfContentsDesktop.displayName = 'TableOfContentsDesktop';
