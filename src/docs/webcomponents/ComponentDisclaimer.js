import React from 'react';

const ComponentDisclaimer = () => {
  return (
    <>
      <p className="if text disclaimer">
        This component is compatible with ESM (ES6 module) and IIFE. See documentation examples below.
      </p>
      <p className="if text disclaimer">
        To be able to install this component, please refer to the{' '}
        <a href="/develop/getting-started/setup" className="if">
          Project Setup
        </a>{' '}
        documentation.
      </p>
    </>
  );
};

export default ComponentDisclaimer;
