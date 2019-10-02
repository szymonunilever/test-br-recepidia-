declare namespace AppContent.WizardResultsSection {
  interface Content {
    onResult: {
      title: string;
      subheading?: string;
      primaryButtonLabel?: string;
    };
    noResult: {
      title: string;
      subheading?: string;
      primaryButtonLabel?: string;
    };
  }
}
