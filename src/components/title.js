import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PrimaryTitle from './title-primary';
import SecondaryTitle from './title-secondary';

const Title = ({
  fullPage,
  scope,
  isCSSPackage,
  isJSPackage,
  isWCPackage,
  collection,
  frontmatter,
  fields,
  pkg,
  editLink,
  fileAbsolutePath
}) => {
  const { order, componentName, hideTitle } = frontmatter;

  if (hideTitle) return null;

  const _is_changelog = fileAbsolutePath && fileAbsolutePath.indexOf('CHANGELOG.md') !== -1;
  const _title_class_names = classNames('sg if heading', {
    largest: order === 1 && !fullPage,
    small: order !== 1 && !fullPage,
    'package-title': !!componentName && !fullPage,
    'hero-title': fullPage
  });

  if (order === 1) {
    return (
      <PrimaryTitle
        {...{
          collection,
          frontmatter,
          pkg,
          scope,
          fullPage,
          isCSSPackage,
          isJSPackage,
          isWCPackage,
          fileAbsolutePath,
          editLink,
          titleClassNames: _title_class_names
        }}
      />
    );
  }

  return (
    <SecondaryTitle
      {...{
        frontmatter,
        changelog: _is_changelog,
        fields,
        editLink,
        fileAbsolutePath,
        titleClassNames: _title_class_names
      }}
    />
  );
};

Title.propTypes = {
  frontmatter: PropTypes.shape({
    order: PropTypes.number,
    componentName: PropTypes.string,
    hideTitle: PropTypes.bool
  }),
  fields: PropTypes.shape({
    customPath: PropTypes.string
  }),
  pkg: PropTypes.shape({
    description: PropTypes.string
  }),
  fileAbsolutePath: PropTypes.string,
  fullPage: PropTypes.bool,
  isCSSPackage: PropTypes.bool,
  isJSPackage: PropTypes.bool,
  isWCPackage: PropTypes.bool,
  editLink: PropTypes.string,
  scope: PropTypes.string,
  collection: PropTypes.string
};

export default Title;
