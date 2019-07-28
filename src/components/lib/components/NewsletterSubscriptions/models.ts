import { UnileverLibraryComponent } from '../globalModels';

export interface NewsletterSubscriptionProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content> {
  onSubmit: (values: object) => void;
}
