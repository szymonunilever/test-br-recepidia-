import { graphql } from 'gatsby';

export const query = graphql`
  fragment TagFields on Tag {
    fields {
      slug
    }
    tagId
    name
    title
    id
  }
`;
