import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { RecipeCopyIngredientsProps } from './models';
import theme from './RecipeCopyIngredients.module.scss';

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

  const items = ingredients.map((item, key) => (
    <li key={key} className="recipe-copy-ingredients__item">
      {item.description}
    </li>
  ));

  return (
    <div className={classWrapper}>
      {Title}
      {Subtitle}
      <ul className="recipe-copy-ingredients__list">{items}</ul>
    </div>
  );
};
