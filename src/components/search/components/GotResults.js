import React from 'react';
import PropTypes from 'prop-types';
import humanize from 'humanize-string';

import ResultsContainer from './ResultsContainer';

import { getLink } from '../lib/helpers';

const GotResults = ({ query, results, onClick }) => {
  return (
    <ResultsContainer>
      {results.map(page => {
        if (!page.title || (page.title && page.title === '')) return null;

        const _mask = new RegExp(query, 'i');
        const _text = page.path
          .split('/')
          .map((part, index) => (index <= 1 ? '' : ' / ') + humanize(part))
          .join('');

        if (!_text || (_text && _text.length === 0)) return null;

        const _data = _text.replace(_mask, `<mark class="if">${humanize(query)}</mark>`);

        return (
          <li className="if" key={page.id} tabIndex="-1" role="option" aria-selected="false">
            <span
              onClick={onClick}
              className="if search-result-item-holder"
              style={{ display: 'flex' }}
              data-to={getLink(page)}>
              <span
                className="sg if search-result-title"
                dangerouslySetInnerHTML={{
                  __html: `${_data} &mdash; <span class="if text disclaimer"><em class="if">${page.title}</em></span>`
                }}
              />
            </span>
          </li>
        );
      })}
    </ResultsContainer>
  );
};

export default GotResults;

GotResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({})),
  onClick: PropTypes.func,
  query: PropTypes.string,
  onKeyDown: PropTypes.func
};
