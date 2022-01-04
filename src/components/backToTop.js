import React, { useEffect } from 'react';

const backToTop = () => {
  useEffect(() => {
    import('../lib/back-to-top').then(backToTop => {
      backToTop.default();
    });
  });

  return (
    <button
      aria-label="Back to top"
      type="button"
      onKeyPress={e => {
        if (e.key === 'Enter') {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }
      }}
      onClick={() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }}
      className="if js-back-to-top floating-action-button back-to-top">
      Back to top
    </button>
  );
};

export default backToTop;
