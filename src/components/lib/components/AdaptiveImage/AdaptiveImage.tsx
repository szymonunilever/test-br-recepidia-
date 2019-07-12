import React from 'react';
// @ts-ignore
import Img from 'gatsby-image/withIEPolyfill';
import { AdaptiveImageProps } from './models';
import cx from 'classnames';
import WithLink from './partials/WithLink';

const AdaptiveImage = ({ className, alt, localImage }: AdaptiveImageProps) => {
  const classNames = cx('adaptive-image', className);

  return (
    <div className={classNames} data-componentname="adaptive-image">
      <Img
        className="adaptive-image__image"
        fluid={localImage.childImageSharp.fluid}
        alt={alt}
      />
    </div>
  );
};

export default WithLink(AdaptiveImage);
