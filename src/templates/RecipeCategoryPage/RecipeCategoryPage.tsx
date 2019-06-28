import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';

const RecipeCategotyPage = ({ data }: RecipeCategotyPageProps) => {
  return <Layout>{data.tag.name}</Layout>;
};

export default RecipeCategotyPage;

export const query = graphql`
  query($slug: String!) {
    tag(fields: { slug: { eq: $slug } }) {
      name
    }
  }
`;

interface RecipeCategotyPageProps {
  data: {
    tag: {
      name: string;
    };
  };
}
