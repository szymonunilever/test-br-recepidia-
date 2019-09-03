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
        fluid(maxHeight: 315) {
          ...LocalImage
        }
      }
    }
  }

  fragment CategoryNavigationFields on Category {
    id
    name
    title
    inNavigation
    categoryId
    children {
      ... on Category {
        id
        name
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
