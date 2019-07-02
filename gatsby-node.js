const path = require('path');
const url = require('url');
const fs = require('fs');
const get = require('lodash').get;
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const templatesMap = {
  RecipeCategory: path.resolve(
    `./src/templates/RecipeCategoryPage/RecipeCategoryPage.tsx`
  ),
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
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
          }
          type
          relativePath
          title
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

    const createPageFromTemplate = ({ node }, pageData) => {
      createPage({
        path: node.fields.slug,
        component: getPageTemplate(pageData.type),
        context: {
          slug: node.fields.slug,
          components: pageData.components,
        },
      });
    };

    const pages = result.data.allPage.nodes.map(node =>
      Object.assign(node, { components: parseComponents(node.components) })
    );

    pages
      .filter(node => ['RecipeDetail'].indexOf(node.type) === -1)
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

    result.data.allRecipe.edges.forEach(edge => {
      createPageFromTemplate(edge, recipeDetailsPage);
    });
    result.data.allTag.edges.forEach(edge => {
      createPageFromTemplate(edge, recipeCategoryPage);
    });
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
