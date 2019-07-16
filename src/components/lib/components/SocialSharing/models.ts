import { FluidObject } from 'gatsby-image';
import { UnileverLibraryComponent, titleLevel } from '../common/globalModels';

export enum SocialSharingViewType {
  Base,
  Modal,
}

export interface SocialIcons {
  /*eslint @typescript-eslint/no-explicit-any:*/
  bitly?: FluidObject | any;
  copyLink?: FluidObject | any;
  email?: FluidObject | any;
  linkedIn?: FluidObject | any;
  pinterest?: FluidObject | any;
  tumblr?: FluidObject | any;
  line?: FluidObject | any;
  whatsApp?: FluidObject | any;
  facebook?: FluidObject | any;
  twitter?: FluidObject | any;
  [key: string]: FluidObject | any;
}

export interface SocialSharingProps
  extends UnileverLibraryComponent<AppContent.SocialSharing.Content> {
  viewType?: SocialSharingViewType;
  showTextLabels?: boolean;
  buttonClassName?: string;
  CloseButtonIcon?: any;
  icons?: SocialIcons;
  titleLevel?: titleLevel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSocialButtonClick?: (shareObject: Record<string, any>) => void;
  handleSocialDialogClose?: () => void;
}
