import { Icon } from '../../models';

export interface RecipeDietaryAttributesProps {
  className?: string;
  attributes: Internal.Tag[];
  icons: {
    [key: number]: {
      active: Icon;
      inActive?: Icon;
    };
  };
  infoIcon: JSX.Element;
  activeAttributes: RMSData.Tag[];
  showInactiveAttributes?: boolean;
  categoryLinksMap?: { [key: string]: string };
}
