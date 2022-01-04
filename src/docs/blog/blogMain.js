/* eslint no-console: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ children, title, image }) => {
  return (
    <>
      {title && (
        <section className="if hero blog">
          <div className="if container">
            <div className="if content">
              <h1 className="if heading hero-title">{title}</h1>
            </div>
            <div
              className="if image studio"
              alt="image related to the post"
              style={{ backgroundImage: `url(${image})` }}></div>
          </div>
        </section>
      )}
      <div className="if block blog" id="content">
        <div className="if container">{children}</div>
      </div>
    </>
  );
};

Article.propTypes = {
  children: PropTypes.node
};

export default Article;
