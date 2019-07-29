import React from 'react';
import Carousel from '../common/Carousel/Carousel';
import { RecipeListingCarouselProps } from './models';
import RecipeCard from './partials/RecipeCard';
import { RatingAndReviewsProvider } from '../../models/ratings&reviews';

const RecipeListingCarousel = ({
  withFavorite = true,
  titleLevel = 1,
  FavoriteIcon,
  onFavoriteChange,
  list,
  config,
  ratingProvider = RatingAndReviewsProvider.none,
  imageSizes,
}: RecipeListingCarouselProps) => {
  const getCurrentItem = (item: Internal.Recipe) => {
    return (
      <RecipeCard
        id={item.id}
        inFavorite={withFavorite ? item.inFavorite : false}
        enableSelectFavorite={withFavorite}
        Icon={FavoriteIcon}
        titleLevel={titleLevel}
        slug={item.fields.slug}
        content={{ title: item.title }}
        onFavoriteChange={onFavoriteChange}
        recipeId={item.recipeId}
        ratingProvider={ratingProvider}
        localImage={item.localImage}
        imageSizes={imageSizes}
      />
    );
  };
  return (
    <Carousel
      list={list}
      createElementFunction={getCurrentItem}
      config={config}
    />
  );
};

export default RecipeListingCarousel;
