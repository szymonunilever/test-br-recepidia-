export interface RecipeDietaryAttributesProps {
  className?: string;
  attributes: Internal.Tag[];
  icons: RecipeDietaryAttributeIcon[];
  infoIcon: JSX.Element;
  activeAttributes: RMSData.Tag[];
  showInactiveAttributes?: boolean;
}

export interface RecipeDietaryAttributeIcon {
  id: string | number | string[] | number[];
  active?: JSX.Element;
  inActive?: JSX.Element;
}
