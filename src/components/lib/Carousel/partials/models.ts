import { UnileverLibraryComponent } from '../../common/globalModels';
import { RecipeCardFavoriteCallback } from '../../RecipeListing/partials/models';

export interface OnArrowClick {
  (): void;
}

export interface ArrowProps {
  direction: string;
  clickFunction?: OnArrowClick;
  icon: any;
}

export interface ProgressBarProps {
  percentage: number;
}
