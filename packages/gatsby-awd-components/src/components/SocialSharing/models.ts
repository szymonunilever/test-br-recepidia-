import { FluidObject } from 'gatsby-image';
import { UnileverLibraryComponent, titleLevel, Icon } from '../../models';
import * as React from 'react';

export enum SocialSharingViewType {
  Base,
  Modal,
}
export type SocialIcon = Internal.LocalImage | Icon;
export interface SocialIcons {
  bitly?: SocialIcon;
  copyLink?: SocialIcon;
  email?: SocialIcon;
  linkedIn?: SocialIcon;
  pinterest?: SocialIcon;
  tumblr?: SocialIcon;
  line?: SocialIcon;
  whatsApp?: SocialIcon;
  facebook?: SocialIcon;
  twitter?: SocialIcon;
  [key: string]: SocialIcon;
}

export interface SocialSharingProps
  extends UnileverLibraryComponent<AppContent.SocialSharing.Content> {
  viewType?: SocialSharingViewType;
  showTextLabels?: boolean;
  buttonClassName?: string;
  OpenModelButtonIcon?: Icon;
  CloseButtonIcon?: Icon;
  icons?: SocialIcons;
  titleLevel?: titleLevel;
  WidgetScript: React.FunctionComponent<WidgetScriptProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSocialButtonClick?: (shareObject: Record<string, any>) => void;
  handleSocialDialogClose?: () => void;
}

export interface WidgetScriptProps {
  callback: (e: Event) => void;
}
