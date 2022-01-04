import React from 'react';
import PropTypes from 'prop-types';

const ChildNavigationFooterLayoutWrapper = ({ children }) => {
  return (
    <div className="if sections child-navigation-footer">
      <div className="sg if block">
        <div className="if documentation-container">
          <h2 className="sg if heading small">Up next</h2>
          <ul className="if cards navigational lifestyle text four">{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default ChildNavigationFooterLayoutWrapper;

ChildNavigationFooterLayoutWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
