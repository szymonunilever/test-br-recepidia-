export interface RecipeDietaryAttributesProps {
  className?: string;
  attributes: Internal.Tag[];
  icons: Icon[];
  activeAttributes: Internal.Tag[];
  showInactiveAttributes?: boolean;
}

export interface Icon {
  id: string | number;
  active?: JSX.Element;
  inActive?: JSX.Element;
}
