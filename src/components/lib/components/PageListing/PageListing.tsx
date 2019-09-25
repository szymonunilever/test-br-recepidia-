import React, { useState } from 'react';
import cx from 'classnames';
import { PageListingProps, PageListingViewTypes } from './models';
import { ItemProps } from './partials/PageListingItem/models';
import { TagName, Text } from '../Text';
import PageListingItem from './partials/PageListingItem';
import PageListingCarousel from './PageListingCarousel';
import { Button } from 'src/components/lib/components/Button';
import { CarouselConfig } from '../Carousel/models';
import { defaultCarouselConfig } from '../Carousel/Carousel';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const PageListing = ({
  list,
  content,
  content: { title, subtitle, cta },
  viewType = PageListingViewTypes.default,
  initialCount,
  className,
  pagesPerLoad = 4,
  titleLevel = 2,
  carouselConfig,
}: PageListingProps) => {
  const [pages, setPages] = useState({
    list: initialCount ? list : list.slice(0, initialCount),
  });

  const loadMore = () =>
    setPages({
      list: list.slice(0, pages.list.length + pagesPerLoad),
    });

  const shouldAppear = list.length > pages.list.length && cta;

  const loadMoreBtn = shouldAppear ? (
    <div className="page-listing__button-wrap">
      <Button onClick={loadMore} className="page-listing__button">
        {cta ? cta.label : null}
      </Button>
    </div>
  ) : null;

  const subTitle = subtitle ? (
    <div className="page-listing__subtitle">{subtitle}</div>
  ) : null;

  let classNames = cx('page-listing', className);

  let view = (
    <div
      className={classNames}
      {...getComponentDataAttrs('page-listing', content)}
    >
      {title && (
        <Text
          className="page-listing__title"
          // @ts-ignore
          tag={TagName[`h${titleLevel}`]}
          text={title}
        />
      )}
      {subTitle}

      <ul className="page-listing__list">
        {pages.list.map((item: ItemProps) => (
          <li key={item.title} className="page-listing__list-item">
            <PageListingItem page={item} />
          </li>
        ))}
      </ul>

      {loadMoreBtn}
    </div>
  );

  const resCarouselConfig: CarouselConfig = {
    ...defaultCarouselConfig,
    ...carouselConfig,
  };
  if (viewType === PageListingViewTypes.carousel) {
    let classNames = cx('page-listing--carousel', className);
    view = (
      <div
        className={classNames}
        {...getComponentDataAttrs('page-listing', content)}
      >
        {title && (
          <Text
            className="page-listing__title"
            // @ts-ignore
            tag={TagName[`h${titleLevel}`]}
            text={title}
          />
        )}

        <PageListingCarousel
          list={pages.list}
          content={{ title }}
          config={resCarouselConfig as CarouselConfig}
        />
      </div>
    );
  }

  return view;
};

export default PageListing;
