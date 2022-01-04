/* eslint no-console: 0 */
import React, { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { clearStopWords } from 'elasticlunr';
import { removePreviouslySelectedSuggestion, setSelectedElement } from './lib/helpers';
import { getOrCreateIndex, queryOptions } from './lib/search';

import GotResults from './components/GotResults';
import SearchContext from '../../contexts/SearchContext';

let _index_of_string_suggestions = 0;
let _all_string_suggestion_els = null;

// Search component
const TopLevelSearch = () => {
  let index;

  clearStopWords();

  const searchIndex = useContext(SearchContext);
  const _autocomplete_holder_ref = React.createRef();
  const val = React.useRef();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const search = evt => {
    setQuery(evt.target.value);
    index = getOrCreateIndex(index, searchIndex);

    const _results = index
      .search(query, queryOptions)
      // Map over each ID and return the full document
      .map(({ ref, score }) => {
        const resultObj = index.documentStore.getDoc(ref);

        resultObj.score = score;

        return resultObj;
      })
      .sort((a, b) => b.score - a.score);

    setResults(_results);
    _all_string_suggestion_els = _autocomplete_holder_ref.current.querySelectorAll('li:not(.hasno-results');
  };

  useEffect(() => {
    _all_string_suggestion_els = _autocomplete_holder_ref.current.querySelectorAll('li:not(.hasno-results');
  });

  const handleSearchInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      if (results.length) {
        navigate(results[0].path);
      } else {
        return false;
      }
    } else if (e.key === 'Escape') {
      setResults([]);
      setQuery('');
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      return false;
    }

    if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      let _next_el;

      e.preventDefault();

      if (e.key == 'ArrowUp') {
        _next_el = _all_string_suggestion_els[--_index_of_string_suggestions];

        if (!_next_el) {
          _index_of_string_suggestions = _all_string_suggestion_els.length - 1;
          _next_el = _all_string_suggestion_els[_index_of_string_suggestions];
        }

        removePreviouslySelectedSuggestion(_autocomplete_holder_ref.current);
        setSelectedElement(_next_el, !!results.length);
      } else if (e.key == 'ArrowDown') {
        _next_el = _all_string_suggestion_els[++_index_of_string_suggestions];

        if (!_next_el) {
          _index_of_string_suggestions = 0;
          _next_el = _all_string_suggestion_els[_index_of_string_suggestions];
        }

        removePreviouslySelectedSuggestion(_autocomplete_holder_ref.current);
        setSelectedElement(_next_el, !!results.length);
      }
    }
  };
  const handleResultClick = e => {
    let _link_el = e.target;

    if (!e.target.classList.contains('search-result-item-holder')) {
      _link_el = e.target.closest('li').querySelector('.if.search-result-item-holder');
    }

    const _to = _link_el.getAttribute('data-to');

    _index_of_string_suggestions = 0;

    if (_to && _to !== '') {
      navigate(_to);
    }
  };
  const handleSearchInputKeyUp = e => {
    if (e.target.value === '') {
      setResults([]);
      setQuery('');
    }
  };
  const _got_results = results && results.length !== 0;

  return (
    <div className="if sg search toplevel">
      <div ref={_autocomplete_holder_ref} className="if search-field large autocomplete" role="search">
        <input
          type="search"
          aria-label="Search"
          autoComplete="off"
          aria-expanded="false"
          aria-autocomplete="list"
          role="combobox"
          placeholder="e. g. global header"
          className="if input-field"
          onKeyDown={handleSearchInputKeyDown}
          onKeyUp={handleSearchInputKeyUp}
          aria-owns="desktop-search-results"
          value={query}
          onChange={search}
        />

        {_got_results && <GotResults query={query} results={results} onClick={handleResultClick} />}
      </div>
    </div>
  );
};

export default TopLevelSearch;
