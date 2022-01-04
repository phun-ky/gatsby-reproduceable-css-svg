import React from 'react';
import PropTypes from 'prop-types';

import Section from './section';

const Sections = props => {
  const { edges } = props;

  return (
    <div className="if sections">
      {edges.map((edge, index) => (
        <Section key={`section-${index}`} edge={edge} {...props} />
      ))}
    </div>
  );
};

export default Sections;

Sections.propTypes = {
  edges: PropTypes.array
};
