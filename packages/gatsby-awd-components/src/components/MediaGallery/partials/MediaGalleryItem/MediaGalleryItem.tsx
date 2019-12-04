import React from 'react';
import { Link } from 'gatsby';
import AdaptiveImage from '../../../AdaptiveImage';
import { MediaGalleryItemProps } from './models';
import { localImage } from '../../../../mocks/global';

const MediaGalleryItem = ({ title, fields, assets }: MediaGalleryItemProps) => {
  // const asset = assets.find(
  //   asset => !!(asset.type === 'Image' && asset.localImage)
  // );
  //TODO switch back to normal state after localImage wil be fixed in articles

  return (
    <li className="media-gallery__item">
      <Link to={fields.slug} className="media-gallery__item-link">
        {/*{asset && asset.localImage && (*/}
          <AdaptiveImage
            className="media-gallery__item-image"
            localImage={localImage} //TODO remove mock image after localImage wil be fixed in articles
            alt={title}
          />
        {/*)}*/}
        <div className="media-gallery__item-title">{title}</div>
      </Link>
    </li>
  );
};

export default MediaGalleryItem;
