import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
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
import { action } from '@storybook/addon-actions';
import theme from './AllRecipes.module.scss';

import keys from 'integrations/keys.json';
import { SearchParams } from '../Search/models';

const AllRecipesPage = ({ data, pageContext }: AllRecipesPageProps) => {
  const { components } = pageContext;
  const { allRecipe, allTagGroupings } = data;

  const [recipeResults, setRecipeResults] = useState<{
    list: Internal.Recipe[];
    count: number;
  }>({
    list: [],
    count: 0,
  });

  const getRecipeSearchData = async (
    searchQuery: string,
    params: SearchParams
  ) => {
    const searchParams = {
      index: keys.elasticSearch.recipeIndex,
      body: {
        from: params.from,
        size: params.size,
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: {
            query: `*${searchQuery}*`,
            fields: [
              'title',
              'description',
              'tagGroups.tags.name',
              'ingredients.description',
            ],
          },
        },
      },
    };

    return useElasticSearch<Internal.Recipe>(searchParams).then(res => {
      setRecipeResults({
        list: recipeResults.list.length
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
    getRecipeSearchData('', { size: 8 });
  }, []);

  const onRecipeLoadMore = (size: number) => {
    getRecipeSearchData('', {
      from: recipeResults.list.length,
      size,
    });
  };

  return (
    <Layout className={theme.allRecipes}>
      <SEO title="All Recipes" />
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
              breakpoints: [
                {
                  width: 768,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 2,
                  visibleElementsBelowBreakpoint: 3,
                  visibleElementsAboveBreakpoint: 4,
                },
              ],
              arrowIcon: <ArrowIcon />,
            }}
          />
        </div>
      </section>

      <section className="_pt--40 _pb--40">
        <div className="container">
          <RecipeListing
            getSearchData={getRecipeSearchData}
            viewType={RecipeListViewType.Advanced}
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'AllRecipes'
            )}
            list={recipeResults.list}
            ratingProvider={RatingAndReviewsProvider.kritique}
            titleLevel={3}
            tags={{ tagGroups: allTagGroupings.nodes }}
            className="recipe-list--carousel cards--2-4"
            withFavorite
            FavoriteIcon={FavoriteIcon}
            favorites={[]}
            onFavoriteChange={action('favorites were changed')}
            OpenIcon={OpenIcon}
            FilterIcon={FilterIcon}
            RemoveTagIcon={RemoveTagIcon}
            loadMoreConfig={{
              type: LoadMoreType.async,
              allCount: recipeResults.count,
              onLoadMore: onRecipeLoadMore,
            }}
            imageSizes={'(min-width: 768px) 25vw, 50vw'}
          />
        </div>
      </section>

      <section className="_pt--40 _pb--40">
        <div className="container">
          <RecipeListing
            getSearchData={getRecipeSearchData}
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'SeasonalPromotionalRecipes'
            )}
            list={allRecipe.nodes}
            ratingProvider={RatingAndReviewsProvider.kritique}
            titleLevel={2}
            withFavorite
            FavoriteIcon={FavoriteIcon}
            favorites={[]}
            onFavoriteChange={action('favorites were changed')}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel cards--1-2"
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
    allRecipe {
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
    allRecipe: {
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
