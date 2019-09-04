import React from 'react';
import { RecipeAttributeCardProps } from './models';
import theme from './RecipeAttributeCard.module.scss';
import cx from 'classnames';
const RecipeAttributeCard = ({
  className,
  Icon,
  label,
  value,
}: RecipeAttributeCardProps) => {
  const classWrapper = cx(theme.recipeAttributeCard, className);
  const title =
    label && label.title ? (
      <div className="recipe-attribute-card__label">{label.title}</div>
    ) : null;
  const units = label ? (
    typeof value == 'number' &&
    value > 1 &&
    (label.unitsPlural || label.units) ? (
      <span className="recipe-attribute-card__units">
        {label.unitsPlural || label.units}
      </span>
    ) : (
      <span className="recipe-attribute-card__units">{label.units}</span>
    )
  ) : null;

  const IconImg = Icon ? (
    <Icon
      aria-label={label && label.title}
      className="recipe-attribute-card__icon"
    />
  ) : null;

  return (
    <div className={classWrapper}>
      <div
        className={`recipe-attribute-card__item ${
          label && label.title
            ? `recipe-attribute-card__item--${label.title
                .toLocaleLowerCase()
                .replace(' ', '-')}`
            : ''
        }`}
      >
        {IconImg}
        {title}
        <div className="recipe-attribute-card__value">
          {value}
          {units}
        </div>
      </div>
    </div>
  );
};

export default RecipeAttributeCard;
