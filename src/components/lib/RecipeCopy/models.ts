import { titleLevel, UnileverLibraryComponent } from '../common/globalModels';

export enum RecipeCopyViewType {
  Title,
  ShortTitle,
  Description,
  ShortDescription,
  Ingredients,
}
export interface RecipeCopyProps
  extends UnileverLibraryComponent<AppContent.RecipeCopyContent> {
  recipe: RMSData.Recipe;
  titleLevel?: titleLevel;
  viewType: RecipeCopyViewType;
}
