import { graphql } from 'gatsby';

export default () => null;

export const query = graphql`
  fragment PageFields on Page {
    type
    relativePath
    components {
      name
      assets {
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
      content
    }
  }
`;
