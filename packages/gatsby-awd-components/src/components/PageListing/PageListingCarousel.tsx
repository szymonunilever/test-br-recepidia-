import React from 'react';
import Carousel from '../Carousel/Carousel';
import { PageListingCarouselProps } from './models';
import { ItemProps } from './partials/PageListingItem/models';
import PageListingItem from './partials/PageListingItem/index';

const PageListingCarousel = ({
  list,
  config,
  imageSizes,
}: PageListingCarouselProps) => {
  const getCurrentItem = (item: ItemProps) => {
    return <PageListingItem page={item} imageSizes={imageSizes} />;
  };

  return (
    <Carousel
      list={list}
      createElementFunction={getCurrentItem}
      config={config}
    />
  );
};

export default PageListingCarousel;
