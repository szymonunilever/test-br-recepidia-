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
      description
      measurementUnit
      multiple
      originalProductId
      productId
      quantity
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
    tagGroups {
      label
      name
      tags {
        id
        name
      }
    }
    title
    assets {
      images {
        default {
          base64
          aspectRatio
          width
          height
          src
          srcWebp
          srcSet
          srcSetWebp
          sizes
          url
          title
        }
      }
    }
  }
`;
