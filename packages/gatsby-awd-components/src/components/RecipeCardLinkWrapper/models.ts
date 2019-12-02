import { ReactElement } from 'react';
import { RecipeCardProps } from '../RecipeCard';

export interface RecipeCardLinkWrapperProps {
  isExternal?: boolean;
  title: string;
  slug: string;
  target?: string;
  href?: string;
  rel?: string;
  to?: string;
  'aria-label'?: string;
  className?: string;
  children: ReactElement<RecipeCardProps>;
}
