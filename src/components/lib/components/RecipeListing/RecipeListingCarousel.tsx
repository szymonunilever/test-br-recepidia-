import React from 'react';
import Carousel from '../common/Carousel/Carousel';
import { RecipeListingCarouselProps } from './models';
import RecipeCard from './partials/RecipeCard';
import { RatingProvider } from '../Rating/index';

const RecipeListingCarousel = ({
  withFavorite = true,
  titleLevel = 1,
  onFavoriteChange,
  list,
  config,
  ratingProvider = RatingProvider.none,
}: RecipeListingCarouselProps) => {
  const getCurrentItem = (item: Internal.Recipe) => {
    return (
      <RecipeCard
        id={item.id}
        inFavorite={withFavorite ? item.inFavorite : false}
        enableSelectFavorite={withFavorite}
        titleLevel={titleLevel}
        slug={item.fields.slug}
        content={{ title: item.shortTitle }}
        onFavoriteChange={onFavoriteChange}
        recipeId={item.recipeId}
        ratingProvider={ratingProvider}
        localImage={item.localImage}
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
