import { UnileverLibraryComponent } from '../globalModels';
export enum RecipeAttributesKeys {
  serves,
  makes,
  difficulties,
  cookingTime,
  preparationTime,
  totalTime,
}

export interface RecipeAttributeIcons {
  serves?: JSX.Element;
  makes?: JSX.Element;
  difficulties?: JSX.Element;
  cookingTime?: JSX.Element;
  preparationTime?: JSX.Element;
  waitingTime?: JSX.Element;
  marinateTime?: JSX.Element;
  ovenTime?: JSX.Element;
  freezeTime?: JSX.Element;
  chillTime?: JSX.Element;
  brewTime?: JSX.Element;
  totalTime?: JSX.Element;
  [key: string]: JSX.Element | undefined;
}

export interface RecipeAttributesProps
  extends UnileverLibraryComponent<AppContent.RecipeAttributes.Content> {
  visible?: RecipeAttributesKeys[];
  recipe: RMSData.Recipe;
  icons?: RecipeAttributeIcons;
}
