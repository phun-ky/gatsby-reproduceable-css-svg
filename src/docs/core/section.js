import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import cx from 'classnames';

import { generateID } from '../../lib/helpers';
import { getComponentPackage } from '../../lib/helpers';

import Title from '../../components/title';
import EditLink from '../../components/editLink';
import NoDocumentationFound from '../../components/NoDocumentationFound';
import PageNavigationMobile from '../../components/toc/TableOfContentsMobile';
import ParagraphLead from '../../components/ParagraphLead';

const Section = ({ edges, fullPage, edge, pkg /*wide*/ }) => {
  const { node } = edge;
  const { fields = {}, fileAbsolutePath, frontmatter, html, body } = node;
  const { collection = '' } = fields;
  const { order, componentName, customPath, title, editLink } = frontmatter;
  const _is_changelog = fileAbsolutePath && fileAbsolutePath.indexOf('CHANGELOG.md') !== -1;

  let _custom_path = customPath;
  let _title = title;
  let _documentation_body = <div className="if" dangerouslySetInnerHTML={{ __html: html }} />;

  if (_is_changelog) {
    _custom_path = fields.customPath;
    _title = 'Changelog';
  }

  // const _custom_wide =_custom_path === '/resources/status' || (_custom_path === '/design-tokens/microcopy' && _title == 'Tokens');
  const _id = generateID(_custom_path, _title);
  const _component_package = getComponentPackage(componentName, pkg);
  const _is_first_section_of_component = !!componentName && _component_package && order === 1;
  const _is_missing_documentation = !body && html.length === 0 && !_is_first_section_of_component;

  if (_is_missing_documentation) {
    _documentation_body = <NoDocumentationFound path={fileAbsolutePath} link={editLink} />;
  } else if (body) {
    _documentation_body = <MDXRenderer>{body}</MDXRenderer>;
  }

  const _section_class_names = cx('sg if block poc', {
    'is-changelog': _is_changelog
  });

  /* @todo Remove this when a "page" template is ready to be used, */
  if ((fullPage && order === 1) || customPath === '/develop/guidelines' || customPath === '/design/guidelines') {
    return (
      <section className="if hero" style={{ minHeight: 0 }}>
        <div className="if documentation-container container">
          <div className="if content">
            <Title
              collection={collection}
              frontmatter={frontmatter}
              fields={fields}
              fullPage={fullPage}
              pkg={_component_package}
              editLink={editLink}
              fileAbsolutePath={fileAbsolutePath}
            />
            {_documentation_body}
          </div>
          <div className="if image studio" style={{ backgroundImage: 'url(/images/creative.png)' }}></div>
        </div>
      </section>
    );
  }

  return (
    <div className={_section_class_names} id={_id}>
      <div className="if documentation-container">
        {!!customPath && _is_first_section_of_component && (
          <a
            href="#"
            role="button"
            onClick={e => {
              e.preventDefault();
              history.back();

              return false;
            }}
            className="if back-to-link u-hidden-up--md"
            style={{ marginBottom: '2rem', display: 'inline-block' }}>
            Back to components
          </a>
        )}

        <Title
          collection={collection}
          frontmatter={frontmatter}
          fields={fields}
          pkg={_component_package}
          editLink={editLink}
          fileAbsolutePath={fileAbsolutePath}
        />
        {_is_first_section_of_component && (
          <div className="if text layout column left">
            <div className="if text body">
              <ParagraphLead>{_component_package.description}</ParagraphLead>
            </div>
          </div>
        )}
        {_documentation_body}
        {order === 1 && <PageNavigationMobile edges={edges} />}
        <EditLink path={fileAbsolutePath} editLink={editLink} />
      </div>
    </div>
  );
};

export default Section;

Section.propTypes = {
  fullPage: PropTypes.bool,
  wide: PropTypes.bool,
  edges: PropTypes.array,
  edge: PropTypes.shape(),
  pkg: PropTypes.shape()
};
