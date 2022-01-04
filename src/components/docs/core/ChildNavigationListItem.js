import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import RadialCardOverlay from '../../decorators/RadialCardOverlay';

const ChildNavigationListItem = ({ title, url }) => {
  const _is_green_card = url.indexOf('contribute') !== -1;
  const _card_class_name = cx('if navigational-card text box', {
    green: _is_green_card
  });

  return (
    <li className="if">
      <a href={url} className={_card_class_name}>
        {_is_green_card && <RadialCardOverlay />}
        <span className="if icon symbol love"></span>
        <span className="if title">{title}</span>
      </a>
    </li>
  );
};

export default ChildNavigationListItem;

ChildNavigationListItem.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string
};
