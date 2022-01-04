export const createSandboxMenu = tools => {
  const UUID = '_' + Math.random().toString(36).substr(2, 9);
  const _trigger_el_id = `toolbox-menu-trigger-${UUID}`;
  const _nav_el_id = `toolbox-menu-nav-${UUID}`;
  const _holder_el = document.createElement('div');
  const _trigger_el = document.createElement('button');
  const _nav_el = document.createElement('nav');
  const _ul_el = document.createElement('ul');

  _holder_el.style.position = 'relative';
  _holder_el.classList.add('if');
  _holder_el.classList.add('toolbox-menu-container');

  _trigger_el.classList.add('if');
  _trigger_el.classList.add('icon-button');
  _trigger_el.classList.add('icon');
  _trigger_el.classList.add('toolbox-tools-trigger');
  _trigger_el.classList.add('ui');
  _trigger_el.classList.add('js-toolbox-menu-trigger');
  _trigger_el.setAttribute('id', _trigger_el_id);
  _trigger_el.setAttribute('tabindex', '0');
  _trigger_el.setAttribute('aria-haspopup', 'true');
  _trigger_el.setAttribute('aria-controls', _nav_el_id);
  _trigger_el.setAttribute('aria-expanded', 'false');
  _trigger_el.setAttribute('aria-label', 'Toolbox menu');
  _trigger_el.setAttribute('type', 'button');

  _nav_el.classList.add('if');
  _nav_el.classList.add('dropdown-menu');
  _nav_el.setAttribute('role', 'menu');
  _nav_el.setAttribute('id', _nav_el_id);

  _ul_el.classList.add('if');

  tools.forEach(tool => {
    if (tool.firstElementChild.classList.contains('copy')) {
      const _separator_el = document.createElement('li');

      _separator_el.classList.add('if');
      _separator_el.classList.add('separator');
      _ul_el.appendChild(_separator_el);
    }

    const _li_el = document.createElement('li');

    _li_el.classList.add('if');

    _li_el.appendChild(tool);
    _ul_el.appendChild(_li_el);
  });

  _nav_el.appendChild(_ul_el);
  _holder_el.appendChild(_trigger_el);
  _holder_el.appendChild(_nav_el);

  return _holder_el;
};
