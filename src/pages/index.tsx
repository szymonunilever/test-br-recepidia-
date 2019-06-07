import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import '../scss/main.scss';
import { RecipeListing } from '../components/lib/RecipeListing';
import recipeList from '../components/data/recipes.json';

const IndexPage = ({ data, location }: IndexPageProps) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Recepedia Home" />
      Hello Recepedia
      <RecipeListing
        list={recipeList.data.allRecipe.edges.map(item => item.node)}
        title="Test recipe listing"
        titleLevel={2}
        recipeCount={0}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

interface IndexPageProps {
  data: any;
  location: Location;
}
