/* eslint no-console: 0 */
const fallbackCopyTextToClipboard = text => {
  const _text_area_el = document.createElement('textarea');

  _text_area_el.value = text;

  // Avoid scrolling to bottom
  _text_area_el.style.top = '0';
  _text_area_el.style.left = '0';
  _text_area_el.style.position = 'fixed';
  _text_area_el.classList.add('js-toolbox-component');

  document.body.appendChild(_text_area_el);
  _text_area_el.focus();
  _text_area_el.select();

  try {
    document.execCommand('copy');

    onSuccess('Copied to clipboard');
  } catch (err) {
    onError('Could not copy text, please try again later');
  }

  document.body.removeChild(_text_area_el);
};
const copyTextToClipboard = text => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);

    return;
  }

  navigator.clipboard.writeText(text).then(
    () => {
      onSuccess('Copied to clipboard');
    },
    () => {
      onError('Could not copy text, please try again later');
    }
  );
};
const onSuccess = message => {
  const _dispatchToastEvent = ({ ...args }) => {
    const _event = new CustomEvent('ids:toast', {
      bubbles: !0,
      detail: {
        payload: { ...args }
      }
    });

    document.dispatchEvent(_event);
  };

  _dispatchToastEvent({
    message,
    type: 'info',
    icon: true
  });
};
const onError = message => {
  const _dispatchToastEvent = ({ ...args }) => {
    const _event = new CustomEvent('ids:toast', {
      bubbles: !0,
      detail: {
        payload: { ...args }
      }
    });

    document.dispatchEvent(_event);
  };

  _dispatchToastEvent({
    message,
    type: 'info',
    icon: true
  });
};

export const createCopyButton = code => {
  const _fragment = document.createDocumentFragment();
  const _copy_el = document.createElement('button');

  _copy_el.classList.add('if');
  _copy_el.classList.add('copy');
  _copy_el.classList.add('js-toolbox-component');
  _copy_el.setAttribute('title', 'Copy code');
  _copy_el.textContent = 'Copy';

  _copy_el.addEventListener('click', () => {
    copyTextToClipboard(code);
  });

  _fragment.appendChild(_copy_el);

  return _fragment;
};
