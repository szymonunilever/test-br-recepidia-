import { graphql } from 'gatsby';

export default () => null;

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
