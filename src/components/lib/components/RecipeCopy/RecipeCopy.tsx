import cx from 'classnames';
import React from 'react';
import { titleLevel } from '../common/globalModels';
import { RecipeCopyProps, RecipeCopyViewType } from './models';
import {
  RecipeCopyDescription,
  RecipeCopyTitle,
  RecipeCopyIngredients,
} from './partials';
import theme from './RecipeCopy.module.scss';

export const RecipeCopy = ({
  className,
  content: { title, subtitle },
  recipe,
  titleLevel = 1,
  viewType,
}: RecipeCopyProps) => {
  const classWrapper = cx(theme.recipeCopy, className);
  let view: JSX.Element | undefined | null;
  switch (viewType) {
    case RecipeCopyViewType.Title:
      view = <RecipeCopyTitle title={recipe.title} titleLevel={titleLevel} />;
      break;
    case RecipeCopyViewType.ShortTitle:
      view = recipe.shortTitle ? (
        <RecipeCopyTitle
          className="recipe-copy-short-title"
          title={recipe.shortTitle}
          titleLevel={titleLevel}
        />
      ) : null;
      break;
    case RecipeCopyViewType.Description:
      view = <RecipeCopyDescription description={recipe.description} />;
      break;
    case RecipeCopyViewType.ShortDescription:
      view = recipe.shortDescription ? (
        <RecipeCopyDescription
          className="recipe-copy-short-description"
          description={recipe.shortDescription}
        />
      ) : null;
      break;
    case RecipeCopyViewType.Ingredients:
      view = (
        <RecipeCopyIngredients
          ingredients={recipe.ingredients}
          titleLevel={(titleLevel + 1) as titleLevel}
          title={title}
          subtitle={subtitle}
        />
      );
      break;
  }
  return (
    <div className={classWrapper} data-componentname="recipeCopy">
      {view}
    </div>
  );
};

export default RecipeCopy;
