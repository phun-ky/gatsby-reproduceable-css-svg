import debounce from './debounce';

const init = () => {
  const contextualMenuTriggers = document.querySelectorAll('.if.js-contextual-menu');

  const removePreviouslySelectedMenuItem = el => {
    const selected = el.querySelectorAll('.is-focused');
    selected.forEach(li => {
      li.classList.remove('is-focused');
      li.setAttribute('aria-selected', false);
    });
  };

  contextualMenuTriggers.forEach(contextualMenuTrigger => {
    const adjustMenuPlacement = debounce(function () {
      const contextualMenuHolder = contextualMenuTrigger.parentElement;
      const contextualMenu = contextualMenuHolder.querySelector('.if.contextual-menu');
      const contextualMenuTriggerRect = contextualMenuTrigger.getBoundingClientRect();
      const contextualMenuHolderRect = contextualMenuHolder.getBoundingClientRect();
      contextualMenu.style.top =
        contextualMenuHolderRect.top - contextualMenuTriggerRect.top + contextualMenuTriggerRect.height + 'px';
    }, 300);

    adjustMenuPlacement();

    const handleClickOutsidecontextualMenu = e => {
      if (e.target == contextualMenuTrigger) return;

      const contextualMenuHolder = contextualMenuTrigger.parentElement;
      const contextualMenu = contextualMenuHolder.querySelector('.if.contextual-menu');
      const contextualMenuList = contextualMenuHolder.querySelector('.if.contextual-menu > ul.if');

      if (contextualMenu.classList.contains('is-open')) {
        if (!contextualMenuList.contains(e.target)) {
          closeMenu();
        }
      }
    };
    const closeMenu = () => {
      const contextualMenuHolder = contextualMenuTrigger.parentElement;
      const contextualMenu = contextualMenuHolder.querySelector('.if.contextual-menu');
      const contextualMenuList = contextualMenuHolder.querySelector('.if.contextual-menu > ul.if');
      resetIndexOfOptions();
      removePreviouslySelectedMenuItem(contextualMenuList);
      contextualMenu.classList.remove('is-open');
      contextualMenuList.classList.remove('is-open');
      contextualMenuTrigger.setAttribute('aria-expanded', false);
      window.removeEventListener('resize', adjustMenuPlacement);
      document.removeEventListener('click', handleClickOutsidecontextualMenu);
    };

    const openMenu = () => {
      const contextualMenuHolder = contextualMenuTrigger.parentElement;
      const contextualMenu = contextualMenuHolder.querySelector('.if.contextual-menu');
      const contextualMenuList = contextualMenuHolder.querySelector('.if.contextual-menu > ul.if');
      updateAllOptions(contextualMenuList.querySelectorAll('li:not(.separator)'));
      contextualMenu.classList.add('is-open');
      contextualMenuList.classList.add('is-open');
      contextualMenuTrigger.setAttribute('aria-expanded', true);
      document.removeEventListener('click', handleClickOutsidecontextualMenu);
      document.addEventListener('click', handleClickOutsidecontextualMenu);
      window.removeEventListener('resize', adjustMenuPlacement);
      window.addEventListener('resize', adjustMenuPlacement);
    };
    const handlecontextualMenuClick = e => {
      const contextualMenuTrigger = e.target;
      const contextualMenuHolder = contextualMenuTrigger.parentElement;
      const contextualMenu = contextualMenuHolder.querySelector('.if.contextual-menu');

      if (contextualMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    const updateAllOptions = nodes => {
      allOptions = Array.prototype.slice.call(nodes).filter(node => !node.querySelector('[disabled]'));
    };
    const resetIndexOfOptions = () => {
      indexOfOptions = 0;
    };
    let indexOfOptions = 0;
    let allOptions = null;

    const handlecontextualMenuKeypress = e => {
      const contextualMenuTrigger = e.target;
      const contextualMenuHolder = contextualMenuTrigger.parentElement;
      const contextualMenuList = contextualMenuHolder.querySelector('.if.contextual-menu > ul.if');

      if (e.key === 'Enter') {
        e.stopPropagation();
        e.preventDefault();

        const selected = contextualMenuList.querySelector('li.is-focused');
        if (contextualMenuList.classList.contains('is-open') && selected) {
          resetIndexOfOptions();
          closeMenu();
        }
        return false;
      }

      if (contextualMenuList.classList.contains('is-open')) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          return false;
        }

        if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
          let nextElement;
          e.preventDefault();
          if (e.key == 'ArrowUp') {
            nextElement = allOptions[--indexOfOptions];
            if (!nextElement) {
              indexOfOptions = allOptions.length - 1;
              nextElement = allOptions[indexOfOptions];
            }

            removePreviouslySelectedMenuItem(contextualMenuList);
            nextElement.classList.add('is-focused');
            nextElement.setAttribute('aria-selected', true);
          } else if (e.key == 'ArrowDown') {
            nextElement = allOptions[++indexOfOptions];
            if (!nextElement) {
              indexOfOptions = 0;
              nextElement = allOptions[indexOfOptions];
            }
            removePreviouslySelectedMenuItem(contextualMenuList);
            nextElement.classList.add('is-focused');
            nextElement.setAttribute('aria-selected', true);
          }
        }
      }
    };

    contextualMenuTrigger.removeEventListener('click', handlecontextualMenuClick);
    contextualMenuTrigger.removeEventListener('keyup', handlecontextualMenuKeypress);
    contextualMenuTrigger.addEventListener('click', handlecontextualMenuClick);
    contextualMenuTrigger.addEventListener('keyup', handlecontextualMenuKeypress);
  });
};

export default init;
