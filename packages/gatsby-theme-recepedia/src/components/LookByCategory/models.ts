import { titleLevel } from 'gatsby-awd-components/src';

export interface LookByCategoryProps {
  title?: string;
  className?: string;
  categories: string[];
  titleLevel?: titleLevel;
  renderIteration?: number;
  createChildren: (category: string) => JSX.Element;
}
