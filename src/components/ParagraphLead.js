import React from 'react';
import PropTypes from 'prop-types';

const ParagraphLead = ({ children, ...props }) => {
  return (
    <p className="if text lead" {...props}>
      {children}
    </p>
  );
};

export default ParagraphLead;

ParagraphLead.propTypes = {
  children: PropTypes.node
};
