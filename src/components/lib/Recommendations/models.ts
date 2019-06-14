import { UnileverLibraryComponent } from '../common/globalModels';

export interface RecomendationContent {
  title?: string;
  subtitle?: string;
  textList: string[];
}

export interface RecomendationsProps extends UnileverLibraryComponent {
  content: RecomendationContent;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}
