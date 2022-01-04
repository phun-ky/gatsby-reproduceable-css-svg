import React from 'react';
import PropTypes from 'prop-types';

const PackageInstall = ({ name, pkg, scope = 'ids-core' }) => {
  return (
    <>
      <pre className="language-bash">
        $ npm i @{scope}/{name}@{pkg.version}
      </pre>
      <hr className="if" />
    </>
  );
};

PackageInstall.propTypes = {
  name: PropTypes.string,
  scope: PropTypes.string,
  pkg: PropTypes.shape({
    version: PropTypes.string
  })
};

export default PackageInstall;
