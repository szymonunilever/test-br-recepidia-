declare namespace AppContent {
  interface HeroContent extends BaseContent {
    header?: string;
    shortSubheader?: string;
    longSubheader?: string;
    image?: AppContent.ImageContent;
    primaryCta?: AppContent.CTAContent;
    secondaryCta?: AppContent.CTAContent;
  }
}
