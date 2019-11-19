declare namespace AppContent.SocialSharing {
  interface Content extends BaseContent {
    buttons: SocialButton[];
    openModalButton?: AppContent.CTAContent;
    modalTitle?: string;
  }

  interface SocialButton {
    label: string;
    linkTitleToShare?: string;
    linkDescriptionToShare?: string;
    name: string;
  }
}
