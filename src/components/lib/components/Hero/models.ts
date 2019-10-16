import { UnileverLibraryComponent } from '../../models/globalModels';
import { titleLevel } from '../../models/globalModels';

export type HeroViewType = 'Text' | 'Image';

export interface HeroProps extends UnileverLibraryComponent<HeroContent> {
  viewType: string;
  titleLevel?: titleLevel;
  imageIsLink?: boolean;
}

export interface HeroContent extends AppContent.HeroContent {
  image?: Image;
}

export interface Image extends AppContent.ImageContent {
  localImage?: Internal.LocalImage;
}
