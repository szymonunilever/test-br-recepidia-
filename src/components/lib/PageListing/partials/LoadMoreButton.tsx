import React from 'react';
import { LoadMoreButtonProps } from './models';

const LoadMoreButton = ({
  loadMore,
  loadMoreButton: { text },
}: LoadMoreButtonProps) => {
  const buttonText = text ? text : 'Load more';

  return (
    <button className={`page-listing__button`} onClick={loadMore}>
      {buttonText}
    </button>
  );
};

export default LoadMoreButton;
