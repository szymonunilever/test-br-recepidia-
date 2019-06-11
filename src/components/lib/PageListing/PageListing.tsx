import React, { useState } from 'react';
import cx from 'classnames';
import { PageListingProps } from './models';
import { ItemProps } from './partials/models';

import PageListingItem from './partials/PageListingItem';
import { Button } from 'src/components/lib/common/Button';

const PageListing = ({
  list,
  content: { title, subtitle, cta },
  viewType,
  initialCount,
  className,
  pagesPerLoad = 4,
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
    <Button onClick={loadMore} className="page-listing__button">
      {cta ? cta.label : null}
    </Button>
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
        {pages.list.map((item: ItemProps) => {
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
