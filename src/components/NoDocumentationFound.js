import React from 'react';
import PropTypes from 'prop-types';

import EditLink from './editLink';
import EmptyState from './EmptyState';

const NoDocumentationFound = ({ path, link }) => {
  return (
    <EmptyState>
      <p className="if text body">
        There is currently no documentation for this section yet.{' '}
        <span className="if axe sr-only">However, there might be some more documentation after this section.</span>
        <br />
        <a
          href="https://teams.microsoft.com/l/team/19%3a5653139ad54d4f06b340907b42f35aeb%40thread.skype/conversations?groupId=5f5dd61d-c19e-437a-9f65-721db7ef30b7&tenantId=de7e7a67-ae61-49d2-97a7-526c910ad675"
          target="_blank"
          rel="noreferrer noopener"
          className="if">
          Contact the Design System team<span className="if axe sr-only">, Opens in new window</span>
        </a>{' '}
        for questions.
      </p>
      <p className="if text body">
        If you want to contribute, you can also{' '}
        <EditLink path={path} editLink={link}>
          add the documentation yourself!
        </EditLink>
      </p>
    </EmptyState>
  );
};

export default NoDocumentationFound;

NoDocumentationFound.propTypes = {
  link: PropTypes.string,
  path: PropTypes.string.isRequired
};
