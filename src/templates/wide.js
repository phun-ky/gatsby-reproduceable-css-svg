import React from 'react';
import { graphql } from 'gatsby';

import Doc from '../docs/core';

import ifDesignSystemPackage from '@ids-core/bundle/package.json';

const WideTemplate = ({ data }) => {
  const content = data.allMarkdownRemark;
  return <Doc wide={true} content={content} pkg={ifDesignSystemPackage} />;
};

export default WideTemplate;

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
  }
`;
