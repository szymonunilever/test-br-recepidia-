/* eslint-disable no-console */
const url = require('url');
const get = require('lodash/get');
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getPageTemplate = require('./scripts/build/getPageTemplate');
const createDefaultPages = require('./scripts/build/createDefaultPages');
const createRecipePages = require('./scripts/build/createRecipePages');
const createArticlePages = require('./scripts/build/createArticlePages');
const createRemoteImageNode = require('./scripts/build/createRemoteImageNode');
const createContentHubPages = require('./scripts/build/createContentHubPages');
const createCategoryPages = require('./scripts/build/createCategoryPages');
const updateES = require('./scripts/build/updateElasticsearch');
const constants = require('./scripts/constants');
const getStaticLists = require('./scripts/build/getStaticLists');

const urlPartialsByTypeMap = {
  Article: 'title',
  Recipe: 'title',
  Tag: 'title',
  Category: 'title',
};

const addTrailingSlash = path => {
  try {
    return path && path.endsWith('/') ? path : `${path}/`;
  } catch (err) {
    console.error(err);
  }
};

const findPageFromNodes = (pagesNodes, pageType) =>
  pagesNodes.find(pageNode => pageNode.type === pageType);

const formatUrlPartial = (partial = '') =>
  partial
    .replace(/[&,+()$~%.'":*?<>{}]/g, '')
    .replace(/[_-]/, ' ')
    .toLowerCase()
    .split(' ')
    .join('-');

const getSlugFromPath = (path, node, prependWithField = null) => {
  const urlPartial = urlPartialsByTypeMap[node.internal.type] || 'id';
  const itemPath = prependWithField
    ? `${node[prependWithField]}-${node[urlPartial]}`
    : node[urlPartial];

  return addTrailingSlash(
    url
      .resolve(path, formatUrlPartial(itemPath))
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  );
};

const createSlugFor = ({ path, node, createNodeField, prependWithField }) => {
  const slug = getSlugFromPath(path, node, prependWithField);

  createNodeField({
    node,
    name: 'slug',
    value: slug,
  });
};

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
  getNodesByType,
}) => {
  const getPagePath = pageType => {
    const path = get(
      findPageFromNodes(getNodesByType(constants.NODE_TYPES.PAGE), pageType),
      'relativePath',
      '/'
    );

    return addTrailingSlash(path);
  };

  const { createNodeField, createNode } = actions;

  switch (node.internal.type) {
    case constants.NODE_TYPES.RECIPE:
      createSlugFor({
        path: getPagePath(constants.TEMPLATE_PAGE_TYPES.RECIPE),
        node,
        createNodeField,
        prependWithField: 'recipeId',
      });
      break;
    case constants.NODE_TYPES.TAG:
      createSlugFor({
        path: getPagePath(constants.TEMPLATE_PAGE_TYPES.TAG),
        node,
        createNodeField,
      });
      break;
    case constants.NODE_TYPES.CATEGORY:
      {
        createSlugFor({
          path: getPagePath(constants.TEMPLATE_PAGE_TYPES.CATEGORY),
          node,
          createNodeField,
        });

        const imgNode = await createRemoteImageNode(node.image.url, node.id, {
          store,
          cache,
          createNode,
          createNodeId,
        });
        node['localImage___NODE'] = imgNode.id;
      }
      break;
    case constants.NODE_TYPES.ARTICLE: {
      createSlugFor({
        path: getPagePath(constants.TEMPLATE_PAGE_TYPES.ARTICLE),
        node,
        createNodeField,
      });

      await Promise.all(
        node.assets.map(async asset => {
          const { type, content } = asset;
          if (type === 'Image' && content.url) {
            const imgNode = await createRemoteImageNode(
              /*content.url*/ 'https://i.ibb.co/B4RRSXR/bab4fc1b-c269-44c1-8d60-367626f8b029.jpg',
              node.id,
              {
                store,
                cache,
                createNode,
                createNodeId,
              }
            );
            asset.content['localImage___NODE'] = imgNode.id;
          } else if (type === 'Video') {
            const imgNode = await createRemoteImageNode(
              get(
                /*content*/ 'https://i.ibb.co/B4RRSXR/bab4fc1b-c269-44c1-8d60-367626f8b029.jpg',
                'preview.url'
              ),
              node.id,
              {
                store,
                cache,
                createNode,
                createNodeId,
              }
            );
            asset.content.preview['previewImage___NODE'] = imgNode.id;
          }
          return asset;
        })
      );
      break;
    }

    case constants.NODE_TYPES.PAGE: {
      await Promise.all(
        node.components.items.map(async component => {
          const createRemoteImageCallback = async index => {
            let fileNode;
            const asset = component.assets[index];
            try {
              fileNode = await createRemoteImageNode(asset.url, node.id, {
                store,
                cache,
                createNode,
                createNodeId,
              });
              asset[`localImage___NODE`] = fileNode.id;
            } catch (error) {
              console.error(error);
            }
          };

          for (let index = 0; index < component.assets.length; index++) {
            await createRemoteImageCallback(index);
          }
        })
      );
      break;
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const createPageFromTemplate = (edge, page) => {
    const slug = addTrailingSlash(edge.node.fields.slug);

    createPage({
      path: slug,
      component: getPageTemplate(page.type),
      context: {
        page,
        edge,
        slug,
        name: edge.node.name,
        nextSlug: addTrailingSlash(get(edge, 'next.fields.slug')),
        previousSlug: addTrailingSlash(get(edge, 'previous.fields.slug')),
      },
    });
  };

  const pages = await createDefaultPages({
    graphql,
    createPage: page => {
      const slug = addTrailingSlash(page.relativePath);

      createPage({
        path: slug,
        component: getPageTemplate(page.type),
        context: {
          slug,
          page,
          ...getStaticLists(page.components.items),
        },
      });
    },
  });

  // Get the page data for each page type
  const recipeDetailsData = findPageFromNodes(
    pages,
    constants.TEMPLATE_PAGE_TYPES.RECIPE
  );
  const articleDetailsData = findPageFromNodes(
    pages,
    constants.TEMPLATE_PAGE_TYPES.ARTICLE
  );
  const recipeCategoryData = findPageFromNodes(
    pages,
    constants.TEMPLATE_PAGE_TYPES.CATEGORY
  );
  const contentHubData = findPageFromNodes(
    pages,
    constants.TEMPLATE_PAGE_TYPES.TAG
  );

  await Promise.all([
    createRecipePages({
      graphql,
      createPage,
      page: recipeDetailsData,
    }),
    createCategoryPages({
      graphql,
      createPage,
      page: recipeCategoryData,
    }),
    createArticlePages({
      graphql,
      createPage: edge => {
        createPageFromTemplate(edge, articleDetailsData);
      },
    }),
    createContentHubPages({
      graphql,
      createPage: edge => {
        createPageFromTemplate(edge, contentHubData);
      },
    }),
  ]);
};

exports.onCreateWebpackConfig = ({ actions, getConfig, stage, loaders }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
      module: {
        rules: [
          {
            exclude: path.resolve(__dirname, 'node_modules'),
            include: path.resolve(
              __dirname,
              'src/_[A-Za-z]+\\.scss$|[A-Za-z]+\\.css$/'
            ),

            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ],
      },
    });
  }

  const config = getConfig();
  config.resolve = {
    ...config.resolve,
    alias: { ...config.resolve.alias, lodash: 'lodash-es' },
  };
  const svgLoaderRule = config.module.rules.find(rule => {
    if (
      rule.test === /\.svg$/ && Array.isArray(rule.use)
        ? rule.use.length === 2
        : false
    ) {
      return rule;
    }
  });
  svgLoaderRule &&
    svgLoaderRule.use &&
    (svgLoaderRule.use[0].options.classIdPrefix = true);

  if (stage === 'develop') {
    config.module.rules.push({
      test: /react-hot-loader/,
      use: [loaders.js()],
    });
  }

  if (stage === 'build-html') {
    config.module.rules.push({
      test: /elasticsearch-browser/,
      use: loaders.null(),
    });
  }

  actions.replaceWebpackConfig(config);
};

exports.onPostBuild = async ({ getNodesByType }) => {
  // To run ES update pass `updateES=true` as a build param
  const args = process.argv.slice(2);
  if (
    !args ||
    !args.some(item => {
      const arg = item.split('=');
      return arg && arg.length && arg[0] === 'updateES' && arg[1] === 'true';
    })
  ) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log('updating ES');

  const hrstart = process.hrtime();

  const promises = [
    updateES.updateRecipes(getNodesByType(constants.NODE_TYPES.RECIPE)),
    updateES.updateArticles(getNodesByType(constants.NODE_TYPES.ARTICLE)),
  ];

  await Promise.all(promises);

  const hrend = process.hrtime(hrstart);
  // eslint-disable-next-line no-console
  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
};
