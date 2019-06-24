import React from 'react';
import { graphql } from 'gatsby';

export default () => null;

export const query = graphql`
  fragment PageFields on Page {
    title
    type
    components {
      items {
        name
        content {
          image {
            url
            alt
            localImage {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          primaryCta {
            label
            linkTo
            type
          }
          recipeLabel
          sortLabel
          subtitle
          title
          view
          viewAllRecipesLabel
        }
      }
    }
  }
`;
