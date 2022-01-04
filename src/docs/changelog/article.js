/* eslint no-console: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ children }) => {
  return (
    <div className="if block blog">
      <div className="if documentation-container">
        <h1 className="if heading largest ">Changelog</h1>
        <div className="if text layout column left">
          <p className="if text lead ">
            Here is the change log for If Design System. The changelog is also available in the{' '}
            <a
              className="if external"
              rel="noopener noreferrer"
              target="_blank"
              href="https://dev.azure.com/if-it/If%20Design%20Hub/_git/ids-core?path=%2FCHANGELOG.md">
              repository<span className="if axe sr-only">, Opens in new window</span>
            </a>{' '}
            and in the{' '}
            <a
              className="if external-link"
              rel="noopener noreferrer"
              target="_blank"
              href="https://dev.azure.com/if-it/If%20Design%20Hub/_wiki/wikis/digitalsolutions-guybrush.wiki/638/Changelog">
              wiki<span className="if axe sr-only">, Opens in new window</span>
            </a>
            .
          </p>
          <p className="if text body ">
            All breaking changes are communicated in the demos that we hold, and in the{' '}
            <a
              href="https://teams.microsoft.com/l/channel/19%3ac8444b2afd1843f083b1a3f261893fcf%40thread.skype/Breaking%2520changes?groupId=5f5dd61d-c19e-437a-9f65-721db7ef30b7&tenantId=de7e7a67-ae61-49d2-97a7-526c910ad675"
              className="if external"
              target="_blank"
              rel="noreferrer noopener">
              Breaking Changes teams channel<span className="if axe sr-only">, Opens in new window</span>
            </a>
            .
          </p>
        </div>
      </div>
      <div className="if block changelog" id="content">
        <div className="if documentation-container">{children}</div>
      </div>
    </div>
  );
};

Article.propTypes = {
  children: PropTypes.node
};

export default Article;
