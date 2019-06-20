import React from 'react';
import Carousel from '../common/Carousel/Carousel';
import { PageListingCarouselProps } from './models';
import { ItemProps } from './partials/models';
import PageListingItem from './partials/PageListingItem/index';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PageListingCarousel = ({
  list,
  showThumbnails,
}: PageListingCarouselProps) => {
  const getCurrentItem = (item: ItemProps) => {
    return (
      <TransitionGroup>
        <CSSTransition
          key={item.title + item.path}
          timeout={300}
          classNames="carousel__transition"
        >
          <div className="carousel__item">
            <PageListingItem page={item} />
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

export default PageListingCarousel;
