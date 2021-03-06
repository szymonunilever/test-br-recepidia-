import { UnileverLibraryComponent } from '../../models/globalModels';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RichTextProps
  extends UnileverLibraryComponent<AppContent.RichTextContent> {
  type?: 'html' | 'markdown' | 'md';
}
