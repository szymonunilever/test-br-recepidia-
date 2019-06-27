declare namespace AppContent {
  interface HeroContent extends BaseContent {
    header?: string;
    shortSubheader?: string;
    longSubheader?: string;
    image?: AppContent.ImageContent;
    primaryCTA?: AppContent.CTAContent;
    secondaryCTA?: AppContent.CTAContent;
  }
}
