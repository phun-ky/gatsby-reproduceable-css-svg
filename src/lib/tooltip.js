const fixAbbr = () => {
  const onMouseEnter = e => {
    const abbr = e.target;
    const _title = abbr.getAttribute('title');
    if (_title && _title !== null && _title !== '') {
      abbr.setAttribute('data-tooltip', _title);
      abbr.removeAttribute('title');
    }
  };

  const onMouseLeave = e => {
    const abbr = e.target;
    const _tooltip = abbr.getAttribute('data-tooltip');
    if (_tooltip && _tooltip !== null && _tooltip !== '') {
      abbr.setAttribute('title', _tooltip);
    }
  };

  document.querySelectorAll('abbr').forEach(abbr => {
    abbr.removeEventListener('mouseenter', onMouseEnter);
    abbr.removeEventListener('mouseleave', onMouseLeave);
    abbr.addEventListener('mouseenter', onMouseEnter);
    abbr.addEventListener('mouseleave', onMouseLeave);
  });
};

export default fixAbbr;
