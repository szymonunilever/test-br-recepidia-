import React from 'react';
import Carousel from './Carousel';
import { RecipeListingCarouselProps } from './models';
import { RecipeItem } from '../RecipeListing/partials/models';
import RecipeCard from '../RecipeListing/partials/RecipeCard';

const RecipeListingCarousel = ({
  withFavorite = true,
  titleLevel = 1,
  onFavoriteChange,
  content,
  list,
  showThumbnails = false,
}: RecipeListingCarouselProps) => {
  const getCurrentItem = (item: RecipeItem) => {
    return (
      <div className="carousel__item">
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
      </div>
    );
  };
  return (
    <Carousel
      list={list}
      createElementFunction={getCurrentItem}
      showThumbnails={showThumbnails}
    />
  );
};

export default RecipeListingCarousel;
