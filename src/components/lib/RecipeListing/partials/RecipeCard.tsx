import cx from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { TagName, Text } from '../../Text';
import { Button, ButtonViewType } from '../../common/Button';
import { RecipeCardProps } from './models';
import theme from './RecipeCard.module.scss';

const RecipeCard = ({
  id,
  content: { title },
  imgObject,
  Icon,
  enableSelectFavorite = false,
  titleLevel = 3,
  slug,
  className = '',
  inFavorite = false,
  onFavoriteChange,
}: RecipeCardProps) => {
  const itemTitle = title ? (
    <Text
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
      className="recipe-card__title"
    />
  ) : null;

  const onFavoriteToggle = (val: boolean) => {
    if (typeof onFavoriteChange !== 'undefined') {
      onFavoriteChange({ id, val });
    }
  };
  const wrapClasses = cx(theme['recipe-card'], className);
  const resultView = enableSelectFavorite ? (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Button
        className="recipe-card__favorite"
        Icon={Icon}
        isSelected={inFavorite}
        onClick={onFavoriteToggle}
        isToggle={true}
        viewType={ButtonViewType.icon}
      />
      <Img className="recipe-card__image" fluid={imgObject} alt={title} />
      {itemTitle}
    </Link>
  ) : (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Img className="recipe-card__image" fluid={imgObject} alt={title} />
      {itemTitle}
    </Link>
  );
  return <>{resultView} </>;
};

export default RecipeCard;
