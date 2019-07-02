import React from 'react';
import cx from 'classnames';
import { RecipeHeroProps } from './models';
import theme from './RecipeHero.module.scss';
import AdaptiveImage from '../AdaptiveImage';

const RecipeHero = ({
  content,
  imagePlaceholder,
  className,
}: RecipeHeroProps) => {
  const containerStyles = cx('recipe-hero', className, theme.container);
  const imageStyles = cx('recipe-hero__image', theme.image);

  return (
    <div data-componentname="recipe-hero" className={containerStyles}>
      <div className={imageStyles}>
        {content.localImage ? (
          <AdaptiveImage localImage={content.localImage} alt={content.title} />
        ) : (
          <AdaptiveImage localImage={imagePlaceholder} alt={content.title} />
        )}
      </div>
    </div>
  );
};

export default RecipeHero;
