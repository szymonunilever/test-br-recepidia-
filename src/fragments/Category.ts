import { graphql } from 'gatsby';

export const query = graphql`
  fragment CategoryFields on Category {
    id
    name
    title
    description
    image {
      alt
    }
    fields {
      slug
    }
    localImage {
      childImageSharp {
        fluid {
          base64
          aspectRatio
          sizes
          src
          srcSet
          srcSetWebp
          srcWebp
        }
      }
    }
  }

  fragment CategoryNavigationFields on Category {
    id
    name
    title
    inNavigation
    categoryOrder
    categoryId
    children {
      ... on Category {
        id
        name
        categoryOrder
        title
        inNavigation
        fields {
          slug
        }
      }
    }
    fields {
      slug
    }
  }
`;
