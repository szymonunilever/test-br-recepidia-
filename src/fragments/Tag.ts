import { graphql } from 'gatsby';

export default () => null;

export const query = graphql`
  fragment TagFields on Tag {
    fields {
      slug
    }
    tagId
    name
  }
`;
