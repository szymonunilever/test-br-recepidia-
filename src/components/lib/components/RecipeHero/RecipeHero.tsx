import React from 'react';
import cx from 'classnames';
import { RecipeHeroProps } from './models';

const RecipeHero = ({
  content: { title, description, recipeDetails },
  viewType,
  className,
}: RecipeHeroProps) => {
  const classNames = cx('recipe-hero', className);

  let view = (
    <div className={classNames} data-componentname="recipe-hero">
      <div className={`recipe-hero__image-wrap`}>
        <div className={`recipe-hero__actions`}> </div>
      </div>
      <div className={`recipe-hero__content`}>
        <h3 className={`recipe-hero__title`}>{title}</h3>
        <div className={`recipe-hero__reviews`}>****</div>
        <div className={`recipe-hero__icon-info`}> recipeDetails </div>
        <p className={`recipe-hero__description`}>{description}</p>
      </div>
    </div>
  );

  if (viewType === 'video') {
    view = <div className={viewType}>{view}</div>;
  }

  if (viewType === 'carousel') {
    view = <div className={viewType}>{view}</div>;
  }

  return view;
};

export default RecipeHero;
