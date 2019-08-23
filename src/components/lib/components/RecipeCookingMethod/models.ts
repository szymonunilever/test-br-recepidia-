import { titleLevel, UnileverLibraryComponent } from '../globalModels';

export interface RecipeCookingMethodProps
  extends UnileverLibraryComponent<AppContent.RecipeCookingMethodContent> {
  methodList: RMSData.CookingMethodGroup[];
  titleLevel?: titleLevel;
}
