export interface SocialChannelProps {
  url: string;
  label?: string | false;
  icon: JSX.Element;
  attributes?: Record<string, any>;
}
