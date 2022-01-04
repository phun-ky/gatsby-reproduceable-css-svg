export const srSpeak = (text, ariaLive = 'polite', role = 'log', ariaRelevant = 'additions', ariaAtomic = false) => {
  const el = document.createElement('div');
  const id = 'speak-' + Date.now();
  el.setAttribute('id', id);
  el.setAttribute('role', role);
  el.setAttribute('aria-live', ariaLive);
  el.setAttribute('aria-relevant', ariaRelevant);
  el.setAttribute('aria-atomic', ariaAtomic);
  el.classList.add('if');
  el.classList.add('axe');
  el.classList.add('sr-only');
  document.body.appendChild(el);

  window.setTimeout(function () {
    document.getElementById(id).innerHTML = text;
  }, 100);

  window.setTimeout(function () {
    document.body.removeChild(document.getElementById(id));
  }, 1000);
};
