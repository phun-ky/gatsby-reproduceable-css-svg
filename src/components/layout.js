import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Drawer from './drawer';
import Header from './header/index';
import Footer from './footer';
import { SearchProvider } from '../contexts/SearchContext';

const Layout = React.forwardRef(({ fullPage = false, hasSidebar = false, header = false, children }, ref) => {
  const _data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      siteSearchIndex {
        index
      }
    }
  `);

  return (
    <>
      <SearchProvider value={_data.siteSearchIndex.index}>
        <Header fullPage={fullPage} show={header} hasSidebar={hasSidebar} />

        {!fullPage && <Drawer />}
        <main className="sg if main" ref={ref}>
          {children}
        </main>
        <Footer fullPage={fullPage} />
      </SearchProvider>
    </>
  );
});

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  fullPage: PropTypes.bool,
  hasSidebar: PropTypes.bool,
  header: PropTypes.bool
};

Layout.displayName = 'Layout';

export default Layout;
