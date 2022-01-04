const createInlineArrow = () => {
  const fragment = document.createDocumentFragment();
  const el = document.createElement('span');
  const wrapper = document.createElement('span');

  wrapper.classList.add('if');
  wrapper.classList.add('inline-nowrap');

  wrapper.innerHTML = '&#xfeff;';
  wrapper.appendChild(el);
  wrapper.setAttribute('aria-hidden', true);
  el.classList.add('if');
  el.classList.add('dropRight');

  fragment.appendChild(wrapper);

  return fragment;
};

const init = () => {
  const heroes = document.querySelectorAll('.if.hero.navigation');

  heroes.forEach(hero => {
    const ctaButton = hero.querySelector('.if.button.primary');
    const backButton = hero.querySelector('.if.navigation.back');
    const backButton2 = hero.querySelector('.if.navigation.back.step-2');

    const primaryList = hero.querySelector('.if.navigation-container > .if.navigation-list');
    const primaryActions = primaryList.querySelectorAll('.if.navigation-action');

    primaryActions.forEach(action => {
      action.classList.add('hasno-after');
      action.querySelectorAll('.inline-nowrap').forEach(node => node.remove());
      action.appendChild(createInlineArrow());
    });

    const actions = hero
      .querySelector('.if.content.navigation')
      .querySelectorAll('a:not(.navigation-link), button:not(.navigation-link)');

    actions.forEach(action => {
      action.setAttribute('tabindex', '-1');
    });

    const subActions = hero
      .querySelector('.if.content.navigation')
      .querySelectorAll('a.navigation-link, button.navigation-link');
    subActions.forEach(action => {
      action.setAttribute('tabindex', '-1');
    });
    const ctaButtonClick = e => {
      e.preventDefault();
      hero.querySelector('.if.content:not(.navigation)').style.display = 'none';
      hero.querySelector('.if.content.navigation').classList.add('is-active');
      hero.querySelector('.if.content.navigation').classList.add('step-1');
      actions.forEach(action => {
        action.setAttribute('tabindex', '0');
      });

      const firstAction = hero.querySelector('.if.content.navigation .if.navigation-list .if.navigation-item');
      firstAction.focus();
      const list = hero.querySelector('.if.navigation-list');
      list.style.height = 'auto';
    };

    ctaButton.removeEventListener('click', ctaButtonClick);
    ctaButton.addEventListener('click', ctaButtonClick);

    const activateStepTwo = el => {
      subActions.forEach(action => {
        action.setAttribute('tabindex', '-1');
      });
      hero.querySelectorAll('.if.navigation-list > li > button.is-active').forEach(el => {
        el.classList.remove('is-active');
        el.parentElement.querySelector('.if.sub-navigation-list').style.display = 'none';
        setTimeout(function () {
          el.parentElement.querySelector('.if.sub-navigation-list').style.display = 'flex';
        }, 1000);
      });
      el.parentElement.querySelectorAll('.if.sub-navigation-list .if.navigation-link').forEach(el => {
        el.setAttribute('tabindex', '0');
      });
      el.classList.add('is-active');
      hero.querySelector('.if.content.navigation').classList.remove('step-1');
      hero.querySelector('.if.content.navigation').classList.add('step-2');
      setTimeout(function () {
        const parentList = el.closest('.if.navigation-list');
        const subNav = el.parentElement.querySelector('.if.sub-navigation-list');
        const subRect = subNav.getBoundingClientRect();
        parentList.style.height = subRect.height + 'px';
      }, 100);
    };

    hero.querySelectorAll('.if.navigation-list > li > button').forEach(el => {
      el.removeEventListener('click', e => {
        e.preventDefault();
        activateStepTwo(el);
      });
      el.addEventListener('click', e => {
        e.preventDefault();
        activateStepTwo(el);
      });
    });

    const backButtonClick = e => {
      e.preventDefault();
      hero.querySelector('.if.content:not(.navigation)').style.display = 'block';
      hero.querySelector('.if.content.navigation').classList.remove('is-active');
      hero.querySelector('.if.content.navigation').classList.remove('step-1');
      hero.querySelector('.if.content.navigation').classList.remove('step-2');
      actions.forEach(action => {
        action.setAttribute('tabindex', '-1');
      });
      subActions.forEach(action => {
        action.setAttribute('tabindex', '-1');
      });
      const list = hero.querySelector('.if.navigation-list');
      list.style.height = 'auto';
    };
    backButton.removeEventListener('click', backButtonClick);
    backButton.addEventListener('click', backButtonClick);
    const backButton2Click = e => {
      e.preventDefault();
      hero.querySelector('.if.content.navigation').classList.remove('step-2');
      hero.querySelector('.if.content.navigation').classList.add('step-1');
      const list = hero.querySelector('.if.navigation-list');
      list.style.height = 'auto';
    };
    backButton2.removeEventListener('click', backButton2Click);
    backButton2.addEventListener('click', backButton2Click);
  });
};

export default init;
