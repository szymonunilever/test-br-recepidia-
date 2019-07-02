import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { PageProps } from '../models';

const PageListingItem = ({ page }: PageProps) => {
  const {
    title,
    path,
    image: { alt },
    localImage,
  } = page;

  return (
    <li className={`page-listing-item`}>
      <Link to={path} className={`page-listing-item__link`}>
        {localImage && (
          <Img
            className={`page-listing-item__image`}
            fluid={localImage.childImageSharp.fluid}
            alt={alt}
          />
        )}
        <div className={`page-listing-item__title`}>{title}</div>
      </Link>
    </li>
  );
};

export default PageListingItem;
