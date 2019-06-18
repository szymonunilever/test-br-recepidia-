import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';

const HomePage = ({ data }: HomePageProps) => {
  return (
    <Layout>
      <SEO title="Recepedia Home" />
      {data.allPage.edges[0].node.title}
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
              content {
                view
                title
                subtitle
                sortLabel
                recipeLabel
                viewAllRecipesLabel
                primaryCta {
                  label
                  linkTo
                  type
                }
              }
            }
          }
          title
          type
          relativePath
          id
        }
      }
    }
  }
`;

interface HomePageProps {
  data: {
    title: string;
  };
}
