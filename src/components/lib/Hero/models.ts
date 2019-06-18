import { UnileverLibraryComponent } from '../common/globalModels';
import { GatsbyImageProps } from 'gatsby-image';

export type HeroViewType = 'Text' | 'Image';

export interface HeroProps
  extends UnileverLibraryComponent<AppContent.HeroContent> {
  viewType: HeroViewType;
  localImage?: {
    id: string;
    childImageSharp: GatsbyImageProps;
  };
}
