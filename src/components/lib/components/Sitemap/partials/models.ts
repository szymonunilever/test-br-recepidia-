export interface SitemapCategoryEntry {
  title: string;
  path: string;
  categoryItems?: SitemapCategoryEntry[];
}

export interface SitemapCategoryProps {
  item: SitemapCategoryEntry;
}
