import { graphql } from 'gatsby';

export default () => null;

export const query = graphql`
  fragment ArticleFields on Article {
    id
    title
    shortDescription
    articleText {
      text
    }
    assets {
      ...GetArticleAssets
    }
    fields {
      slug
    }
  }

  fragment NextArticleFields on Article {
    id
    title
    shortDescription
    assets {
      ...GetArticleAssets
    }
    fields {
      slug
    }
  }
`;
