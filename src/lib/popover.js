const _medium_mq = window.matchMedia('screen and (min-width: 400px)');

let _is_medium_mq = true;

const _handleMedium = mql => {
  if (mql.matches) {
    _is_medium_mq = true;
  } else {
    _is_medium_mq = false;
  }
};

_medium_mq.addListener(_handleMedium);

_handleMedium(_medium_mq);

const popoverInitiators = document.querySelectorAll('[data-popover]:not(abbr)');
const initPopover = popoverInitiator => {
  const title = popoverInitiator.getAttribute('data-popover-title');
  const text = popoverInitiator.getAttribute('data-popover-text');
  const position = popoverInitiator.getAttribute('data-popover');
  const size = popoverInitiator.getAttribute('data-popover-size');
  const isOpen = popoverInitiator.getAttribute('data-popover-is-open');
  const createPopover = (title, text, position = 'top', size = 'normal') => {
    const uuid = Date.now();
    const popoverEl = document.createElement('div');
    const closeEl = document.createElement('button');
    const titleEl = document.createElement('span');
    const textEl = document.createElement('span');

    popoverEl.classList.add('if');
    popoverEl.classList.add('popover');
    popoverEl.classList.add(size);
    popoverEl.classList.add(position);
    popoverEl.setAttribute('aria-hidden', true);
    popoverEl.setAttribute('aria-labelledby', `popover-title-${uuid}`);
    popoverEl.setAttribute('aria-describedby', `popover-text-${uuid}`);
    popoverEl.setAttribute('role', 'dialog');

    closeEl.classList.add('if');
    closeEl.classList.add('close');
    closeEl.setAttribute('type', 'button');
    closeEl.setAttribute('aria-label', 'Close');

    closeEl.addEventListener('click', () => {
      _closePopover(popoverEl);
    });

    titleEl.classList.add('if');
    titleEl.classList.add('title');
    titleEl.setAttribute('id', `popover-title-${uuid}`);

    const titleText = document.createTextNode(title);

    titleEl.appendChild(titleText);

    textEl.classList.add('if');
    textEl.classList.add('text');
    textEl.setAttribute('id', `popover-text-${uuid}`);

    const textText = document.createTextNode(text);

    textEl.appendChild(textText);

    popoverEl.appendChild(closeEl);
    popoverEl.appendChild(titleEl);
    popoverEl.appendChild(textEl);

    return popoverEl;
  };
  const insertedPopover = popoverInitiator.parentElement.insertBefore(
    createPopover(title, text, position, size),
    popoverInitiator
  );

  insertedPopover.style.visibility = 'hidden';

  const setPosition = (initiator, popover) => {
    const _button_rect = initiator.getBoundingClientRect();
    const _popover_rect = popover.getBoundingClientRect();
    const _arrow_left_if_popover_overflow = initiator.offsetLeft + _button_rect.width / 2 - 12 - 24;
    const VH = window.innerHeight;
    const VW = window.innerWidth;

    if (!_is_medium_mq) {
      const _mobile_popover_rect = popover.getBoundingClientRect();

      popover.style.left = `${popover.getBoundingClientRect().left - popover.offsetLeft + 24}px`;

      popover.classList.remove('bottom');
      popover.classList.remove('right');
      popover.classList.remove('left');

      if (VH / 2 - _mobile_popover_rect.height < _button_rect.top) {
        popover.style.top = `calc(${initiator.offsetTop}px - ${popover.getBoundingClientRect().height}px - 24px)`;
      } else {
        popover.style.top = `${initiator.offsetTop + _button_rect.height + 24}px`;
        popover.classList.add('bottom');
      }

      popover.style.setProperty('--ids-popover-arrow-vertical-position', `${initiator.offsetTop}px`);
      popover.style.setProperty(
        '--ids-popover-arrow-horizontal-position',
        `${_arrow_left_if_popover_overflow < 0 ? 0 : _arrow_left_if_popover_overflow}px`
      );
    } else {
      popover.style.setProperty('--ids-popover-arrow-vertical-position', 'calc(50% - 12px)');
      popover.style.setProperty('--ids-popover-arrow-horizontal-position', 'calc(50% - 12px)');

      if (position && position === 'bottom') {
        popover.style.left = initiator.offsetLeft + _button_rect.width / 2 - _popover_rect.width / 2 + 'px';

        if (popover.getBoundingClientRect().left < 24) {
          popover.style.left = '0px';
          popover.style.setProperty('--ids-popover-arrow-vertical-position', `${initiator.offsetTop}px`);
          popover.style.setProperty(
            '--ids-popover-arrow-horizontal-position',
            `${_arrow_left_if_popover_overflow < 0 ? 0 : _arrow_left_if_popover_overflow}px`
          );
        }

        popover.classList.add('bottom');
        popover.style.top = `${initiator.offsetTop + _button_rect.height + 24}px`;
      } else if (position && position === 'right') {
        popover.style.left = `${initiator.offsetLeft + _button_rect.width + 24}px`;
        popover.style.top = `${initiator.offsetTop + _button_rect.height / 2 - _popover_rect.height / 2}px`;
        popover.classList.add('right');
        popover.classList.remove('top');

        if (VW / 2 - popover.getBoundingClientRect().width < _button_rect.left) {
          popover.classList.remove('right');
          popover.classList.add('top');
          popover.style.left = `${
            initiator.offsetLeft + _button_rect.width / 2 - popover.getBoundingClientRect().width / 2
          }px`;

          if (popover.getBoundingClientRect().left < 24) {
            popover.style.left = '24px';

            popover.style.setProperty('--ids-popover-arrow-vertical-position', `${initiator.offsetTop}px`);
            popover.style.setProperty(
              '--ids-popover-arrow-horizontal-position',
              `${_arrow_left_if_popover_overflow < 0 ? 0 : _arrow_left_if_popover_overflow}px`
            );
          }

          popover.style.top = `calc(${initiator.offsetTop}px - ${popover.getBoundingClientRect().height}px - 24px)`;
          popover.style.setProperty('--ids-popover-arrow-vertical-position', 'calc(50% - 12px)');
          popover.style.setProperty('--ids-popover-arrow-horizontal-position', 'calc(50% - 12px)');
        }
      } else if (position && position === 'left') {
        popover.style.left = `${initiator.offsetLeft - popover.getBoundingClientRect().width - 24}px`;
        popover.style.top = `${initiator.offsetTop + _button_rect.height / 2 - _popover_rect.height / 2}px`;
        popover.classList.add('left');
        popover.classList.remove('bottom');

        if (popover.getBoundingClientRect().width > _button_rect.left + 24) {
          popover.classList.remove('left');
          popover.classList.add('bottom');
          popover.style.left = `${
            initiator.offsetLeft + _button_rect.width / 2 - popover.getBoundingClientRect().width / 2
          }px`;

          if (popover.getBoundingClientRect().left < 24) {
            popover.style.left = '24px';

            popover.style.setProperty('--ids-popover-arrow-vertical-position', `${initiator.offsetTop}px`);
            popover.style.setProperty(
              '--ids-popover-arrow-horizontal-position',
              `${_arrow_left_if_popover_overflow < 0 ? 0 : _arrow_left_if_popover_overflow}px`
            );
          }

          popover.style.top = `${initiator.offsetTop + _button_rect.height + 24}px`;
          popover.style.setProperty('--ids-popover-arrow-vertical-position', 'calc(50% - 12px)');
          popover.style.setProperty('--ids-popover-arrow-horizontal-position', 'calc(50% - 12px)');
        }
      } else {
        popover.style.left = `${
          initiator.offsetLeft + _button_rect.width / 2 - popover.getBoundingClientRect().width / 2
        }px`;

        if (popover.getBoundingClientRect().left < 24) {
          popover.style.left = '24px';

          popover.style.setProperty('--ids-popover-arrow-vertical-position', `${initiator.offsetTop}px`);
          popover.style.setProperty(
            '--ids-popover-arrow-horizontal-position',
            `${_arrow_left_if_popover_overflow < 0 ? 0 : _arrow_left_if_popover_overflow}px`
          );
        }

        popover.classList.remove('bottom');
        popover.classList.remove('right');
        popover.classList.remove('left');
        popover.style.top = `calc(${initiator.offsetTop}px - ${popover.getBoundingClientRect().height}px - 24px)`;
      }
    }
  };
  const _togglePopover = popover => {
    const _is_open = popover.classList.contains('is-open');

    if (_is_open) {
      _closePopover(popover);
    } else {
      _openPopover(popover);
    }
  };
  const toggleAriaHidden = popover => {
    popover.setAttribute('aria-hidden', popover.getAttribute('aria-hidden') != 'true' ? 'true' : 'false');
  };
  const _closePopover = popover => {
    popover.classList.remove('is-open');
    popover.style.visibility = 'hidden';
    toggleAriaHidden(popover);
  };
  const _openPopover = popover => {
    popover.classList.add('is-open');
    window.requestAnimationFrame(function () {
      setPosition(popoverInitiator, popover);
    });

    popover.style.visibility = 'visible';
    toggleAriaHidden(popover);
  };

  if (isOpen === '') {
    _openPopover(insertedPopover);
  }

  popoverInitiator.addEventListener('click', () => {
    _togglePopover(insertedPopover);
  });

  window.addEventListener('resize', function () {
    requestAnimationFrame(function () {
      setPosition(popoverInitiator, insertedPopover);
    });
  });
};
const initPopovers = () => {
  popoverInitiators.forEach(initPopover);
};

export default initPopovers;
