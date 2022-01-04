const mediumMQ = window.matchMedia('screen and (min-width: 720px)');

let isMediumMQ = true;

const setCardsImageHeight = () => {
  const selector = isMediumMQ ? '.if.editorial-card:not(.across):not(.list)' : '.if.editorial-card';
  const cards = document.querySelectorAll(selector);

  if (isMediumMQ) {
    const fullWidthCards = document.querySelectorAll('.if.editorial-card.across, .if.editorial-card.list');

    fullWidthCards.forEach(card => {
      const imageContainer = card.querySelector('.if.image');
      const image = card.querySelector('.if.image > .if');

      if (!image) return;

      if (card.classList.contains('across')) {
        imageContainer.style.height = 'auto';
      }

      image.style.height = '100%';
    });
  }

  cards.forEach(card => {
    const imageContainer = card.querySelector('.if.image');
    const image = card.querySelector('.if.image > .if');

    if (!image) return;

    const cardRect = card.getBoundingClientRect();
    const imageWidth = cardRect.width;
    const imageHeight = imageWidth * 0.5625;

    image.style.height = `${imageHeight}px`;
    imageContainer.style.height = `${imageHeight}px`;
  });
};

export default setCardsImageHeight;

setCardsImageHeight();

const handleMedium = mql => {
  if (mql.matches) {
    isMediumMQ = true;
  } else {
    isMediumMQ = false;
  }
};

mediumMQ.addListener(handleMedium);

handleMedium(mediumMQ);
