import { UnileverLibraryComponent } from '../../models';

export interface ProductNutrientsProps extends UnileverLibraryComponent<AppContent.ProductCopyContent> {
  nutritionFacts: RMSData.RecipeNutrient[];
  titleLevel?: number;
  content: AppContent.ProductNutrientsContent;
}
