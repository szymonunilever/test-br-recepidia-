import React from 'react';
import { PageProps } from './models';

const ListItem = ({ page, className }: PageProps) => {
  const {
    title,
    link: pageLink,
    image: { link: imageLink, alt },
  } = page;

  return (
    <li className={`${className}__item`}>
      <a className={`${className}__link`} href={pageLink}>
        <img className={`${className}__image`} src={imageLink} alt={alt} />
        <div className={`${className}__title`}>{title}</div>
      </a>
    </li>
  );
};

export default ListItem;
