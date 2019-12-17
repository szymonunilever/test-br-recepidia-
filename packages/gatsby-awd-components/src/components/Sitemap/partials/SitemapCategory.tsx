import React from 'react';
import { Link } from 'gatsby';
import { SitemapCategoryEntry, SitemapCategoryProps } from './models';

const SitemapCategory = ({ item }: SitemapCategoryProps) => {
  const { path, title, categoryItems } = item;
  const isNestedCategories = categoryItems && categoryItems.length !== 0;

  if (!title && !isNestedCategories) return null;

  const categoryItem = (
    <>
      {title &&
        (path ? (
          <Link className="sitemap__category-title" to={path}>
            {title}
          </Link>
        ) : (
          <div className="sitemap__category-title">{title}</div>
        ))}

      {isNestedCategories && (
        <ul className="sitemap__category-items">
          {categoryItems &&
            categoryItems.map((item: SitemapCategoryEntry, index: number) => (
              <SitemapCategory key={index} item={item} />
            ))}
        </ul>
      )}
    </>
  );

  return categoryItem;
};

export default SitemapCategory;
