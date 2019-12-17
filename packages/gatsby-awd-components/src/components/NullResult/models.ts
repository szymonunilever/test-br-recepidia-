import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../models/globalModels';

export interface RecommendationsProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.NullResult> {
  titleLevel?: titleLevel;
}
