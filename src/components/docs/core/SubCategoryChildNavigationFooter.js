import React from 'react';
import PropTypes from 'prop-types';

import ChildNavigationFooterLayoutWrapper from './ChildNavigationFooterLayoutWrapper';
import ChildNavigationListItem from './ChildNavigationListItem';

const SubCategoryChildNavigationFooter = ({ edges }) => {
  const _filtered = edges.filter(edge => {
    const { node } = edge;
    const { frontmatter } = node;
    const { order, customPath } = frontmatter;
    const _split = customPath.split('/');

    _split.shift();

    const [_category, _sub_category, _level_1, _level_2, _level_3] = _split;

    if (order === 1 && _category && _sub_category && _level_1 && !_level_2 && !_level_3) {
      if (customPath.indexOf('getting-started') !== -1) return false;

      return true;
    }

    return false;
  });

  if (!_filtered || (_filtered && _filtered.length === 0)) return null;

  return (
    <ChildNavigationFooterLayoutWrapper>
      {_filtered.map((edge, index) => {
        const { node } = edge;
        const { frontmatter } = node;
        const { customPath, title } = frontmatter;

        return (
          <ChildNavigationListItem key={`page-child-navigation-list-item-${index}`} title={title} url={customPath} />
        );
      })}
    </ChildNavigationFooterLayoutWrapper>
  );
};

export default SubCategoryChildNavigationFooter;

SubCategoryChildNavigationFooter.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.shape({}))
};
