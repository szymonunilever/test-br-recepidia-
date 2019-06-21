export interface RecipeDietaryAttributesProps {
  className?: string;
  attributes: Attribute[];
  icons: Icon[];
  activeAttributes: Attribute[];
}

interface Attribute {
  id: number | string;
  name: string;
}

export interface Icon {
  id: string | number;
  active?: JSX.Element;
  inActive?: JSX.Element;
}
