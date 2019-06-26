import React from 'react';
import { SocialChannelProps } from './models';

const SocialChannel = ({ label, url, icon }: SocialChannelProps) => {
  const text = label ? (
    <div className="social-channels__text">{label}</div>
  ) : null;
  return (
    <li className="social-channels__item">
      <a
        className="social-channels__link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="social-channels__icon">{icon}</div>
        {text}
      </a>
    </li>
  );
};

export default SocialChannel;
