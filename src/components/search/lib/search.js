import { Index } from 'elasticlunr';

export const getOrCreateIndex = (index, searchIndex) =>
  index
    ? index
    : // Create an elastic lunr index and hydrate with graphql query results
    Index.load(searchIndex);

export const queryOptions = {
  expand: true,
  fields: {
    title: { boost: 2, expand: true },
    componentName: { boost: 3, expand: true },
    subCategory: { boost: 1 },
    customPath: { boost: 1 },
    category: { boost: 2 },
    content: { boost: 3 },
    excerpt: { boost: 3 }
  }
};
