import React from 'react';
import { Link } from 'gatsby';
import AdaptiveImage from '../../../AdaptiveImage';
import { MediaGalleryItemProps } from './models';
import pageListing from 'src/components/data/pageListing.json';

const MediaGalleryItem = ({ title, fields, assets }: MediaGalleryItemProps) => {
  const localImage = () => pageListing[0].localImage;
  // assets.find(
  //   //@ts-ignore
  //   asset => !!(asset.type === 'Image' && asset.content.localImage)
  // );

  return (
    <li className="media-gallery__item">
      <Link to={fields.slug} className="media-gallery__item-link">
        {!!localImage() && (
          <AdaptiveImage
            className="media-gallery__item-image"
            //@ts-ignore
            localImage={localImage()}
            alt={title}
          />
        )}
        <div className="media-gallery__item-title">{title}</div>
      </Link>
    </li>
  );
};

export default MediaGalleryItem;
