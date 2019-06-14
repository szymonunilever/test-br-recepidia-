import { UnileverLibraryComponent } from '../common/globalModels';

export interface RecommendationsProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.NullResult> {
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}
