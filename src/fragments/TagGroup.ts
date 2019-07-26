import { graphql } from 'gatsby';

export const query = graphql`
  fragment TagGroupFields on TagGroup {
    children {
      ... on Tag {
        id
        name
        tagId
      }
    }
    id
    name
  }
`;
