const path = require('path');
const url = require('url');
const get = require('lodash').get;
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

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
      (node.shortTitle || node.title)
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
      '/recipe-category/',
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

  // if (node.internal.type === 'TagGroup') {
  //   node.tags.forEach(tagNode => {
  //     createTagSlugField(tagNode, { createNodeField });
  //   });
  // }

  if (node.internal.type === 'Page') {
    const componentPromises = node.components.items.map(async component => {
      let fileNode;
      try {
        fileNode = await createRemoteFileNode({
          url: component.content.image.url,
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
        component.content.image[`localImage___NODE`] = fileNode.id;
      }
    });

    await Promise.all(componentPromises);
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const recipePageCreation = new Promise(resolve => {
    return graphql(`
      {
        allRecipe {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allRecipe.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/RecipePage/RecipePage.tsx`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });

        resolve();
      });
    });
  });

  const recipePageCategoryCreation = new Promise(resolve => {
    graphql(`
      {
        allTag {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allTag.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            `./src/templates/RecipeCategoryPage/RecipeCategoryPage.tsx`
          ),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });

        resolve();
      });
    });
  });

  return Promise.all([recipePageCreation, recipePageCategoryCreation]);
};

exports.onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions;

  return new Promise(resolve => {
    // if the page component is the index page component
    const dirname = __dirname.replace(/\\/g, '/');
    if (page.componentPath === `${dirname}/src/pages/index/index.tsx`) {
      deletePage(page);

      // create a new page but with '/' as path
      createPage({
        ...page,
        path: '/',
      });
    }

    resolve();
  });
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // Add hashes to icons classNames
  const config = getConfig();
  const svgLoaderRule = config.module.rules.find(
    rule => get(rule, 'use.loader') === 'svg-react-loader'
  );
  svgLoaderRule.use.options.classIdPrefix = true;
  actions.replaceWebpackConfig(config);
};
