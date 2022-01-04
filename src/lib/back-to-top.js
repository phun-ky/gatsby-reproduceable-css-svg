import { srSpeak } from './a11y';

const init = () => {
  // Detect request animation frame
  const scroll =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  let lastPosition = -1;
  let isDeactivating = false;

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const backToTopButton = document.querySelector('.if.js-back-to-top');

  backToTopButton.addEventListener('click', () => {
    const _anchor = document.getElementById('content');

    if (_anchor) {
      _anchor.scrollIntoView();

      const _first_focusable_el = _anchor.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
      )[0];

      _first_focusable_el.focus();
    } else {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    srSpeak('Scrolled to top');
  });

  const loop = () => {
    // Avoid calculations if not needed
    if (lastPosition == window.pageYOffset) {
      scroll(loop);

      return false;
    } else if (window.pageYOffset >= vh && !isDeactivating) {
      lastPosition = window.pageYOffset;
      backToTopButton.classList.add('is-visible');
      scroll(loop);

      return false;
    } else if (isDeactivating) {
      lastPosition = window.pageYOffset;
      scroll(loop);

      return false;
    } else if (window.pageYOffset < vh && !isDeactivating) {
      lastPosition = window.pageYOffset;

      if (backToTopButton.classList.contains('is-visible')) {
        isDeactivating = true;
        backToTopButton.classList.remove('is-visible');
        backToTopButton.classList.add('is-deactivating');
        setTimeout(() => {
          backToTopButton.classList.remove('is-deactivating');

          isDeactivating = false;
        }, 2000);
      }

      scroll(loop);

      return false;
    } else {
      lastPosition = window.pageYOffset;
    }

    scroll(loop);
  };

  // Call the loop for the first time

  loop();
};

export default init;
