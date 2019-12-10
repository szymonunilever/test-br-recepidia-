import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../models/globalModels';

export interface ContactCardProps extends UnileverLibraryComponent<AppContent.ContactCard> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  titleLevel: titleLevel;
}
