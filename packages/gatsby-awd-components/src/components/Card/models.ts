import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../models/globalModels';

export interface CardProps extends UnileverLibraryComponent<AppContent.Card> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  titleLevel: titleLevel;
}
