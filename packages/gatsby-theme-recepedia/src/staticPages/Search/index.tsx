import { graphql, navigate } from 'gatsby';
import React, { useEffect, useState, useCallback } from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import cx from 'classnames';
import {
  Hero,
  PageListing,
  PageListingViewTypes,
  RecipeListViewType,
  SearchListing,
  Tags,
  RatingAndReviewsProvider,
  WithLocation as withLocation,
  WithLocationProps,
} from 'gatsby-awd-components/src';
import { findPageComponentContent } from 'src/utils';
import Kritique from 'integrations/Kritique';
import DigitalData from '../../../integrations/DigitalData';
import {
  favoriteButtonDefaults,
  RecipeListingIcons as icons,
} from '../../themeDefaultComponentProps';
import theme from './search.module.scss';
import { ReactComponent as SearchIcon } from 'src/svgs/inline/search-icon.svg';
import useSearchResults from './useSearchResults';
import { getTagsFromRecipes } from 'src/utils/getTagsFromRecipes';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
// Component Styles
import '../../scss/pages/_searchListing.scss';
import useFavorite from 'src/utils/useFavorite';
import { IMAGE_SIZES } from 'src/constants';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as CloseSvg } from 'src/svgs/inline/x-mark.svg';

const SearchPage = ({ data, pageContext, searchQuery }: SearchPageProps) => {
  const {
    page: { seo, components, type, relativePath },
  } = pageContext;
  const { allTag, allCategory, allTagGroupings } = data;
  const pageListingData = allCategory.nodes.map(category => ({
    ...category,
    path: category.fields.slug,
  }));

  const {
    getArticleSearchData,
    getSearchSuggestionData,
    recipeResults,
    articleResults,
    searchInputResults,
    resultsFetched,
    initialRecipesCount,
    initialTagsCount,
    getRecipeSearchData,
    getTagRecipeSearchData,
  } = useSearchResults(searchQuery);

  const updateUrlParams = (searchStr: string) => {
    return navigate(`${relativePath}?searchQuery=${searchStr}`);
  };

  const [tagList, setTagList] = useState<Internal.Tag[]>([]);
  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
  );

  const getFilterQuery = useCallback((tags: Internal.Tag[]) => {
    const tagsWithCategories = tags.map(tag => {
      const category = allTagGroupings.nodes.find(
        // @ts-ignore
        cat => cat.children.findIndex(el => el.id === tag.id) !== -1
      );
      let tagWithCategory: Internal.Tag & { category?: string } = tag;
      category && (tagWithCategory.category = category.name);
      return tagWithCategory;
    });

    const grouped = map(
      groupBy(tagsWithCategories, 'category'),
      item => item
    ).map(cat => cat.map(tag => tag.tagId));
    return grouped.map(inCat => `(${inCat.join(' OR ')})`).join(' AND ') || '';
  }, []);

  const onViewChange = useCallback(
    (tags: Internal.Tag[]) => {
      return getTagRecipeSearchData(
        searchQuery,
        {
          size: Math.max(initialRecipesCount, recipeResults.list.length),
        },
        getFilterQuery(tags)
      );
    },
    [initialRecipesCount, recipeResults]
  );

  useEffect(() => {
    setTagList(getTagsFromRecipes(recipeResults.list, allTag.nodes));
  }, [recipeResults]);

  return (
    <Layout className={cx('search-page', theme.searchPage)}>
      <SEO {...seo} />
      <DigitalData title={seo.title} type={type} />
      <Kritique />
      <section className={cx('_pt--40 _pb--40', theme.searchListingWrap)}>
        <SearchListing
          searchQuery={searchQuery}
          searchResults={{
            recipeResults,
            searchInputResults,
            articleResults,
            resultsFetched,
          }}
          searchResultTitleLevel={3}
          config={{
            searchInputConfig: {
              getSearchSuggestionData,
              onClickSearchResultsItem: updateUrlParams,
              searchResultsCount: 8,
              labelIcon: <SearchIcon />,
              buttonResetIcon: <CloseSvg />,
              buttonSubmitIcon: <SearchIcon />,
            },
            recipeConfig: {
              icons,
              getRecipeSearchData,
              viewType: RecipeListViewType.Advanced,
              onViewChange,
              tags: {
                tagGroups: allTagGroupings.nodes,
                displayCategories: [
                  'dishes',
                  'mainIngredient',
                  'cuisines',
                  'difficulties',
                  'dietary',
                  'budgets',
                ],
              },
              initialCount: initialRecipesCount,
              recipePerLoad: 4,
              favorites: favorites,
              recipeCardButtonPropsDefault: favoriteButtonDefaults,
              onFavoriteChange: updateFavoriteState,
              imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
              ratingProvider: RatingAndReviewsProvider.kritique,
            },
            articleConfig: {
              getArticleSearchData,
            },
          }}
          content={{
            ...findPageComponentContent(components, 'SearchListing'),
          }}
        />
      </section>

      {tagList.length ? (
        <section className={theme.tagList}>
          <Tags
            initialCount={initialTagsCount}
            list={tagList}
            content={findPageComponentContent(components, 'Tags')}
          />
        </section>
      ) : null}

      <section>
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>

      <section className={cx(theme.searchBottomCarousel, '_pb--40 _pt--40')}>
        <PageListing
          content={findPageComponentContent(
            components,
            'PageListing',
            'RecipeCategories'
          )}
          list={pageListingData}
          viewType={PageListingViewTypes.carousel}
          titleLevel={2}
          carouselConfig={{
            arrowIcon: <ArrowIcon />,
          }}
          imageSizes={IMAGE_SIZES.PAGE_LISTINGS.CAROUSEL}
        />
      </section>
    </Layout>
  );
};

export default withLocation<SearchPageProps & WithLocationProps>(SearchPage);

export const pageQuery = graphql`
  {
    allTag {
      nodes {
        ...TagFields
      }
    }
    allTagGroupings {
      nodes {
        children {
          ... on Tag {
            fields {
              slug
            }
            id
            name
            title
            tagId
          }
        }
        id
        name
        label
      }
    }
    allCategory(
      limit: 15
      filter: { showOnHomepage: { ne: 0 } }
      sort: { order: ASC, fields: showOnHomepage }
    ) {
      nodes {
        ...CategoryFields
      }
    }
  }
`;

export interface SearchPageProps {
  data: {
    allTag: {
      nodes: Internal.Tag[];
    };
    allCategory: {
      nodes: Internal.Category[];
    };
    allTagGroupings: {
      nodes: Internal.TagGroup[];
    };
  };
  pageContext: {
    page: AppContent.Page;
  };
  searchQuery: string;
}
