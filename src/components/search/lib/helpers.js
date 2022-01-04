export const setSelectedElement = (el, gotResults) => {
  el.classList.add('is-selected');
  el.setAttribute('aria-selected', true);

  if (gotResults) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return el;
};

export const removePreviouslySelectedSuggestion = el => {
  const _selected_els = el.querySelectorAll('.is-selected');

  _selected_els.forEach(li => {
    li.classList.remove('is-selected');
    li.setAttribute('aria-selected', false);
  });
};

export const getLink = page => {
  if (page.collection === 'blog') {
    return page.path;
  } else if (page.collection === 'changelog') {
    return '/changelog';
  }

  return page.path;
};

export const isDesign = page => {
  const { category } = page;

  if (category === 'design') return true;

  return false;
};

export const isDevelop = page => {
  const { category } = page;

  if (category === 'develop') return true;

  return false;
};

export const isResources = page => {
  const { category } = page;

  if (category === 'resources') return true;

  return false;
};

export const isBlog = page => {
  const { collection } = page;

  if (collection === 'blog') return true;

  return false;
};

export const isComponent = page => {
  const { path, componentName, collection } = page;

  if (collection === 'blog' || collection === 'changelog') return false;

  if (componentName && componentName !== '') {
    return true;
  } else {
    if (path.indexOf('/components') === 0) {
      return true;
    }
  }

  return false;
};
