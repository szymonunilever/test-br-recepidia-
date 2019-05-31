export enum TagName {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p
}

export interface TextProps {
  className?: string;
  tag: TagName;
  text: string;
}
