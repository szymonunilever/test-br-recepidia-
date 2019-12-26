import { graphql } from 'gatsby';

export const query = graphql`
  fragment ArticleFields on Article {
    id
    title
    shortDescription
    content
    fields {
      slug
    }
  }
`;
