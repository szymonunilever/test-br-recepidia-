import React from 'react';
import {
  ReactComponent as ArrowIcon,
  ReactComponent as OpenIcon,
} from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as ClosedIcon } from 'src/svgs/inline/arrow-up.svg';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import { ReactComponent as FilterIcon } from 'src/svgs/inline/filter.svg';
import {
  ReactComponent as RemoveTagIcon,
  ReactComponent as CloseSvg,
} from 'src/svgs/inline/x-mark.svg';
import { Button, ButtonViewType } from '../components/Button';
import { IMAGE_SIZES } from '../components/constants';
import {
  LoadMoreType,
  RecipeListingProps,
  RecipeListViewType,
} from '../components/RecipeListing';
import {
  RecipeCard,
  RecipeCardProps,
  RecipeListingTrivialProps,
} from '../components/';
import { FilterOptions, FilterProps, FilterIcons } from '../components/Filter'
import tagGroupsData from './allTagGrouping.json';
import recipes from './recipes';
import dataSource from './recipes.json';

export const icons: FilterIcons = {
  close: CloseSvg,
  closed: ClosedIcon,
  filter: FilterIcon,
  open: OpenIcon,
  removeTag: RemoveTagIcon,
};
const contents: { [key: string]: AppContent.RecipeListing.Content } = {
  trivial: {
    title: 'Recipe listing Trivial without results',
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
  },
  base: {},
  advanced: {},
};
contents.base = {
  ...contents.trivial,
  title: 'Recipe listing Base with Load More',
  cta: {
    label: 'Load More Button',
  },
};
contents.advanced = {
  ...contents.base,
  title: 'Recipe listing Advanced',
  resultLabel: 'recipe',
  resultLabelPlural: 'recipes',
  sortSelectPlaceholder: 'Sort By',
  filtersPanel: {
    title: 'Filtros',
    ctas: {
      reset: {
        label: 'Limpar filtros',
      },
      apply: {
        label: 'Aplicar filtros',
      },
    },
  },
  optionLabels: {
    preparationTime: 'Preparation time Test',
    cookingTime: 'Cooking time',
    averageRating: 'Average rating',
    newest: 'newest',
    recentlyUpdated: 'Recently updated',
    title: 'title',
  },
};
const tagGroups: Internal.TagGroup[] =
  tagGroupsData.allTagGroupings.nodes || [];
export const tags: FilterOptions = {
  tagGroups,
  displayCategories: [
    'dishes',
    'mainIngredient',
    'cuisines',
    'difficulties',
    'dietary',
    'budgets',
  ],
};
export const list: Internal.Recipe[] = dataSource.data.allRecipe.edges.map(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (item: { node: Internal.Recipe | any }) => item.node
);

const optionLabels: FilterProps['content']['optionLabels'] = {
  preparationTime: 'Preparation time Test',
  cookingTime: 'Cooking time',
  averageRating: 'Average rating',
  newest: 'newest',
  recentlyUpdated: 'Recently updated',
  title: 'title',
};

const filtersContentDefault: FilterProps['content'] = {
  resultLabel: 'recipe',
  resultLabelPlural: 'recipes',
  filtersPanel: {
    title: 'Filtros',
    ctas: {
      reset: { label: 'Limpar filtros' },
      apply: { label: 'Aplicar filtros' },
    },
  },
};

export const [recipe] = list;

const onButtonClick = (val:boolean, recipeId: number) => {
  console.log(val, recipeId);
};

export const recipeCardButtons:RecipeCardProps['children'] = [
  <Button
    className="recipe-card__favorite"
    Icon={FavoriteIcon}
    onClick={onButtonClick}
    isToggle={true}
    viewType={ButtonViewType.icon}
    attributes={{ 'aria-label' : 'favorite toggle' }}
  />,
  <Button
    className="recipe-card__remove"
    Icon={ClosedIcon}
    onClick={onButtonClick}
    viewType={ButtonViewType.icon}
    attributes={{ 'aria-label' : 'remove' }}
  />,
];

export const recipeCardPropsDefault: RecipeCardProps = {
  id: recipe.id,
  recipeId: recipe.recipeId,
  slug: recipe.fields.slug,
  localImage: recipe.localImage,
  ratingProvider: 2,
  imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  content: { title: 'test card' },
  children: recipeCardButtons[0],
};
export const recipeCardPropVariants: RecipeCardProps[] = [
  recipeCardPropsDefault,
  { ...recipeCardPropsDefault, ratingProvider: 0 },
  { ...recipeCardPropsDefault, ratingProvider: 1},
  { ...recipeCardPropsDefault, content: {}},
  // @ts-ignore
  { ...recipeCardPropsDefault, isExternalLink: true,},
];

export const filtersContentVariants: FilterProps['content'][] = [
  filtersContentDefault,
  { ...filtersContentDefault, optionLabels },
];

export const recipeCards: {[key:string]: RecipeListingProps['children']} = {
  withFavorites: list.map(recipe => (
    <RecipeCard {...
      {
        id: recipe.id,
        recipeId: recipe.recipeId,
        slug: recipe.fields.slug,
        localImage: recipe.localImage,
        ratingProvider: 2,
        imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
        content: { ...recipe },
        children: recipeCardButtons[0],
      }
    } />
  )),
  withoutFavorites: list.map(recipe => (
    <RecipeCard {...
      {
        id: recipe.id,
        recipeId: recipe.recipeId,
        slug: recipe.fields.slug,
        localImage: recipe.localImage,
        ratingProvider: 2,
        imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
        content: { ...recipe },
        children: [],
      }
                } />
  )),
};

export const recipeListingPropsVariants: {
  [key: string]: RecipeListingProps;
} = {
  trivialNoResults: {
    list: [],
    children:[],
    viewType: RecipeListViewType.Trivial,
    content: {
      ...contents.trivial,
      title: 'Recipe Listing Trivial without Results',
    },
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
  trivial: {
    list,
    children: recipeCards.withoutFavorites,
    viewType: RecipeListViewType.Trivial,
    content: contents.trivial,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
  trivialWithFavorites: {
    list,
    recipePerLoad: 4,
    viewType: RecipeListViewType.Trivial,
    content: contents.trivial,
    children: recipeCards.withFavorites,
    titleLevel: 1,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
  base: {
    list,
    children: recipeCards.withFavorites,
    viewType: RecipeListViewType.Base,
    content: { ...contents.base, title: 'Recipe Listing Base without Results' },
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
    titleLevel: 1,
  },
  baseNoResults: {
    list: [],
    children: [],
    viewType: RecipeListViewType.Base,
    content: contents.base,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
    titleLevel: 1,
  },
  baseWithAsDefault: {
    list,
    children: recipeCards.withFavorites,
    viewType: RecipeListViewType.Base,
    content: contents.base,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
  baseWithLoadMoreConfig: {
    list,
    children: recipeCards.withFavorites,
    viewType: RecipeListViewType.Base,
    content: contents.base,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
    loadMoreConfig: {
      type: LoadMoreType.async,
    },
  },
  advanced: {
    list,
    children: recipeCards.withFavorites,
    viewType: RecipeListViewType.Advanced,
    content: contents.advanced,
    titleLevel: 1,
    tags,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
  carousel: {
    list,
    children: recipeCards.withoutFavorites,
    viewType: 1,
    content: contents.trivial,
    carouselConfig: {
      breakpoints: [
        {
          width: 1366,
          switchElementsBelowBreakpoint: 1,
          switchElementsAfterBreakpoint: 2,
          visibleElementsBelowBreakpoint: 2,
          visibleElementsAboveBreakpoint: 4,
        },
      ],
      arrowIcon: ArrowIcon,
    },
    titleLevel: 1,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
  carouselWithFavorites: {
    children: recipeCards.withFavorites,
    isExternalItemLink: true,
    list,
    viewType: 1,
    content: contents.trivial,
    carouselConfig: {
      breakpoints: [
        {
          width: 1366,
          switchElementsBelowBreakpoint: 1,
          switchElementsAfterBreakpoint: 2,
          visibleElementsBelowBreakpoint: 2,
          visibleElementsAboveBreakpoint: 4,
        },
      ],
      arrowIcon: ArrowIcon,
    },
    titleLevel: 2,
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
  carouselWithDefaults: {
    list,
    children: recipeCards.withFavorites,
    viewType: 1,
    content: contents.trivial,
    carouselConfig: {
      breakpoints: [
        {
          width: 1366,
          switchElementsBelowBreakpoint: 1,
          switchElementsAfterBreakpoint: 2,
          visibleElementsBelowBreakpoint: 2,
          visibleElementsAboveBreakpoint: 4,
        },
      ],
      arrowIcon: ArrowIcon,
    },
    imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  },
};

const recipeListingTrivialPropsDefault = {
  list,
  children: recipeCards.withFavorites,
  content: contents.trivial,
  dataFetched: true,
  imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
};
export const recipeListingTrivialPropsVariants: RecipeListingTrivialProps[] = [
  // @ts-ignore
  recipeListingTrivialPropsDefault,
  // @ts-ignore
  { ...recipeListingTrivialPropsDefault, list: [], children:[] },
  // @ts-ignore
  { ...recipeListingTrivialPropsDefault},
];
export const recipeContents = contents;
