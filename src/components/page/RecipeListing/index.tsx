import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import components from '../../lib';

const RecipeListing = ({ content }: RecipeListingProps) => {
  let recipeList;

  switch (content.view) {
    case 'Latest':
    default: {
      recipeList = useStaticQuery(graphql`
        {
          allRecipe(limit: 2) {
            nodes {
              ...RecipeFields
            }
          }
        }
      `);
    }
  }

  return (
    <components.RecipeListing
      list={recipeList.allRecipe.nodes}
      content={content}
      imageSizes={'(min-width: 768px) 25vw, 50vw'}
    />
  );
};

export default RecipeListing;

interface RecipeListingProps {
  content: {
    view: string;
    [key: string]: string | number | boolean | object | null;
  };
}
