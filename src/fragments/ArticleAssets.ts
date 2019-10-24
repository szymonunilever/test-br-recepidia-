import { graphql } from 'gatsby';

export const query = graphql`
  fragment GetArticleAssets on ArticleAssets {
    type
    content {
      alt
      description
      role
      url
      videoId
      preview {
        alt
        url
        previewImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...LocalImage
            }
          }
        }
      }
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
