import { titleLevel, UnileverLibraryComponent } from '../globalModels';

export interface RecommendationsProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.NullResult> {
  titleLevel?: titleLevel;
}
