import { graphql } from 'gatsby';

export const query = graphql`
  fragment ArticleFields on Article {
    id
    title
    brand
    section
    localImage {
      childImageSharp {
        fluid {
          base64
          aspectRatio
          width
          height
          src
          srcWebp
          srcSet
          srcSetWebp
          sizes
        }
      }
    }
    tags {
      id
      name
    }
    shortDescription
    content
    creationTime
    fields {
      slug
    }
  }
`;
