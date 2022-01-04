import React from 'react';
// import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

// import debounce from '../../../lib/debounce';

const SubCategoryEditorialDocumentationNavigation = ({ edges }) => {
  // let cardResizeEventFunc;
  //
  // useEffect(() => {
  //   import('../../../lib/card').then(setCardsImageHeight => {
  //     setCardsImageHeight.default();
  //
  //     cardResizeEventFunc = debounce(function () {
  //       setCardsImageHeight.default();
  //     }, 300);
  //
  //     window.addEventListener('resize', cardResizeEventFunc);
  //   });
  // });
  //
  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener('resize', cardResizeEventFunc);
  //   };
  // }, []);

  const _filtered = edges.filter(edge => {
    const { node } = edge;
    const { frontmatter } = node;
    const { order, customPath } = frontmatter;
    const _split = customPath.split('/');

    _split.shift();

    const [_category, _sub_category, _level_1, _level_2, _level_3] = _split;

    if (order === 1 && _category && _sub_category && _level_1 && !_level_2 && !_level_3) {
      if (customPath.indexOf('getting-started') !== -1) return false;

      return true;
    }

    return false;
  });

  if (!_filtered || (_filtered && _filtered.length === 0)) return null;

  var pr = new Intl.PluralRules('en-US', { type: 'ordinal' });

  const suffixes = new Map([
    ['one', 'minute'],
    ['two', 'minutes'],
    ['few', 'minutes'],
    ['other', 'minutes']
  ]);
  const formatReadingTime = n => {
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);

    return `${n} ${suffix}`;
  };

  formatReadingTime(0); // '0th'

  return (
    <div className="if sections child-navigation-footer" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="sg if block blog" style={{ flexGrow: '1' }}>
        <div className="if documentation-container">
          <h2 className="sg if heading small">Articles</h2>

          <ol className="if cards articles">
            {_filtered.map((edge, index) => {
              const { node } = edge;
              const { frontmatter, excerpt, timeToRead } = node;
              const { customPath, title, tags, description } = frontmatter;

              return (
                <li className="if editorial-card" key={`editorial-documentation-item-${index}`}>
                  <div className="if content" style={{ flexGrow: '1' }}>
                    <span className="if category">Article</span>
                    <h3 className="if title heading small">
                      <Link to={customPath} className="if">
                        {title}
                        <span className="if inline-nowrap">
                          &#xfeff;<span className="if icon ui arrow-right"></span>
                        </span>
                      </Link>
                    </h3>
                    <p
                      className="if preview"
                      dangerouslySetInnerHTML={{
                        __html: description || excerpt
                      }}
                      itemProp="description"
                    />
                    <div className="if meta" style={{ marginTop: 'auto' }}>
                      {tags && (
                        <ul className="if tags">
                          {tags.map((tag, index) => {
                            if (tag.indexOf('@') !== -1) return null;

                            return (
                              <li key={`key-tag-0${index}`} className="if">
                                <span className="if tag passive">{tag}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      <small className="if extras">Time to read: {formatReadingTime(timeToRead)}</small>
                    </div>
                  </div>
                  {/*<span className="if image lifestyle">
                    <img className="if" src="https://www.if.no/magasinet/images/2020/05/sykkeltyveri01-380x224.jpg" />
                  </span>*/}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryEditorialDocumentationNavigation;

SubCategoryEditorialDocumentationNavigation.propTypes = {
  edges: PropTypes.arrayOf(PropTypes.shape({}))
};
