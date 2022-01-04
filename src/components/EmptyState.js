import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ children, ...props }) => {
  return (
    <div className="if empty-state" {...props}>
      {children}
    </div>
  );
};

export default EmptyState;

EmptyState.propTypes = {
  children: PropTypes.node.isRequired
};
