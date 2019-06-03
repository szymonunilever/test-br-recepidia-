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
    loadMoreButton: { isEnabled },
  } = data;

  const [pagesState, setPagesState] = useState({
    pages,
    pagesCount,
  });

  const loadMore = () => {
    const { pages, pagesCount } = pagesState;
    const { pagesPerLoad = 4 } = loadMoreButton;

    setPagesState({
      pages: [...pages],
      pagesCount: pagesCount + pagesPerLoad,
    });
  };

  useEffect(() => {
    const { pagesCount } = pagesState;
    const newPages = pages.slice(0, pagesCount);

    setPagesState({
      pages: newPages,
      pagesCount,
    });
  }, [pagesState.pagesCount]);

  const className = customClass ? customClass : componentName;
  const shouldAppear = !(pagesState.pagesCount > pages.length) && isEnabled;

  const loadMoreBtn = shouldAppear ? (
    <LoadMoreButton
      className={className}
      loadMore={loadMore}
      loadMoreButton={loadMoreButton}
    />
  ) : null;

  const subTitle = subtitle ? (
    <div className={`${className}__subtitle`}>{subtitle}</div>
  ) : null;

  let view = (
    <div className={className} data-componentname={componentName}>
      <h3 className={`${className}__title`}>{title}</h3>
      {subTitle}

      <ul className={`${className}__list`}>
        {pagesState.pages.map((item: ItemProps) => {
          return (
            <PageListingItem
              key={item.title}
              page={item}
              className={className}
            />
          );
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
