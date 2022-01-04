import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout fullPage={false} hasSidebar={true} header={true}>
    <SEO title="404: Not found" />
    <div className="if block poc" style={{ flexGrow: 1 }}>
      <div className="if documentation-container">
        <h1 className="if heading largest">Oops.. Page not found..</h1>
        <p className="if text lead" style={{ 'max-width': '552px' }}>
          Sorry, the page you tried to reach does not exist. It has either been moved or the URL you used was wrong.
        </p>
        <p className="if text body">Maybe some of these most visited links may help you?</p>
        <ul className="if">
          <li className="if">
            <a className="if" href="/components">
              Components
            </a>
          </li>
          <li className="if">
            <a className="if" href="/components/inputs/input-fields">
              Input Fields
            </a>
          </li>
          <li className="if">
            <a className="if" href="/resources/icons">
              Icons
            </a>
          </li>
          <li className="if">
            <a className="if" href="/changelog">
              Changelog
            </a>
          </li>
          <li className="if">
            <a className="if" href="/components/tables/data-tables">
              Data Tables
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
