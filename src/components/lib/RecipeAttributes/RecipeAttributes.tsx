import cx from 'classnames';
import React from 'react';
import { RecipeAttributesKeys, RecipeAttributesProps } from './models';
import theme from './RecipeAttributes.module.scss';
import { RecipeAttributeCard } from './partials';

const RecipeAttributes = ({
  className,
  content: { labels },
  recipe,
  visible = [
    RecipeAttributesKeys.preparationTime,
    RecipeAttributesKeys.cookingTime,
    RecipeAttributesKeys.serves,
    RecipeAttributesKeys.difficulties,
  ],
  icons,
}: RecipeAttributesProps) => {
  const classWrapper = cx(theme.recipeAttributes, className);
  const view = visible.map((value, index) => {
    if (value === RecipeAttributesKeys.difficulties) {
      const difficulties = recipe.categories.find(
        item => item.name === RecipeAttributesKeys[value]
      );
      const difficultyVal = difficulties ? difficulties.tags[0].name : '';
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
            value={attrValue}
            label={labels ? labels[RecipeAttributesKeys[value]] : undefined}
            Icon={icons ? icons[RecipeAttributesKeys[value]] : undefined}
          />
        );
      }
    }
  });

  return <div className={classWrapper}>{view}</div>;
};

export default RecipeAttributes;
