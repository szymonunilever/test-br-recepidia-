import { UnileverLibraryComponent } from '../../models/globalModels';

export interface RecipeHeroProps
  extends UnileverLibraryComponent<Internal.Recipe> {
  className?: string;
  imageSizes: string;
}
