import React, { useState, useEffect } from 'react';
// @ts-ignore
import Img from 'gatsby-image';
//fix for IE related to gatsby-image downgrade has been made with css. Polifill for IE wass not stable https://www.gatsbyjs.org/packages/gatsby-image/#polyfilling-object-fitobject-position-for-ie with downgraded version. Use following import when gatsby-image is updated.
// import Img from "gatsby-image/withIEPolyfill"
import { AdaptiveImageProps } from './models';
import cx from 'classnames';
import WithLink from './partials/WithLink';

const AdaptiveImage = ({
  className,
  alt,
  localImage,
  sizes,
}: AdaptiveImageProps) => {
  if (!localImage || !localImage.childImageSharp) {
    return <></>;
  }

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
    if (document.readyState === 'complete') {
      setDocLoaded(true);
    } else {
      window.addEventListener('load', () => {
        setDocLoaded(true);
      });
    }
  }, []);

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
