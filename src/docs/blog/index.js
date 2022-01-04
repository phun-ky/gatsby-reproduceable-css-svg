import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSrc } from 'gatsby-plugin-image';

import debounce from '../../lib/debounce';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import BackToTop from '../../components/backToTop';
import Contact from '../../components/contact';

import Article from './article';
import Author from './author';

const BlogPage = ({ data }) => {
  const post = data.markdownRemark;
  const tags = post.frontmatter.tags;
  const imagePath = getSrc(post.frontmatter.image);

  let cardHeightEventFunc;

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
    <Layout footer={true} fullPage={true} header={true}>
      <SEO
        title={post.frontmatter.title}
        image={imagePath}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article
        tags={tags}
        description={post.frontmatter.description}
        title={post.frontmatter.title}
        image={imagePath}
        studio={post.frontmatter.studio}>
        <div className="if" dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <Author author={post.frontmatter.author} authorEmail={post.frontmatter.authorEmail} />
        <BackToTop />
        <Contact />
      </Article>
    </Layout>
  );
};

export default BlogPage;

BlogPage.propTypes = {
  data: PropTypes.shape({})
};
