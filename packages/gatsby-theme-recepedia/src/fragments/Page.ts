import { graphql } from 'gatsby';

export const query = graphql`
  fragment PageFields on Page {
    type
    relativePath
    components {
      items {
        name
        assets {
          url
          alt
          localImage {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        content
      }
    }
  }
`;
