import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import { findPageComponentContent } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
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

const AllRecipesPage = ({ data, pageContext }: AllRecipesPageProps) => {
  const { components } = pageContext;
  const { allRecipe, allTagGroupings } = data;

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
            viewType={RecipeListViewType.Advanced}
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'AllRecipes'
            )}
            list={allRecipe.nodes}
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
