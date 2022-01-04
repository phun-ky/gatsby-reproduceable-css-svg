import { generateID, groupBy } from '../../../lib/helpers';

const isPageGrouped = (parent, child) => child.customPath === parent.customPath;

export const getDataForCategory = data => {
  const { content } = data;

  if (!content) return [];

  const { edges } = content;
  const _reduced = edges.reduce((accumulator, edge) => {
    const { node } = edge;
    const { frontmatter, headings } = node;
    const { customPath, title } = frontmatter;

    if (customPath) {
      frontmatter.id = generateID(customPath, title);
    }

    if (headings) {
      frontmatter.headings = headings;
    }

    accumulator.push(frontmatter);

    return accumulator;
  }, []);
  const _grouped = groupBy(_reduced, 'customPath');
  const _arranged_category = {};
  const _arranged_sub_category = {};
  const _arranged_level_1 = {};
  const _arranged_level_2 = {};
  const _arranged_level_3 = {};
  const _grouped_keys = Object.keys(_grouped);

  _grouped_keys.forEach(page => {
    const _split = page.split('/');

    _split.shift();

    const _current_page = _grouped[page].filter(page => page.order === 1)[0];
    const [_category, _sub_category, _level_1, _level_2, _level_3] = _split;
    const _sub_pages = _grouped[page]
      .filter(page => page.order !== 1)
      .sort((a, b) => {
        return a.order > b.order;
      });

    if (_category && !_sub_category && !_level_1) {
      if (!_arranged_category[page]) {
        _arranged_category[page] = {};
        _arranged_category[page].category = _category;
        _arranged_category[page].children = _sub_pages;
      }

      _arranged_category[page] = { ..._arranged_category[page], ..._current_page };
    }

    if (_category && _sub_category && !_level_1) {
      if (!_arranged_sub_category[page]) {
        _arranged_sub_category[page] = {};
        _arranged_sub_category[page].category = _category;
        _arranged_sub_category[page].sub_category = _sub_category;
        _arranged_sub_category[page].children = _sub_pages;
      }

      _arranged_sub_category[page] = { ..._arranged_sub_category[page], ..._current_page };
      _arranged_sub_category[page].children = (_arranged_sub_category[page].children || []).map(pageObj => ({
        ...pageObj,
        isGrouped: isPageGrouped(_arranged_sub_category[page], pageObj)
      }));
    }

    if (_category && _sub_category && _level_1 && !_level_2) {
      if (!_arranged_level_1[page]) {
        _arranged_level_1[page] = {};
        _arranged_level_1[page].category = _category;
        _arranged_level_1[page].sub_category = _sub_category;
        _arranged_level_1[page].level_1 = _level_1;
        _arranged_level_1[page].children = _sub_pages;
      }

      _arranged_level_1[page] = { ..._arranged_level_1[page], ..._current_page };

      _arranged_level_1[page].children = (_arranged_level_1[page].children || []).map(pageObj => ({
        ...pageObj,
        isGrouped: isPageGrouped(_arranged_level_1[page], pageObj)
      }));
    }

    if (_category && _sub_category && _level_1 && _level_2 && !_level_3) {
      if (!_arranged_level_2[page]) {
        _arranged_level_2[page] = {};
        _arranged_level_2[page].category = _category;
        _arranged_level_2[page].sub_category = _sub_category;
        _arranged_level_2[page].level_1 = _level_1;
        _arranged_level_2[page].level_2 = _level_2;
        _arranged_level_2[page].children = _sub_pages;
      }

      _arranged_level_2[page] = { ..._arranged_level_2[page], ..._current_page };
      _arranged_level_2[page].children = (_arranged_level_2[page].children || []).map(pageObj => ({
        ...pageObj,
        isGrouped: isPageGrouped(_arranged_level_2[page], pageObj)
      }));
    }

    if (_category && _sub_category && _level_1 && _level_2 && _level_3) {
      if (!_arranged_level_3[page]) {
        _arranged_level_3[page] = {};
        _arranged_level_3[page].category = _category;
        _arranged_level_3[page].sub_category = _sub_category;
        _arranged_level_3[page].level_1 = _level_1;
        _arranged_level_3[page].level_2 = _level_2;
        _arranged_level_3[page].level_3 = _level_3;
        _arranged_level_3[page].children = _sub_pages;
      }

      _arranged_level_3[page] = { ..._arranged_level_3[page], ..._current_page };
      _arranged_level_3[page].children = (_arranged_level_3[page].children || []).map(pageObj => ({
        ...pageObj,
        isGrouped: isPageGrouped(_arranged_level_3[page], pageObj)
      }));
    }
  });
  Object.keys(_arranged_level_3).forEach(pageKey => {
    const { category, sub_category, level_1, level_2 } = _arranged_level_3[pageKey];
    const _sub_category_key = `/${category}/${sub_category}/${level_1}/${level_2}`;

    if (_arranged_level_2[_sub_category_key]) {
      _arranged_level_2[_sub_category_key].children.push(_arranged_level_3[pageKey]);
    }
  });

  Object.keys(_arranged_level_2).forEach(pageKey => {
    const { category, sub_category, level_1 } = _arranged_level_2[pageKey];
    const _sub_category_key = `/${category}/${sub_category}/${level_1}`;

    if (_arranged_level_1[_sub_category_key]) {
      _arranged_level_1[_sub_category_key].children.push(_arranged_level_2[pageKey]);
    }
  });

  Object.keys(_arranged_level_1).forEach(pageKey => {
    const { category, sub_category } = _arranged_level_1[pageKey];
    const _sub_category_key = `/${category}/${sub_category}`;

    if (_arranged_sub_category[_sub_category_key]) {
      _arranged_sub_category[_sub_category_key].children.push(_arranged_level_1[pageKey]);
    }
  });

  Object.keys(_arranged_sub_category).forEach(pageKey => {
    const { category } = _arranged_sub_category[pageKey];
    const _category_key = `/${category}`;

    if (_arranged_category[_category_key]) {
      _arranged_category[_category_key].children.push(_arranged_sub_category[pageKey]);
    }
  });

  const _sorted = Object.entries(_arranged_category)
    .sort((a, b) => a[1].navOrder > b[1].navOrder)
    .reduce((sorted, [key, item]) => {
      return [...sorted, item];
    }, []);

  return _sorted;
};
