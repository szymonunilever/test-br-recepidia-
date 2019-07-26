import { graphql } from 'gatsby';

export const query = graphql`
  fragment LocalImage on ImageSharpFluid {
    base64
    aspectRatio
    sizes
    src
    srcSet
    srcSetWebp
    srcWebp
  }
`;
