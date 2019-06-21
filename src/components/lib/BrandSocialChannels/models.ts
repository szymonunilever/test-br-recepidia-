import { UnileverLibraryComponent } from '../common/globalModels';

export interface BrandSocialChannelsProps
  extends UnileverLibraryComponent<AppContent.BrandSocialChannels.Content> {
  listicons: SocialIcons;
  displayLabel?: boolean;
}

interface SocialIcons {
  facebook: JSX.Element;
  instagram: JSX.Element;
  twitter: JSX.Element;
  youtube: JSX.Element;
  [key: string]: JSX.Element;
}
