import { titleLevel, UnileverLibraryComponent } from '../globalModels';

export interface GeneratedFormProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content> {
  onSubmit: (values: object) => void;
  titleLevel?: titleLevel;
  shouldValidate?: boolean;
  recaptchaAction?: string;
  hasCaptcha?: boolean;
}
