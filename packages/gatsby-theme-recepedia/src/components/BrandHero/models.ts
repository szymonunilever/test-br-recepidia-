import { titleLevel } from 'gatsby-awd-components/src';

export interface BrandHeroProps {
  titleLevel?: titleLevel;
  className?: string;
  brandLogo: SVGElement;
  content: BrandHeroContentProps;
  imageSizes?: string;
}

interface BrandHeroContentProps {
  title: string;
  image: Image;
  links: AppContent.LinkContent[];
}

interface Image extends AppContent.ImageContent {
  localImage: Internal.LocalImage;
}
