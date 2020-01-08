import { SocialIcons } from '../models';

export interface SocialSharingBaseProps {
  showTextLabels?: boolean;
  buttonClassName?: string;
  buttons: AppContent.SocialSharing.SocialButton[];
  icons?: SocialIcons;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSocialButtonClick?: (shareObject: Record<string, any>) => void;
  handleSocialDialogClose?: () => void;
  addThisReady: boolean;
  brand?: string;
}
