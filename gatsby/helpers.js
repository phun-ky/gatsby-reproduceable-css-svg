/**
 * @description Get the link for the component from packageName
 *
 * @param {String} packageName
 * @return {String}
 */
const getDocPath = packageName => {
  if (['button', 'contextual-menu', 'floating-action-button', 'icon-button'].includes(packageName)) {
    return '/components/actions';
  } else if (['disclosure-card', 'editorial-card', 'card', 'info-card', 'navigational-card'].includes(packageName)) {
    return '/components/cards';
  } else if (
    ['alert-banner', 'consent-banner', 'loader', 'progress-tracker', 'status-indicator', 'toast'].includes(packageName)
  ) {
    return '/components/feedback';
  } else if (
    [
      'autocomplete',
      'checkbox',
      'datepicker',
      'dropdown-filter',
      'dropdown-select',
      'file-upload',
      'input-fields',
      'input-label',
      'numeric-stepper',
      'phonenumber',
      'radio-buttons',
      'search-field',
      'segmented-control',
      'slider',
      'textarea',
      'toggle'
    ].includes(packageName)
  ) {
    return '/components/inputs';
  } else if (['breakpoint', 'grid'].includes(packageName)) {
    return '/components/layout';
  } else if (['avatar', 'icons', 'logo', 'video'].includes(packageName)) {
    return '/components/media';
  } else if (
    [
      'accordion-menu',
      'breadcrumbs',
      'dropdown-menu',
      'link',
      'link-list',
      'pagination',
      'shortcuts',
      'sidebar-menu',
      'tabs',
      'tooltip-menu'
    ].includes(packageName)
  ) {
    return '/components/navigation';
  } else if (['help-tooltip', 'info-tooltip', 'modal', 'dialog', 'popover', 'tooltip'].includes(packageName)) {
    return '/components/overlay';
  } else if (
    [
      'banner',
      'faq',
      'global-footer',
      'global-header',
      'global-minimal-header',
      'header',
      'hero',
      'hero-navigation',
      'panel',
      'quick-facts',
      'split'
    ].includes(packageName)
  ) {
    return '/components/page-sections';
  } else if (['data-tables', 'product-matrix-table'].includes(packageName)) {
    return '/components/tables';
  } else if (['blockquote', 'tag', 'typography'].includes(packageName)) {
    return '/components/text';
  }

  return '/components';
};

module.exports = {
  getDocPath: getDocPath
};
