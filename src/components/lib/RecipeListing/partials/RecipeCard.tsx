import cx from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { Favorite } from '../../../common/Favorite';
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
  const wrapClasses = cx(theme.recipeCard, className);
  const resultView = enableSelectFavorite ? (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Favorite
        className="recipeCard-favorite"
        icon={<Icon />}
        isSelected={inFavorite}
        onChange={onFavoriteToggle}
      />
      <Img className="recipeCard-image" fluid={imgObject} alt={title} />
      <div className="recipeCard-title">{title}</div>
    </Link>
  ) : (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Img className="recipeCard-image" fluid={imgObject} alt={title} />
      <div className="recipeCard-title">{title}</div>
    </Link>
  );
  return <>{resultView} </>;
};

export default RecipeCard;
