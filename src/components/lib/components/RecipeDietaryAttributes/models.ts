export interface RecipeDietaryAttributesProps {
  className?: string;
  attributes: RMSData.Tag[];
  icons: Icon[];
  activeAttributes: RMSData.Tag[];
  showInactiveAttributes?: boolean;
}

export interface Icon {
  id: string | number;
  active?: JSX.Element;
  inActive?: JSX.Element;
}
