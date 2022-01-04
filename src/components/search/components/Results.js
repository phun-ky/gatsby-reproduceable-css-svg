import React from 'react';
import PropTypes from 'prop-types';

import NoResults from './NoResults';
import GotResults from './GotResults';

const Results = ({ query, results, onClick }) => {
  if (!results.length) {
    return <NoResults onClick={onClick} />;
  }

  return <GotResults query={query} results={results} onClick={onClick} />;
};

export default Results;

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({})),
  onClick: PropTypes.func,
  query: PropTypes.string
};
