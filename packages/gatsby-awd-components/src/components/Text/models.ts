export enum TagName {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  p,
}

export interface TextProps {
  className?: string;
  id?: string;
  tag: TagName;
  text: string;
}
