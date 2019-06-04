import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import '../scss/main.scss';

import { RecipeCard } from '../components/lib/RecipeListing/RecipeCard';

const IndexPage = ({ data, location }: IndexPageProps) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Recepedia Home" />
      Hello Recepedia
      <RecipeCard
        enableSelectFavorite={true}
        recipeImgPath="/favicon.ico"
        title="Test recipe"
        slug="/"
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
