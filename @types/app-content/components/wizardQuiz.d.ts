declare namespace AppContent.WizardQuiz {
  interface Content {
    questions: Question[];
    primaryButtonLabel: string;
    primaryButtonFinalLabel?: string;
    secondaryButtonLabel: string;
  }
  interface Question {
    orderIndex: number;
    id: number;
    key: string;
    label: string;
    type: {
      control: string;
      labelPosition: string;
    };
    options: QuestionOption[];
  }

  interface QuestionOption {
    value: string;
    label: {
      text: string;
      image: {
        url: string;
        alt: string;
      };
    };
  }
}
