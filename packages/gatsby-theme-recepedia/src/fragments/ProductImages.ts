import { graphql } from 'gatsby';

export const query = graphql`
  fragment ProductImage on ProductImagesChildImageSharpFluid {
    base64
    aspectRatio
    sizes
    src
    srcSet
    srcSetWebp
    srcWebp
  }
`;
