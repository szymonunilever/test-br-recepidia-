import _sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import { RecipeSortingOptions } from '../partials';

const sortByPreparationTime = (list: Internal.Recipe[]) =>
  _sortBy(list, ['recipeDetails.preperationTime']);

const sortByCookingTime = (list: Internal.Recipe[]) =>
  _sortBy(list, ['recipeDetails.cookTime']);

const sortByAverageRating = (list: Internal.Recipe[]) => {
  //TODO: find what property we can use for this and rewrite method
  return list;
};

const sortByNewest = (list: Internal.Recipe[]) =>
  _sortBy(list, ['creationTime']);

const sortByTitle = (list: Internal.Recipe[]) => _sortBy(list, ['title']);

export function applyingFavorites(
  list: Internal.Recipe[],
  withFavorites: boolean,
  favorites: number[]
) {
  return withFavorites && favorites && list.length > 0
    ? list.map(item => {
        const inFavorite =
          findIndex(favorites, fav => fav === item.recipeId) > -1;
        return Object.assign(item, { inFavorite: inFavorite });
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
    filtersPanel = {
      title: 'Filtros',
      ctas: {
        reset: { label: 'Limpar filtros' },
        apply: { label: 'Aplicar filtros' },
      },
    },
  } = content;
  return {
    title,
    cta,
    resultLabel,
    resultLabelPlural,
    optionLabels,
    sortSelectPlaceholder,
    filtersPanel,
    ...content,
  };
}
export function sortBy(sort: RecipeSortingOptions, list: Internal.Recipe[]) {
  switch (sort) {
    case RecipeSortingOptions.preparationTime:
      return sortByPreparationTime(list);
    case RecipeSortingOptions.cookingTime:
      return sortByCookingTime(list);
    case RecipeSortingOptions.averageRating:
      return sortByAverageRating(list);
    case RecipeSortingOptions.title:
      return sortByTitle(list);
    case RecipeSortingOptions.newest:
      return sortByNewest(list);
    default:
      return sortByNewest(list);
  }
}

export function applyFilters(
  filters: Internal.Tag[],
  list: Internal.Recipe[]
): Internal.Recipe[] {
  if (filters.length > 0) {
    const filteredList = filter(list, (item: Internal.Recipe) => {
      const { tagGroups } = item;

      const includedTags = filter(tagGroups, (item: Internal.TagGroup) => {
        if (filters) {
          return !!filters.find(filter => {
            if (item.tags) {
              return !!item.tags.find(tag => tag.id === filter.tagId);
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });

      return includedTags.length > 0;
    });

    return filteredList;
  } else {
    return list;
  }
}
