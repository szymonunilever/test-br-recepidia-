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
const generateRedirectMap = require('./scripts/build/generateRedirectMap');

const urlPartialsByTypeMap = {
  Article: 'title',
  Recipe: 'title',
  Tag: 'name',
  Category: 'name',
};

const findPageFromNodes = (pagesNodes, pageType) =>
  pagesNodes.find(pageNode => pageNode.type === pageType);

const formatUrlPartial = (partial = '') =>
  partial
    .replace(/[&,+()$~%.'":*?<>{}]/g, '')
    .toLowerCase()
    .split(' ')
    .join('-');

const getSlugFromPath = (path, node, prependWithField = null) => {
  const urlPartial = urlPartialsByTypeMap[node.internal.type] || 'id';
  const itemPath = prependWithField
    ? `${node[prependWithField]}-${node[urlPartial]}`
    : node[urlPartial];

  return url
    .resolve(path, formatUrlPartial(itemPath))
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
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

    return path[path.length - 1] === '/' ? path : `${path}/`;
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
    createPage({
      path: edge.node.fields.slug,
      component: getPageTemplate(page.type),
      context: {
        page,
        edge,
        slug: edge.node.fields.slug,
        name: edge.node.name,
        nextSlug: get(edge, 'next.fields.slug'),
        previousSlug: get(edge, 'previous.fields.slug'),
      },
    });
  };

  const pages = await createDefaultPages({
    graphql,
    createPage: page => {
      createPage({
        path: page.relativePath,
        component: getPageTemplate(page.type),
        context: {
          slug: page.relativePath,
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

// TODO: As soon as a number of post build jobs will be increased the following part should be refactored
exports.onPostBuild = async ({ getNodes, getNodesByType }) => {
  // To run ES update pass `updateES=true` as a build param
  // To run redirects map generation pass `redirects-map=true` as a build param
  const args = process.argv.slice(2);
  if (!args) {
    return;
  }

  const isUpdateES = args.some(item => {
    const arg = item.split('=');
    return arg && arg.length && arg[0] === 'updateES' && arg[1] === 'true';
  });

  const isGenerateRedirectMap = args.some(item => {
    const arg = item.split('=');
    return arg && arg.length && arg[0] === 'redirects-map' && arg[1] === 'true';
  });

  if (isGenerateRedirectMap) {
    // eslint-disable-next-line no-console
    console.log('Generating redirects map');

    const tstart = process.hrtime();

    // The config can be moved to AEM/config file or any place
    // Generation script works independently of the application and doesn't have any references outside
    const config = {
      newUrls: getNodes()
        .filter(item => item.fields && item.fields.slug)
        .map(item => item.fields.slug),
      pageNodes: getNodes(),
      oldSitemapPath: [
        './old-sitemap/old-sitemap-1.xml',
        './old-sitemap/old-sitemap-2.xml',
      ],
      oldDomain: 'https://br.recepedia.com',
      JMESPathToUrls: `"ns1:urlset"."ns1:url"[]."ns1:loc"`,
      redirectRules: [
        {
          from: '/receita/[0-9]*-(?<name>.+)',
          to: '/receitas/[0-9]*-?<name>$',
        },
        {
          from: '/dietas-especiais/(?<name>.+)',
          to: '/receitas-categorias/?<name>$',
        },
        {
          from: '/dietas-especiais/(?<name>.+)',
          to: '/hub-de-conteudo/?<name>$',
        },
        {
          from: '/tipos-de-receita/(?<name>.+)',
          to: '/receitas-categorias/?<name>$',
        },
        {
          from: '/tipos-de-receita/(?<name>.+)',
          to: '/hub-de-conteudo/?<name>$',
        },
        {
          from: '/tipos-de-prato/(?<name>.+)',
          to: '/receitas-categorias/?<name>$',
        },
        {
          from: '/tipos-de-prato/(?<name>.+)',
          to: '/hub-de-conteudo/?<name>$',
        },
        { from: '/momentos/(?<name>.+)', to: '/receitas-categorias/?<name>$' },
        { from: '/momentos/(?<name>.+)', to: '/hub-de-conteudo/?<name>$' },
        { from: '/cozinha/(?<name>.+)', to: '/receitas-categorias/?<name>$' },
        { from: '/cozinha/(?<name>.+)', to: '/hub-de-conteudo/?<name>$' },
      ],
    };

    await generateRedirectMap(config);

    // eslint-disable-next-line no-console
    console.log('Redirects map generation finished');

    const trend = process.hrtime(tstart);
    // eslint-disable-next-line no-console
    console.info('Execution time (hr): %ds %dms', trend[0], trend[1] / 1000000);
  }

  if (isUpdateES) {
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
  }
};
