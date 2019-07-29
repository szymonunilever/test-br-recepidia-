import { UnileverLibraryComponent } from '../common/globalModels';

export interface RecipeHeroProps
  extends UnileverLibraryComponent<Internal.Recipe> {
  className?: string;
  imagePlaceholder: Internal.LocalImage;
  imageSizes: string;
}
