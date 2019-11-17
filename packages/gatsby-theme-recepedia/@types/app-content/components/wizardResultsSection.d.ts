declare namespace AppContent.WizardResultsSection {
  interface Content {
    onResult: {
      title: string;
      subheading?: string;
      ctas: WizardCTA[];
    };
    noResult: {
      title: string;
      subheading?: string;
      ctas: WizardCTA[];
    };
  }
  interface WizardCTA {
    type: string;
    content: CTAContent;
  }
}
