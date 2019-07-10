import { UnileverLibraryComponent } from '../common/globalModels';

export interface BrandSocialChannelsProps
  extends UnileverLibraryComponent<AppContent.BrandSocialChannels.Content> {
  listIcons: SocialIcons;
  displayLabel?: boolean;
}

interface SocialIcons {
  facebook: JSX.Element;
  pinterest: JSX.Element;
  twitter: JSX.Element;
  instagram: JSX.Element;
  [key: string]: JSX.Element;
}
