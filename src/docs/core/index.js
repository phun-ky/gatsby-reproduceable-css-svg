import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { globalHistory } from '@reach/router';

import { getHeadings } from '../../components/toc/lib/helpers';

import Layout from '../../components/layout';
import BackToTop from '../../components/backToTop';
import Contact from '../../components/contact';
import Article from '../../components/article';
import PageNavigation from '../../components/toc/TableOfContentsDesktop';
import ChildNavigationFooter from '../../components/docs/core/ChildNavigationFooter';
import EditorialDocumentationNavigation from '../../components/docs/core/EditorialDocumentationNavigation';

import Sections from './sections';

const DocumentationPage = ({ pkg, content }) => {
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

  // if (globalHistory.location.pathname === '/design/guidelines') {
  //   return (
  //     <Layout ref={layoutRef} fullPage={true} header={true}>
  //       <Article>
  //         <Sections fullPage={true} edges={edges} pkg={pkg} />
  //         <EditorialDocumentationNavigation />
  //         <BackToTop />
  //         <Contact />
  //       </Article>
  //     </Layout>
  //   );
  // }

  if (
    globalHistory.location.pathname === '/develop/guidelines' ||
    globalHistory.location.pathname === '/design/guidelines'
  ) {
    return (
      <Layout fullPage={_is_full_page} hasSidebar={true} header={true} ref={layoutRef}>
        <Article fullPage={_is_full_page}>
          <Sections fullPage={_is_full_page} edges={edges} pkg={pkg} />
          <EditorialDocumentationNavigation />
          <BackToTop />
          <Contact />
        </Article>
        {!_is_full_page && <PageNavigation headings={headings} />}
      </Layout>
    );
  }

  return (
    <Layout fullPage={_is_full_page} hasSidebar={true} header={true} ref={layoutRef}>
      <Article fullPage={_is_full_page}>
        <Sections fullPage={_is_full_page} edges={edges} pkg={pkg} />
        <ChildNavigationFooter />
        <BackToTop />
        <Contact />
      </Article>
      {!_is_full_page && <PageNavigation headings={headings} />}
    </Layout>
  );
};

DocumentationPage.propTypes = {
  pkg: PropTypes.shape({
    description: PropTypes.string
  }),
  content: PropTypes.shape({
    edges: PropTypes.array
  }),
  wide: PropTypes.bool
};

export default DocumentationPage;
