import { graphql } from 'gatsby';

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
    nutrients {
      description
      displayUnit
      dv
      epercent
      isCore
      name
      position
      rawRiPercent
      rawDvPercent
      rawValue
      ri
      unit
      value
    }
    localImage {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
