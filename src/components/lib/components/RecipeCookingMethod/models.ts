import { titleLevel, UnileverLibraryComponent } from '../globalModels';

export interface RecipeCookingMethodProps
  extends UnileverLibraryComponent<AppContent.RecipeCookingMethodContent> {
  methodList: RMSData.CookingMethod[];
  titleLevel?: titleLevel;
}
