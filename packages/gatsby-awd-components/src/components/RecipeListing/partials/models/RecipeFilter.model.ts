import { Icon, UnileverLibraryComponent } from '../../../../models';
import { RecipeListingProps } from '../../models';

export enum RecipeSortingOptions {
  newest,
  preparationTime,
  cookingTime,
  averageRating,
  title,
}

export const RecipeSortingOptionsFieldsMappings = {
  [ RecipeSortingOptions.newest ] : [ { creationTime : { order : 'desc' } } ],
  [ RecipeSortingOptions.preparationTime ] : 'recipeDetails.preperationTime',
  [ RecipeSortingOptions.cookingTime ] : 'recipeDetails.cookTime',
  [ RecipeSortingOptions.averageRating ] : [ { averageRating : { order : 'desc' } } ],
  [ RecipeSortingOptions.title ] : 'title.keyword',
};

export interface RecipeFilterOptions {
  tagGroups: Internal.TagGroup[];
  displayCategories?: string[];
}

export interface RecipeFilterProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onChangeSorting: (sort: RecipeSortingOptions) => void;
  onChangeFilter: (filter: Internal.Tag[]) => void;
  results: number;
  filterTitle?: string;
  icons: FilterIcons;
  sortSelectPlaceholder: string;
  dataFetched?: RecipeListingProps['dataFetched'];
}

export interface FilterSettingsProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onFilterChange: (filter: Internal.Tag[]) => void;
  filtersSelected: Internal.Tag[];
  hidden?: boolean;
  icons: FilterIcons;
  onApply: () => void;
}

export interface FilterIcons {
  closed?: Icon;
  close: Icon;
  open?: Icon;
  filter?: Icon;
  removeTag?: Icon;
}
