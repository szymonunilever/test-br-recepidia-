import { UnileverLibraryComponent } from '../globalModels';

export interface GeneratedFormProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content> {
  onSubmit: (values: object) => void;
  shouldValidate?: boolean;
  recaptchaAction?: string;
  hasCaptcha?: boolean;
}
