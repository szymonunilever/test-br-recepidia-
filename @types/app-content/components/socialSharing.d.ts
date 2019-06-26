declare namespace AppContent.SocialSharing {
  interface Content extends BaseContent {
    buttons: SocialButton[];
    openModalButton?: AppContent.CTAContent;
  }

  interface SocialButton extends BaseContent {
    label: string;
    linkTitleToShare?: string;
    linkDescriptionToShare?: string;
  }
}
