import { sortBy as _sortBy, findIndex, filter, intersectionBy } from 'lodash';
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

export function applyContentDefaults(
  content: AppContent.RecipeListing.Content
) {
  const {
    title,
    cta = { label: '' },
    resultLabel = '',
    resultLabelPlural = '',
    optionLabels = {
      preparationTime: '',
      cookingTime: '',
      averageRating: '',
      newest: '',
      recentlyUpdated: '',
      title: '',
    },
    sortSelectPlaceholder = '',
    filtersCta = {
      resetLabel: { label: '' },
      applyLabel: { label: '' },
    },
  } = content;
  return {
    title,
    cta,
    resultLabel,
    resultLabelPlural,
    optionLabels,
    sortSelectPlaceholder,
    filtersCta,
    ...content,
  };
}
export function sortBy(sort: RecipeSortingOptions, list: RecipeItem[]) {
  switch (sort) {
    case RecipeSortingOptions.preparationTime:
      return sortByPreparationTime(list);
    case RecipeSortingOptions.cookingTime:
      return sortByCookingTime(list);
    case RecipeSortingOptions.averageRating:
      return sortByAverageRating(list);
    case RecipeSortingOptions.recentlyUpdated:
      return sortByRecentlyUpdate(list);
    case RecipeSortingOptions.title:
      return sortByTitle(list);
    case RecipeSortingOptions.newest:
      return sortByNewest(list);
    default:
      return sortByNewest(list);
  }
}

export function applyFilters(
  filters: RMSData.Tag[],
  list: RecipeItem[]
): RecipeItem[] {
  if (filters.length > 0) {
    return filter(list, (item: RecipeItem) => {
      const { categories } = item;
      const includedTags = filter(categories, (item: RMSData.TagCategory) => {
        return (
          intersectionBy(item.tags, filters, 'id').length >= filters.length
        );
      });
      return includedTags.length > 0;
    });
  } else {
    return list;
  }
}
