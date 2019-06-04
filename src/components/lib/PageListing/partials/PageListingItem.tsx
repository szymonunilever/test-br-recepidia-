import React from 'react';
import Img from 'gatsby-image';

import { PageProps } from './models';

const ListItem = ({ page }: PageProps) => {
  const {
    title,
    link: pageLink,
    image: { alt },
    localImage,
  } = page;

  return (
    <li className={`page-listing__item`}>
      <a className={`page-listing__link`} href={pageLink}>
        <Img className={`page-listing__image`} fluid={localImage} alt={alt} />
        <div className={`page-listing__title`}>{title}</div>
      </a>
    </li>
  );
};

export default ListItem;
