import { UnileverLibraryComponent } from '../common/globalModels';

export interface GeneratedFormProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content> {
  onSubmit: (values: object) => void;
  shouldValidate?: boolean;
  recaptchaAction?: string;
  hasCaptcha?: boolean;
}
