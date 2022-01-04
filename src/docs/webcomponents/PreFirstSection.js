import React from 'react';
import PropTypes from 'prop-types';

import ParagraphLead from '../../components/ParagraphLead';

import ComponentDisclaimer from './ComponentDisclaimer';
import PackageLinks from './PackageLinks';

const PreFirstSection = ({ show, pkg, componentName }) => {
  if (!show) return null;

  return (
    <>
      <div className="if text layout column left">
        <div className="if text body">
          <ParagraphLead>{pkg.description}</ParagraphLead>
        </div>
        <div className="if text body"></div>
      </div>
      <div className="if text layout columns">
        <div className="if text body">
          <ComponentDisclaimer />
        </div>
        <div className="if text body">
          <PackageLinks pkg={pkg} componentName={componentName} />
        </div>
      </div>
    </>
  );
};

export default PreFirstSection;

PreFirstSection.propTypes = {
  show: PropTypes.bool.isRequired,
  pkg: PropTypes.shape(),
  componentName: PropTypes.string
};
