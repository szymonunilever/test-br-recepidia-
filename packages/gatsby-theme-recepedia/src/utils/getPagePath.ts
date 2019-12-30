import { graphql, useStaticQuery } from 'gatsby';

// @ts-ignore
export const getPagePath = pageType => {
  const urlsMap = useStaticQuery(graphql`
    {
      allPage {
        nodes {
          type
          relativePath
        }
      }
    }
  `).allPage.nodes.reduce((acc: any, cur: any, i: number) => {
    acc[cur.type] = cur.relativePath;
    return acc;
  }, {});

  return urlsMap[pageType] || '/';
};
