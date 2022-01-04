import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { getSections } from '../../lib/helpers';
import { getHeadings } from '../../components/toc/lib/helpers';

import Footer from '../../components/docFooter';
import BackToTop from '../../components/backToTop';
import Contact from '../../components/contact';
import Drawer from '../../components/drawer';
import Article from '../../components/article';
import Layout from '../../components/layout';
import PageNavigation from '../../components/toc/TableOfContentsDesktop';

import Sections from './sections';

const JSDocumentationPage = ({ pkg, content }) => {
  const { edges } = content;
  const _is_full_page = false;
  const [headings, setHeadings] = useState([]);
  const layoutRef = useCallback(node => {
    if (!node) {
      setHeadings([]);

      return;
    }

    setHeadings(getHeadings(node));
  }, []);
  const sections = getSections(edges);

  return (
    <Layout fullPage={_is_full_page} hasSidebar={true} header={true} ref={layoutRef}>
      <Drawer />
      <Article>
        <Sections sections={sections} edges={edges} pkg={pkg} />
        <Footer />
        <BackToTop />
        <Contact />
      </Article>
      <PageNavigation headings={headings} />
    </Layout>
  );
};

JSDocumentationPage.propTypes = {
  pkg: PropTypes.shape({
    description: PropTypes.string
  }),
  content: PropTypes.shape({
    edges: PropTypes.array
  }),
  wide: PropTypes.bool
};

export default JSDocumentationPage;
