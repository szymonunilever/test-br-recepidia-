import React from 'react';
import { SitemapProps } from './models';
import { SitemapCategoryEntry } from './partials/models';
import { Text } from '../Text';
import { TagName } from '../Text/models';
import { SitemapCategory } from './partials';
import { Link } from 'gatsby';
import partition from 'lodash/partition';

const Sitemap = ({
  title,
  titleLevel = TagName.h1,
  content,
  wrapBlocks = false,
}: SitemapProps) => {
  const categoryListsArray = wrapBlocks
    ? partition(
        content,
        item => item.categoryItems && item.categoryItems.length
      )
    : [content];

  return (
    <div className="sitemap">
      {title && (
        <Text tag={titleLevel} text={title} className={'sitemap-title'} />
      )}
      <ul className="sitemap__categories">
        {categoryListsArray[0].map(
          (item: SitemapCategoryEntry, index: number) =>
            wrapBlocks ? (
              <span className="sitemap__block" key={index}>
                <SitemapCategory key={index} item={item} />
              </span>
            ) : (
              <SitemapCategory key={index} item={item} />
            )
        )}
        {wrapBlocks && (
          <div className="sitemap__block">
            {categoryListsArray[1].map(
              (item: SitemapCategoryEntry, index: number) => (
                <SitemapCategory key={index} item={item} />
              )
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sitemap;
