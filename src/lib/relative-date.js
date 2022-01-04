import relativeDate from 'tiny-relative-date';

const init = () => {
  const relativeDateEls = document.querySelectorAll('[data-relative-date]:not([data-relative-date="filled"])');
  relativeDateEls.forEach(el => {
    if (el.textContent && el.textContent !== '') {
      const date = el.textContent;
      el.textContent = relativeDate(date);
      el.setAttribute('data-relative-date', 'filled');
    }
  });
};

export default init;
