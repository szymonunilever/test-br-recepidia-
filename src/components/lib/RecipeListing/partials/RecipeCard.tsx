import cx from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { TagName, Text } from 'src/components/lib/Text';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { Button, ButtonViewType } from '../../../common/Button';
import { RecipeCardProps } from './models';
import theme from './RecipeCard.module.scss';

const RecipeCard = ({
  id,
  title,
  imgObject,
  enableSelectFavorite = false,
  titleLevel = 3,
  slug,
  className = '',
  inFavorite = false,
  onFavoriteChange,
}: RecipeCardProps) => {
  const itemTitle = (
    <Text
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
      className="recipe-card__title"
    />
  );

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
        icon={<Icon />}
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
