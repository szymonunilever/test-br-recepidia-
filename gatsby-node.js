// const keys = require('./integrations/keys.json');
// const axios = require('axios');

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
    }
  `).then(result => {
    const parseComponents = components => {
      return components.map(component => {
        return Object.assign({}, component, {
          content: JSON.parse(component.content),
        });
      });
    };

    const createPageFromTemplate = (
      { node },
      pageData,
      idPath = 'id',
      path
    ) => {
      createPage({
        path: path || node.fields.slug,
        component: getPageTemplate(pageData.type),
        context: {
          id: get(node, idPath),
          slug: node.fields.slug,
          components: pageData.components,
        },
      });
    };

    const pages = result.data.allPage.nodes.map(node =>
      Object.assign(node, { components: parseComponents(node.components) })
    );

    pages
      .filter(
        node =>
          ['RecipeDetail', 'RecipeCategory', 'ContentHub'].indexOf(
            node.type
          ) === -1
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

    const recipeDetailsPage = pages.find(item => item.type === 'RecipeDetail');
    const recipeCategoryPage = pages.find(
      item => item.type === 'RecipeCategory'
    );
    const contentHubPage = pages.find(item => item.type === 'ContentHub');

    result.data.allRecipe.edges.forEach(edge => {
      createPageFromTemplate(edge, recipeDetailsPage);
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

// const bulkPostRecipe = async data => {
//   try {
//     await axios.post(`${keys.elasticSearch.url}/_bulk`, data);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// exports.onPostBuild = async ({ getNodes }) => {
//   console.log(process.env.NODE_ENV);

//   if (process.env.NODE_ENV === 'production') {
//     return;
//   }

//   const nodes = getNodes();
//   const recipes = nodes.filter(node => node.internal.type === 'Recipe');

//   const promises = [];
//   // we can play around with this to speed up build time
//   const batchSize = 600;
//   const noOfBatches = Math.ceil(recipes.length / batchSize);
//   let startItem = 0;
//   for (let i = 0; i < noOfBatches; i++) {
//     const endItem = startItem + batchSize;
//     const bulkRows = [];
//     for (const recipe of recipes.slice(startItem, endItem)) {
//       if (recipe) {
//         // each datarow requires a header row like the belwo
//         const headerRow = {
//           index: {
//             _index: keys.elasticSearch.index,
//             _type: '_doc',
//             _id: recipe.recipeId,
//           },
//         };
//         bulkRows.push(JSON.stringify(headerRow));
//         // i've removed these fields to speed up the api call
//         // we don't need to search on them,
//         // there's other fields we can remove
//         delete recipe.assets;
//         delete recipe.parent;
//         delete recipe.children;
//         // we can send any json to the data row
//         const dataRow = JSON.stringify(recipe);
//         bulkRows.push(dataRow);
//       }
//     }
//     startItem = endItem > recipes.length ? endItem : recipes.length;
//     // format required by ES needs newline at end of each row
//     promises.push(bulkPostRecipe(bulkRows.join('\n') + '\n'));
//   }
// };
