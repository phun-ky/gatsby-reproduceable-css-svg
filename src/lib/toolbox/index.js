import { SizeBreakpointMinSm } from '@ids-core/breakpoint/src/variables/js/variables.esm.js';

import { IDSMenuToggle } from '../dropup-menu.js';
import { createCopyButton } from './copy';
import { createCodeSandboxLink } from './codesandbox';
import { createCodepenLink } from './codepen';
import { createBackgroundMenu } from './background';
import { createJSFiddleLink } from './jsfiddle';
import { createPreviewLink } from './preview';
import { createSandboxMenu } from './sandbox';
import { getDataResponsiveId } from './helpers';

const MQSmall = window.matchMedia(`screen and (min-width: ${SizeBreakpointMinSm})`);

let isLargerThanMobile = true;

const _handleMedium = mql => {
  if (mql.matches) {
    isLargerThanMobile = true;
  } else {
    isLargerThanMobile = false;
  }
};

export const init = () => {
  document.querySelectorAll('.js-toolbox-component, figure.if .if.toolbox').forEach(el => el.remove());

  const _example_els = document.querySelectorAll(
    '.if.types:not(.types-grid) .if.type.column:not(.full):not(.responsive) .if.example:not(.sg):not(.codepen)'
  );

  _example_els.forEach(render);

  MQSmall.addListener(_handleMedium);

  _handleMedium(MQSmall);
};

const render = (example, exampleIndex, code = '') => {
  const _figure_el = example.parentElement;
  const _figures_el = _figure_el.parentElement;
  const fragment = document.createDocumentFragment();
  const _preview_el = createPreviewLink();
  const _tools_array = [];

  let _example_to_use_el = example;
  let _tools_container_el = document.getElementById(`toolbox-${exampleIndex}`);

  if (_tools_container_el) {
    _tools_container_el.remove();
  }

  _figure_el.querySelectorAll('form[action*="codepen"], form[action*="jsfiddle"]').forEach(el => el.remove());

  if (example.querySelector('iframe')) {
    const _iframe_el = example.querySelector('iframe');
    const _id = _iframe_el.getAttribute('id');
    const _data_responsive_example_id = getDataResponsiveId(_id);

    _example_to_use_el = document.querySelector(`[data-responsive-id="${_data_responsive_example_id}"]`);
  }

  if (!_example_to_use_el) return;

  code = _example_to_use_el.innerHTML || '';

  _tools_container_el = document.createElement('div');
  _tools_container_el.classList.add('if');
  _tools_container_el.classList.add('toolbox');
  _tools_container_el.setAttribute('id', `toolbox-${exampleIndex}`);

  fragment.appendChild(_tools_container_el);

  _figures_el.style.position = 'relative';

  if (isLargerThanMobile) {
    example.style.paddingBottom = '6rem';
  } else {
    example.style.paddingBottom = '1.5rem';
  }

  _figures_el.appendChild(fragment);

  _tools_container_el.appendChild(_preview_el);

  _tools_array.push(createCopyButton(code));
  _tools_array.push(createCodepenLink(example, code));
  _tools_array.push(createJSFiddleLink(example, code));
  _tools_array.push(createCodeSandboxLink(code));

  _tools_container_el.appendChild(createBackgroundMenu(example));
  _tools_container_el.appendChild(createSandboxMenu(_tools_array.reverse()));

  const __tool_trigger_el = _tools_container_el.querySelector('.js-toolbox-menu-trigger');
  const _background_trigger_el = _tools_container_el.querySelector('.js-toolbox-background-trigger');

  new IDSMenuToggle(__tool_trigger_el);
  new IDSMenuToggle(_background_trigger_el);

  const _set_position = () => {
    // position(_tools_container_el).toBottom(example);
    _handleMedium(MQSmall);

    if (isLargerThanMobile) {
      example.style.paddingBottom = '6rem';
    } else {
      example.style.paddingBottom = '1.5rem';
    }

    const _tools_container_el_rect = _tools_container_el.getBoundingClientRect();
    const _example_el_rect = example.getBoundingClientRect();

    _tools_container_el.style.width = `${_example_el_rect.width}px`;
    _tools_container_el.style.left = `${_figure_el.offsetLeft - example.offsetLeft}px`;
    _tools_container_el.style.top = `${
      _figure_el.offsetTop - example.offsetTop + _example_el_rect.height - _tools_container_el_rect.height
    }px`;
  };

  if (document.readyState === 'loading') {
    document.removeEventListener('DOMContentLoaded', _set_position);
    document.addEventListener('DOMContentLoaded', _set_position);
  } else {
    // `DOMContentLoaded` already fired
    _set_position();
  }

  window.removeEventListener('resize', _set_position);
  window.addEventListener('resize', _set_position);
};
