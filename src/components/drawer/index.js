import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation';

const Drawer = () => {
  return (
    <aside className="sg drawer">
      <Navigation />
    </aside>
  );
};

Drawer.propTypes = {
  siteTitle: PropTypes.string
};

export default Drawer;
