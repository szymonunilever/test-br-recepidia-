import React from 'react';
import cx from 'classnames';
import { RecipeHeroProps } from './models';
import theme from './RecipeHero.module.scss';
import AdaptiveImage from '../AdaptiveImage';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const RecipeHero = ({ content, className, imageSizes }: RecipeHeroProps) => {
  const containerStyles = cx('recipe-hero', className, theme.container);
  const imageStyles = cx('recipe-hero__image', theme.image);

  return (
    <div {...getComponentDataAttrs('recipe-hero')} className={containerStyles}>
      <div className={imageStyles}>
        <AdaptiveImage
          localImage={content.localImage}
          sizes={imageSizes}
          alt={content.title}
        />
      </div>
    </div>
  );
};

export default RecipeHero;
