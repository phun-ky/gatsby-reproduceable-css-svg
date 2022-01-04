export const createJSFiddleLink = (el, code) => {
  const titleEl = document.querySelector('body .package-title');
  const title = !titleEl ? 'If Design System' : `If Design System - ${titleEl.textContent}`;
  const data = {
    title,
    panel_css: 0,
    css: '',
    description: '',
    html: code,
    js: 'document.querySelector(\'html\').classList.add(\'if\');document.querySelector(\'body\').classList.add(\'if\');',
    js_panel: 0,
    resources: 'https://if-vid-brand-cdn.azureedge.net/ifdesignsystem.min.css'
  };
  const formDF = document.createDocumentFragment();
  const formEl = document.createElement('form');

  formEl.setAttribute('action', 'http://jsfiddle.net/api/post/library/pure');
  formEl.setAttribute('method', 'POST');
  formEl.setAttribute('target', '_blank');
  formEl.classList.add('js-toolbox-component');
  formEl.style.height = '0';
  formEl.style.width = '0';
  formEl.style.margin = '0';
  formEl.style.overflow = 'hidden';
  formEl.style.textIndent = '-99999px';
  formEl.style.opacity = '0';

  Object.keys(data).forEach(key => {
    const value = data[key];
    const input = document.createElement('input');

    input.setAttribute('name', key);
    input.setAttribute('type', 'hidden');
    input.setAttribute('value', value);
    formEl.appendChild(input);
  });

  const submit = document.createElement('button');

  submit.setAttribute('type', 'submit');
  submit.setAttribute('tabindex', '-1');

  formEl.appendChild(submit);

  formDF.appendChild(formEl);

  el.parentNode.insertBefore(formDF, el.nextSibling);

  const fragment = document.createDocumentFragment();
  const open = document.createElement('button');

  open.setAttribute('type', 'button');
  open.setAttribute('title', 'Open in JSFiddle');
  open.addEventListener('click', () => {
    submit.click();
  });
  open.classList.add('if');
  open.setAttribute('role', 'menuitem');
  open.classList.add('jsfiddle');
  open.classList.add('js-toolbox-component');
  open.textContent = 'JSFiddle';

  fragment.appendChild(open);

  return fragment;
};
