import React from 'react';
import Carousel from '../common/Carousel/Carousel';
import { RecipeListingCarouselProps } from './models';
import { RecipeItem } from './partials/models';
import RecipeCard from './partials/RecipeCard';

const RecipeListingCarousel = ({
  withFavorite = true,
  titleLevel = 1,
  onFavoriteChange,
  content,
  list,
  config,
}: RecipeListingCarouselProps) => {
  const getCurrentItem = (item: RecipeItem) => {
    return (
      <RecipeCard
        id={item.id}
        inFavorite={withFavorite ? item.inFavorite : false}
        enableSelectFavorite={withFavorite}
        titleLevel={titleLevel}
        imgObject={item.localImage.childImageSharp.fluid}
        slug={item.fields.slug}
        content={content}
        onFavoriteChange={onFavoriteChange}
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
