import { titleLevel } from '../../../models';

export interface ProductCopyTitleProps {
  className?: string;
  title: string;
  titleLevel?: titleLevel;
}

export interface ProductCopyDescriptionProps {
  className?: string;
  description: string;
}

export interface ProductCopyIngredientsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  titleLevel?: titleLevel;
  ingredients: RMSData.IngredientGroup[];
}

export interface ProductCopyAllergensProps {
  className?: string;
  title?: string;
  subtitle?: string;
  titleLevel?: titleLevel;
  allergy: string[];
}
