import React from 'react';
import Layout from '../../components/Layout/Layout';
import PageComponent from '../../components/PageComponent/PageComponent';

const RecipeCategory = ({ pageContext }: RecipeCategoryProps) => {
  const { title, components } = pageContext;

  return (
    <Layout>
      <h2>{title}</h2>
      {components.map((component, index) => (
        // @ts-ignore
        <PageComponent key={index} {...component} />
      ))}
      ;
    </Layout>
  );
};

export default RecipeCategory;

interface RecipeCategoryProps {
  pageContext: {
    slug: string;
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    }[];
  };
}
