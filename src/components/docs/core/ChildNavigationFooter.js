import React from 'react';
import { globalHistory } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

import SubCategoryChildNavigationFooter from './SubCategoryChildNavigationFooter';
import CategoryChildNavigationFooter from './CategoryChildNavigationFooter';

const ChildNavigationFooter = () => {
  const _path = globalHistory.location.pathname;

  if (!['/design/foundation', '/develop/guidelines', '/develop', '/design'].includes(_path)) return null;

  const _split = _path.split('/');

  _split.shift();

  const [_category, _sub_category] = _split;
  const _data = useStaticQuery(graphql`
    query {
      design_foundation: allMarkdownRemark(
        filter: { frontmatter: { customPath: { glob: "/design/foundation/**" }, order: { eq: 1 } } }
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
              hideTitle
            }
            fields {
              collection
            }
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
              hideTitle
            }
            fields {
              collection
            }
          }
        }
      }
      develop: allMarkdownRemark(
        filter: { frontmatter: { customPath: { glob: "/develop/**" }, order: { eq: 1 } } }
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
              hideTitle
            }
            fields {
              collection
            }
          }
        }
      }
      design: allMarkdownRemark(
        filter: { frontmatter: { customPath: { glob: "/design/**" }, order: { eq: 1 } } }
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
              hideTitle
            }
            fields {
              collection
            }
          }
        }
      }
    }
  `);

  if (['/design/foundation', '/develop/guidelines'].includes(_path)) {
    const _sub_cat_key = `${_category.replace(/-/g, '_')}_${_sub_category.replace(/-/g, '_')}`;

    return <SubCategoryChildNavigationFooter edges={_data[_sub_cat_key].edges} />;
  } else if (['/develop', '/design'].includes(_path)) {
    const _cat_key = _category.replace(/-/g, '_');

    return <CategoryChildNavigationFooter edges={_data[_cat_key].edges} />;
  }

  return null;
};

export default ChildNavigationFooter;
