import cx from 'classnames';
import React from 'react';
import { Link } from 'gatsby';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { Favorite } from '../../../common/Favorite';
import { RecipeCardProps } from './models';
// @ts-ignore
import theme from './RecipeCard.module.scss';

const RecipeCard = ({
  title,
  recipeImgPath,
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
  const wrapClasses = cx(theme.recipeCard, className);
  const resultView = enableSelectFavorite ? (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Favorite
        className="recipeCard-favorite"
        icon={<Icon />}
        isSelected={inFavorite}
        onChange={onFavoriteToggle}
      />
      <img
        className="recipeCard-image"
        title={title}
        alt={title}
        src={recipeImgPath}
      />
      <div className="recipeCard-title">{title}</div>
    </Link>
  ) : (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <img
        className="recipeCard-image"
        title={title}
        alt={title}
        src={recipeImgPath}
      />
      <div className="recipeCard-title">{title}</div>
    </Link>
  );
  return <>{resultView} </>;
};

export default RecipeCard;
