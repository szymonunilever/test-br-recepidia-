import React from 'react';
import { Link } from 'gatsby';
import AdaptiveImage from '../../../AdaptiveImage';
import { MediaGalleryItemProps } from './models';

const MediaGalleryItem = ({ title, fields, assets }: MediaGalleryItemProps) => {
  const localImage = () =>
    assets.find(asset => !!(asset.type === 'Image' && asset.localImage));

  return (
    <li className="media-gallery__item">
      <Link to={fields.slug} className="media-gallery__item-link">
        {!!localImage() && (
          <AdaptiveImage
            className="media-gallery__item-image"
            //@ts-ignore
            localImage={localImage().localImage}
            alt={title}
          />
        )}
        <div className="media-gallery__item-title">{title}</div>
      </Link>
    </li>
  );
};

export default MediaGalleryItem;
