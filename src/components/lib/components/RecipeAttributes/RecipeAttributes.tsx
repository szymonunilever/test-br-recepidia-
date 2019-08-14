import React from 'react';
import cx from 'classnames';
import { get } from 'lodash';
import { RecipeAttributesKeys, RecipeAttributesProps } from './models';
import theme from './RecipeAttributes.module.scss';
import { RecipeAttributeCard } from './partials';

export const RecipeAttributes = ({
  className,
  content: { labels },
  recipe,
  visible = [
    RecipeAttributesKeys.preperationTime,
    RecipeAttributesKeys.cookTime,
    RecipeAttributesKeys.serves,
    RecipeAttributesKeys.difficulties,
  ],
  icons,
}: RecipeAttributesProps) => {
  const classWrapper = cx(theme.recipeAttributes, className);
  const view = visible.map((value, index) => {
    if (value === RecipeAttributesKeys.difficulties) {
      const difficulties = recipe.tagGroups.find(
        item => item.name === RecipeAttributesKeys[value]
      );
      const difficultyVal = get(difficulties, 'tags[0].name', '');

      return (
        <RecipeAttributeCard
          key={index}
          value={difficultyVal}
          label={labels ? labels[RecipeAttributesKeys[value]] : undefined}
          Icon={icons ? icons[RecipeAttributesKeys[value]] : undefined}
        />
      );
    } else {
      const attrValue = recipe.recipeDetails[RecipeAttributesKeys[value]];

      if (attrValue) {
        return (
          <RecipeAttributeCard
            key={index}
            value={attrValue}
            label={labels ? labels[RecipeAttributesKeys[value]] : undefined}
            Icon={icons ? icons[RecipeAttributesKeys[value]] : undefined}
          />
        );
      }
    }
  });

  return (
    <div className={classWrapper} data-componentname="recipeAttributes">
      {view}
    </div>
  );
};

export default RecipeAttributes;
