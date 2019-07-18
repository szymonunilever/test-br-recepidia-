import { partition, capitalize } from 'lodash';
import { SitemapCategoryEntry } from 'src/components/lib/components/Sitemap/partials';

const nestPaths = (
  rootPath: string,
  initialPaths: string[],
  nestingLevel = 1
): SitemapCategoryEntry[] => {
  const paths = initialPaths.filter(path => path !== rootPath);

  const re = new RegExp(rootPath, 'g');

  let [rootPaths, restPaths] = partition(
    paths,
    path =>
      (path.match(re) || []).length === 1 &&
      (path.match(/\//g) || []).length === nestingLevel
  );

  const sitemap = rootPaths.map(path => ({
    path: path,
    title: capitalize(
      path.substring(rootPath.length, path.length).replace('-', ' ')
    ),
    categoryItems: nestPaths(`${path}/`, restPaths, nestingLevel + 1),
  }));

  return sitemap;
};

export const getSitemapFromPaths = (
  initialPaths: string[]
): SitemapCategoryEntry[] => {
  const paths = initialPaths
    .filter(path => path !== '/' && !path.includes('404'))
    .map(path =>
      path[path.length - 1] === '/' ? path.substring(0, path.length - 1) : path
    );

  return nestPaths('/', paths);
};
