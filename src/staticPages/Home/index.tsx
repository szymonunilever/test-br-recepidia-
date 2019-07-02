import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import { Text, TagName } from 'src/components/lib/components/Text';

import {
  RecipeListing,
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import { findPageComponentContent } from 'src/utils';
import { RatingProvider } from 'src/components/lib/components/Rating';
import Kritique from 'integrations/Kritique';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';

const HomePage = ({ data, pageContext }: HomePageProps) => {
  const { title, components } = pageContext;
  const recipes = data.allRecipe.nodes;

  return (
    <Layout>
      <SEO title="Recepedia Home" />
      <Kritique />
      <div className="container">
        <Text tag={TagName['h1']} text={title} />
      </div>

      <section>
        <div className="container">
          <RecipeListing
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'LatestAndGreatest'
            )}
            list={recipes}
            ratingProvider={RatingProvider.kritique}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel cards--2-4"
            titleLevel={3}
            carouselConfig={{
              breakpoints: [
                {
                  width: 768,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 1,
                  visibleElementsBelowBreakpoint: 2,
                  visibleElementsAboveBreakpoint: 4,
                },
              ],
              arrowIcon: <ArrowIcon />,
            }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <RecipeListing
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'TopRecipes'
            )}
            list={recipes}
            ratingProvider={RatingProvider.kritique}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel cards--1-2"
            titleLevel={3}
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
      <section>
        <div className="container">
          <PageListing
            content={{
              title: 'What we offer',
            }}
            list={pageListingData}
            initialCount={6}
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  {
    allRecipe(skip: 10) {
      nodes {
        ...RecipeFields
      }
    }

    allTag {
      nodes {
        fields {
          slug
        }
        tagId
        name
      }
    }
  }
`;

interface HomePageProps {
  data: {
    allRecipe: {
      nodes: Internal.Recipe[];
    };
    allTag: {
      nodes: Internal.Tag[];
    };
  };
  pageContext: {
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    }[];
  };
}

interface Edge<T> {
  node: T;
}

interface PageNode {
  components: {
    items: {
      name: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: any;
    }[];
  };
  title: string;
  type: string;
}
