import React from 'react';
import { graphql } from 'gatsby';

import Changelog from '../docs/changelog';

import ifDesignSystemPackage from '@ids-core/bundle/package.json';

const ComponentTemplate = ({ data }) => {
  const content = data.allMarkdownRemark;
  return <Changelog content={content} pkg={ifDesignSystemPackage} />;
};

export default ComponentTemplate;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { fields: { collection: { eq: "changelog" } } }) {
      edges {
        node {
          id
          fileAbsolutePath
          html
          tableOfContents
          timeToRead
          fields {
            collection
            slug
          }
        }
      }
    }
  }
`;
