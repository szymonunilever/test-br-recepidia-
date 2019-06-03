import React from 'react';
import { LoadMoreButtonProps } from './models';

const LoadMoreButton = ({
  loadMore,
  className,
  loadMoreButton: { text },
}: LoadMoreButtonProps) => {
  const buttonText = text ? text : 'Load more';

  return (
    <button className={`${className}__button`} onClick={loadMore}>
      {buttonText}
    </button>
  );
};

export default LoadMoreButton;
