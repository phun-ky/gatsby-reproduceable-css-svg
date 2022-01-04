import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function HTML(props) {
  const ifAppClassnames = classNames({
    if: true,
    app: true,
    docs: true
  });
  const css = `
  body{
    opacity: 0;
  }
`;

  return (
    <html className="sg if" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link async href="/flags.min.css" rel="stylesheet" type="text/css" />
        <style type="text/css">{css}</style>
        {props.headComponents}
      </head>
      <body className="sg if" {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div className={ifAppClassnames} key={'body'} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}

        <script src="https://static.design.if.eu/packages/@ids-js/autocomplete/0.17.0/autocomplete.iife.js"></script>
        <script src="https://static.design.if.eu/packages/@ids-wc/toast/0.2.2/toast.iife.js"></script>
        <script src="/js/cookie-monster.js"></script>
        <ids-toast></ids-toast>
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
