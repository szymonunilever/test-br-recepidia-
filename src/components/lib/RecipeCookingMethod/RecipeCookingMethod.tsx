import cx from 'classnames';
import { sortBy } from 'lodash';
import React from 'react';
import { TagName, Text } from '../Text';
import { RecipeCookingMethodProps } from './models';
import theme from './RecipeCookingMethod.module.scss';

const RecipeCookingMethod = ({
  className,
  content: { title = undefined, subtitle = undefined },
  methodList = [],
  titleLevel = 1,
}: RecipeCookingMethodProps) => {
  const classWrapper = cx(theme.recipeCookingMethod, className);
  const list = sortBy(methodList, ['position']);

  const Title = title ? (
    <Text
      className="recipe-cooking-method__title"
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;
  const Subtitle = subtitle ? (
    <Text
      className="recipe-cooking-method__subtitle"
      // @ts-ignore
      tag={TagName[`h${titleLevel + 1}`]}
      text={subtitle}
    />
  ) : null;
  return (
    <div className={classWrapper}>
      {Title}
      {Subtitle}
      <ol className="recipe-cooking-method__list">
        {list.map((item: RMSData.CookingMethod) => (
          <li key={item.position} className="recipe-cooking-method__item">
            {item.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeCookingMethod;
