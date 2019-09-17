import React from 'react';
import { Link } from 'gatsby';
import { SitemapCategoryEntry, SitemapCategoryProps } from './models';

const SitemapCategory = ({ item }: SitemapCategoryProps) => {
  const { path, title, categoryItems } = item;
  const isNestedCategories = categoryItems && categoryItems.length !== 0;

  const categoryItem = (
    <li className="sitemap__category">
      <Link className="sitemap__category-title" to={path}>
        {title}
      </Link>
      {isNestedCategories && (
        <ul className="sitemap__category-items">
          {categoryItems &&
            categoryItems.map((item: SitemapCategoryEntry, index: number) => (
              <SitemapCategory key={index} item={item} />
            ))}
        </ul>
      )}
    </li>
  );

  return categoryItem;
};

export default SitemapCategory;
