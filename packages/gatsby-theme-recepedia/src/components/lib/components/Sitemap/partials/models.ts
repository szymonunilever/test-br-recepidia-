export interface SitemapCategoryEntry {
  title: string;
  path: string | null;
  categoryItems?: SitemapCategoryEntry[];
}

export interface SitemapCategoryProps {
  item: SitemapCategoryEntry;
}
