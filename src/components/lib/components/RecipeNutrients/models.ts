import { UnileverLibraryComponent } from '../common/globalModels';
export enum RecipeNutrientsViewType {
  Base,
  WithAction,
}
export interface RecipeNutrientsProps
  extends UnileverLibraryComponent<AppContent.RecipeNutrientsContent> {
  recipe: RMSData.Recipe;
  viewType: RecipeNutrientsViewType;
  CloseButton?: JSX.Element;
}
