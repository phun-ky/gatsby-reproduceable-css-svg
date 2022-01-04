const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
const isProduction = activeEnv !== 'development';
const getGeneratedPageURL = html => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });

    return URL.createObjectURL(blob);
  };
  const source = `<html class="if">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Language" content="no" />
    <meta name="robots" content="none" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body class="if" style="display: flex;background-color: #faf9f7;">
    <link rel="stylesheet" type="text/css" href="${
  isProduction
    ? 'https://if-vid-brand-cdn.azureedge.net/ifdesignsystem.min.css'
    : 'http://localhost:8000/ifdesignsystem.min.css'
}" />
    <link rel="stylesheet" type="text/css" href="${
  isProduction
    ? 'https://if-vid-brand-cdn.azureedge.net/consent-banner.min.css'
    : 'http://localhost:8000/consent-banner.min.css'
}" />
    <link rel="stylesheet" type="text/css" href="${
  isProduction ? 'https://if-vid-brand-cdn.azureedge.net/speccer.css' : 'http://localhost:8000/speccer.css'
}" />

    ${html || ''}
    <script src="${
  isProduction ? 'https://if-vid-brand-cdn.azureedge.net/speccer.js' : 'http://localhost:8000/speccer.js'
}"></script>
  </body>
</html>
`;

  return getBlobURL(source, 'text/html');
};
const createIframeForMediaQueryExample = (iframe, html) => {
  if (!iframe || !html) return;

  const url = getGeneratedPageURL(html);

  iframe.src = url;
};
const init = () => {
  const responsiveExampleTemplates = document.querySelectorAll('[data-responsive]');

  responsiveExampleTemplates.forEach(template => {
    if (!template) return;

    const contentElementId = template.dataset.responsiveId;
    const html = template.innerHTML;

    if (!html) return;

    const iframes = [];

    iframes.push(
      document.getElementById(`${contentElementId}-responsive-mobile`),
      document.getElementById(`${contentElementId}-responsive-tablet-portrait`),
      document.getElementById(`${contentElementId}-responsive-tablet-landscape`),
      document.getElementById(`${contentElementId}-responsive-desktop`)
    );
    iframes.forEach(iframe => {
      createIframeForMediaQueryExample(iframe, html);
    });
  });
};

export default init;
