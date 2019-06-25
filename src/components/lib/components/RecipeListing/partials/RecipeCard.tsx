import cx from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { TagName, Text } from '../../Text';
import { Button, ButtonViewType } from '../../common/Button';
import { RecipeCardProps } from './models';
import theme from './RecipeCard.module.scss';
import { RatingProvider } from '../../Rating/models';
import Rating from '../../Rating';
import Kritique from 'src/integrations/Kritique';

const RecipeCard = ({
  id,
  recipeId,
  content: { title },
  localImage,
  Icon,
  enableSelectFavorite = false,
  titleLevel = 3,
  slug,
  className = '',
  inFavorite = false,
  onFavoriteChange,
  ratingProvider,
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
<<<<<<< HEAD
  const RatingWidget =
    ratingProvider !== RatingProvider.none ? (
      <>
        <Rating recipeId={recipeId} provider={ratingProvider} linkTo={slug} />
        <Kritique />
      </>
    ) : null;

  const resultView = enableSelectFavorite ? (
=======
  const Image = localImage && (
    <Img
      className="recipe-card__image"
      fluid={localImage.childImageSharp.fluid}
    />
  );
  const view = enableSelectFavorite ? (
>>>>>>> develop
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      <Button
        className="recipe-card__favorite"
        Icon={Icon}
        isSelected={inFavorite}
        onClick={onFavoriteToggle}
        isToggle={true}
        viewType={ButtonViewType.icon}
      />
      {Image}
      {itemTitle}
      {RatingWidget}
    </Link>
  ) : (
    <Link to={slug} data-componentname="recipeCard" className={wrapClasses}>
      {Image}
      {itemTitle}
      {RatingWidget}
    </Link>
  );

  return view;
};

export default RecipeCard;
