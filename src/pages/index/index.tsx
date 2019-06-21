import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import GlobalNavigation from 'src/components/lib/GlobalNavigation';
import { Text, TagName } from 'src/components/lib/Text';
import list from 'src/components/data/globalNavigationMenu.json';
import LogoIcon from 'src/svgs/inline/placeholder.svg';
import ArrowDownIcon from 'src/svgs/inline/arrow-down.svg';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import { RecipeListing } from 'src/components/lib/RecipeListing';
import dataSource from 'src/components/data/recipes.json';
import Hero from 'src/components/lib/Hero';
import { findPageComponentContent } from 'src/utils';

const listing = dataSource.data.allRecipe.edges.map(item => item.node);

const HomePage = ({ data }: HomePageProps) => {
  const page = data.allPage.edges[0].node;
  // page.components.items = page.components.items.map(item => ({
  //   ...item,
  //   content: JSON.parse(item.content),
  // }));
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
        list={listing}
      />
      <RecipeListing
        content={findPageComponentContent(
          components,
          'RecipeListing',
          'TopRecipes'
        )}
        list={listing}
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
          title
          type
          components {
            items {
              name
              content {
                image {
                  url
                  alt
                  localImage {
                    childImageSharp {
                      fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                primaryCta {
                  label
                  linkTo
                  type
                }
                recipeLabel
                sortLabel
                subtitle
                title
                view
                viewAllRecipesLabel
              }
            }
          }
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
