export const getHeadings = node =>
  !node
    ? []
    : Array.from(node.querySelectorAll('h2.sg.if.heading:not(.toc)')).filter(
      heading => heading.nodeName == 'H2' && !heading.closest('.is-changelog')
    );
