import React from 'react';
import cx from 'classnames';
import { ProductHeroProps } from './models';
import theme from './ProductHero.module.scss';
import AdaptiveImage from '../AdaptiveImage';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const ProductHero = ({ content, className, imageSizes, localImage}: ProductHeroProps) => {
  const containerStyles = cx(theme.ProductHero, 'product-hero', className);
  const imageStyles = cx(theme.ProductHero__image, 'product-hero__image');
  const title =
    content.productName.split(' ').length > 1
      ? content.productName
      : `Product: ${content.productName}`;

  return (
    <div {...getComponentDataAttrs('product-hero')} className={containerStyles}>
      <div className={imageStyles}>
        <AdaptiveImage
          localImage={content.localImage || localImage}
          sizes={imageSizes}
          alt={title}
        />
      </div>
    </div>
  );
};

export default ProductHero;
