import { UnileverLibraryComponent } from '../common/globalModels';
import { GatsbyImageProps } from 'gatsby-image';

export interface RecipeHeroProps
  extends UnileverLibraryComponent<RecipeHeroContent> {
  className?: string;
  viewType: string;
}

export interface RecipeHeroContent extends AppContent.RecipeHeroContent {
  image?: Image;
  imagePlaceholder?: Image;
}

export interface Image extends AppContent.ImageContent {
  localImage?: {
    id: string;
    childImageSharp: GatsbyImageProps;
  };
}
