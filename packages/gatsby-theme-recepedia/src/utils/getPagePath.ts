import { graphql, useStaticQuery } from 'gatsby';

// @ts-ignore
export const getPagePath = (pageType, brand = '') => {
  const urlsMap = useStaticQuery(graphql`
    {
      allPage {
        nodes {
          type
          relativePath
          brand
        }
      }
    }
  `);

  let path;
  const currentBrand =
    brand && brand.replace(/[^a-zA-Z0-9\s-]+/g, '').toLowerCase();
  path = urlsMap.allPage.nodes.filter((page: any) => page.type === pageType);

  if (brand) {
    path = path.filter((page: any) => page.brand === currentBrand);
  }

  return path.length ? path[0].relativePath : '';
};
