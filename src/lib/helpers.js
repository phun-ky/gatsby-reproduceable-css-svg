/**
 * @description Get the link for the component from packageName
 *
 * @param {String} packageName
 * @return {String}
 */
export const getDocPath = packageName => {
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

export const getSections = edges => {
  const reduced = edges.reduce((accumulator, edge) => {
    const { node } = edge;
    const { frontmatter } = node;

    accumulator.push(frontmatter);

    return accumulator;
  }, []);
  const sections = [];

  Object.keys(reduced).forEach(page => {
    const { order } = reduced[page];

    if (order === 1) return;

    sections.push(reduced[page]);
  });

  return sections;
};

export const getComponentPackage = (componentName, pkg, type = 'css') => {
  let componentPackage;

  try {
    if (componentName) {
      if (type === 'css') {
        componentPackage = require(`@ids-core/${componentName.toLowerCase()}/package.json`);
      } else if (type === 'js') {
        componentPackage = require(`@ids-js/${componentName.toLowerCase()}/package.json`);
      } else if (type === 'wc') {
        componentPackage = require(`@ids-wc/${componentName.toLowerCase()}/package.json`);
      } else if (type === 'react') {
        componentPackage = require('@ids-react/common/package.json');
      } else {
        componentPackage = require(`@ids-core/${componentName.toLowerCase()}/package.json`);
      }

      if (componentPackage.description === '') componentPackage = null;
    }
  } catch (e) {
    componentPackage = pkg;
  }

  return componentPackage || pkg;
};

export const getEditLink = (site, path, editLink) => {
  const {
    siteMetadata: {
      codeRepository: { web }
    }
  } = site;

  if (editLink) {
    return `${web}?path=${editLink}&_a=edit`;
  }

  /*

  Example paths to match with, dev and prod

  /home/alexander/Workspace/if/ids-core/packages/button/docs/index.md
  /home/alexander/Workspace/if/if-design-system-site/node_modules/@ids-core/button/docs/index.md

  */
  const pathRegex = /^(\S*)(\/(packages|node_modules\/@ids-core)\S*)$/;
  const group = pathRegex.exec(path);

  if (!group || !group[2] || (group && !group[2])) return null;

  const filePath = group[2];
  const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

  if (activeEnv !== 'development') {
    return `${web}?path=${encodeURIComponent(filePath.replace('node_modules/@ids-core', 'packages'))}&_a=edit`;
  }

  return `${web}?path=${encodeURIComponent(filePath)}&_a=edit`;
};

export const isHidden = el => el.offsetParent === null;

export const scrollTo = (element, offSet = 0, timeout = null) => {
  const elemPos = element ? element.getBoundingClientRect().top + window.pageYOffset : 0;

  if (timeout) {
    setTimeout(() => {
      window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
    }, timeout);
  } else {
    window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
  }
};

export const scrollToSection = element => {
  const offset = -152;

  scrollTo(element, offset);
};

export const slugify = string => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const generateID = (path, title) => (title ? slugify(`${path}-${title}`) : slugify(path));

export const generateTitleAnchorId = ({ customPath, title }) => `${slugify(customPath)}.${generateID(title)}`;

export const generateBlockId = ({ title, customPath }) => generateID(customPath, title);

//
// export const groupBy = (xs, key) =>
//   xs.reduce(function (rv, x) {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
export const groupBy = (list, key) =>
  [...list].reduce((acc, x) => {
    const group = x[key];

    if (!acc[group]) {
      return {
        ...acc,
        [group]: [x]
      };
    }

    return {
      ...acc,
      [group]: [...acc[group], x]
    };
  }, {});

export const filterData = (pathname, edges, filter = '/components') => {
  if (pathname.indexOf(`${filter}`) !== 0) return edges;

  return edges.filter(edge => {
    const { frontmatter } = edge.node;

    if (!frontmatter) {
      return edge.node.fields.slug.indexOf(filter) !== -1;
    }

    return frontmatter.category === filter;
  });
};
