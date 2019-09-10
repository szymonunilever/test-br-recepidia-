import partition from 'lodash/partition';
import capitalize from 'lodash/capitalize';
import { SitemapCategoryEntry } from 'src/components/lib/components/Sitemap/partials';

const ROOT_PATH = '/';
const EXCLUDED_PATHS = ['/procurar', '/perfil', '/mapa-do-site', ROOT_PATH];

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
      path
        .substring(rootPath.length, path.length)
        .replace(/[\d -]+/g, ' ') // remove nimbers and dashes
        .replace(/^ +/gm, '') // remove space at the string start
    ),
    categoryItems: nestPaths(`${path}/`, restPaths, nestingLevel + 1),
  }));

  return sitemap;
};

export const getSitemapFromPaths = (
  initialPaths: string[]
): SitemapCategoryEntry[] => {
  const paths = initialPaths
    .filter(path => !EXCLUDED_PATHS.includes(path) && !path.includes('404'))
    .map(path =>
      path[path.length - 1] === ROOT_PATH
        ? path.substring(0, path.length - 1)
        : path
    );

  return nestPaths(ROOT_PATH, paths);
};
