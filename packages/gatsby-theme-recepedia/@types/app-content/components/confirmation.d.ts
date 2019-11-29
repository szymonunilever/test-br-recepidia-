declare namespace AppContent {
  interface ConfirmationContent extends BaseContent {
    title?: string;
    text?: string;
    yesButtonText: CTAContent;
    noButtonText: CTAContent;
  }
}
