import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { PageProps } from '../models';

const RecipeHeroImage = ({ page }: PageProps) => {
  const {
    path,
    image: { alt },
    localImage,
  } = page;

  return (
    <li className={`recipe-hero-image__item`}>
      <Link to={path} className={`recipe-hero-image__link`}>
        <Img
          className={`recipe-hero-image__image`}
          fluid={localImage}
          alt={alt}
        />
      </Link>
    </li>
  );
};

export default RecipeHeroImage;
