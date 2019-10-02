import { ProfileKey } from '../../utils/browserStorage/models';
import {
  titleLevel,
  UnileverLibraryComponent,
} from '../lib/components/globalModels';

export interface DataCapturingFormProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content> {
  stepId?: string;
  containerClass?: string;
  titleRenderer?: (markup: JSX.Element) => JSX.Element;
  titleLevel?: titleLevel;
  url: string;
  host: string;
  pathToData: ProfileKey;
  actionCallback?: (answers: object) => void;
}
