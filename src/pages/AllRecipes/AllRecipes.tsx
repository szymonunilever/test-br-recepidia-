import pageData from 'src/components/data/allRecipesPageData.json';

import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import SEO from 'src/components/Seo/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import { findPageComponentContent } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import { RatingProvider } from 'src/components/lib/components/Rating';
import Hero from 'src/components/lib/components/Hero';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import { PageListingViewTypes } from 'src/components/lib/components/PageListing/models';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import FavoriteIcon from 'src/svgs/inline/favorite.svg';
import OpenIcon from 'src/svgs/inline/arrow-down.svg';
import RemoveTagIcon from 'src/svgs/inline/x-mark.svg';
import FilterIcon from 'src/svgs/inline/filter.svg';

const AllRecipesPage = ({ data, pageContext }: AllRecipesPageProps) => {
  // const { components, title } = pageContext;
  const {
    components: { items: components },
    title,
  } = pageData;
  const { allRecipe, allTagGroup } = data;

  return (
    <Layout>
      <SEO title={title} />
      <Kritique />
      <section>
        <div className="container">
          <Text tag={TagName['h1']} text={title} />
        </div>
      </section>

      <section>
        <div className="container">
          <PageListing
            content={findPageComponentContent(
              components,
              'PageListing',
              'RecipeCategories'
            )}
            list={pageListingData}
            viewType={PageListingViewTypes.carousel}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <RecipeListing
            viewType={RecipeListViewType.Advanced}
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'AllRecipes'
            )}
            list={allRecipe.nodes}
            ratingProvider={RatingProvider.kritique}
            titleLevel={3}
            tags={{ tagGroups: allTagGroup.nodes }}
            className="recipe-list--carousel cards--2-4"
            FavoriteIcon={FavoriteIcon}
            OpenIcon={OpenIcon}
            FilterIcon={FilterIcon}
            RemoveTagIcon={RemoveTagIcon}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <RecipeListing
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'SeasonalPromotionalRecipes'
            )}
            list={allRecipe.nodes}
            ratingProvider={RatingProvider.kritique}
            titleLevel={3}
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

      <section>
        <div className="container">
          <Hero
            content={findPageComponentContent(components, 'Hero')}
            viewType="Image"
            className="hero--planner color--inverted"
          />
        </div>
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

    allTagGroup {
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
    allTagGroup: {
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
