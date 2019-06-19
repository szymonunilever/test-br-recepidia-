import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import '../scss/main.scss';

import recipes from 'src/components/data/recipes.json';
import pages from 'src/components/data/pageListing.json';
import ResipeListing from 'src/components/lib/RecipeListing/RecipeListing';
import PageListing from 'src/components/lib/PageListing/PageListing';
import RecipeListing from 'src/components/lib/RecipeListing/RecipeListing';
import { RecipeItem } from 'src/components/lib/RecipeListing/partials/models';
import { RecipeListViewType } from 'src/components/lib/RecipeListing';

const recipeListing: RecipeItem[] = recipes.data.allRecipe.edges.map(
  (item: { node: RecipeItem | any }) => item.node
);
const IndexPage = ({ data, location }: IndexPageProps) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Recepedia Home" />
      <RecipeListing
        viewType={RecipeListViewType.Carousel}
        list={recipeListing}
        content={{ nullResult: { textList: [] } }}
      />
      {/* <PageListing list={pages} viewType={'carousel'} initialCount={4} content={{}}/> */}
      Hello Recepedia
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
