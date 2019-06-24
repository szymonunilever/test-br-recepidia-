import { UnileverLibraryComponent } from '../common/globalModels';
import { GatsbyImageProps } from 'gatsby-image';
import { titleLevel } from '../common/globalModels';

export type HeroViewType = 'Text' | 'Image';

export interface HeroProps
  extends UnileverLibraryComponent<AppContent.HeroContent> {
  viewType: HeroViewType;
  titleLevel?: titleLevel;
  localImage?: {
    id: string;
    childImageSharp: GatsbyImageProps;
  };
}
