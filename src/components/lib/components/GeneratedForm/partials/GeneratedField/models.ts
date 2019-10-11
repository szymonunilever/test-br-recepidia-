import { UnileverLibraryComponent } from '../../../../models/globalModels';

export interface GeneratedFieldProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Field> {
  innerContent?: JSX.Element[];
  shouldValidate?: boolean;
}
