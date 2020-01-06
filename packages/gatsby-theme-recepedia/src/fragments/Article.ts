import { graphql } from 'gatsby';

export const query = graphql`
  fragment ArticleFields on Article {
    id
    title
    brand
    tags {
      id
      name
    }
    shortDescription
    content
    fields {
      slug
    }
  }
`;
