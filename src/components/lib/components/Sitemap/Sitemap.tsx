import React from 'react';
import { SitemapProps } from './models';
import { SitemapCategoryEntry } from './partials/models';
import { Text } from '../Text';
import { TagName } from '../Text/models';
import { SitemapCategory } from './partials';

const Sitemap = ({ title, titleLevel = TagName.h1, content }: SitemapProps) => {
  return (
    <div className="sitemap">
      {title && (
        <Text tag={titleLevel} text={title} className={'sitemap-title'} />
      )}
      <div className="sitemap__categories">
        {content.map((item: SitemapCategoryEntry, index: number) => (
          <SitemapCategory key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sitemap;
