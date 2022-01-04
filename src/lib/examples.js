export const fixScaledExamples = () => {
  document
    .querySelectorAll(
      '.if.type.full > .if.example, .if.anatomy.full > .if.example, .if.code-example.full > .if.example'
    )
    .forEach(example => {
      const parent = example.parentElement;
      const div = parent.querySelector('.if.example > div');

      if (!div) return;

      example.style.padding = '5rem';

      example.style.height = `${div.getBoundingClientRect().height + 160}px`;
    });
};

export const revertScaledExamples = () => {
  document
    .querySelectorAll(
      '.if.type.full > .if.example, .if.anatomy.full > .if.example, .if.code-example.full > .if.example'
    )
    .forEach(example => {
      const parent = example.parentElement;
      const div = parent.querySelector('.if.example > div');

      if (!div) return;

      example.style.padding = '0';

      example.style.height = 'auto';
    });
};
