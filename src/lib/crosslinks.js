const getElementCSSStyle = el => (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle);

export const toggleExpandableBlock = disclosureCard => {
  const isOpen = disclosureCard.classList.contains('is-expanded');
  const blockToBeExpanded = disclosureCard.parentElement.querySelector('.if.disclosure-card + .if.block.expandable');
  if (blockToBeExpanded) {
    const parentElement = disclosureCard.parentElement;
    const parentBlock = disclosureCard.closest('.if.block');
    const disclosureCardElementRect = disclosureCard.getBoundingClientRect();

    if (isOpen) {
      disclosureCard.classList.remove('is-expanded');
      blockToBeExpanded.classList.remove('is-expanded');
      blockToBeExpanded.style.top = null;
      blockToBeExpanded.style.left = null;
      parentBlock.style.height = null;
      document.querySelectorAll('.if.disclosure-card.is-expanded').forEach(disclosureCardExpandable => {
        disclosureCardExpandable.classList.remove('is-expanded');
        disclosureCardExpandable.closest('.if.block').style.height = null;
      });
      document.querySelectorAll('.if.block.expandable.is-expanded').forEach(blockExpandable => {
        blockExpandable.classList.remove('is-expanded');
        blockExpandable.style.top = null;
        blockExpandable.style.left = null;
      });
      blockToBeExpanded.classList.add('is-expanded');
      disclosureCard.classList.add('is-expanded');
      const blockToBeExpandedRect = blockToBeExpanded.getBoundingClientRect();
      const parentElementStyle = getElementCSSStyle(parentElement);
      const parentElementRect = parentElement.getBoundingClientRect();
      const parentElementViewportLeft = parentElementRect.left;

      const parentBlockStyle = getElementCSSStyle(parentBlock);
      const parentBlockRect = parentBlock.getBoundingClientRect();

      const bodyRect = document.querySelector('body').getBoundingClientRect();

      const expandedBlockWidth = parentBlockRect.width >= bodyRect.width ? bodyRect.width : parentBlockRect.width;

      const expandedOffsetLeft =
        parentBlockRect.width >= bodyRect.width
          ? parentElementViewportLeft
          : parentElementViewportLeft - parentBlockRect.left;

      Object.assign(blockToBeExpanded.style, {
        width: `${expandedBlockWidth}px`,
        top: `${
          disclosureCardElementRect.height -
          parseInt(parentElementStyle.marginTop, 10) +
          parseInt(parentBlockStyle.paddingBottom, 10)
        }px`,
        left: `-${expandedOffsetLeft}px`
      });

      Object.assign(parentBlock.style, {
        // - border-top of blockToBeExpanded
        height: `calc(${parentBlockRect.height + blockToBeExpandedRect.height}px - 2pt)`
      });
    }
  }
};

export const fixExpandableCrosslinkExamples = disclosureCard => {
  const blockToBeExpanded = disclosureCard.parentElement.querySelector('.if.disclosure-card + .if.block.expandable');
  if (blockToBeExpanded) {
    const parentElement = disclosureCard.parentElement;
    const parentBlock = disclosureCard.closest('.if.block');
    const disclosureCardElementRect = disclosureCard.getBoundingClientRect();

    document.querySelectorAll('.if.disclosure-card.is-expanded').forEach(disclosureCardExpandable => {
      disclosureCardExpandable.classList.remove('is-expanded');
      disclosureCardExpandable.closest('.if.block').style.height = null;
    });
    document.querySelectorAll('.if.block.expandable.is-expanded').forEach(blockExpandable => {
      blockExpandable.classList.remove('is-expanded');
      blockExpandable.style.top = null;
      blockExpandable.style.left = null;
    });
    blockToBeExpanded.classList.add('is-expanded');
    disclosureCard.classList.add('is-expanded');
    const blockToBeExpandedRect = blockToBeExpanded.getBoundingClientRect();
    const parentElementStyle = getElementCSSStyle(parentElement);
    const parentElementRect = parentElement.getBoundingClientRect();
    const parentElementViewportLeft = parentElementRect.left;

    const parentBlockStyle = getElementCSSStyle(parentBlock);
    const parentBlockRect = parentBlock.getBoundingClientRect();

    const bodyRect = document.querySelector('body').getBoundingClientRect();

    const expandedBlockWidth = parentBlockRect.width >= bodyRect.width ? bodyRect.width : parentBlockRect.width;

    const expandedOffsetLeft =
      parentBlockRect.width >= bodyRect.width
        ? parentElementViewportLeft
        : parentElementViewportLeft - parentBlockRect.left;

    blockToBeExpanded.style.width = `${expandedBlockWidth}px`;
    blockToBeExpanded.style.top = `${
      disclosureCardElementRect.height -
      parseInt(parentElementStyle.marginTop, 10) +
      parseInt(parentBlockStyle.paddingBottom, 10)
    }px`;
    blockToBeExpanded.style.left = `-${expandedOffsetLeft}px`;

    // - border-top of blockToBeExpanded
    parentBlock.style.height = `calc(${parentBlockRect.height + blockToBeExpandedRect.height}px - 2pt)`;
  }
};

const init = () => {
  document.querySelectorAll('.if.disclosure-card').forEach(disclosureCard => {
    disclosureCard.removeEventListener('click', () => {
      toggleExpandableBlock(disclosureCard);
    });
    disclosureCard.addEventListener('click', () => {
      toggleExpandableBlock(disclosureCard);
    });
  });
};

export default init;
