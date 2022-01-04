import React from 'react';

const contact = () => {
  const linkToTeamsChat =
    'https://teams.microsoft.com/l/team/19%3a5653139ad54d4f06b340907b42f35aeb%40thread.skype/conversations?groupId=5f5dd61d-c19e-437a-9f65-721db7ef30b7&tenantId=de7e7a67-ae61-49d2-97a7-526c910ad675';

  return (
    <a
      href={linkToTeamsChat}
      target="_blank"
      rel="noreferrer noopener"
      className="if floating-action-button customer-service u-hidden-down--sm">
      Contact us<span className="if axe sr-only">, Opens in new window</span>
    </a>
  );
};

export default contact;
