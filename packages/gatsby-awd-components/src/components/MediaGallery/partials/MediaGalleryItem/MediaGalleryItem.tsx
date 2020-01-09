import React, { SyntheticEvent, useContext } from 'react';
import { Link, navigate } from 'gatsby';
import cx from 'classnames';
import AdaptiveImage from '../../../AdaptiveImage';
import { MediaGalleryItemProps } from './models';
import { ReactComponent as KnorrLogoIcon } from '../../../../svgs/inline/logo-knorr.svg';
import { ReactComponent as HellmannsLogoIcon } from '../../../../svgs/inline/logo-hellmanns-filled.svg';
import { ReactComponent as MaizenaLogoIcon } from '../../../../svgs/inline/logo-maizena.svg';
import theme from '../../../RecipeCard/RecipeCard.module.scss';
import { iconNormalize } from '../../../../utils';
import { AppContext } from '../../../../context/appContext';

const MediaGalleryItem = ({ title, localImage, fields, assets, className, brand }: MediaGalleryItemProps) => {
  const brandsLogo = {
    knorr: KnorrLogoIcon,
    hellmanns: HellmannsLogoIcon,
    maizena: MaizenaLogoIcon,
  };
  const currentBrand = brand ? brand.replace(/[^a-zA-Z0-9\s-]+/g, '').toLowerCase() : '';
  //TODO switch back to normal state after localImage wil be fixed in articles
  const searchLink = useContext(AppContext).brandLogoLink;
  const handleBrandClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`${searchLink}?searchQuery=${currentBrand}`);
  };

  return (
    <li className={cx(className, currentBrand, 'media-gallery__item')}>
      <Link to={fields.slug} className="media-gallery__item-link">
        {/*{asset && asset.localImage && (*/}
          <AdaptiveImage
            className="media-gallery__item-image"
            localImage={localImage}
            alt={title}
          />
        {/*)}*/}
        <div className="media-gallery__item-info">
          <div className="media-gallery__item-info-title">{title}</div>
          {(brand && brandsLogo[currentBrand]) ? (
            <div
              className={cx(theme.recipeCard__infoBrand, 'media-gallery__item-info-brand')}
              onClick={handleBrandClick}
            >
              {iconNormalize(brandsLogo[currentBrand])}
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default MediaGalleryItem;
