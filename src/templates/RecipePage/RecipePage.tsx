import React from 'react';
import Layout from '../../components/Layout/Layout';
import PageComponent from '../../components/PageComponent/PageComponent';
import { graphql } from 'gatsby';

const RecipePage = ({ pageContext, data }: RecipePageProps) => {
  const { components } = pageContext;
  const { recipe: recipeDetails } = data;

  return (
    <Layout>
      //@ts-ignore
      <h1>{recipeDetails.title}</h1>
      //@ts-ignore
      <div>{recipeDetails.shortTitle}</div>
      {components.map((component, index) => (
        //@ts-ignore
        <PageComponent key={index} {...component} />
      ))}
      ;
    </Layout>
  );
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
  pageContext: {
    slug: string;
    title: string;
    components: {
      view: string;
      [key: string]: string | number | boolean | object | null;
    }[];
  };
  data: {
    [key: string]: string | number | boolean | object | null;
  };
}
