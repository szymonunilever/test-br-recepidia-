import React from 'react';
import { SocialChannelProps } from './models';
import cx from 'classnames';
import theme from './SocialChannel.module.scss';

const SocialChannel = ({
  label,
  url,
  icon,
  attributes = {},
}: SocialChannelProps) => {
  const text = label ? (
    <div className={cx(theme.socialChannels__text, 'social-channels__text')}>
      {label}
    </div>
  ) : null;

  const test = cx(theme.socialChannels__item, 'social-channels__item');
  return (
    <li className={test}>
      <a
        className={cx(theme.socialChannels__link, 'social-channels__link')}
        href={url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        {...attributes}
      >
        <div
          className={cx(theme.socialChannels__icon, 'social-channels__icon')}
        >
          {icon}
        </div>
        {text}
      </a>
    </li>
  );
};

export default SocialChannel;
