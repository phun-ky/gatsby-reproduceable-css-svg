import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../../components/layout';
import BlogMain from '../../docs/blog/blogMain';
import SEO from '../../components/seo';
import '../../lib/guybrush';
import debounce from '../../lib/debounce';

const BlogIndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allMarkdownRemark.nodes;

  let cardResizeEventFunc;

  useEffect(() => {
    import('../../lib/card').then(setCardsImageHeight => {
      setCardsImageHeight.default();

      cardResizeEventFunc = debounce(function () {
        setCardsImageHeight.default();
      }, 300);

      window.addEventListener('resize', cardResizeEventFunc);
    });
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', cardResizeEventFunc);
    };
  }, []);

  return (
    <Layout footer={true} fullPage={true} header={true}>
      <SEO title={siteTitle} />
      <BlogMain title="News from If Design System" image={'./images/documents-min.png'}>
        {(!posts || (posts && posts.length === 0)) && <div className="if alert-banner">No posts found.</div>}
        {posts && posts.length !== 0 && (
          <>
            <h2 className="if heading medium">Articles</h2>
            <ol className="if cards articles">
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug;
                const tags = post.frontmatter.tags;
                const author = post.frontmatter.author;
                const link = `/blog${post.fields.slug.replace('//', '/').replace(/\/+$/, '')}`;

                return (
                  <li className="if editorial-card" key={post.fields.slug}>
                    <div className="if content">
                      <span className="if category">Release</span>
                      <h3 className="if title heading small">
                        <Link to={link} className="if">
                          {title}
                          <span className="if inline-nowrap">
                            &#xfeff;<span className="if icon ui arrow-right"></span>
                          </span>
                        </Link>
                      </h3>
                      <p
                        className="if preview"
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt
                        }}
                        itemProp="description"
                      />
                      <div className="if meta">
                        {tags && (
                          <ul className="if tags">
                            {tags.map((tag, index) => {
                              if (tag.indexOf('@') !== -1) return null;

                              return (
                                <li key={`key-tag-0${index}`} className="if">
                                  <span className="if tag passive">{tag}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        <small className="if author">{author}</small>
                      </div>
                    </div>
                    <span className="if image lifestyle">
                      <GatsbyImage
                        alt="image related to the post"
                        image={post.frontmatter.teaserImage.childImageSharp.gatsbyImageData}
                        className="if"
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </BlogMain>
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } }, frontmatter: { hidden: { ne: true } } }
      sort: { fields: fields___slug, order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          tags
          author
          teaserImage {
            sourceInstanceName
            name
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`;

BlogIndexPage.propTypes = {
  data: PropTypes.shape()
};
