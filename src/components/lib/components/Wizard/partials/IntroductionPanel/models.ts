import { WizardStepComponent } from '../../../globalModels';
import { ResultsStore } from '../../models';
import { AdaptiveImageProps } from '../../../AdaptiveImage/models';
import { ReactNode } from 'react';

export interface IntroductionPanelProps extends WizardStepComponent {
  title: string;
  description: string;
  image: AdaptiveImageProps;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  resultsStore: ResultsStore;
  bottomContent: ReactNode | ReactNode[];
}
