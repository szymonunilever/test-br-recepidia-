declare namespace AppContent {
  interface HeroContent extends BaseContent {
    header?: string;
    shortSubheader?: string;
    longSubheader?: string;
    image?: {
      url: string;
      alt: string;
    };
    primaryCTA?: AppContent.CTAContent;
    secondaryCTA?: AppContent.CTAContent;
  }
}
