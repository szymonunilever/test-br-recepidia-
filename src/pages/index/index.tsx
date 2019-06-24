import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import GlobalNavigation from 'src/components/lib/components/GlobalNavigation';
import { Text, TagName } from 'src/components/lib/components/Text';
import list from 'src/components/data/globalNavigationMenu.json';
import LogoIcon from 'src/svgs/inline/placeholder.svg';
import ArrowDownIcon from 'src/svgs/inline/arrow-down.svg';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import { RecipeListing } from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import { findPageComponentContent } from 'src/utils';
import { RecipeItem } from 'src/components/lib/components/RecipeListing/partials';

const HomePage = ({ data }: HomePageProps) => {
  const page = data.allPage.edges[0].node;
  const components = page.components.items;
  // page.components.items = page.components.items.map(item => ({
  //   ...item,
  //   content: JSON.parse(item.content),
  // }));
  const recipes = data.allRecipe.nodes;

  return (
    <Layout>
      <SEO title="Recepedia Home" />
      <GlobalNavigation
        logo={{
          icon: (
            <LogoIcon style={{ height: '40px' }} className="main-logo__icon" />
          ),
          path: '/',
        }}
        dropDownIcon={<ArrowDownIcon className="dropdown-icon" />}
        buttonCloseIcon={ButtonCloseIcon}
        content={{ list }}
      />
      <Text tag={TagName['h1']} text={data.allPage.edges[0].node.title} />
      <RecipeListing
        content={findPageComponentContent(
          components,
          'RecipeListing',
          'LatestAndGreatest'
        )}
        list={recipes}
      />
      <RecipeListing
        content={findPageComponentContent(
          components,
          'RecipeListing',
          'TopRecipes'
        )}
        list={recipes}
      />
      <Hero
        content={findPageComponentContent(components, 'Hero')}
        viewType="Image"
      />
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
