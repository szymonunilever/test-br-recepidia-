import cx from 'classnames';
import { Link } from 'gatsby';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RatingAndReviewsProvider } from '../../../models';
import { getImageAlt } from '../../../utils';
import getComponentDataAttrs from '../../../utils/getComponentDataAttrs';
import AdaptiveImage from '../../AdaptiveImage';
import { ButtonProps } from '../../Button';
import Rating from '../../Rating';
import { TagName, Text } from '../../Text';
import { RecipeCardLinkProps, RecipeCardProps } from './models';
import theme from './RecipeCard.module.scss';

const RecipeCard: FunctionComponent<RecipeCardProps> = ({
  recipeId,
  content,
  children,
  localImage,
  slug,
  className = '',
  ratingProvider,
  imageSizes,
  isExternalLink = false,
}) => {
   const itemTitle = content.title ? (
    <Text
      tag={TagName[ `div` ]}
      text={content.title}
      className={cx(theme.recipeCard__title, 'recipe-card__title')}
    />
  ) : null;

  const modifiedChildren = children && React.Children.map(children, child =>{
    return React.isValidElement<ButtonProps>(child) && React.cloneElement<ButtonProps>(
    child,
    {
      onClick : (val: boolean) => {
        child
        && child.props.onClick
        && child.props.onClick.apply(
          child.props.onClick,
          [ val, recipeId ],
        );
      }
    })
  });

  const wrapClasses = cx(theme.recipeCard, 'recipe-card', className);
  const RatingWidget =
    ratingProvider !== RatingAndReviewsProvider.none ? (
      <>
        <Rating
          className={cx(theme.recipeRatingStars, 'recipe-rating--stars')}
          recipeId={recipeId}
          provider={ratingProvider}
          linkTo={slug}
        />
      </>
    ) : null;

  const Image = localImage && (
    <AdaptiveImage
      className={cx(theme.recipeCard__image, 'recipe-card__image')}
      localImage={localImage}
      alt={content.title ? getImageAlt(content.title, slug) : 'Recipe image'}
      sizes={imageSizes}
    />
  );
  const LinkComponent = isExternalLink ? 'a' : Link;
  const linkProps: RecipeCardLinkProps = {
    'aria-label' : content.title,
    className : wrapClasses,
  };
  if (isExternalLink && slug) {
    linkProps[ 'target' ] = '_blank';
    linkProps[ 'href' ] = slug;
    linkProps[ 'rel' ] = 'noopener noreferrer';
  } else {
    linkProps[ 'to' ] = slug;
  }

  return (
    // @ts-ignore
    <LinkComponent
      {...getComponentDataAttrs('recipeCard', content)}
      {...linkProps}
    >
      <div className="recipe-card__buttons">
        {modifiedChildren}
      </div>
      {Image}
      <div className={cx(theme.recipeCard__info, 'recipe-card__info')}>
        {itemTitle}
        {RatingWidget}
      </div>
    </LinkComponent>
  );
};

export default RecipeCard;
