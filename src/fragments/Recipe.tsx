import { graphql } from 'gatsby';

export default () => null;

export const query = graphql`
  fragment RecipeFields on Recipe {
    description
    fields {
      slug
    }
    id
    ingredients {
      all_nutrition_complete
      core_nutrition_complete
      description
      excluded_from_recipe_nutrition_calc
      multiple
      original_product_id
      position
      product_id
      quantity
      unit
    }
    methods {
      description
      position
    }
    recipeDetails {
      preperationTime
      serves
      totalTime
    }
    recipeId
    shortDescription
    shortTitle
    tagCategories {
      label
      name
      tags {
        id
        name
      }
    }
    title
  }
`;
