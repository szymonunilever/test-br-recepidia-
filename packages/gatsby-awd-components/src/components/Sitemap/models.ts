import { TagName } from '../Text';
import { SitemapCategoryEntry } from './partials';

export interface SitemapProps {
  title?: string;
  titleLevel?: TagName;
  content: SitemapCategoryEntry[];
  wrapBlocks?: boolean;
}
