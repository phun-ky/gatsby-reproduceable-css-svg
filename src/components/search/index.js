/* eslint no-console: 0 */
import React, { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { clearStopWords } from 'elasticlunr';
import { useHotkeys } from 'react-hotkeys-hook';
import cx from 'classnames';

import { removePreviouslySelectedSuggestion, setSelectedElement } from './lib/helpers';
import { getOrCreateIndex, queryOptions } from './lib/search';

import Results from './components/Results';
import SearchContext from '../../contexts/SearchContext';

let _index_of_string_suggestions = 0;
let _all_string_suggestion_els = null;

const Search = () => {
  let index;

  clearStopWords();

  const searchIndex = useContext(SearchContext);
  const _autocomplete_holder_ref = React.createRef();
  const val = React.useRef();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [isSearchOpen, toggleSearch] = React.useState(false);
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
  const handleClickOutside = e => {
    if (document.querySelector('.if.search').contains(e.target)) {
      return;
    }

    setResults([]);
    setQuery('');
    toggleSearch(false);
  };

  useEffect(() => {
    _all_string_suggestion_els = _autocomplete_holder_ref.current.querySelectorAll('li:not(.hasno-results');
  });

  useEffect(() => {
    val.current = 'clickoutside';
    _all_string_suggestion_els = _autocomplete_holder_ref.current.querySelectorAll('li:not(.hasno-results');
  }, ['clickoutside']);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [val]);

  const setFocusToInput = () => {
    setTimeout(function () {
      try {
        document.querySelector('.if.sg.search input[type="search"]').focus();
      } catch (e) {
        try {
          toggleSearch(true);
          _all_string_suggestion_els = _autocomplete_holder_ref.current.querySelectorAll('li:not(.hasno-results');
          document.querySelector('.if.sg.search input[type="search"]').focus();
        } catch (e) {
          console.info('Could not focus global search field');
        }
        console.info('Could not focus global search field');
      }
    }, 100);
  };

  useHotkeys('shift+7', () => {
    toggleSearch(true);
    setFocusToInput();
  });

  const handleSearchInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      const _selected_suggestion_el = _autocomplete_holder_ref.current.querySelector('li.is-selected');

      if (e.target.value === '') {
        if (results.length) {
          navigate(results[0].path);
        } else {
          return false;
        }
      } else if (_selected_suggestion_el) {
        const _data_to = _selected_suggestion_el.querySelector('.if.search-result-item-holder').getAttribute('data-to');

        navigate(_data_to);
      } else {
        return false;
      }
    } else if (e.key === 'Escape') {
      setResults([]);
      setQuery('');
      toggleSearch(false);
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
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      return false;
    }

    if (e.target.value === '') {
      setResults([]);
      setQuery('');
    }
  };
  const handleCloseClick = () => {
    setResults([]);
    setQuery('');
    toggleSearch(false);
  };
  const handleToggleSearchClick = () => {
    toggleSearch(!isSearchOpen);

    if (!isSearchOpen) {
      setFocusToInput();
    }
  };
  const desktopSearchContainerClassNames = cx('if sg desktop-search', {
    'is-open': isSearchOpen
  });

  return (
    <li className="if sg search">
      <button
        type="button"
        onClick={handleToggleSearchClick}
        className="if icon-button icon ui search"
        aria-controls="desktop-search-container"
        aria-label="Search"></button>
      <div className={desktopSearchContainerClassNames} id="desktop-search-container" aria-modal="true" role="dialog">
        <div ref={_autocomplete_holder_ref} className="if search-field large autocomplete" role="search">
          <button onClick={handleCloseClick} type="button" className="if close">
            <span className="if axe sr-only">Close search results</span>
          </button>
          <input
            type="search"
            aria-label="Search"
            autoComplete="off"
            aria-expanded="false"
            aria-autocomplete="list"
            role="combobox"
            placeholder="Search the Design System"
            className="if input-field"
            onKeyDown={handleSearchInputKeyDown}
            onKeyUp={handleSearchInputKeyUp}
            aria-owns="desktop-search-results"
            value={query}
            onChange={search}
          />
          <Results query={query} results={results} onClick={handleResultClick} />
        </div>
      </div>
    </li>
  );
};

export default Search;
