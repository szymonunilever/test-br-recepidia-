export interface ResultSectionProps {
  title: string;
  // @ts-ignore
  subheading?: string;
  [key: string]: string | number | boolean | object | null;
}
