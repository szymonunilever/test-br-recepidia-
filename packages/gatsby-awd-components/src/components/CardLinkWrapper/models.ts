import { ReactElement } from 'react';
import { CardProps, ProductCardWrapperProps, RecipeCardWrapperProps } from '../Card';
import { RecipeCardProps } from '../RecipeCard';

export interface CardLinkWrapperProps {
  key: string;
  isExternal?: boolean;
  title: string;
  slug: string;
  target?: string;
  href?: string;
  rel?: string;
  to?: string;
  'aria-label'?: string;
  className?: string;
  children: ReactElement<RecipeCardProps|CardProps|RecipeCardWrapperProps|ProductCardWrapperProps>;
}
