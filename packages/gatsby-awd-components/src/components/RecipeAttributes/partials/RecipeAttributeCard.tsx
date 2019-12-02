import React from 'react';
import { RecipeAttributeCardProps } from './models';
import theme from './RecipeAttributeCard.module.scss';
import cx from 'classnames';
const RecipeAttributeCard = ({
  className,
  Icon,
  label,
  value,
  type,
}: RecipeAttributeCardProps) => {
  const classWrapper = cx(
    theme.recipeAttributeCard,
    'recipe-attribute-card',
    className
  );
  const title =
    label && label.title ? (
      <div
        className={cx(
          theme.recipeAttributeCard__label,
          'recipe-attribute-card__label'
        )}
      >
        {label.title}
      </div>
    ) : null;
  const units = label ? (
    typeof value == 'number' &&
    value > 1 &&
    (label.unitsPlural || label.units) ? (
      <span
        className={cx(
          theme.recipeAttributeCard__units,
          'recipe-attribute-card__units'
        )}
      >
        {label.unitsPlural || label.units}
      </span>
    ) : (
      <span
        className={cx(
          theme.recipeAttributeCard__units,
          'recipe-attribute-card__units'
        )}
      >
        {label.units}
      </span>
    )
  ) : null;

  const IconImg = Icon ? (
    <Icon
      aria-label={label && label.title}
      className={cx(
        theme.recipeAttributeCard__icon,
        'recipe-attribute-card__icon'
      )}
    />
  ) : null;

  return (
    <div className={classWrapper}>
      <div
        className={cx(
          theme.recipeAttributeCard__item,
          `recipe-attribute-card__item ${
            type
              ? `recipe-attribute-card__item--${type
                  .split(/\s+|_+|(?=[A-Z])/)
                  .join('-')
                  .toLowerCase()}`
              : ''
          }`
        )}
      >
        {IconImg}
        {title}
        <div
          className={cx(
            theme.recipeAttributeCard__value,
            'recipe-attribute-card__value'
          )}
        >
          {value}
          {units}
        </div>
      </div>
    </div>
  );
};

export default RecipeAttributeCard;
