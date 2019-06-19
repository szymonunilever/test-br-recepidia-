import { UnileverLibraryComponent } from '../common/globalModels';

export interface RecipeCookingMethodProps
  extends UnileverLibraryComponent<AppContent.RecipeCookingMethodContent> {
  methodList: RMSData.CookingMethod[];
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}
