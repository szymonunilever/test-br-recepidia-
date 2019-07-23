import { graphql } from 'gatsby';

export default () => null;

export const query = graphql`
  fragment GetArticleAssets on ArticleAssets {
    type
    content {
      alt
      description
      role
      url
      videoId
      localImage {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...LocalImage
          }
        }
      }
    }
  }
`;
