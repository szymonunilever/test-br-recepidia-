import cx from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { Button, ButtonViewType } from '../../../common/Button';
import { RecipeCardProps } from './models';
import theme from './RecipeCard.module.scss';

const RecipeCard = ({
  title,
  imgObject,
  enableSelectFavorite,
  slug,
  className = '',
  inFavorite = false,
  onFavoriteChange,
}: RecipeCardProps) => {
  const onFavoriteToggle = (val: boolean) => {
    if (typeof onFavoriteChange !== 'undefined') {
      onFavoriteChange(val);
    }
  };
  const wrapClasses = cx(theme['recipe-card'], className);
  const resultView = enableSelectFavorite ? (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Button
        className="recipe-card__favorite"
        icon={<Icon />}
        isSelected={inFavorite}
        onClick={onFavoriteToggle}
        isToggle={true}
        viewType={ButtonViewType.icon}
      />
      <Img className="recipe-card__image" fluid={imgObject} alt={title} />
      <div className="recipe-card__title">{title}</div>
    </Link>
  ) : (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Img className="recipe-card__image" fluid={imgObject} alt={title} />
      <div className="recipe-card__title">{title}</div>
    </Link>
  );
  return <>{resultView} </>;
};

export default RecipeCard;
