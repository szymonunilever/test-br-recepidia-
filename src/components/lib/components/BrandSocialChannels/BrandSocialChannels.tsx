import React from 'react';
import cx from 'classnames';
import SocialChannel from './partials/index';
import { BrandSocialChannelsProps } from './models';
import { map } from 'lodash';

const BrandSocialChannels = ({
  listIcons,
  content: { socialItems },
  className,
  displayLabel = false,
}: BrandSocialChannelsProps) => {
  const classNames = cx('social-channels', className);

  return (
    <ul className={classNames} data-componentname="social-channels">
      {map(listIcons, (icon, index) => {
        return (
          <SocialChannel
            key={index}
            url={socialItems[index].url}
            label={displayLabel && socialItems[index].label}
            icon={icon}
          />
        );
      })}
    </ul>
  );
};

export default BrandSocialChannels;
