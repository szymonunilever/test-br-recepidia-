declare namespace AppContent.BrandSocialChannels {
  interface Content extends BaseContent {
    socialItems: SocialsItems;
  }

  interface SocialsItems {
    facebook: SocialItem;
    instagram: SocialItem;
    twitter: SocialItem;
    youtube: SocialItem;
    [key: string]: SocialItem;
  }

  export interface SocialItem {
    url: string;
    label: string;
  }
}
