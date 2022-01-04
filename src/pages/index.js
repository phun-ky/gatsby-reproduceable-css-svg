import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import debounce from '../lib/debounce';

import Layout from '../components/layout';
import TopLevelSearch from '../components/search/TopLevelSearch';
import RadialCardOverlay from '../components/decorators/RadialCardOverlay';
import SEO from '../components/seo';

import '../lib/guybrush';

const IndexPage = ({ data }) => {
  const _posts = data.allMarkdownRemark.nodes;

  let cardHeightEventFunc;
  let cardResizeEventFunc;

  useEffect(() => {
    import('../lib/card').then(setCardsImageHeight => {
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
  useEffect(() => {
    cardHeightEventFunc = debounce(function () {
      const a = document.querySelector('.if.navigational-card.text.box');

      if (!a) return;

      const rect = a.getBoundingClientRect();

      document.documentElement.style.setProperty('--card-height', rect.height + 'px');
      document.documentElement.style.setProperty('--card-radial-height', rect.height * 2 + 'px');
    }, 300);

    window.addEventListener('resize', cardHeightEventFunc);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', cardHeightEventFunc);
    };
  }, []);

  return (
    <Layout fullPage={true} header={true}>
      <SEO />
      <section id="content" className="if hero" style={{ overflow: 'visible' }}>
        <div className="if container">
          <div className="if content" style={{ alignItems: 'flex-start' }}>
            <h1 className="if heading large">If Design System</h1>
            <p className="if text lead">
              The If Design System is a resource for designers, developers and anyone creating digital solutions or
              content in If, providing a common language and visual presence.
            </p>
            <TopLevelSearch />
          </div>
          <div
            className="if image studio"
            style={{ backgroundImage: 'url(/images/ifdesignsystem-hero-logo.png)' }}></div>
        </div>
      </section>
      <div className="if block">
        <div className="if container sg documentation">
          <ul className="if shortcut-bar">
            <li className="if">
              <Link className="if" to="/components">
                Components
              </Link>
            </li>
            <li className="if">
              <Link className="if" to="/design/foundation/color">
                Colors
              </Link>
            </li>
            <li className="if">
              <Link className="if" to="/design/foundation/icons">
                Icons
              </Link>
            </li>
            <li className="if">
              <Link className="if" to="/design/foundation/typography">
                Fonts
              </Link>
            </li>
            <li className="if">
              <Link className="if" to="/design/foundation/logotype">
                Logotype
              </Link>
            </li>
          </ul>

          <ul className="if cards navigational text two">
            <li className="if">
              <Link to="/design" className="if navigational-card text box red">
                <RadialCardOverlay />
                <span
                  style={{
                    height: '4rem',
                    width: '4rem',
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 stroke-width=%271%27 viewBox=%270 0 32 32%27%3E%3Cg fill=%27none%27 stroke=%27%23444%27 stroke-miterlimit=%2710%27%3E%3Cpath d=%27m23.5 28.5 6-6M12.5 5.5l-6 6%27 data-cap=%27butt%27 data-color=%27color-2%27/%3E%3Cpath stroke-linecap=%27square%27 d=%27M10 15 3.5 8.5l6-6L16 9M23 16l6.5 6.5 1 7-7-1L17 22%27 data-color=%27color-2%27/%3E%3Cpath stroke-linecap=%27square%27 stroke-width=%271%27 d=%27m2.5 22.5 20-20 6.999 7-20 20z%27/%3E%3Cpath stroke-linecap=%27square%27 d=%27m12.5 12.5 3 3M9.5 15.5l2 2M18.5 6.5l3 3M15.5 9.5l2 2M6.5 18.5l3 3%27/%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '4rem 4rem'
                  }}
                  className="if icon"></span>
                <span className="if title">Design</span>
                <span className="if text">Foundation, guidelines and visual identity</span>
              </Link>
            </li>
            <li className="if">
              <Link to="/develop" className="if navigational-card text box green">
                <RadialCardOverlay />
                <span
                  style={{
                    height: '4rem',
                    width: '4rem',
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 stroke-width=%271%27 viewBox=%270 0 32 32%27%3E%3Cg fill=%27none%27 stroke=%27%23331e11%27 stroke-linecap=%27square%27 stroke-miterlimit=%2710%27%3E%3Cpath d=%27M2 2h28v28H2z%27/%3E%3Cpath d=%27m8 9 7 7-7 7M16 9h8M16 23h8M20 16h4%27 data-color=%27color-2%27/%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '4rem 4rem'
                  }}
                  className="if icon symbol love white"></span>
                <span className="if title">Development guidelines</span>
                <span className="if text">Guidance, repository, tools and frameworks</span>
              </Link>
            </li>
          </ul>
          <h2 className="sg if heading large" id="index-main-resources-tools">
            Resources & tools
          </h2>
          <ul className="if navigational cards text three" role="menu" aria-labelledby="index-main-resources-tools">
            <li className="if" role="presentation">
              <Link to="/design/getting-started#getting-started-design-xd" className="if navigational-card text box">
                <span className="if title">Adobe XD UI Kit</span>
              </Link>
            </li>
            <li className="if" role="presentation">
              <Link to="/design/introduction" className="if navigational-card text box">
                <span className="if title">Visual Identity</span>
              </Link>
            </li>
            <li className="if" role="presentation">
              <Link to="/develop/repositories-and-tools" className="if navigational-card text box">
                <span className="if title">Repositories and Tools</span>
              </Link>
            </li>
            <li className="if" role="presentation">
              <a
                className="if navigational-card text box"
                rel="noopener noreferrer"
                target="_blank"
                href="https://brandportal.if.eu/login">
                <span className="if title">
                  If Brand Portal<span className="if axe sr-only">, Opens in new window</span>
                </span>
              </a>
            </li>
            <li className="if" role="presentation">
              <Link to="/changelog" className="if navigational-card text box">
                <span className="if title">Changelog</span>
              </Link>
            </li>
            <li className="if" role="presentation">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://teams.microsoft.com/l/team/19%3a5653139ad54d4f06b340907b42f35aeb%40thread.skype/conversations?groupId=5f5dd61d-c19e-437a-9f65-721db7ef30b7&tenantId=de7e7a67-ae61-49d2-97a7-526c910ad675"
                className="if navigational-card text box">
                <span className="if title">
                  Get in touch<span className="if axe sr-only">, Opens in new window</span>
                </span>
              </a>
            </li>
          </ul>
          <h2 className="sg if heading large">News & Updates</h2>
          {(!_posts || (_posts && _posts.length === 0)) && <div className="if alert-banner">No posts found.</div>}
          {_posts && _posts.length !== 0 && (
            <>
              <ol className="if cards articles">
                {[_posts[0], _posts[1]].map(post => {
                  const title = post.frontmatter.title || post.fields.slug;
                  const author = post.frontmatter.author;
                  const link = `/blog${post.fields.slug.replace('//', '/').replace(/\/+$/, '')}`;

                  return (
                    <li className="if editorial-card" style={{ backgroundColor: '#f1ece8' }} key={post.fields.slug}>
                      <div className="if content">
                        <h3 className="if title heading smallest">
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
                          <small className="if author">{author}</small>
                        </div>
                      </div>
                      <span className="if image lifestyle">
                        <GatsbyImage
                          aria-role="presentation"
                          image={post.frontmatter.teaserImage.childImageSharp.gatsbyImageData}
                          className="if"
                        />
                      </span>
                    </li>
                  );
                })}
              </ol>
              <ol className="if cards navigational text two">
                {[_posts[1], _posts[3], _posts[4]].map(post => {
                  const title = post.frontmatter.title || post.fields.slug;
                  const link = `/blog${post.fields.slug.replace('//', '/').replace(/\/+$/, '')}`;

                  return (
                    <li className="if" key={post.fields.slug}>
                      <Link to={link} className="if navigational-card text">
                        <span className="if title">{title}</span>
                        <span
                          className="if text"
                          dangerouslySetInnerHTML={{
                            __html: post.frontmatter.description || post.excerpt
                          }}
                          itemProp="description"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } }, frontmatter: { hidden: { ne: true } } }
      sort: { fields: fields___slug, order: DESC }
      limit: 5
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

IndexPage.propTypes = {
  data: PropTypes.shape()
};
