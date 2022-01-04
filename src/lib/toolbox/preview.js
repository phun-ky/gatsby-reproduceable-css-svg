export const createPreviewLink = () => {
  if (window.location.pathname.indexOf('/components') !== 0) return null;

  const _preview_link_el = document.createElement('a');
  const _component_name = window.location.pathname
    .replace('/css', '')
    .replace('/js', '')
    .replace('/webcomponent', '')
    .split('/')
    .reverse()[0];
  const _preview_link = `/demos/${_component_name}.html`;

  _preview_link_el.classList.add('if');
  _preview_link_el.classList.add('preview');
  _preview_link_el.classList.add('control');
  _preview_link_el.classList.add('text');
  _preview_link_el.setAttribute('target', '_blank');
  _preview_link_el.textContent = 'Preview';
  _preview_link_el.setAttribute('href', _preview_link);

  return _preview_link_el;
};
