import { graphql } from 'gatsby';

export const query = graphql`
  fragment TagGroupFields on TagGroupings {
    children {
      ... on Tag {
        id
        name
        title
        tagId
      }
    }
    id
    name
    label
  }
`;
