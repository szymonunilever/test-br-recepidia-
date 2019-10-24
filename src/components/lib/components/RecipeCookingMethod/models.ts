import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../models/globalModels';

export interface RecipeCookingMethodProps
  extends UnileverLibraryComponent<AppContent.RecipeCookingMethodContent> {
  methodList: RMSData.CookingMethodGroup[];
  titleLevel?: titleLevel;
}
