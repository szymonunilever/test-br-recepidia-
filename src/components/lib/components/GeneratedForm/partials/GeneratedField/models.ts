import { UnileverLibraryComponent } from '../../../common/globalModels';

export interface GeneratedFieldProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Field> {
  innerContent?: JSX.Element[];
  shouldValidate?: boolean;
}
