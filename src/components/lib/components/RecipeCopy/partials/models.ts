import { titleLevel } from '../../../models/globalModels';

export interface RecipeCopyTitleProps {
  className?: string;
  title: string;
  titleLevel?: titleLevel;
}

export interface RecipeCopyDescriptionProps {
  className?: string;
  description: string;
}

export interface RecipeCopyIngredientsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  titleLevel?: titleLevel;
  ingredients: RMSData.IngredientGroup[];
}
