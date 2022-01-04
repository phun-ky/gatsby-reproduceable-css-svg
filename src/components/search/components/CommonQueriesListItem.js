import React from 'react';
import PropTypes from 'prop-types';

const CommonQueriesListItem = ({ onClick, url, children }) => {
  return (
    <li onClick={onClick} className="if" role="option" tabIndex="-1" aria-selected="false">
      <span onClick={onClick} className="if search-result-item-holder" style={{ display: 'flex' }} data-to={url}>
        <span className="sg if search-result-title">{children}</span>
      </span>
    </li>
  );
};

export default CommonQueriesListItem;

CommonQueriesListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  url: PropTypes.string,
  onClick: PropTypes.func
};
