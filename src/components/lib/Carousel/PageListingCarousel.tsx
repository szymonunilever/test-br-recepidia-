import React from 'react';
import Carousel from './Carousel';
import { PageListingCarouselProps } from './models';
import { ItemProps } from '../PageListing/partials/models';
import PageListingItem from '../PageListing/partials/PageListingItem/index';

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
