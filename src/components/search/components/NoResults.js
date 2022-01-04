import React from 'react';
import PropTypes from 'prop-types';

import ResultsContainer from './ResultsContainer';
import CommonQueriesListItem from './CommonQueriesListItem';
import CommonResultsTitleListItem from './CommonResultsTitleListItem';

const NoResults = ({ onClick }) => {
  return (
    <ResultsContainer>
      <CommonResultsTitleListItem />
      <CommonQueriesListItem url="/components" onClick={onClick}>
        Components
      </CommonQueriesListItem>
      <CommonQueriesListItem url="/components/inputs/input-fields" onClick={onClick}>
        Input Fields
      </CommonQueriesListItem>
      <CommonQueriesListItem url="/resources/icons" onClick={onClick}>
        Icons
      </CommonQueriesListItem>
      <CommonQueriesListItem url="/changelog" onClick={onClick}>
        Changelog
      </CommonQueriesListItem>
      <CommonQueriesListItem url="/components/tables/data-tables" onClick={onClick}>
        Data Tables
      </CommonQueriesListItem>
    </ResultsContainer>
  );
};

export default NoResults;

NoResults.propTypes = {
  onClick: PropTypes.func
};
