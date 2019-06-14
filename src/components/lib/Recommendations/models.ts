import { UnileverLibraryComponent } from '../common/globalModels';

export interface RecommendationsProps
  extends UnileverLibraryComponent<AppContent.RecommendationsContent> {
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}
