import React from 'react';

const ComponentDisclaimer = () => {
  return (
    <>
      <p className="if text disclaimer">
        This component provides <code className="language-">.css</code>, <code className="language-">.styl</code>,{' '}
        <code className="language-">.less</code> and <code className="language-">.scss</code> -files.
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
