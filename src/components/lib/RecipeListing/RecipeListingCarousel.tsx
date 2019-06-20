import React from 'react';
import Carousel from '../common/Carousel/Carousel';
import { RecipeListingCarouselProps } from './models';
import { RecipeItem } from './partials/models';
import RecipeCard from './partials/RecipeCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
      <TransitionGroup>
        <CSSTransition
          key={item.id}
          timeout={300}
          classNames="carousel__transition"
        >
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
        </CSSTransition>
      </TransitionGroup>
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
