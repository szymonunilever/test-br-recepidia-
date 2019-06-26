import { ItemProps } from './partials/models';
import { UnileverLibraryComponent } from '../common/globalModels';

export interface RecipeHeroProps
  extends UnileverLibraryComponent<AppContent.RecipeHeroContent> {
  className?: string;
  viewType: string;
}
