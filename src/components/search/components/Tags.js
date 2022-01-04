import React from 'react';
import PropTypes from 'prop-types';
import humanize from 'humanize-string';

import Tag from '../../Tag';

const Tags = ({ page }) => {
  const { category, path, componentName, collection } = page;
  const _el_array = [];

  if (collection === 'blog' || collection === 'changelog') return null;

  if (componentName && componentName !== '') {
    _el_array.push({ color: 'aquamarine', label: humanize(componentName) });
  } else {
    if (path.indexOf('/components') === 0) {
      let _attempt_name = path.split('/').reverse()[0];

      if (['js', 'webcomponent', 'react', 'css'].includes(_attempt_name)) {
        _attempt_name = path.split('/').reverse()[1];
      }

      _el_array.push({ color: 'aquamarine', label: humanize(_attempt_name) });
    } else {
      _el_array.push({ color: 'aquamarine', label: humanize(category) });
    }
  }

  if (path.indexOf('js') !== -1) {
    _el_array.push({ color: 'yellow', label: 'js' });
  }

  if (path.indexOf('css') !== -1) {
    _el_array.push({ color: 'yellow', label: 'css' });
  }

  if (path.indexOf('webcomponent') !== -1) {
    _el_array.push({ color: 'yellow', label: 'webcomponent' });
  }

  if (path.indexOf('react') !== -1) {
    _el_array.push({ color: 'yellow', label: 'react' });
  }

  return (
    <span className="if search-result-tags">
      {_el_array.map((tag, index) => (
        <Tag key={`tag-${index}`} {...tag} />
      ))}
    </span>
  );
};

export default Tags;

Tags.propTypes = {
  page: PropTypes.shape({
    category: PropTypes.string,
    path: PropTypes.string,
    componentName: PropTypes.string,
    collection: PropTypes.string
  })
};
