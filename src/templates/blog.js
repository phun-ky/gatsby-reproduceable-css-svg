import React from 'react';
import { graphql } from 'gatsby';

import Blog from '../docs/blog';

import ifDesignSystemPackage from '@ids-core/bundle/package.json';

const BlogPostTemplate = ({ data, location }) => {
  return <Blog data={data} location={location} pkg={ifDesignSystemPackage} />;
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug }, collection: { eq: "blog" } }, frontmatter: { hidden: { ne: true } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
        collection
      }
      frontmatter {
        title
        tags
        author
        authorEmail
        studio
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      html
    }
  }
`;
