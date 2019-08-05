import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import useElasticSearch, { findPageComponentContent } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
  LoadMoreType,
} from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import { PageListingViewTypes } from 'src/components/lib/components/PageListing/models';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import FavoriteIcon from 'src/svgs/inline/favorite.svg';
import OpenIcon from 'src/svgs/inline/arrow-down.svg';
import RemoveTagIcon from 'src/svgs/inline/x-mark.svg';
import FilterIcon from 'src/svgs/inline/filter.svg';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import theme from './AllRecipes.module.scss';
import cx from 'classnames';
import DigitalData from '../../../integrations/DigitalData';

import keys from 'integrations/keys.json';
import {
  RecipeSortingOptionsFieldsMappings,
  RecipeSortingOptions,
} from 'src/components/lib/components/RecipeListing/partials';

export interface QueryString {
  query: string;
  fields?: string[];
}

const INITIAL_RECIPES_COUNT = 8;
import { SearchParams } from 'src/components/lib/components/SearchListing/models';
import useKritiqueReload from 'src/utils/useKritiqueReload';

const AllRecipesPage = ({ data, pageContext }: AllRecipesPageProps) => {
  const { components } = pageContext;
  const { promotionalRecipes, allTagGroupings } = data;

  const [recipeResults, setRecipeResults] = useState<{
    list: Internal.Recipe[];
    count: number;
  }>({
    list: [],
    count: 0,
  });

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

    return useElasticSearch<Internal.Recipe>(searchParams).then(res => {
      setRecipeResults({
        list: params.from
          ? [
              ...recipeResults.list,
              ...res.hits.hits.map(resItem => resItem._source),
            ]
          : res.hits.hits.map(resItem => resItem._source),
        count: res.hits.total,
      });
    });
  };

  useEffect(() => {
    getRecipeSearchData(
      undefined,
      RecipeSortingOptionsFieldsMappings[RecipeSortingOptions.newest],
      { size: INITIAL_RECIPES_COUNT }
    );
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     reloadKritiqueWidget();
  //   }, 300);
  // }, [recipeResults]);
  useKritiqueReload(recipeResults);

  const getFilterQuery = (tags: Internal.Tag[]) =>
    tags.map(({ name }) => `(${name})`).join(' AND ') || '**';

  const onRecipeLoadMore = (
    tags: Internal.Tag[],
    sort: string,
    size: number
  ) => {
    return getRecipeSearchData(
      {
        query: getFilterQuery(tags),
        fields: ['tagGroups.tags.name'],
      },
      sort,
      {
        from: recipeResults.list.length,
        size,
      }
    );
  };

  const onViewChange = (tags: Internal.Tag[], sort: string) => {
    const recipeCount = get(recipeResults, 'list.length', 0);
    return getRecipeSearchData(
      {
        query: getFilterQuery(tags),
        fields: ['tagGroups.tags.name'],
      },
      sort,
      {
        size:
          recipeCount > INITIAL_RECIPES_COUNT
            ? recipeCount
            : INITIAL_RECIPES_COUNT,
      }
    );
  };

  return (
    <Layout className={theme.allRecipes}>
      <SEO title="All Recipes" />
      <DigitalData pageContext={pageContext} data={data} />
      <Kritique />
      <section className="_pt--40">
        <div className="container">
          <Text
            tag={TagName['h1']}
            text={
              findPageComponentContent(components, 'Text', 'PageTitle').text
            }
          />
        </div>
      </section>

      <section className="_pb--40">
        <div className="container">
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
        </div>
      </section>

      <section className={cx(theme.allRecipesListing, '_pt--40 _pb--40')}>
        <div className="container">
          <RecipeListing
            viewType={RecipeListViewType.Advanced}
            content={{
              ...findPageComponentContent(
                components,
                'RecipeListing',
                'AllRecipes'
              ),
              optionLabels: {
                preparationTime: 'Preparation time',
                cookingTime: 'Cooking time',
                averageRating: 'Average rating',
                newest: 'Newest',
                title: 'Title',
              },
            }}
            list={recipeResults.list}
            ratingProvider={RatingAndReviewsProvider.kritique}
            titleLevel={3}
            tags={{
              tagGroups: allTagGroupings.nodes,
              // displayCategories: [
              //   'dishes',
              //   'mainIngredient',
              //   'cuisines',
              //   'difficulties',
              //   'dietary',
              //   'budgets',
              // ],
            }}
            className="recipe-list--carousel cards--2-4"
            withFavorite
            FavoriteIcon={FavoriteIcon}
            favorites={[]}
            onFavoriteChange={() => {}}
            OpenIcon={OpenIcon}
            FilterIcon={FilterIcon}
            RemoveTagIcon={RemoveTagIcon}
            loadMoreConfig={{
              type: LoadMoreType.async,
              allCount: recipeResults.count,
              onLoadMore: onRecipeLoadMore,
            }}
            onViewChange={onViewChange}
            imageSizes={'(min-width: 768px) 25vw, 50vw'}
          />
        </div>
      </section>

      <section className="_pt--40 _pb--40">
        <div className="container">
          <RecipeListing
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'SeasonalPromotionalRecipes'
            )}
            list={promotionalRecipes.nodes}
            ratingProvider={RatingAndReviewsProvider.kritique}
            titleLevel={2}
            withFavorite
            initialCount={6}
            FavoriteIcon={FavoriteIcon}
            favorites={[]}
            onFavoriteChange={() => {}}
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
        </div>
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

export default AllRecipesPage;

export const query = graphql`
  {
    promotionalRecipes: allRecipe(limit: 6) {
      nodes {
        ...RecipeFields
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
            tagId
          }
        }
        id
        name
      }
    }
  }
`;

interface AllRecipesPageProps {
  data: {
    promotionalRecipes: {
      nodes: Internal.Recipe[];
    };
    allTagGroupings: {
      nodes: Internal.TagGroup[];
    };
  };
  pageContext: {
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    }[];
  };
}
