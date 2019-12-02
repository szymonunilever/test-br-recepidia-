import cx from 'classnames';
import sortBy from 'lodash/sortBy';
import React from 'react';
import { TagName, Text } from '../Text';
import { RecipeCookingMethodProps } from './models';
import theme from './RecipeCookingMethod.module.scss';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

export const RecipeCookingMethod = ({
  className,
  content,
  content: { title = undefined, subtitle = undefined },
  methodList = [],
  titleLevel = 2,
}: RecipeCookingMethodProps) => {
  const classWrapper = cx(theme.recipeCookingMethod, className);
  const list = sortBy(methodList, ['position']);

  const Title = title ? (
    <Text
      className={cx(
        theme.recipeCookingMethod__title,
        'recipe-cooking-method__title'
      )}
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;
  const Subtitle = subtitle ? (
    <Text
      className={cx(
        theme.recipeCookingMethod__subtitle,
        'recipe-cooking-method__subtitle'
      )}
      // @ts-ignore
      tag={TagName[`h${titleLevel + 1}`]}
      text={subtitle}
    />
  ) : null;

  const items = list
    .filter(item => item.list.length)
    .map((method, index, filteredList) => (
      <dl
        key={index}
        className={cx(theme.cookingMethods__group, 'cooking-methods__group')}
      >
        {filteredList.length > 1 ? (
          <dt
            className={cx(
              theme.cookingMethods__groupTitle,
              'cooking-methods__group-title'
            )}
          >
            {method.title}
          </dt>
        ) : null}
        {method.list.map((item, key) => (
          <dd
            key={key}
            className={cx(
              theme.cookingMethods__groupItem,
              'cooking-methods__group-item'
            )}
          >
            {item.description}
          </dd>
        ))}
      </dl>
    ));

  return (
    <div
      className={classWrapper}
      {...getComponentDataAttrs('recipeCookingMethod', content)}
    >
      {Title}
      {Subtitle}
      <div className={cx(theme.cookingMethods, 'cooking-methods')}>{items}</div>
    </div>
  );
};

export default RecipeCookingMethod;
