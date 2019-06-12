declare namespace UnileverComponents {
  interface HeroContent {
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
