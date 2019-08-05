/* eslint-disable no-console */
const url = require('url');
const get = require('lodash').get;
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const getPageTemplate = require('./scripts/build/getPageTemplate');
const createDefaultPages = require('./scripts/build/createDefaultPages');
const createRecipePages = require('./scripts/build/createRecipePages');
const createArticlePages = require('./scripts/build/createArticlePages');
const createCategoryAndContentPages = require('./scripts/build/createCategoryAndContentPages');
const updateES = require('./scripts/build/updateElasticsearch');

const getTagSlug = (path, tag) => `${path}${tag.fields.slug}`;

const getSlugFromPath = (path, node) =>
  url.resolve(
    path,
    ((node.title && node.title.replace(/[&,+()$~%.'":*?<>{}]/g, '')) || node.id)
      .toLowerCase()
      .split(' ')
      .join('-')
  );

const createSlugFor = ({ path, node, createNodeField }) => {
  const slug = getSlugFromPath(path, node);

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
}) => {
  const { createNodeField, createNode } = actions;

  switch (node.internal.type) {
    case 'Recipe':
      createSlugFor({ path: '/recipes/', node, createNodeField });
      break;
    case 'Tag':
      createSlugFor({ path: '/', node, createNodeField });
      break;
    case 'Article': {
      const slug = getSlugFromPath('/articles/', node);

      await Promise.all(
        node.assets.map(async asset => {
          const { type, content } = asset;
          if (type === 'Image' && content.url) {
            const imgNode = await createRemoteFileNode({
              url: content.url,
              parentNodeId: node.id,
              store,
              cache,
              createNode,
              createNodeId,
              ext: '.jpg',
              name: 'image',
            });
            asset.content['localImage___NODE'] = imgNode.id;
          } else if (type === 'Video') {
            const imgNode = await createRemoteFileNode({
              url: get(content, 'preview.url'),
              parentNodeId: node.id,
              store,
              cache,
              createNode,
              createNodeId,
              ext: '.jpg',
              name: 'image',
            });
            asset.content.preview['previewImage___NODE'] = imgNode.id;
          }
          return asset;
        })
      );

      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });
      break;
    }

    case 'Page': {
      await Promise.all(
        node.components.map(async component => {
          let fileNode;
          try {
            if (component.assets.length > 0) {
              fileNode = await createRemoteFileNode({
                url: component.assets[0].url,
                parentNodeId: node.id,
                store,
                cache,
                createNode,
                createNodeId,
                ext: '.jpg',
                name: 'image',
              });
            }
          } catch (error) {
            console.error(error);
          }

          if (fileNode) {
            component.assets[0][`localImage___NODE`] = fileNode.id;
          }
        })
      );
      break;
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const createPageFromTemplate = (edge, pageData, idPath = 'id', path) => {
    createPage({
      path: path || edge.node.fields.slug,
      component: getPageTemplate(pageData.type),
      context: {
        id: get(edge.node, idPath),
        slug: edge.node.fields.slug,
        components: pageData.components,
        nextSlug: get(edge, 'next.fields.slug'),
        previousSlug: get(edge, 'previous.fields.slug'),
        type: pageData.type,
        edge,
      },
    });
  };

  const pages = await createDefaultPages({
    graphql,
    createPage: node => {
      createPage({
        path: node.relativePath,
        component: getPageTemplate(node.type),
        context: {
          slug: node.relativePath,
          title: node.title,
          components: node.components,
          type: node.type,
        },
      });
    },
  });

  // Get the page data for each page type
  const recipeDetailsData = pages.find(item => item.type === 'RecipeDetail');
  const articleDetailsData = pages.find(item => item.type === 'ArticleDetail');
  const recipeCategoryData = pages.find(item => item.type === 'RecipeCategory');
  const contentHubData = pages.find(item => item.type === 'ContentHub');

  await Promise.all([
    createRecipePages({
      graphql,
      createPage,
      pageData: recipeDetailsData,
    }),
    createArticlePages({
      graphql,
      createPage: edge => {
        createPageFromTemplate(edge, articleDetailsData);
      },
    }),
    createCategoryAndContentPages({
      graphql,
      createPage: edge => {
        createPageFromTemplate(
          edge,
          recipeCategoryData,
          'tagId',
          getTagSlug(recipeCategoryData.relativePath, edge.node)
        );

        createPageFromTemplate(
          edge,
          contentHubData,
          'tagId',
          getTagSlug(contentHubData.relativePath, edge.node)
        );
      },
    }),
  ]);
};

exports.onCreateWebpackConfig = ({ actions, getConfig, stage, loaders }) => {
  // Add hashes to icons classNames
  const config = getConfig();
  const svgLoaderRule = config.module.rules.find(
    rule => get(rule, 'use.loader') === 'svg-react-loader'
  );
  svgLoaderRule.use.options.classIdPrefix = true;

  if (stage === 'develop') {
    config.module.rules.push({
      test: /react-hot-loader/,
      use: [loaders.js()],
    });
  } else if (stage === 'build-html') {
    config.module.rules.push({
      test: /elasticsearch-browser/,
      use: loaders.null(),
    });
  }

  actions.replaceWebpackConfig(config);
};

exports.onPostBuild = async ({ getNodesByType }) => {
  // eslint-disable-next-line no-console
  console.log('updating ES');

  const hrstart = process.hrtime();

  // Node types to update ES with, might be configured in future via parameters
  const nodeTypesToUpdate = [
    updateES.NODE_TYPES.RECIPE,
    updateES.NODE_TYPES.ARTICLE,
  ];

  const promises = nodeTypesToUpdate.map(node =>
    updateES.updateRecipes(getNodesByType(node))
  );

  await Promise.all(promises).then(() => {
    const hrend = process.hrtime(hrstart);
    // eslint-disable-next-line no-console
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  });
};
