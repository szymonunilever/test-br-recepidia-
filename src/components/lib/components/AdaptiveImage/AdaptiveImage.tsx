import React, { ReactNode, useState, useEffect } from 'react';
// @ts-ignore
import Img from 'gatsby-image';
//fix for IE related to gatsby-image downgrade has been made with css. Polifill for IE wass not stable https://www.gatsbyjs.org/packages/gatsby-image/#polyfilling-object-fitobject-position-for-ie with downgraded version. Use following import when gatsby-image is updated.
// import Img from "gatsby-image/withIEPolyfill"
import { AdaptiveImageProps } from './models';
import cx from 'classnames';
import WithLink from './partials/WithLink';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const ImageContainer = ({
  classNames,
  view,
  children,
}: ImageContainerProps) => {
  return (
    <div
      className={classNames}
      {...getComponentDataAttrs('adaptive-image', { view })}
    >
      {children}
    </div>
  );
};

const AdaptiveImage = ({
  className,
  alt,
  localImage,
  sizes,
  view,
  url,
}: AdaptiveImageProps) => {
  const isSvg = localImage && localImage.ext === '.svg';

  const classNames = cx('adaptive-image', className, {
    'adaptive-image-svg': isSvg,
  });

  if (isSvg) {
    return (
      <ImageContainer classNames={classNames} view={view}>
        <img className="adaptive-image__image" src={url} alt={alt} />
      </ImageContainer>
    );
  }

  if (!localImage || !localImage.childImageSharp) {
    return <></>;
  }

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
    <ImageContainer>
      {!docLoaded ? (
        <Img className="adaptive-image__image" fluid={baseFluid} alt={alt} />
      ) : (
        <Img className="adaptive-image__image" fluid={fluid} alt={alt} />
      )}
    </ImageContainer>
  );
};

interface ImageContainerProps {
  classNames?: string;
  view?: string;
  children: ReactNode | ReactNode[];
}
export default WithLink(AdaptiveImage);
