export const createCodepenLink = (el, code) => {
  const titleEl = document.querySelector('body .package-title');
  const title = !titleEl ? 'If Design System' : `If Design System - ${titleEl.textContent}`;
  const data = {
    title,
    description: '',
    html: code,
    html_pre_processor: 'none',
    css: '',
    css_pre_processor: 'stylus',
    css_starter: 'neither',
    css_prefix_free: false,
    js: 'document.querySelector(\'html\').classList.add(\'if\');document.querySelector(\'body\').classList.add(\'if\');',
    js_pre_processor: 'none',
    js_modernizr: false,
    js_library: '',
    html_classes: '',
    css_external: 'https://if-vid-brand-cdn.azureedge.net/ifdesignsystem.min.css',
    js_external: '',
    template: true
  };
  const JSONstring = JSON.stringify(data)
    // Quotes will screw up the JSON
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
  const formDF = document.createDocumentFragment();
  const formEl = document.createElement('form');

  formEl.setAttribute('action', 'https://codepen.io/pen/define');
  formEl.setAttribute('method', 'POST');
  formEl.setAttribute('target', '_blank');
  formEl.classList.add('js-toolbox-component');
  formEl.style.height = '0';
  formEl.style.width = '0';
  formEl.style.margin = '0';
  formEl.style.overflow = 'hidden';
  formEl.style.textIndent = '-99999px';
  formEl.style.opacity = '0';

  const input = document.createElement('input');

  input.setAttribute('name', 'data');
  input.setAttribute('type', 'hidden');
  input.setAttribute('value', JSONstring);

  const submit = document.createElement('button');

  submit.setAttribute('type', 'submit');
  submit.setAttribute('tabindex', '-1');
  formEl.appendChild(input);
  formEl.appendChild(submit);

  formDF.appendChild(formEl);

  el.parentNode.insertBefore(formDF, el.nextSibling);

  const fragment = document.createDocumentFragment();
  const open = document.createElement('button');

  open.setAttribute('type', 'button');
  open.setAttribute('title', 'Open in CodePen');
  open.addEventListener('click', () => {
    submit.click();
  });
  open.classList.add('if');
  open.setAttribute('role', 'menuitem');
  open.classList.add('codepen');
  open.classList.add('js-toolbox-component');
  open.textContent = 'CodePen';

  fragment.appendChild(open);

  return fragment;
};
