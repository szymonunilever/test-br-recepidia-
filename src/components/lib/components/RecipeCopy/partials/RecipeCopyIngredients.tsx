import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { RecipeCopyIngredientsProps } from './models';
import theme from './RecipeCopyIngredients.module.scss';
import getComponentDataAttrs from 'src/components/lib/utils/getComponentDataAttrs';

export const RecipeCopyIngredients = ({
  className,
  title,
  subtitle,
  ingredients,
  titleLevel = 2,
}: RecipeCopyIngredientsProps) => {
  const classWrapper = cx(theme.recipeCopyIngredients, className);
  // @ts-ignore
  const titleTag = TagName[`h${titleLevel}`];
  // @ts-ignore
  const subtitleTag = TagName[`h${titleLevel + 1}`];
  const Title = title ? (
    <Text
      className="recipe-copy-ingredients__title"
      tag={titleTag}
      text={title}
    />
  ) : null;
  const Subtitle = subtitle ? (
    <Text
      className="recipe-copy-ingredients__subtitle"
      tag={subtitleTag}
      text={subtitle}
    />
  ) : null;

  const items = ingredients
    .filter(ingredientGroup => ingredientGroup.list.length)
    .map((ingredientGroup, index, filteredIngredientGroups) => (
      <dl key={index} className="recipe-ingredients__group">
        {filteredIngredientGroups.length > 1 ? (
          <dt className="recipe-ingredients__group-title">
            {ingredientGroup.title}
          </dt>
        ) : null}
        {ingredientGroup.list.map((groupItem, key) => (
          <dd key={key} className="recipe-ingredients__group-item">
            {groupItem.description}
          </dd>
        ))}
      </dl>
    ));

  return (
    <div
      className={classWrapper}
      {...getComponentDataAttrs('recipeCopyIngredients')}
    >
      {Title}
      {Subtitle}
      <div className="recipe-ingredients">{items}</div>
    </div>
  );
};
