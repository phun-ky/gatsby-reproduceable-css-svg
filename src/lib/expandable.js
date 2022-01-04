const getSiblingsOfSameNode = (currentNode, className) => {
  var result = [];
  var node = currentNode.parentNode.firstChild;

  while (node) {
    if (node !== currentNode && node.nodeType === Node.ELEMENT_NODE) result.push(node);
    node = node.nextElementSibling || node.nextSibling;
  }

  if (className) {
    return result.filter(node => node.classList.contains(className));
  }

  return result;
};

const closeAllExpandables = expandable => {
  // get sibling expandables
  const expandables = getSiblingsOfSameNode(expandable, 'is-expandable');
  expandables.forEach(expandable => {
    const expandableButton = expandable.querySelector('.if.title');
    const expandableContent = expandable.querySelector('.if.content');
    expandableContent.setAttribute('tabindex', '-1');
    expandable.classList.remove('is-open');
    expandableButton.setAttribute('aria-expanded', false);
  });
};

module.exports = function () {
  const expandables = document.querySelectorAll('.if.panel.is-expandable');
  expandables.forEach(expandable => {
    const expandableButton = expandable.querySelector('.if.title');
    const expandableContent = expandable.querySelector('.if.content');

    expandableButton.setAttribute('tabindex', '0');
    if (!expandable.classList.contains('is-open')) {
      expandableContent.setAttribute('tabindex', '-1');
    } else {
      expandableContent.removeAttribute('tabindex');
    }
    expandableButton.addEventListener('click', e => {
      if (!expandable.classList.contains('is-open')) {
        closeAllExpandables(expandable);
        expandableContent.removeAttribute('tabindex');
      } else {
        expandableContent.setAttribute('tabindex', '-1');
      }

      expandable.classList.toggle('is-open');
      expandableButton.setAttribute(
        'aria-expanded',
        expandableButton.getAttribute('aria-expanded') == 'true' ? false : true
      );
    });
    expandableButton.addEventListener('keydown', e => {
      if (!e.repeat) {
        if (e.key == 'Enter') {
          if (!expandable.classList.contains('is-open')) {
            closeAllExpandables(expandable);
            expandableContent.removeAttribute('tabindex');
          } else {
            expandableContent.setAttribute('tabindex', '-1');
          }

          if (expandable.classList.contains('is-selectable')) {
            const radioButton = expandableButton.parentElement.querySelector('input[type=radio]');

            radioButton.checked = radioButton.checked ? false : true;
          }

          expandable.classList.toggle('is-open');
          expandableButton.setAttribute(
            'aria-expanded',
            expandableButton.getAttribute('aria-expanded') == 'true' ? false : true
          );
        }
      }
    });
  });
};
