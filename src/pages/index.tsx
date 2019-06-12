import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import dataSource from 'src/components/data/recipes.json';
import tags from 'src/components/data/allTags.json';
import {
  OptionLabels,
  RecipeListing,
  RecipeListingContent,
  RecipeListViewType,
} from '../components/lib/RecipeListing';
import { RecipeItem } from '../components/lib/RecipeListing/partials';
import '../scss/main.scss';

const content: RecipeListingContent = {
  title: 'Recipe listing Advanced',
  cta: { label: 'Load More Button' },
  optionLabels: {
    PreparationTime: 'Preparation time',
    CookingTime: 'Cooking time',
    AverageRating: 'Average rating',
    Newest: 'Newest',
    RecentlyUpdated: 'Recently updated',
    Title: 'Title',
  },
};
const listing: RecipeItem[] = dataSource.data.allRecipe.edges.map(
  (item: { node: RecipeItem }) => item.node
);

const IndexPage = ({ data, location }: IndexPageProps) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Recepedia Home" />
      Hello Recepedia
      <RecipeListing
        content={content}
        list={listing}
        viewType={RecipeListViewType.Advanced}
        tags={tags}
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
