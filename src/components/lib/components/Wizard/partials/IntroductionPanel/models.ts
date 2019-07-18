import { FluidObject } from 'gatsby-image';
import { ResultsStore } from '../../models';

export interface IntroductionPanelProps {
  title: string;
  description: string;
  image: {
    fluid: FluidObject;
    alt: string;
  };
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  actionCallback?: () => void;
  resultsStore: ResultsStore;
  containerClass: string;
  stepId: string;
}
