import { ProfileKey } from '../../utils/browserStorage/models';
import {
  titleLevel,
  UnileverLibraryComponent,
  WizardStepComponent,
} from 'gatsby-awd-components/src';

export interface DataCapturingFormProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content>,
    WizardStepComponent {
  titleRenderer?: (markup: JSX.Element) => JSX.Element;
  titleLevel?: titleLevel;
  url: string;
  formType: string;
  pathToData: ProfileKey;
}

export interface DataPrepopulateProps {
  email: string;
  firstName: string;
  lastName: string;
}
