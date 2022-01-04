import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Doc from '../docs/javascript';

import idsJSpackage from '@ids-js/bundle/package.json';

const JSComponentTemplate = ({ data }) => {
  const content = {
    edges: [...data.allMarkdownRemark.edges, ...data.allMdx.edges, ...data.changelog.edges]
  };

  return <Doc content={content} pkg={idsJSpackage} />;
};

export default JSComponentTemplate;

export const pageQuery = graphql`
  query ($customPath: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { customPath: { eq: $customPath } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          id
          fileAbsolutePath
          html
          tableOfContents
          timeToRead
          frontmatter {
            order
            customPath
            componentName
            category
            editLink
            subCategory
            title
            hideTitle
          }
          fields {
            collection
            slug
          }
        }
      }
    }
    changelog: allMarkdownRemark(filter: { fields: { customPath: { eq: $customPath } } }) {
      edges {
        node {
          id
          fileAbsolutePath
          html
          tableOfContents
          timeToRead
          frontmatter {
            order
            customPath
            componentName
            category
            editLink
            subCategory
            title
            hideTitle
          }
          fields {
            collection
            customPath
            slug
          }
        }
      }
    }
    allMdx(
      filter: { frontmatter: { customPath: { eq: $customPath } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            order
            customPath
            category
            subCategory
            title
          }
          body
        }
      }
    }
  }
`;

JSComponentTemplate.propTypes = {
  data: PropTypes.shape()
};
