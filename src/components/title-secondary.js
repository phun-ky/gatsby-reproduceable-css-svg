import React from 'react';
import PropTypes from 'prop-types';

import { generateTitleAnchorId } from '../lib/helpers';

const SecondaryTitle = ({ frontmatter, fields, changelog, titleClassNames }) => {
  let _custom_path = frontmatter.customPath;
  let _title = frontmatter.title;

  if (changelog) {
    _custom_path = fields.customPath;
    _title = 'Changelog';
  }

  const _title_el_id = generateTitleAnchorId({ customPath: _custom_path, title: _title });

  return (
    <h2 id={_title_el_id} className={titleClassNames} style={{ position: 'relative' }}>
      <a href={`#${_title_el_id}`} aria-label={`${_title} permalink`} className="anchor before"></a>
      {_title}
    </h2>
  );
};

SecondaryTitle.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    customPath: PropTypes.string,
    fileAbsolutePath: PropTypes.string
  }),
  fields: PropTypes.shape({
    customPath: PropTypes.string
  }),
  editLink: PropTypes.string,
  titleClassNames: PropTypes.string,
  changelog: PropTypes.bool,
  fileAbsolutePath: PropTypes.string
};

export default SecondaryTitle;
