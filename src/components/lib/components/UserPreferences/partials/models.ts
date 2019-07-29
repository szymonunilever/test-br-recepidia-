export interface PreferencesIntroProps {
  heading?: string;
  content?: string;
  availableQuizLinks?: QuizLink[];
}

export interface QuizLink {
  label: string;
  path: string;
}
