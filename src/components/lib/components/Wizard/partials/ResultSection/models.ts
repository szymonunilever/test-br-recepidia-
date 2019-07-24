export interface ResultSectionProps {
  title: string;
  subheading: string;
  items: Internal.Recipe[];
  [key: string]: string | number | boolean | object | null;
}
