import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';

const RecipePage = ({ data }: RecipePageProps) => {
  return <Layout>{data.recipe.title}</Layout>;
};

export default RecipePage;

export const query = graphql`
  query($slug: String!) {
    recipe(fields: { slug: { eq: $slug } }) {
      id
      title
      recipeId
      shortTitle
      ingredients {
        productId
        description
      }
      methods {
        description
      }
    }
  }
`;

interface RecipePageProps {
  data: {
    recipe: {
      title: string;
    };
  };
}
