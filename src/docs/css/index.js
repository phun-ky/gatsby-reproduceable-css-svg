import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { getSections } from '../../lib/helpers';
import { getHeadings } from '../../components/toc/lib/helpers';

import Layout from '../../components/layout';
import Drawer from '../../components/drawer';
import BackToTop from '../../components/backToTop';
import Contact from '../../components/contact';
import Footer from '../../components/docFooter';
import Article from '../../components/article';
import PageNavigation from '../../components/toc/TableOfContentsDesktop';

import Sections from './sections';

const CSSDocumentationPage = ({ pkg, content, wide = false }) => {
  const { edges } = content;
  const _is_full_page = false;
  const sections = getSections(edges);
  const [headings, setHeadings] = useState([]);
  const layoutRef = useCallback(node => {
    if (!node) {
      setHeadings([]);

      return;
    }

    setHeadings(getHeadings(node));
  }, []);

  return (
    <Layout fullPage={_is_full_page} hasSidebar={true} header={true} ref={layoutRef}>
      {!_is_full_page && <Drawer />}
      <Article fullPage={_is_full_page}>
        <Sections fullPage={_is_full_page} wide={wide} sections={sections} edges={edges} pkg={pkg} />
        <Footer />
        <BackToTop />
        <Contact />
      </Article>
      {!_is_full_page && <PageNavigation headings={headings} />}
    </Layout>
  );
};

CSSDocumentationPage.propTypes = {
  pkg: PropTypes.shape({
    description: PropTypes.string
  }),
  content: PropTypes.shape({
    edges: PropTypes.array
  }),
  wide: PropTypes.bool
};

export default CSSDocumentationPage;
