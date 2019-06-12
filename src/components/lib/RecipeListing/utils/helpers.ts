import { sortBy as _sortBy, findIndex } from 'lodash';
import { RecipeListingContent } from '../models';
import { RecipeItem, RecipeSortingOptions } from '../partials';

const sortByPreparationTime = (list: RecipeItem[]) =>
  _sortBy(list, ['preparationTime', 'creationDate']);

const sortByCookingTime = (list: RecipeItem[]) =>
  _sortBy(list, ['cookingTime', 'creationDate']);

const sortByAverageRating = (list: RecipeItem[]) => {
  //TODO: find what property we can use for this and rewrite method
  return list;
};

const sortByNewest = (list: RecipeItem[]) => _sortBy(list, ['creationDate']);

const sortByRecentlyUpdate = (list: RecipeItem[]) => {
  //TODO: find what property we can use for this and rewrite method
  return list;
};

const sortByTitle = (list: RecipeItem[]) => _sortBy(list, ['title']);

export function applyingFavorites(
  list: RecipeItem[],
  withFavorites: boolean,
  favorites: string[]
) {
  return withFavorites && favorites.length > 0 && list.length > 0
    ? list.map(item => {
        const inFavorite = !!findIndex(favorites, fav => fav === item.id);
        return Object.assign(item, inFavorite);
      })
    : list;
}

export function applyContentDefaults(content: RecipeListingContent) {
  const {
    title,
    cta = { label: 'Find More' },
    resultLabel = 'recipe',
    resultLabelPlural = 'recipes',
    optionLabels = {
      PreparationTime: 'Preparation time',
      CookingTime: 'Cooking time',
      AverageRating: 'Average rating',
      Newest: 'Newest',
      RecentlyUpdated: 'Recently updated',
      Title: 'Title',
    },
    sortSelectPlaceholder = 'Sort by',
  } = content;
  return {
    title,
    cta,
    resultLabel,
    resultLabelPlural,
    optionLabels,
    sortSelectPlaceholder,
  };
}
export function sortBy(sort: RecipeSortingOptions, list: RecipeItem[]) {
  switch (sort) {
    case RecipeSortingOptions.PreparationTime:
      return sortByPreparationTime(list);
    case RecipeSortingOptions.CookingTime:
      return sortByCookingTime(list);
    case RecipeSortingOptions.AverageRating:
      return sortByAverageRating(list);
    case RecipeSortingOptions.RecentlyUpdated:
      return sortByRecentlyUpdate(list);
    case RecipeSortingOptions.Title:
      return sortByTitle(list);
    case RecipeSortingOptions.Newest:
      return sortByNewest(list);
    default:
      return sortByNewest(list);
  }
}
