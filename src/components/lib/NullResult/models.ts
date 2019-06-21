import { titleLevel, UnileverLibraryComponent } from '../common/globalModels';

export interface RecommendationsProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.NullResult> {
  titleLevel?: titleLevel;
}
