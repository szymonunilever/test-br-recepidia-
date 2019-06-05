import React, { useState, useEffect } from 'react';
import { PageListingProps } from './models';
import { ItemProps } from './partials/models';

import PageListingItem from './partials/PageListingItem';
import LoadMoreButton from './partials/LoadMoreButton';

const PageListing = ({ data }: PageListingProps) => {
  const {
    viewType,
    title,
    pages,
    pagesCount,
    componentName,
    customClass,
    loadMoreButton,
    subtitle,
    loadMoreButton: { isEnabled, pagesPerLoad = 4 },
  } = data;

  const [pagesState, setPagesState] = useState({
    pagesCount,
    pages: pages.slice(0, pagesCount),
  });

  const loadMore = () => {
    setPagesState({
      pages: [
        ...pagesState.pages,
        ...pages.slice(
          pagesState.pagesCount,
          pagesState.pagesCount + pagesPerLoad
        ),
      ],
      pagesCount: pagesState.pagesCount + pagesPerLoad,
    });
  };

  const className = customClass
    ? `page-listing ${customClass}`
    : `page-listing`;
  const shouldAppear = pages.length > pagesState.pagesCount && isEnabled;

  const loadMoreBtn = shouldAppear ? (
    <LoadMoreButton loadMore={loadMore} loadMoreButton={loadMoreButton} />
  ) : null;

  const subTitle = subtitle ? (
    <div className={`page-listing__subtitle`}>{subtitle}</div>
  ) : null;

  let view = (
    <div className={className} data-componentname={componentName}>
      <h3 className={`page-listing__title`}>{title}</h3>
      {subTitle}

      <ul className={`page-listing__list`}>
        {pagesState.pages.map((item: ItemProps) => {
          return <PageListingItem key={item.title} page={item} />;
        })}
      </ul>

      {loadMoreBtn}
    </div>
  );

  if (viewType === 'carousel') {
    view = <div className={viewType}>{view}</div>;
  }

  return view;
};

export default PageListing;
