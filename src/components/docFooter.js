import React from 'react';
import PropTypes from 'prop-types';
import camelCase from 'camelcase';
import { globalHistory } from '@reach/router';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { generateID, filterData } from '../lib/helpers';

const getDataForCategory = (data, category) => {
  const content = data[category];

  if (!content) return [];

  const { edges } = content;
  const filtered = filterData(globalHistory.location.pathname, edges);

  if (!filtered) return [];

  const reduced = filtered.reduce((accumulator, edge) => {
    const { node, previous, next } = edge;

    if (node.frontmatter && node.frontmatter.customPath) {
      node.frontmatter.id = generateID(node.frontmatter.customPath, node.frontmatter.title);
    }

    if (previous) {
      if (previous.frontmatter && previous.frontmatter.customPath) {
        previous.frontmatter.id = generateID(previous.frontmatter.customPath, previous.frontmatter.title);
      }
    }

    if (next) {
      if (next.frontmatter && next.frontmatter.customPath) {
        next.frontmatter.id = generateID(next.frontmatter.customPath, next.frontmatter.title);
      }
    }

    accumulator.push({
      node: node.frontmatter,
      previous: previous ? previous.frontmatter : null,
      next: next ? next.frontmatter : null
    });

    return accumulator;
  }, []);

  return reduced;
};
const Footer = ({ fullPage = false }) => {
  const pathname = globalHistory.location.pathname;
  const data = useStaticQuery(graphql`
    query {
      components: allMarkdownRemark(
        filter: {
          frontmatter: {
            category: { eq: "develop" }
            subCategory: { eq: "components" }
            componentName: { ne: null }
            order: { eq: 1 }
          }
        }
        sort: { fields: [frontmatter___componentName], order: ASC }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            tableOfContents
            timeToRead
            frontmatter {
              customPath
              componentName
              category
              subCategory
              title
            }
            fields {
              collection
              slug
            }
          }
          next {
            id
            frontmatter {
              customPath
              title
              category
              componentName
              globalNav
              hideTitle
              order
              subCategory
              topLevel
            }
          }
          previous {
            id
            frontmatter {
              topLevel
              title
              subCategory
              order
              hideTitle
              globalNav
              customPath
              componentName
              category
            }
          }
        }
      }
      design: allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "design" }, order: { eq: 1 } } }
        sort: { fields: [frontmatter___title], order: ASC }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            tableOfContents
            timeToRead
            frontmatter {
              customPath
              componentName
              category
              subCategory
              title
            }
            fields {
              collection
              slug
            }
          }
          next {
            id
            frontmatter {
              customPath
              title
              category
              componentName
              globalNav
              hideTitle
              order
              subCategory
              topLevel
            }
          }
          previous {
            id
            frontmatter {
              topLevel
              title
              subCategory
              order
              hideTitle
              globalNav
              customPath
              componentName
              category
            }
          }
        }
      }
    }
  `);

  if (!data || (data && data.length === 0)) return null;

  const currentCategory = pathname.split('/')[1];

  let navigation = [];

  if (currentCategory && currentCategory !== '') {
    navigation = getDataForCategory(data, camelCase(currentCategory));
  }

  const filtered = navigation.filter(obj => obj.node.customPath === pathname);

  if (!filtered || (filtered && filtered.length === 0)) return null;

  const { next, previous } = filtered[0];

  return (
    <footer
      className="sg if block documentation"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f6f3f0',
        flexGrow: '0',
        margin: '0'
      }}>
      <div
        className="if documentation-container"
        style={{ marginTop: 'auto', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <ul className="if shortcuts navigation two">
          {previous && (
            <li className="if">
              <Link to={previous.customPath} className="if shortcut page-link icon ui symbol product previous">
                <strong style={{ marginRight: '8px' }} className="if">
                  Previous:
                </strong>{' '}
                {previous.title}
              </Link>
            </li>
          )}
          {next && (
            <li className="if">
              <Link to={next.customPath} className="if shortcut page-link icon ui symbol product next">
                <strong style={{ marginRight: '8px' }} className="if">
                  Next:
                </strong>{' '}
                {next.title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  fullPage: PropTypes.bool
};
