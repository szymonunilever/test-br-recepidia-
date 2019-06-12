declare namespace UnileverComponents {
  interface HeroContent extends BaseContent {
    header?: string;
    shortSubheader?: string;
    longSubheader?: string;
    image?: {
      url: string;
      alt: string;
    };
    primaryCTA?: {
      text: string;
      linkTo: string;
    };
    secondaryCTA?: {
      text: string;
      linkTo: string;
    };
  }
}
