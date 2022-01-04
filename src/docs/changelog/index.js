import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../components/layout';
import BackToTop from '../../components/backToTop';
import Contact from '../../components/contact';

import Article from './article';

const Changelog = ({ content }) => {
  const { edges } = content;

  return (
    <Layout fullPage={false} header={true} hasSidebar={true}>
      <Article>
        <div key="changelog-" className="if" dangerouslySetInnerHTML={{ __html: edges[0].node.html }} />
        <BackToTop />
        <Contact />
      </Article>
    </Layout>
  );
};

Changelog.propTypes = {
  content: PropTypes.shape({
    edges: PropTypes.array
  })
};

export default Changelog;
