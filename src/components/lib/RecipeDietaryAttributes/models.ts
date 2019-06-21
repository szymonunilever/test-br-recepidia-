export interface RecipeDietaryAttributesProps {
  className?: string;
  listAttributes: Attribute[];
  listActiveAttributes: Attribute[];
  listIcons: Icon[];
}

interface Attribute {
  id: number;
  name: string;
}

export interface Icon {
  id: number;
  active: JSX.Element;
  inActive: JSX.Element;
}
