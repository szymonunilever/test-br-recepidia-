import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image/withIEPolyfill';
import { AdaptiveImageProps } from './models';
import cx from 'classnames';
import WithLink from './partials/WithLink';

const AdaptiveImage = ({
  className,
  alt,
  localImage,
  sizes,
}: AdaptiveImageProps) => {
  const classNames = cx('adaptive-image', className);

  const [docLoaded, setDocLoaded] = useState(false);

  let fluid = { ...localImage.childImageSharp.fluid };
  if (sizes) {
    fluid.sizes = sizes;
  }

  const baseFluid = { ...fluid };
  baseFluid.src = '';
  baseFluid.srcSet = '';
  baseFluid.srcWebp = '';
  baseFluid.srcSetWebp = '';

  useEffect(() => {
    window.addEventListener('load', () => {
      setDocLoaded(true);
    });

    if (document.readyState === 'complete') {
      setDocLoaded(true);
    }
  });

  return (
    <div className={classNames} data-componentname="adaptive-image">
      {!docLoaded ? (
        <Img className="adaptive-image__image" fluid={baseFluid} alt={alt} />
      ) : (
        <Img className="adaptive-image__image" fluid={fluid} alt={alt} />
      )}
    </div>
  );
};

export default WithLink(AdaptiveImage);
