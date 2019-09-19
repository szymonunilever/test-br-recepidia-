import React from 'react';
import cx from 'classnames';
import SocialChannel from './partials/index';
import { BrandSocialChannelsProps } from './models';
import map from 'lodash/map';
import get from 'lodash/get';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const BrandSocialChannels = ({
  listIcons,
  content,
  content: { socialItems },
  className,
  displayLabel = false,
}: BrandSocialChannelsProps) => {
  const classNames = cx('social-channels', className);

  return (
    <ul
      className={classNames}
      {...getComponentDataAttrs('social-channels', content)}
    >
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
