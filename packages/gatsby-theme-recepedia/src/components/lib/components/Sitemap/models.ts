import { TagName } from '../Text/index';
import { SitemapCategoryEntry } from './partials';

export interface SitemapProps {
  title?: string;
  titleLevel?: TagName;
  content: SitemapCategoryEntry[];
  wrapBlocks?: boolean;
}
