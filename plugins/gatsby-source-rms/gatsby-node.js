const createNodes = require('./createNodes');
const { createRecipeNodes, createTagGroupingsNodes } = createNodes;
const { getCaterogyTags, getRecipesByPage } = require('./apiService');

const RECIPE_PAGE_SIZE = 250;

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  const promises = [];
  const result = await getRecipesByPage(configOptions, 0, 1);
  const recipeCount = result.data.recipeCount;

  let recipePage = 0;
  while (recipePage * RECIPE_PAGE_SIZE < recipeCount) {
    const recipePromise = async () =>
      getRecipesByPage(configOptions, RECIPE_PAGE_SIZE, recipePage).then(
        result =>
          result.data.recipes.forEach(
            item =>
              item &&
              createRecipeNodes(item, {
                createNodeId,
                createContentDigest,
                createNode,
              })
          )
      );

    promises.push(recipePromise());
    recipePage++;
  }

  const getTagsPromise = getCaterogyTags(configOptions).then(result =>
    result.data.forEach(
      item =>
        item &&
        createTagGroupingsNodes(item, {
          createNodeId,
          createContentDigest,
          createNode,
        })
    )
  );

  promises.push(getTagsPromise);

  return await Promise.all(promises);
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
    type Recipe implements Node {
      assets: RecipeAssets
    }
    type RecipeAssets {
      images: RecipeAssetsImages
    }
    type RecipeAssetsImages {
      default: RecipeAssetsImagesDefault
    }
    type RecipeAssetsImagesDefault {
      base64: String
      aspectRatio: Float
      width: Float
      height: Float
      src: String
      srcWebp: String
      srcSet: String
      srcSetWebp: String
      sizes: String
    }
  `;
  createTypes(typeDefs);
};
