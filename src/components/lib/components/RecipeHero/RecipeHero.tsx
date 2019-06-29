import React from 'react';
import cx from 'classnames';
import { RecipeHeroProps } from './models';
import Img from 'gatsby-image';
import theme from './RecipeHero.module.scss';

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
          <Img
            fluid={content.localImage.childImageSharp.fluid}
            alt={content.title}
          />
        ) : (
          <Img
            fluid={imagePlaceholder.childImageSharp.fluid}
            alt={content.title}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeHero;
