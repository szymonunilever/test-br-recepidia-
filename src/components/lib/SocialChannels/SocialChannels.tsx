import React from 'react';
import cx from 'classnames';
import SocialChannel from './partials/index';

const SocialChannels = ({ className, list }: any) => {
  const classNames = cx('social-channels', className);

  return (
    <ul className={classNames} data-componentname="social-channels">
      {list.map((item: any, index: any) => (
        <SocialChannel key={index} />
      ))}
    </ul>
  );
};

export default SocialChannels;
