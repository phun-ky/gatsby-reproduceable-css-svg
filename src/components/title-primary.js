import React from 'react';
import PropTypes from 'prop-types';

import { generateTitleAnchorId } from '../lib/helpers';

import SEO from './seo';

const PrimaryTitle = ({ frontmatter, isCSSPackage, isJSPackage, isWCPackage, scope, titleClassNames, pkg }) => {
  const { componentName, title, customPath } = frontmatter;
  const _is_component = customPath.indexOf('components') !== -1;
  const _is_css_package = isCSSPackage || (_is_component && customPath.indexOf('css') !== -1);
  const _is_js_package = isJSPackage || (_is_component && customPath.indexOf('js') !== -1);
  const _is_wc_package = isWCPackage || (_is_component && customPath.indexOf('wc') !== -1);
  const _is_react_package = _is_component && customPath.indexOf('react') !== -1;
  const _style = {
    backgroundSize: '3.5rem 3.5rem',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center'
  };

  if (_is_css_package) {
    _style.paddingLeft = '4.5rem';
    _style.backgroundImage =
      'url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 512 512%27%3E%3Cpath fill=%27%23264de4%27 d=%27M71.357 460.819 30.272 0h451.456l-41.129 460.746L255.724 512z%27/%3E%3Cpath fill=%27%232965f1%27 d=%27m405.388 431.408 35.148-393.73H256v435.146z%27/%3E%3Cpath fill=%27%23ebebeb%27 d=%27m124.46 208.59 5.065 56.517H256V208.59zm-5.041-57.875H256V94.197H114.281zM256 355.372l-.248.066-62.944-16.996-4.023-45.076h-56.736l7.919 88.741 115.772 32.14.26-.073z%27/%3E%3Cpath fill=%27%23fff%27 d=%27M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z%27/%3E%3C/svg%3E\')';
  } else if (_is_js_package) {
    _style.paddingLeft = '4.5rem';
    _style.backgroundImage =
      'url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 630 630%27%3E%3Cpath fill=%27%23f7df1e%27 d=%27M0 0h630v630H0z%27/%3E%3Cpath d=%27M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z%27/%3E%3C/svg%3E\')';
  } else if (_is_wc_package) {
    _style.paddingLeft = '4.5rem';
    _style.backgroundImage =
      'url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 overflow=%27visible%27 viewBox=%270 0 47.333 40.667%27%3E%3Cpath d=%27m40.331 16.802.961 3.307-7.361 2.08s0 4.427-3.572 6.186c-3.572 1.761-6.347.269-6.347.269l-.445-1.279 5.3-1.441 1.174-4.535-3.416-3.358-4.906 1.484-.426-1.165s2.293-5.067 9.067-2.187c0 0 2.135 1.333 2.613 2.506l7.358-1.867zm.961-.249 1.173-.337.944 3.379-1.229.37zm.414-.148.759-.189.944 3.379-1.229.37-.32-1.13.49-.191zm-2.188.605.812-.207.961 3.307-7.361 2.08s-.078 3.864-2.639 5.612c-2.559 1.748-5.441 1.694-7.28.844l-.205-.591s5.007 1.177 7.485-2.585c1.494-2.48 1.467-4.266 1.467-4.266l7.389-1.999-.629-2.195zM21.29 18.349l4.322-1.254 1.012.935-4.908 1.484zM6.058 20.695l.868 3.333 7.386-1.978s2.267 3.802 6.238 3.485c3.972-.317 5.589-3.016 5.589-3.016l-.273-1.33-5.288 1.476-3.328-3.295 1.214-4.635 4.975-1.233-.23-1.22s-4.562-3.181-8.909 2.76c0 0-1.15 2.238-.962 3.492l-7.28 2.161zm-.953.277-1.18.311.917 3.384 1.246-.308zm-.431.083-.749.228.917 3.384 1.246-.308-.301-1.137-.521.085zm2.189-.598-.805.238.868 3.333 7.386-1.978s2.047 3.276 5.142 3.468c3.093.192 5.541-1.325 6.685-3l-.123-.613s-3.701 3.572-7.755 1.611c-2.553-1.367-3.442-2.917-3.442-2.917l-7.373 2.062-.583-2.204zm16.347-8.176-4.353 1.134-.393 1.319 4.976-1.233z%27/%3E%3C/svg%3E\')';
  } else if (_is_react_package) {
    _style.paddingLeft = '4.5rem';
    _style.backgroundImage =
      'url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 512 512%27%3E%3Cpath fill=%27%23264de4%27 d=%27M71.357 460.819 30.272 0h451.456l-41.129 460.746L255.724 512z%27/%3E%3Cpath fill=%27%232965f1%27 d=%27m405.388 431.408 35.148-393.73H256v435.146z%27/%3E%3Cpath fill=%27%23ebebeb%27 d=%27m124.46 208.59 5.065 56.517H256V208.59zm-5.041-57.875H256V94.197H114.281zM256 355.372l-.248.066-62.944-16.996-4.023-45.076h-56.736l7.919 88.741 115.772 32.14.26-.073z%27/%3E%3Cpath fill=%27%23fff%27 d=%27M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z%27/%3E%3C/svg%3E\')';
  }

  const { version } = pkg;
  const _display_version =
    scope && scope !== '' && (_is_css_package || _is_js_package || _is_wc_package || _is_react_package);

  let _title_to_use = title;

  if (isCSSPackage) {
    _title_to_use = 'CSS Component';
  } else if (isWCPackage) {
    _title_to_use = 'Web Component';
  } else if (isJSPackage) {
    _title_to_use = 'JavaScript';
  }

  return (
    <>
      <SEO title={`${_title_to_use}: ${title}`} />
      <h1 id={generateTitleAnchorId(frontmatter)} className={titleClassNames} style={_style}>
        {_title_to_use}
        {_display_version && (
          <a
            className="if tag passive sg section-npm-link"
            href={`https://dev.azure.com/if-it/If%20Design%20Hub/_packaging?_a=package&feed=if-design-system&package=%40${scope}%2F${componentName}&protocolType=Npm`}
            rel="noopener noreferrer"
            target="_blank">
            <span className="if axe sr-only">The latest version of this package is: </span>
            {version}
            <span className="if axe sr-only">, Opens in new window</span>
          </a>
        )}
      </h1>
    </>
  );
};

PrimaryTitle.propTypes = {
  frontmatter: PropTypes.shape({
    order: PropTypes.number,
    componentName: PropTypes.string,
    customPath: PropTypes.string,
    title: PropTypes.string,
    hideTitle: PropTypes.bool,
    css: PropTypes.bool
  }),
  editLink: PropTypes.string,
  isCSSPackage: PropTypes.bool,
  titleClassNames: PropTypes.string,
  collection: PropTypes.string,
  fileAbsolutePath: PropTypes.string,
  scope: PropTypes.string,
  pkg: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    version: PropTypes.string
  })
};

export default PrimaryTitle;
