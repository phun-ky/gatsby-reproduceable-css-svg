import React from 'react';
import PropTypes from 'prop-types';

const ResultsContainer = ({ children }) => {
  return (
    <ol className="if suggestions is-open" role="listbox" id="desktop-search-results">
      {children}
    </ol>
  );
};

export default ResultsContainer;

ResultsContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
