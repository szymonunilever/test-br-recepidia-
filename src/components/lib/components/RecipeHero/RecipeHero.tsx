import React from 'react';
import cx from 'classnames';
import { RecipeHeroProps } from './models';
import Img from 'gatsby-image';
import theme from './RecipeHero.module.scss';
import { get } from 'lodash';

const RecipeHero = (props: RecipeHeroProps) => {
  const containerStyles = cx('recipe-hero', props.className, theme.container);
  const imageStyles = cx('recipe-hero__image', theme.image);
  const image = get(props, 'content.image');
  const imagePlaceholder = get(props, 'content.imagePlaceholder');

  return (
    <div data-componentname="recipe-hero" className={containerStyles}>
      <div className={imageStyles}>
        {image ? (
          <Img fluid={image.localImage.childImageSharp.fluid} alt={image.alt} />
        ) : (
          <Img
            fluid={imagePlaceholder.localImage.childImageSharp.fluid}
            alt={imagePlaceholder.alt}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeHero;
