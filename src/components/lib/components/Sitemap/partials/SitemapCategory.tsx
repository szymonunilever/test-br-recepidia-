import React from 'react';
import { Link } from 'gatsby';
import { SitemapCategoryEntry, SitemapCategoryProps } from './models';

const SitemapCategory = ({ item }: SitemapCategoryProps) => {
  const { path, title, categoryItems } = item;
  return (
    <ul className="sitemap__category">
      <li>
        <Link className="sitemap__category-title" to={path}>
          {title}
        </Link>
        {categoryItems && (
          <ul className="sitemap__category-items">
            {categoryItems.map((item: SitemapCategoryEntry, index: number) => (
              <SitemapCategory key={index} item={item} />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default SitemapCategory;
