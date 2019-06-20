import React from 'react';
import Carousel from '../common/Carousel/Carousel';
import { PageListingCarouselProps } from './models';
import { ItemProps } from './partials/models';
import PageListingItem from './partials/PageListingItem/index';

const PageListingCarousel = ({
  list,
  showThumbnails,
}: PageListingCarouselProps) => {
  const getCurrentItem = (item: ItemProps) => {
    return (
      <div className="carousel__item">
        <PageListingItem page={item} />
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

export default PageListingCarousel;
