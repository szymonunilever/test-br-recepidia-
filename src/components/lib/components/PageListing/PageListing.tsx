import React, { useState } from 'react';
import cx from 'classnames';
import { PageListingProps, PageListingViewTypes } from './models';
import { ItemProps } from './partials/models';

import PageListingItem from './partials/PageListingItem';
import PageListingCarousel from './PageListingCarousel';
import { Button } from 'src/components/lib/components/common/Button';

const PageListing = ({
  list,
  content: { title, subtitle, cta },
  viewType = PageListingViewTypes.default,
  initialCount = 6,
  className,
  pagesPerLoad = 4,
  carouselConfig = {
    breakpoints: [
      {
        width: 1366,
        switchElementsBelowBreakpoint: 1,
        switchElementsAfterBreakpoint: 2,
        visibleElementsBelowBreakpoint: 2,
        visibleElementsAboveBreakpoint: 4,
      },
    ],
  },
}: PageListingProps) => {
  const [pages, setPages] = useState({
    list: list.slice(0, initialCount),
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
    <div className={`page-listing__subtitle`}>{subtitle}</div>
  ) : null;

  const classNames = cx('page-listing', className);

  let view = (
    <div className={classNames} data-componentname="page-listing">
      <h3 className={`page-listing__title`}>{title}</h3>
      {subTitle}

      <ul className={`page-listing__list`}>
        {pages.list.map((item: ItemProps) => (
          <PageListingItem key={item.title} page={item} />
        ))}
      </ul>

      {loadMoreBtn}
    </div>
  );

  if (viewType === PageListingViewTypes.carousel) {
    view = (
      <PageListingCarousel
        list={pages.list}
        content={{ title, subtitle, cta }}
        config={carouselConfig}
      />
    );
  }

  return view;
};

export default PageListing;
