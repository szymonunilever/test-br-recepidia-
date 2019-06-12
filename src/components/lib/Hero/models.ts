import { UnileverLibraryComponent } from '../common/globalModels';
import { GatsbyImageProps } from 'gatsby-image';

export enum HeroViewType {
  Text = 'Text',
  Image = 'Image',
}

export interface HeroProps
  extends UnileverLibraryComponent<UnileverComponents.HeroContent> {
  viewType: HeroViewType;
  localImage: {
    id: string;
    childImageSharp: GatsbyImageProps;
  };
}
