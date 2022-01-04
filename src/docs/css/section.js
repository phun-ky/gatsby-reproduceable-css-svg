import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import cx from 'classnames';

import { generateID } from '../../lib/helpers';
import { getComponentPackage } from '../../lib/helpers';

import Title from '../../components/title';
import EditLink from '../../components/editLink';

import PackageInstall from '../../components/packageInstall';
import PageNavigationMobile from '../../components/toc/TableOfContentsMobile';
import LinkBackToGuidelines from '../../components/LinkBackToGuidelines';
import NoDocumentationFound from '../../components/NoDocumentationFound';

import PreFirstSection from './PreFirstSection';

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

  const _id = generateID(_custom_path, _title);
  const _component_package = getComponentPackage(componentName, pkg);
  const _is_first_section_of_component = !!componentName && _component_package && order === 1;
  const _is_css_only_package =
    customPath == '/components/layout/breakpoint/css' ||
    customPath == '/components/text/typography/css' ||
    customPath == '/components/utils/css' ||
    customPath == '/components/color/css' ||
    customPath == '/components/media/icons/css';
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
  if (fullPage && order === 1) {
    return (
      <section className="if hero">
        <div className="if container">
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
        <LinkBackToGuidelines
          title={title}
          show={!!customPath && _is_first_section_of_component && !_is_css_only_package}
          to={customPath ? customPath.replace('/css', '') : '/'}
        />
        <Title
          collection={collection}
          frontmatter={frontmatter}
          fields={fields}
          scope="ids-core"
          isCSSPackage={true}
          pkg={_component_package}
          editLink={editLink}
          fileAbsolutePath={fileAbsolutePath}
        />
        <PreFirstSection show={_is_first_section_of_component} pkg={_component_package} componentName={componentName} />
        {order === 1 && <PackageInstall scope="ids-core" name={componentName} pkg={_component_package} />}
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
  edges: PropTypes.arrayOf(PropTypes.shape({})),
  edge: PropTypes.shape(),
  pkg: PropTypes.shape({})
};
