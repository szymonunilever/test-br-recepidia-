import cx from 'classnames';
import { get } from 'lodash';
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
  let view: JSX.Element | undefined;
  switch (viewType) {
    case RecipeCopyViewType.Title:
      view = (
        <RecipeCopyTitle
          title={get(recipe, 'title', '')}
          titleLevel={titleLevel}
        />
      );
      break;
    case RecipeCopyViewType.ShortTitle:
      view = (
        <RecipeCopyTitle
          className="recipe-copy-short-title"
          title={get(recipe, 'shortTitle', '')}
          titleLevel={titleLevel}
        />
      );
      break;
    case RecipeCopyViewType.Description:
      view = <RecipeCopyDescription description={get(recipe, 'description')} />;
      break;
    case RecipeCopyViewType.ShortDescription:
      view = (
        <RecipeCopyDescription
          className="recipe-copy-short-description"
          description={get(recipe, 'shortDescription', '')}
        />
      );
      break;
    case RecipeCopyViewType.Ingredients:
      view = (
        <RecipeCopyIngredients
          ingredients={get(recipe, 'ingredients')}
          titleLevel={(titleLevel + 1) as titleLevel}
          title={title}
          subtitle={subtitle}
        />
      );
      break;
  }
  return <div className={classWrapper}>{view}</div>;
};

export default RecipeCopy;
