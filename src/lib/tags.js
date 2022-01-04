/* eslint no-console: 0 */

export const createTagElement = (tag, color = 'beige') => {
  const fragment = document.createDocumentFragment();
  const button = document.createElement('button');
  const text = document.createTextNode(tag);

  button.appendChild(text);
  button.classList.add('if');
  button.classList.add('tag');
  button.classList.add('is-interactive');
  button.classList.add(color);
  button.setAttribute('data-rel', tag);
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', `Remove ${tag}`);

  fragment.appendChild(button);

  return fragment;
};
