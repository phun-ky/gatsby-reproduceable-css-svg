import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const LinkBackToGuidelines = ({ title, show, to }) => {
  if (!show) return null;

  let _text_to_use = 'Back to guidelines';

  if (title && title !== '') {
    _text_to_use = `Back to ${title}-guidelines`;
  }

  return (
    <Link to={to} className="if back-to-link" style={{ marginBottom: '2rem', display: 'inline-block' }}>
      {_text_to_use}
    </Link>
  );
};

export default LinkBackToGuidelines;

LinkBackToGuidelines.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  show: PropTypes.bool.isRequired
};
