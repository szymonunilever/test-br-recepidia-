export interface RecipeAttributeCardProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  label?: AppContent.RecipeAttributes.LabelItem;
  value: string | number;
  type: string;
}
