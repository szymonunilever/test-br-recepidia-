export interface PreferencesIntroProps {
  heading?: string;
  subheading?: AppContent.RichTextContent;
  content?: string;
  availableQuizLinks?: QuizLink[];
}

export interface QuizLink {
  label: string;
  path: string;
}
