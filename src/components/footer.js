import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Footer = ({ fullPage = true }) => {
  const _footer_class_names = cx('if global-footer minimal', {
    frontpage: fullPage
  });
  const _container_class_names = cx('if', {
    container: fullPage,
    'documentation-container': !fullPage
  });

  return (
    <footer className={_footer_class_names}>
      <div className={_container_class_names}>
        <div className="if global-footer-links brand">
          <ul className="if">
            <li className="if">
              <a className="if logo global-footer-logo" href="/">
                <span className="if axe sr-only">Home</span>
              </a>
            </li>
            <li className="if">
              <a className="if" href="/changelog">
                Changelog
              </a>
            </li>
            <li className="if">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="if external-link"
                href="https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_3968634861?context=%7b%22subEntityId%22:null%2c%22channelId%22:%2219:5653139ad54d4f06b340907b42f35aeb%40thread.skype%22%7d&groupId=5f5dd61d-c19e-437a-9f65-721db7ef30b7&tenantId=de7e7a67-ae61-49d2-97a7-526c910ad675">
                Design board<span className="if axe sr-only">, Opens in new window</span>
              </a>
            </li>
          </ul>
          <ul className="if">
            <li className="if">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.if-insurance.com/about-the-website/cookies"
                className="if external-link">
                Cookie policy<span className="if axe sr-only">, Opens in new window</span>
              </a>
            </li>
            <li className="if">
              <a href="#" className="if" id="noat-cookie-consent__setup">
                Cookie Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  fullPage: PropTypes.bool
};

export default Footer;
