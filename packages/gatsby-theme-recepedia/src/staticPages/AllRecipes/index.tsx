import React, { useCallback } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import SEO from 'src/components/Seo';

import {
  RecipeCard,
  RecipeCardLinkWrapper,
  Hero,
  LoadMoreType,
  RecipeListing,
  RecipeListViewType,
  TagName,
  Text,
  RatingAndReviewsProvider,
  Button,
  Loader,
} from 'gatsby-awd-components/src';
import { findPageComponentContent, useElasticSearch } from 'src/utils';
import { favoriteButtonDefaults } from '../../themeDefaultComponentProps';
import theme from './AllRecipes.module.scss';
import cx from 'classnames';
import DigitalData from '../../../integrations/DigitalData';
// Component Styles
import '../../scss/pages/_allRecipes.scss';

import { SearchParams } from 'gatsby-awd-components/src';
import { WindowLocation } from '@reach/router';
import { ProfileKey } from 'src/utils/browserStorage/models';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import useFavorite from 'src/utils/useFavorite';
import withInitialDataAndAsyncLoadMore from 'src/components/withInitialDataAndAsyncLoadMore';
import {
  QueryString,
  WithInitialDataAndAsyncLoadMore,
} from 'src/components/withInitialDataAndAsyncLoadMore/models';
import { IMAGE_SIZES } from 'src/constants';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as Spinner } from 'src/svgs/inline/spinner.svg';

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
  const { promotionalRecipes, allTagGroupings } = data;

  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
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
      return onLoadMoreRecipes(tags, sort, size, {
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
      index: process.env['elasticSearch_recipeIndex'] as string,
      body: {
        ...params,
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: queryString,
        },
        sort,
      },
    };
    setDataFetched(false);

    return useElasticSearch<Internal.Recipe>(searchParams)
      .then(res => {
        setRecipeResultsList(
          params.from
            ? [
                ...recipeResultsList,
                ...res.body.hits.hits.map(resItem => resItem._source),
              ]
            : res.body.hits.hits.map(resItem => resItem._source)
        );
        setRecipeResultsCount(res.body.hits.total.value);
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
    [initialRecipesCount, recipeResultsList]
  );
  return (
    <Layout className={theme.allRecipes}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section className="_pt--40">
        <Text
          className={cx(theme.themeTitle, 'wrapper')}
          tag={TagName['h1']}
          text={findPageComponentContent(components, 'Text', 'PageTitle').text}
        />
      </section>

      <section
        className={cx(theme.allRecipesSortListing, '_pt--40 _pb--40 wrapper')}
      >
        <Loader isLoading={!dataFetched}>
          <Spinner />
        </Loader>
        <RecipeListing
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
          ratingProvider={RatingAndReviewsProvider.inline}
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
          // @ts-ignore
          loadMoreConfig={{
            type: LoadMoreType.async,
            allCount: recipeResultsCount,
            onLoadMore,
          }}
          onViewChange={onViewChange}
          imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
        >
          {recipeResultsList
            ? recipeResultsList.map(recipe => (
                <RecipeCardLinkWrapper
                  title={recipe.title}
                  key={recipe.id}
                  slug={recipe.fields.slug}
                >
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    slug={recipe.fields.slug}
                    ratingProvider={RatingAndReviewsProvider.inline}
                    imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
                    content={{ title: recipe.title }}
                  >
                    <Button
                      {...favoriteButtonDefaults}
                      isSelected={favorites.indexOf(recipe.recipeId) !== -1}
                      onClick={updateFavoriteState}
                    />
                  </RecipeCard>
                </RecipeCardLinkWrapper>
              ))
            : []}
        </RecipeListing>
      </section>

      <section
        className={cx(
          theme.allRecipesBottomCarousel,
          '_pt--40 _pb--40 wrapper'
        )}
      >
        <RecipeListing
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'SeasonalPromotionalRecipes'
          )}
          list={promotionalRecipes.nodes}
          ratingProvider={RatingAndReviewsProvider.inline}
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
          imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.NON_STANDARD}
        >
          {promotionalRecipes.nodes
            ? promotionalRecipes.nodes.map(recipe => (
                <RecipeCardLinkWrapper
                  title={recipe.title}
                  key={recipe.id}
                  slug={recipe.fields.slug}
                >
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    slug={recipe.fields.slug}
                    ratingProvider={RatingAndReviewsProvider.inline}
                    imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
                    content={{ title: recipe.title }}
                  >
                    <Button
                      {...favoriteButtonDefaults}
                      isSelected={favorites.indexOf(recipe.recipeId) !== -1}
                      onClick={updateFavoriteState}
                    />
                  </RecipeCard>
                </RecipeCardLinkWrapper>
              ))
            : []}
        </RecipeListing>
      </section>

      <section className="_pt--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
          imageSizes={IMAGE_SIZES.HERO}
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

    allRecipe(limit: 8, sort: { order: DESC, fields: creationTime }) {
      nodes {
        ...RecipeFields
      }
      totalCount
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
  };
  pageContext: {
    page: AppContent.Page;
    RecipeListing_SeasonalPromotionalRecipes: number[];
  };
  location: WindowLocation;
}
