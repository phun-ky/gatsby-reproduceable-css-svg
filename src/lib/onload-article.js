const onloadArticle = () => {
  document
    .querySelectorAll('article.sg.documentation > .if.block, article.sg.documentation > .if.sections > .if.block')
    .forEach(function (el) {
      el.classList.add('is-loaded');
    });
};

export default onloadArticle;
