const handleOnClick = code => {
  const _codesanbox_template = `
  <!DOCTYPE html>
  <html class="if" lang="en">
    <head>
      <title>If Design System</title>
      <meta charset="utf-8" />
      <meta http-equiv="Content-Language" content="no" />
      <meta name="robots" content="none" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link async href="//if-vid-brand-cdn.azureedge.net/ifdesignsystem.min.css" rel="stylesheet" type="text/css" />
    </head>
    <body class="if">
      <div class="if app">
      %MARKUP%
      </div>
    </body>
  </html>
  `;

  fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      files: {
        'index.html': {
          content: _codesanbox_template.replace('%MARKUP%', code)
        }
      }
    })
  })
    .then(x => x.json())
    .then(data => {
      const _id = data.sandbox_id;
      const _link_el = document.createElement('a');

      _link_el.setAttribute('href', `https://codesandbox.io/s/${_id}`);
      _link_el.setAttribute('target', '_blank');
      _link_el.setAttribute('rel', 'noreferrer noopener');
      _link_el.click();
    });
};

export const createCodeSandboxLink = code => {
  const _fragment = document.createDocumentFragment();
  const _open_el = document.createElement('button');

  _open_el.setAttribute('type', 'button');
  _open_el.setAttribute('title', 'Open in CodeSandbox');
  _open_el.addEventListener('click', () => {
    handleOnClick(code);
  });
  _open_el.classList.add('if');
  _open_el.setAttribute('role', 'menuitem');
  _open_el.classList.add('codesandbox');
  _open_el.classList.add('js-toolbox-component');
  _open_el.textContent = 'CodeSandbox';
  _fragment.appendChild(_open_el);

  return _fragment;
};
