import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import { MediaGalleryProps } from './models';
import { TagName, Text } from '../Text';
import { Button } from '../Button';
import MediaGalleryItem from './partials/MediaGalleryItem';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const MediaGallery = ({
  list,
  content,
  className,
  galleryItemsPerLoad = 4,
  titleLevel = 2,
  onLoadMore,
  allCount,
}: MediaGalleryProps) => {
  const [articles, setArticles] = useState<Internal.Article[]>(list);

  useEffect(() => {
    setArticles(list);
  }, [list]);

  const loadMore = useCallback(() => {
    onLoadMore(galleryItemsPerLoad);
  }, []);

  const loadMoreBtn =
    articles.length < allCount ? (
      <div className="media-gallery__button-wrap">
        <Button onClick={loadMore} className="media-gallery__button">
          {content.cta ? content.cta.label : null}
        </Button>
      </div>
    ) : null;

  return (
    <div
      className={cx('media-gallery', className)}
      {...getComponentDataAttrs('media-gallery', content)}
    >
      {content.title && (
        <Text
          className="media-gallery__title"
          // @ts-ignore
          tag={TagName[`h${titleLevel}`]}
          text={content.title}
        />
      )}

      <ul className="media-gallery__list">
        {articles.map((item: Internal.Article) => {
          return (
            <MediaGalleryItem
              key={item.id}
              title={item.title}
              fields={item.fields}
              assets={item.assets}
            />
          );
        })}
      </ul>

      {loadMoreBtn}
    </div>
  );
};

export default MediaGallery;
