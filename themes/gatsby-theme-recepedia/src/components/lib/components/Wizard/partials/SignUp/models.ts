export interface SignUpProps {
  title: string;
  formContent: AppContent.GeneratedForm.Content;
  actionCallback: () => void;
  containerClass: string;
  stepId: string;
}
