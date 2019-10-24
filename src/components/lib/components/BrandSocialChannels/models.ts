import { UnileverLibraryComponent } from '../../models/globalModels';

export interface BrandSocialChannelsProps
  extends UnileverLibraryComponent<AppContent.BrandSocialChannels.Content> {
  listIcons: SocialIcons;
  displayLabel?: boolean;
}

interface SocialIcons {
  facebook: JSX.Element;
  instagram: JSX.Element;
  [key: string]: JSX.Element;
}
