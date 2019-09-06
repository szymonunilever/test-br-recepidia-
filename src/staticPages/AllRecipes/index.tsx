import React, { useCallback } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import { findPageComponentContent, useElasticSearch } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
  LoadMoreType,
} from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import PageListing from 'src/components/lib/components/PageListing';
import { PageListingViewTypes } from 'src/components/lib/components/PageListing/models';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import { ReactComponent as OpenIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as RemoveTagIcon } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as FilterIcon } from 'src/svgs/inline/filter.svg';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import theme from './AllRecipes.module.scss';
import cx from 'classnames';
import DigitalData from '../../../integrations/DigitalData';
// Component Styles
import '../../scss/pages/_allRecipes.scss';

import keys from 'integrations/keys.json';

import { SearchParams } from 'src/components/lib/components/SearchListing/models';
import { WindowLocation } from '@reach/router';
import { ProfileKey } from 'src/utils/browserStorage/models';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import useFavorite from 'src/utils/useFavorite';
import withInitialDataAndAsyncLoadMore from 'src/components/withInitialDataAndAsyncLoadMore';
import {
  WithInitialDataAndAsyncLoadMore,
  QueryString,
} from 'src/components/withInitialDataAndAsyncLoadMore/models';

const AllRecipesPage = ({
  data,
  pageContext,
  location,
  onLoadMoreRecipes,
  recipeResultsCount,
  recipeResultsList,
  initialRecipesCount,
  dataFetched,
  setDataFetched,
  setRecipeResultsList,
  setRecipeResultsCount,
}: AllRecipesPageProps) => {
  const {
    page: { seo, components, type },
  } = pageContext;
  const { promotionalRecipes, allTagGroupings, allCategory } = data;
  const pageListingData = allCategory.nodes.map(category => ({
    ...category,
    path: category.fields.slug,
  }));

  const RecipeListingWithFavorite = useFavorite(
    (getUserProfileByKey(ProfileKey.favorites) as number[]) || [],
    updateFavorites,
    RecipeListing,
    FavoriteIcon
  );

  const getFilterQuery = useCallback((tags: Internal.Tag[]) => {
    const tagsWithCategories = tags.map(tag => {
      const category = allTagGroupings.nodes.find(
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
    return (
      grouped.map(inCat => `(${inCat.join(' OR ')})`).join(' AND ') || '**'
    );
  }, []);

  const onLoadMore = useCallback(
    (tags: Internal.Tag[], sort: string, size: number) => {
      onLoadMoreRecipes(tags, sort, size, {
        query: getFilterQuery(tags),
        fields: tags.length ? ['tagGroups.tags.id'] : [],
      });
    },
    [onLoadMoreRecipes]
  );

  const getRecipeSearchData = async (
    queryString: QueryString = {
      query: '**',
    },
    sort = '',
    params: SearchParams = {}
  ) => {
    const searchParams = {
      index: keys.elasticSearch.recipeIndex,
      body: {
        ...params,
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: queryString,
        },
        sort,
      },
    };

    return useElasticSearch<Internal.Recipe>(searchParams)
      .then(res => {
        setRecipeResultsList(
          params.from
            ? [
                ...recipeResultsList,
                ...res.hits.hits.map(resItem => resItem._source),
              ]
            : res.hits.hits.map(resItem => resItem._source)
        );
        setRecipeResultsCount(res.hits.total);
      })
      .then(() => {
        setDataFetched(true);
      });
  };

  const onViewChange = useCallback(
    (tags: Internal.Tag[], sort: string) => {
      return getRecipeSearchData(
        {
          query: getFilterQuery(tags),
          fields: tags.length ? ['tagGroups.tags.id'] : [],
        },
        sort,
        {
          size: Math.max(initialRecipesCount, recipeResultsList.length),
        }
      );
    },
    [initialRecipesCount, recipeResultsList.length]
  );

  return (
    <Layout className={theme.allRecipes}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <Kritique />
      <section className="_pt--40">
        <Text
          className={cx(theme.themeTitle, 'wrapper')}
          tag={TagName['h1']}
          text={findPageComponentContent(components, 'Text', 'PageTitle').text}
        />
      </section>

      <section className={cx(theme.allRecipesHeroCarousel, '_pb--40 wrapper')}>
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
        />
      </section>

      <section
        className={cx(theme.allRecipesSortListing, '_pt--40 _pb--40 wrapper')}
      >
        <RecipeListingWithFavorite
          dataFetched={dataFetched}
          viewType={RecipeListViewType.Advanced}
          content={{
            ...findPageComponentContent(
              components,
              'RecipeListing',
              'AllRecipes'
            ),
          }}
          list={recipeResultsList}
          ratingProvider={RatingAndReviewsProvider.kritique}
          titleLevel={3}
          tags={{
            tagGroups: allTagGroupings.nodes,
            displayCategories: [
              'dishes',
              'mainIngredient',
              'cuisines',
              'difficulties',
              'dietary',
              'budgets',
            ],
          }}
          className="recipe-list--carousel cards--2-4"
          OpenIcon={OpenIcon}
          FilterIcon={FilterIcon}
          RemoveTagIcon={RemoveTagIcon}
          loadMoreConfig={{
            type: LoadMoreType.async,
            allCount: recipeResultsCount,
            onLoadMore,
          }}
          onViewChange={onViewChange}
          imageSizes={'(min-width: 768px) 25vw, 50vw'}
        />
      </section>

      <section
        className={cx(
          theme.allRecipesBottomCarousel,
          '_pt--40 _pb--40 wrapper'
        )}
      >
        <RecipeListingWithFavorite
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'SeasonalPromotionalRecipes'
          )}
          list={promotionalRecipes.nodes}
          ratingProvider={RatingAndReviewsProvider.kritique}
          titleLevel={2}
          initialCount={initialRecipesCount}
          viewType={RecipeListViewType.Carousel}
          className="recipe-list--carousel"
          carouselConfig={{
            breakpoints: [
              {
                width: 768,
                switchElementsBelowBreakpoint: 1,
                switchElementsAfterBreakpoint: 1,
                visibleElementsBelowBreakpoint: 1,
                visibleElementsAboveBreakpoint: 2,
              },
            ],
            arrowIcon: <ArrowIcon />,
          }}
          imageSizes={'(min-width: 768px) 50vw, 100vw'}
        />
      </section>

      <section className="_pt--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>
    </Layout>
  );
};

export default withInitialDataAndAsyncLoadMore<AllRecipesPageProps>(
  AllRecipesPage
);

export const query = graphql`
  query($RecipeListing_SeasonalPromotionalRecipes: [Int]) {
    promotionalRecipes: allRecipe(
      filter: { recipeId: { in: $RecipeListing_SeasonalPromotionalRecipes } }
      sort: { fields: creationTime, order: DESC }
    ) {
      nodes {
        ...RecipeFields
      }
    }

    allRecipe(limit: 8, sort: { order: ASC, fields: creationTime }) {
      nodes {
        ...RecipeFields
      }
      totalCount
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
  }
`;

interface AllRecipesPageProps extends WithInitialDataAndAsyncLoadMore {
  data: {
    promotionalRecipes: {
      nodes: Internal.Recipe[];
    };
    allTagGroupings: {
      nodes: Internal.TagGroup[];
    };
    allCategory: {
      nodes: Internal.Category[];
    };
  };
  pageContext: {
    page: AppContent.Page;
    RecipeListing_SeasonalPromotionalRecipes: number[];
  };
  location: WindowLocation;
}
