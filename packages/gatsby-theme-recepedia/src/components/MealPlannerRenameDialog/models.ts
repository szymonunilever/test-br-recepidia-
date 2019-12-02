import { UnileverLibraryComponent } from 'gatsby-awd-components/src';

export interface MealPlannerRenameDialogProps
  extends UnileverLibraryComponent<AppContent.GeneratedForm.Content> {
  isOpen?: boolean;
  callback: (val?: string) => void;
}
