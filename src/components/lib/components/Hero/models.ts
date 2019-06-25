import { UnileverLibraryComponent } from '../common/globalModels';
import { GatsbyImageProps } from 'gatsby-image';
import { titleLevel } from '../common/globalModels';

export type HeroViewType = 'Text' | 'Image';

export interface HeroProps extends UnileverLibraryComponent<HeroContent> {
  viewType: string;
  titleLevel?: titleLevel;
}

export interface HeroContent extends AppContent.HeroContent {
  image?: Image;
}

export interface Image extends AppContent.ImageContent {
  localImage?: {
    id: string;
    childImageSharp: GatsbyImageProps;
  };
}
