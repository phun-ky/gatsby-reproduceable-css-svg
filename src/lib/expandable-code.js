const wrapCode = () => {
  const codeElements = document.querySelectorAll(
    '.gatsby-highlight:not(.wrapped):not([data-language="diff"]):not([data-language="svg"])'
  );
  codeElements.forEach(el => {
    el.classList.add('wrapped');
  });
};

export default wrapCode;
