export interface SocialChannelProps {
  url: string;
  label?: string | false;
  icon: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>;
}
