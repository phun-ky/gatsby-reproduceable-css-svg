const helpers = require('./helpers');

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const { createFilePath } = require('gatsby-source-filesystem');
const getBasePath = collection => {
  if (collection === 'blog') {
    return 'content';
  } else {
    return 'src/docs';
  }
};
const getSlug = (node, getNode, collection) => {
  const basePath = getBasePath(collection);

  return createFilePath({ node, getNode, basePath, trailingSlash: false });
};

module.exports = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  let collection;

  if (node.fileAbsolutePath && node.internal.type == 'MarkdownRemark') {
    collection = getNode(node.parent).sourceInstanceName;

    const { id, children, fields, parent, internal, frontmatter, excerpt, fileAbsolutePath } = node;
    const _is_changelog =
      (collection == 'docs' || collection == 'javascript' || collection == 'webcomponents') &&
      fileAbsolutePath.indexOf('CHANGELOG.md') !== -1;

    if (_is_changelog) {
      let _custom_path;
      let _title;
      let _component_name;

      if (fileAbsolutePath && fileAbsolutePath.indexOf('CHANGELOG.md') !== -1 && collection === 'docs') {
        _component_name = fileAbsolutePath.replace('/CHANGELOG.md', '').split('/').reverse()[0];
        _title = _component_name.capitalize();
        _custom_path = `${helpers.getDocPath(_component_name)}/${_component_name}/css`;
      } else if (fileAbsolutePath && fileAbsolutePath.indexOf('CHANGELOG.md') !== -1 && collection === 'javascript') {
        _component_name = fileAbsolutePath.replace('/CHANGELOG.md', '').split('/').reverse()[0];
        _title = _component_name.capitalize();
        _custom_path = `${helpers.getDocPath(_component_name)}/${_component_name}/js`;
      } else if (
        fileAbsolutePath &&
        fileAbsolutePath.indexOf('CHANGELOG.md') !== -1 &&
        collection === 'webcomponents'
      ) {
        _component_name = fileAbsolutePath.replace('/CHANGELOG.md', '').split('/').reverse()[0];
        _title = _component_name.capitalize();
        _custom_path = `${helpers.getDocPath(_component_name)}/${_component_name}/webcomponent`;
      }

      createNodeField({
        node,
        name: 'collection',
        value: collection
      });
      createNodeField({
        node,
        name: 'slug',
        value: `${_custom_path}`
      });
      createNodeField({
        node,
        name: 'customPath',
        value: `${_custom_path}`
      });
      createNodeField({
        node,
        name: 'title',
        value: `${_title}`
      });
    }
  }
  //

  // no type will hit this..
  if (node.internal.type === 'MarkdownRemark') {
    collection = getNode(node.parent).sourceInstanceName;

    const slug = getSlug(node, getNode, collection);

    createNodeField({
      node,
      name: 'collection',
      value: collection
    });
    createNodeField({
      node,
      name: 'slug',
      value: `${slug}`
    });
  }
};
