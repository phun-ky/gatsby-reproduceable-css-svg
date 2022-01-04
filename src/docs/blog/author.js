import React from 'react';
import crypto from 'crypto-js';

const Author = ({ author, authorEmail = '' }) => {
  if (!author || (author && typeof author !== 'string')) return null;

  let emailHash;
  let avatarURL;
  if (authorEmail && typeof authorEmail === 'string' && authorEmail.length !== 0) {
    emailHash = crypto.MD5(authorEmail.toLowerCase()).toString();
    avatarURL = `https://www.gravatar.com/avatar/${emailHash}`;
  }

  return (
    <>
      <hr className="if" />
      <div className="if authorContainer">
        <span
          className="if avatar large"
          style={{
            backgroundImage: `url(${avatarURL})`
          }}></span>
        <div className="if meta">
          <span className="if title">Author</span>
          <span className="if authorName">{author}</span>
        </div>
      </div>
    </>
  );
};

export default Author;
