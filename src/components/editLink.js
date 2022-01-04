import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getEditLink } from '../lib/helpers';
import { useStaticQuery, graphql } from 'gatsby';

const EditLink = ({ path, editLink, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            codeRepository {
              web
            }
          }
        }
      }
    `
  );
  const link = getEditLink(site, path, editLink);

  if (!link) return null;

  const linkText = children ? children : <span className="if">Edit this section</span>;
  const _classNamesForEditLink = classNames({
    sg: children ? false : true,
    if: children ? true : false,
    'edit-this-section-link': children ? false : true
  });

  return (
    <a
      className={_classNamesForEditLink}
      target="_blank"
      rel="noreferrer noopener"
      title="Edit this section"
      href={link}>
      {linkText}
      <span className="if axe sr-only">, Opens in new window</span>
    </a>
  );
};

EditLink.propTypes = {
  path: PropTypes.string,
  editLink: PropTypes.string,
  children: PropTypes.node
};

export default EditLink;
