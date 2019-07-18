const path = require('path');
const url = require('url');
const fs = require('fs');
const get = require('lodash').get;
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const getTagSlug = (path, tag) => `${path}${tag.fields.slug}`;

const templatesMap = {
  RecipeCategory: path.resolve(
    `./src/templates/RecipeCategoryPage/RecipeCategoryPage.tsx`
  ),
  ContentHub: path.resolve(`./src/templates/ContentHubPage/ContentHubPage.tsx`),
  RecipeDetail: path.resolve(`./src/templates/RecipePage/RecipePage.tsx`),
  ArticleDetail: path.resolve(`./src/templates/ArticlePage/ArticlePage.tsx`),
  default: path.resolve(`./src/templates/ContentPage/ContentPage.tsx`),
};

function getPageTemplate(pageType) {
  let template;
  const staticPath = path.resolve(`./src/staticPages/${pageType}/index.tsx`);

  if (fs.existsSync(staticPath)) {
    template = staticPath;
  } else if (templatesMap[pageType]) {
    template = templatesMap[pageType];
  } else {
    template = templatesMap.default;
  }

  return template;
}

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions;

  if (node.internal.type === 'Recipe') {
    const slug = url.resolve(
      '/recipes/',
      (
        (node.title && node.title.replace(/[&,+()$~%.'":*?<>{}]/g, '')) ||
        node.id
      )
        .toLowerCase()
        .split(' ')
        .join('-')
    );

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }

  if (node.internal.type === 'Article') {
    const slug = url.resolve(
      '/articles/',
      (
        (node.title && node.title.replace(/[&,+()$~%.'":*?<>{}]/g, '')) ||
        node.id
      )
        .toLowerCase()
        .split(' ')
        .join('-')
    );

    const promises = node.assets.map(async asset => {
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
      }

      return asset;
    });

    await Promise.all(promises);
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }

  if (node.internal.type === 'Tag') {
    const slug = url.resolve(
      '/',
      node.name
        .toLowerCase()
        .split(' ')
        .join('-')
    );

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }

  if (node.internal.type === 'Page') {
    const componentPromises = node.components.map(async component => {
      let fileNode;
      try {
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
      } catch (error) {
        // TODO: error handler
      }

      if (fileNode) {
        component.assets[0][`localImage___NODE`] = fileNode.id;
      }
    });

    await Promise.all(componentPromises);
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allPage {
        nodes {
          components {
            name
            content
            assets {
              url
              alt
              localImage {
                id
                childImageSharp {
                  fluid {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                    srcSetWebp
                    srcWebp
                  }
                }
              }
            }
          }
          type
          relativePath
        }
      }

      allRecipe {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      allTag {
        edges {
          node {
            fields {
              slug
            }
            tagId
          }
        }
      }
      allArticle {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const parseComponents = components => {
      return components.map(component => {
        return Object.assign({}, component, {
          content: JSON.parse(component.content),
        });
      });
    };

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
          edge,
        },
      });
    };

    const pages = result.data.allPage.nodes.map(node =>
      Object.assign(node, { components: parseComponents(node.components) })
    );

    pages
      .filter(
        node =>
          [
            'RecipeDetail',
            'RecipeCategory',
            'ArticleDetail',
            'ContentHub',
          ].indexOf(node.type) === -1
      )
      .forEach(node => {
        createPage({
          path: node.relativePath,
          component: getPageTemplate(node.type),
          context: {
            slug: node.relativePath,
            title: node.title,
            components: node.components,
          },
        });
      });

    const articleDetailsPage = pages.find(
      item => item.type === 'ArticleDetail'
    );
    const recipeDetailsPage = pages.find(item => item.type === 'RecipeDetail');
    const recipeCategoryPage = pages.find(
      item => item.type === 'RecipeCategory'
    );
    const contentHubPage = pages.find(item => item.type === 'ContentHub');

    result.data.allRecipe.edges.forEach(edge => {
      createPageFromTemplate(edge, recipeDetailsPage);
    });
    result.data.allArticle.edges.forEach(edge => {
      createPageFromTemplate(edge, articleDetailsPage);
    });
    result.data.allTag.edges.forEach(edge => {
      createPageFromTemplate(
        edge,
        recipeCategoryPage,
        'tagId',
        getTagSlug(recipeCategoryPage.relativePath, edge.node)
      );

      createPageFromTemplate(
        edge,
        contentHubPage,
        'tagId',
        getTagSlug(contentHubPage.relativePath, edge.node)
      );
    });
  });
};

exports.onCreateWebpackConfig = ({ actions, getConfig, stage, loaders }) => {
  // Add hashes to icons classNames
  const config = getConfig();
  const svgLoaderRule = config.module.rules.find(
    rule => get(rule, 'use.loader') === 'svg-react-loader'
  );
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

  svgLoaderRule.use.options.classIdPrefix = true;
  actions.replaceWebpackConfig(config);
};
