import React from 'react';
import { globalHistory } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

import SubCategoryEditorialDocumentationNavigation from './SubCategoryEditorialDocumentationNavigation';

const EditorialDocumentationNavigation = () => {
  const _path = globalHistory.location.pathname;

  if (!['/design/guidelines', '/develop/guidelines'].includes(_path)) return null;

  const _split = _path.split('/');

  _split.shift();

  const [_category, _sub_category] = _split;
  const _data = useStaticQuery(graphql`
    query {
      design_guidelines: allMarkdownRemark(
        filter: { frontmatter: { customPath: { glob: "/design/guidelines/**" }, order: { eq: 1 } } }
        sort: { fields: [frontmatter___order], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              order
              customPath
              componentName
              category
              subCategory
              title
              tags
              hideTitle
            }
            fields {
              collection
            }
            excerpt(format: PLAIN, pruneLength: 100, truncate: true)
            timeToRead
          }
        }
      }
      develop_guidelines: allMarkdownRemark(
        filter: { frontmatter: { customPath: { glob: "/develop/guidelines/**" }, order: { eq: 1 } } }
        sort: { fields: [frontmatter___order], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              order
              customPath
              componentName
              category
              subCategory
              title
              tags
              hideTitle
            }
            fields {
              collection
            }
            excerpt(format: PLAIN, pruneLength: 100, truncate: true)
            timeToRead
          }
        }
      }
    }
  `);

  if (['/design/guidelines', '/develop/guidelines'].includes(_path)) {
    const _sub_cat_key = `${_category.replace(/-/g, '_')}_${_sub_category.replace(/-/g, '_')}`;

    return <SubCategoryEditorialDocumentationNavigation edges={_data[_sub_cat_key].edges} />;
  }

  return null;
};

export default EditorialDocumentationNavigation;
