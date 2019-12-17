import { WizardStepComponent } from 'gatsby-awd-components/src';

export interface MealPannerResultsProps extends WizardStepComponent {
  containerClass: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: any;
  maxResults: number;
  resultsDefault: Internal.Recipe[];
  resultContentTitle: string;
  refreshResults: (
    results: Internal.Recipe[],
    needFetchNewData?: boolean
  ) => void;
  changeResultSize?: (size: number) => void;
  callback(): void;
  isLoading: boolean;
}
