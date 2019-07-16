import React from 'react';
import cx from 'classnames';
import SocialChannel from './partials/index';
import { BrandSocialChannelsProps } from './models';
import { map, get } from 'lodash';

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
        const socialItem = socialItems[index];
        return (
          <SocialChannel
            key={index}
            url={get(socialItem, 'url')}
            label={displayLabel && get(socialItem, 'get')}
            icon={icon}
            attributes={{ 'aria-label': index }}
          />
        );
      })}
    </ul>
  );
};

export default BrandSocialChannels;
