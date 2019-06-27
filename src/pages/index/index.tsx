import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import { Text, TagName } from 'src/components/lib/components/Text';

import { RecipeListing } from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import { findPageComponentContent } from 'src/utils';
import { RecipeItem } from 'src/components/lib/components/RecipeListing/partials';
import { RatingProvider } from 'src/components/lib/components/Rating';
import Kritique from 'integrations/Kritique';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';

const HomePage = ({ data }: HomePageProps) => {
  const page = data.allPage.edges[0].node;
  const components = page.components.items;
  const recipes = data.allRecipe.nodes;

  return (
    <Layout>
      <SEO title="Recepedia Home" />
      <Kritique />

      <Text tag={TagName['h1']} text={data.allPage.edges[0].node.title} />
      <section>
        <RecipeListing
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'LatestAndGreatest'
          )}
          list={recipes}
          ratingProvider={RatingProvider.kritique}
        />
      </section>

      <section>
        <RecipeListing
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'TopRecipes'
          )}
          list={recipes}
          ratingProvider={RatingProvider.kritique}
        />
      </section>

      <section>
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>
      <section>
        <PageListing
          content={{
            title: 'What we offer',
          }}
          list={pageListingData}
          initialCount={6}
        />
      </section>
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  {
    allPage(filter: { type: { eq: "Home" } }) {
      edges {
        node {
          ...PageFields
        }
      }
    }
    allRecipe(limit: 10) {
      nodes {
        ...RecipeFields
      }
    }
    allTagGroup(limit: 10) {
      nodes {
        name
      }
    }
  }
`;

interface HomePageProps {
  data: {
    allPage: {
      edges: Edge<PageNode>[];
    };
    allRecipe: {
      nodes: RecipeItem[];
    };
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
