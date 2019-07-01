import { titleLevel, UnileverLibraryComponent } from '../common/globalModels';

export interface GeneratedFormProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content> {
  onSubmit: (values: object) => Promise<void>;
  shouldValidate?: boolean;
  titleLevel?: titleLevel;
}
