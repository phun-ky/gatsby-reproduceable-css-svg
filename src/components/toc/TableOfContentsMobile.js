import React from 'react';
import PropTypes from 'prop-types';

import Scroll from '../scroll';
import { generateTitleAnchorId } from '../../lib/helpers';

const TableOfContentsMobile = ({ edges }) => {
  if (!edges) return null;

  return (
    <>
      <h2 className="sg if heading large u-hidden-up--lg toc" style={{ marginTop: '4rem' }}>
        Table of Contents
      </h2>
      <nav className="sg section navigation">
        <ul className="sg section nav">
          {edges.map((edge, index) => {
            const { node } = edge;
            const { fields = {}, fileAbsolutePath, frontmatter } = node;
            const { customPath, title } = frontmatter;
            const _is_changelog = fileAbsolutePath && fileAbsolutePath.indexOf('CHANGELOG.md') !== -1;

            let _custom_path = customPath;
            let _title = title;

            if (_is_changelog) {
              _custom_path = fields.customPath;
              _title = 'Changelog';
            }

            const id = generateTitleAnchorId({ customPath: _custom_path, title: _title });

            return (
              <li key={`page-section-nav-item-key-${index}`} className="sg item">
                <Scroll type="id" offset={-104} element={id}>
                  <a href={`#${id}`} className="if">
                    {_title}
                  </a>
                </Scroll>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default TableOfContentsMobile;

TableOfContentsMobile.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string
    })
  )
};

TableOfContentsMobile.displayName = 'TableOfContentsMobile';
