import React from 'react';

const Tag = ({ label, color = 'pink' }) => {
  return <span className={`if tag ${color}`}>{label}</span>;
};

export default Tag;
