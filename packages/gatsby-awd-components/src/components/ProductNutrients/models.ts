import { UnileverLibraryComponent } from '../../models';

export interface ProductNutrientsProps extends UnileverLibraryComponent<AppContent.ProductCopyContent> {
  nutritionFacts: string;
  titleLevel?: number;
  content: AppContent.ProductNutrientsContent;
}
