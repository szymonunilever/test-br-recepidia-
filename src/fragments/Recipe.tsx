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
    shortDescription
    shortTitle
    tagGroups {
      label
      name
      tags {
        id
        name
      }
    }
    title
    localImage {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
