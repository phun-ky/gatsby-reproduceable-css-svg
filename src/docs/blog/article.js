/* eslint no-console: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ children, title, description, image, tags, pullRequest, studio = false }) => {
  const imgClassNames = `if image${studio ? ' studio' : ''}`;
  const showImage = true;
  const showChangelog = tags.indexOf('migration') === -1;

  return (
    <>
      {!title && <div className="if block dark"></div>}
      {title && (
        <section data-speccer className="if hero blog">
          <div className="if container">
            <div className="if content">
              <h1 className="if heading hero-title">{title}</h1>
              {showChangelog && (
                <a className="if button secondary" href="/changelog">
                  Changelog
                </a>
              )}

              {showImage && <p className="if text lead">{description}</p>}
              {showImage && (
                <p className="if text meta disclaimer" style={{ fontSize: '1rem', fontVariationSettings: '"wght" 82' }}>
                  The release includes, but not limited to features, documentation, refactoring and bug fixes. For any
                  questions, please contact us!
                </p>
              )}
            </div>
            {showImage && <div className={imgClassNames} style={{ backgroundImage: `url(${image})` }}></div>}
          </div>
        </section>
      )}
      {tags && (
        <div className="if banner blog">
          <div className="if container">
            <div className="if" style={{ display: 'grid', gridTemplateColumns: '75% 25%' }}>
              {tags && (
                <ul className="if tags">
                  {tags.map((tag, index) => (
                    <li key={`key-tag-0${index}`} className="if">
                      <span className="if tag passive">{tag}</span>
                    </li>
                  ))}
                </ul>
              )}
              {pullRequest && (
                <div className="if relase-info">
                  <a className="if external" target="_blank" rel="noreferrer noopener" href={pullRequest}>
                    Pull request<span className="if axe sr-only">, Opens in new window</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="if block" id="content">
        <div className="if container">{children}</div>
      </div>
    </>
  );
};

Article.propTypes = {
  children: PropTypes.node
};

export default Article;
