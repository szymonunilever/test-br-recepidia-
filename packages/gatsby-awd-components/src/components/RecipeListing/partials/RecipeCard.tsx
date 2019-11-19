import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { TagName, Text } from '../../Text';
import { Button, ButtonViewType } from '../../Button';
import { RecipeCardProps } from './models';
import theme from './RecipeCard.module.scss';
import Rating from '../../Rating';
import AdaptiveImage from '../../AdaptiveImage';
import { RatingAndReviewsProvider } from '../../../models';
import { getImageAlt, iconNormalize } from '../../../utils';
import getComponentDataAttrs from '../../../utils/getComponentDataAttrs';

const RecipeCard = ({
  recipeId,
  content,
  content: { title },
  localImage,
  Icon,
  enableSelectFavorite = false,
  slug,
  className = '',
  inFavorite = false,
  onFavoriteChange,
  ratingProvider,
  imageSizes,
  isExternalLink = false,
}: RecipeCardProps) => {
  const itemTitle = title ? (
    <Text
      // @ts-ignore
      tag={TagName[`div`]}
      text={title}
      className={cx(theme.recipeCard__title, 'recipe-card__title')}
    />
  ) : null;
  const onFavoriteToggle = (val: boolean) => {
    if (typeof onFavoriteChange !== 'undefined') {
      onFavoriteChange({ recipeId, val });
    }
  };
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
      alt={title ? getImageAlt(title, slug) : 'Recipe image'}
      sizes={imageSizes}
    />
  );
  const LinkComponent = isExternalLink ? 'a' : Link;
  const linkProps = {
    'aria-label': title,
    className: wrapClasses,
  };
  if (isExternalLink) {
    // @ts-ignore
    linkProps['target'] = '_blank';
    // @ts-ignore
    linkProps['href'] = slug;
    // @ts-ignore
    linkProps['rel'] = 'noopener noreferrer';
  } else {
    // @ts-ignore
    linkProps['to'] = slug;
  }

  return (
    // @ts-ignore
    <LinkComponent
      {...getComponentDataAttrs('recipeCard', content)}
      {...linkProps}
    >
      {enableSelectFavorite && (
        <Button
          className={cx(theme.recipeCard__favorite, 'recipe-card__favorite')}
          Icon={iconNormalize(Icon)}
          isSelected={inFavorite}
          onClick={onFavoriteToggle}
          isToggle={true}
          viewType={ButtonViewType.icon}
          attributes={{ 'aria-label': 'favorite toggle' }}
        />
      )}
      {Image}
      <div className={cx(theme.recipeCard__info, 'recipe-card__info')}>
        {itemTitle}
        {RatingWidget}
      </div>
    </LinkComponent>
  );
};

export default RecipeCard;
