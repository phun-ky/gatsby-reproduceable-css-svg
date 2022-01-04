import debounce from './debounce';

const saveFile = (blob, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
};

const isHidden = el => el.style.display == 'none';
const toggleCategoryHeaders = headers => {
  const vis = Array.from(headers).map(header => {
    const deck = header.nextSibling;
    const hr = header.previousSibling;

    const cards = Array.from(deck.querySelectorAll('.if.icon-card'));
    const length = cards.filter(card => !isHidden(card)).length;
    if (!length) {
      header.style.display = 'none';
      hr.style.display = 'none';
      deck.style.display = 'none';
    } else {
      header.style.display = 'block';
      hr.style.display = 'block';
      deck.style.display = 'grid';
    }
    return length;
  });
  const noResultsElement = document.querySelector('.js-no-results');
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  if (vis.reduce(reducer, 0) === 0) {
    noResultsElement.style.display = 'block';
  } else {
    noResultsElement.style.display = 'none';
  }
};
const iconfilter = () => {
  const search = document.querySelector('#iconsearch');
  if (!search) return;
  const cards = document.querySelectorAll('.if.cards.icons .if.icon-card');
  const categoryHeaders = document.querySelectorAll('#resources-icons-icon-list h2');
  search.addEventListener(
    'keyup',
    debounce(function (e) {
      const searchValues = e.target.value.trim().replace(/ +/g, ' ').toLowerCase().split(' ');

      Array.from(cards)
        .map(card => {
          card.style.display = 'none';
          return card;
        })
        .filter(card => {
          const tags = Array.from(card.querySelectorAll('span.if[data-rel]'));
          const text = tags
            .map(tag => tag.textContent)
            .join('')
            .trim()
            .replace(/ +/g, ' ')
            .replace(/\ufeff/g, '')
            .replace(/(?:\r\n|\r|\n)/g, '')
            .toLowerCase();
          let matchesSearch = true;
          searchValues.forEach(value => {
            matchesSearch = !matchesSearch ? false : text.indexOf(value) !== -1;
          });
          return matchesSearch;
        })
        .forEach(card => {
          card.style.display = 'flex';
        });

      toggleCategoryHeaders(categoryHeaders);
    }, 200)
  );
};

const handleClickDownloadIcon = e => {
  const button = e.target;

  const iconName = button.getAttribute('data-rel');

  if (!iconName || (iconName && iconName === '')) return;

  fetch('/if_icons.json')
    .then(response => response.json())
    .then(data => {
      const icon = data.icons.filter(icon => icon.name === iconName)[0];
      const blob = new Blob([icon.content], {
        type: 'image/svg+xml'
      });
      saveFile(blob, `${iconName}.svg`);
    });
};

const initHandleClickDownloadIcon = () => {
  const buttons = document.querySelectorAll('.if.cards.icons .if.icon-card .if.button');
  if (!buttons || (buttons && !buttons.length)) return;

  Array.from(buttons).forEach(button => {
    button.removeEventListener('click', handleClickDownloadIcon);
    button.addEventListener('click', handleClickDownloadIcon);
  });
};

const preload = () => {
  if (!document.getElementById('preload-icons')) {
    // <link rel="preload" href="/path/to/json" as="fetch">
    const _link_el = document.createElement('link');
    _link_el.setAttribute('rel', 'preload');
    _link_el.setAttribute('as', 'fetch');
    _link_el.setAttribute('href', '/if_icons.json');
    document.querySelector('head').appendChild(_link_el);
  }
};

const init = () => {
  preload();
  iconfilter();
  initHandleClickDownloadIcon();
};

export default init;
