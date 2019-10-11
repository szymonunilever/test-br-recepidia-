import { graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import cx from 'classnames';
import {
  Hero,
  PageListing,
  PageListingViewTypes,
  RatingAndReviewsProvider,
  RecipeListViewType,
  SearchListing,
  Tags,
  WithLocation as withLocation,
  WithLocationProps,
} from 'src/components/lib';
import { findPageComponentContent } from 'src/utils';
import Kritique from 'integrations/Kritique';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import DigitalData from '../../../integrations/DigitalData';
import theme from './search.module.scss';
import { ReactComponent as SearchIcon } from 'src/svgs/inline/search-icon.svg';
import { ReactComponent as CloseSvg } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import useSearchResults from './useSearchResults';
import { getTagsFromRecipes } from 'src/utils/getTagsFromRecipes';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
// Component Styles
import '../../scss/pages/_searchListing.scss';
import useFavorite from 'src/utils/useFavorite';
import { IMAGE_SIZES } from 'src/constants';

const SearchPage = ({ data, pageContext, searchQuery }: SearchPageProps) => {
  const {
    page: { seo, components, type },
  } = pageContext;
  const { allTag, allCategory } = data;
  const pageListingData = allCategory.nodes.map(category => ({
    ...category,
    path: category.fields.slug,
  }));

  const {
    getSearchData,
    getRecipeSearchData,
    getArticleSearchData,
    getSearchSuggestionData,
    recipeResults,
    articleResults,
    searchInputResults,
    resultsFetched,
    initialRecipesCount,
    initialTagsCount,
  } = useSearchResults(searchQuery);

  const [tagList, setTagList] = useState<Internal.Tag[]>([]);
  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
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
              onClickSearchResultsItem: getSearchData,
              searchResultsCount: 8,
              labelIcon: <SearchIcon />,
              buttonResetIcon: <CloseSvg />,
              buttonSubmitIcon: <SearchIcon />,
            },
            recipeConfig: {
              getRecipeSearchData,
              viewType: RecipeListViewType.Base,
              FavoriteIcon,
              withFavorite: true,
              initialCount: initialRecipesCount,
              recipePerLoad: 4,
              favorites: favorites,
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
  };
  pageContext: {
    page: AppContent.Page;
  };
  searchQuery: string;
}
