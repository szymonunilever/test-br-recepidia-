import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import { Text, TagName } from 'src/components/lib/components/Text';

import { RecipeListing } from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import { findPageComponentContent } from 'src/utils';
import { RecipeItem } from 'src/components/lib/components/RecipeListing/partials';

const HomePage = ({ data }: HomePageProps) => {
  const page = data.allPage.edges[0].node;
  const components = page.components.items;
  const recipes = data.allRecipe.nodes;

  return (
    <Layout>
      <SEO title="Recepedia Home" />

      <Text tag={TagName['h1']} text={data.allPage.edges[0].node.title} />
      <section>
        <RecipeListing
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'LatestAndGreatest'
          )}
          list={recipes}
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
        />
      </section>

      <section>
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
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
    allRecipe(skip: 10) {
      nodes {
        ...RecipeFields
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
      content: any;
    }[];
  };
  title: string;
  type: string;
}
