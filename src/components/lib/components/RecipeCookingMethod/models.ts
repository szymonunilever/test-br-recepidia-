import { titleLevel, UnileverLibraryComponent } from '../common/globalModels';

export interface RecipeCookingMethodProps
  extends UnileverLibraryComponent<AppContent.RecipeCookingMethodContent> {
  methodList: RMSData.CookingMethod[];
  titleLevel?: titleLevel;
}
