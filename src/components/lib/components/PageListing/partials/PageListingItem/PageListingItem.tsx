import React from 'react';
import { Link } from 'gatsby';

import { PageProps } from './models';
import AdaptiveImage from '../../../AdaptiveImage';

const PageListingItem = ({ page, imageSizes }: PageProps) => {
  const {
    title,
    path,
    image: { alt },
    localImage,
  } = page;

  return (
    <div className="page-listing-item">
      <Link to={path} aria-label={title} className="page-listing-item__link">
        <AdaptiveImage
          className="page-listing-item__image"
          localImage={localImage}
          alt={alt}
          sizes={imageSizes}
        />
        <div className="page-listing-item__title">{title}</div>
      </Link>
    </div>
  );
};

export default PageListingItem;
