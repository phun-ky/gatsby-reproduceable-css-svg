export const createBackgroundMenu = example => {
  const UUID = '_' + Math.random().toString(36).substr(2, 9);
  const _trigger_el_id = `toolbox-background-trigger-${UUID}`;
  const _nav_el_id = `toolbox-background-nav-${UUID}`;
  const _holder_el = document.createElement('div');
  const _trigger_el = document.createElement('button');
  const _nav_el = document.createElement('nav');
  const _ul_el = document.createElement('ul');

  _holder_el.style.position = 'relative';
  _holder_el.classList.add('if');
  _holder_el.classList.add('toolbox-background-container');

  _trigger_el.classList.add('if');
  _trigger_el.classList.add('icon-button');
  _trigger_el.classList.add('icon');
  _trigger_el.classList.add('toolbox-background-trigger');
  _trigger_el.classList.add('ui');
  _trigger_el.classList.add('js-toolbox-background-trigger');
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

  const _backgrounds = [
    {
      color: 'rgb(250, 249, 247)',
      name: 'BE 5'
    },
    {
      color: 'rgb(246, 243, 240)',
      name: 'BE 4'
    },
    {
      color: 'rgb(241, 236, 232)',
      name: 'BE 3'
    },
    {
      color: 'rgb(237, 230, 225)',
      name: 'BE 2'
    },
    {
      color: 'rgb(232, 224, 217)',
      name: 'BE 1'
    },
    {
      color: 'rgb(193, 193, 193)',
      name: 'No background'
    }
  ];

  _backgrounds.forEach(background => {
    if (background.color == 'rgb(193, 193, 193)') {
      const _separator_el = document.createElement('li');

      _separator_el.classList.add('if');
      _separator_el.classList.add('separator');
      _ul_el.appendChild(_separator_el);
    }

    const _li_el = document.createElement('li');

    _li_el.classList.add('if');

    _li_el.innerHTML = `<button type="button" class="if color-badge" style="font-variation-settings: 'wght' 78;padding-left: 3.25rem;"><span class="if color-drop" style="margin-left: 1rem; margin-right: 1rem; height: 20px; width: 20px; background-color: ${background.color};"></span>${background.name}</button>`;

    _li_el.addEventListener('click', () => {
      _li_el.classList.toggle('is-active');

      if (example.style.backgroundColor == background.color) {
        example.style.backgroundColor = 'rgb(193, 193, 193)';
      } else {
        example.style.backgroundColor = background.color;
      }
    });
    _ul_el.appendChild(_li_el);
  });

  _nav_el.appendChild(_ul_el);
  _holder_el.appendChild(_trigger_el);
  _holder_el.appendChild(_nav_el);

  return _holder_el;
};
