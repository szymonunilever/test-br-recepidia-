import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/SEO/Seo';
import GlobalNavigation from 'src/components/lib/GlobalNavigation';
import { Text, TagName } from 'src/components/lib/Text';
import list from 'src/components/data/globalNavigationMenu.json';
import LogoIcon from 'src/svgs/inline/placeholder.svg';
import ArrowDownIcon from 'src/svgs/inline/arrow-down.svg';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import { RecipeListing } from 'src/components/lib/RecipeListing';
import { find, get } from 'lodash';
import dataSource from 'src/components/data/recipes.json';

const listing = dataSource.data.allRecipe.edges.map(item => item.node);

const HomePage = ({ data }: HomePageProps) => {
  const page = { ...data.allPage.edges[0].node };
  page.components.items = page.components.items.map(item => ({
    ...item,
    content: JSON.parse(item.content),
  }));
  const components = page.components.items;

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
        buttonCloseIcon={<ButtonCloseIcon />}
        content={{ list }}
      />
      <Text tag={TagName['h1']} text={data.allPage.edges[0].node.title} />
      <RecipeListing
        content={get(
          find(
            components,
            ({ name, content }) =>
              name === 'RecipeListing' && content.view === 'LatestAndGreatest'
          ),
          'content'
        )}
        list={listing}
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
          components {
            items {
              name
              content
            }
          }
          title
          type
        }
      }
    }
  }
`;

interface HomePageProps {
  data: {
    allPage: {
      edges: Edge[];
    };
  };
}

interface Edge {
  node: Node;
}

interface Node {
  components: {
    items: {
      name: string;
      content: any;
    }[];
  };
  title: string;
  type: string;
}
