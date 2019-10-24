const createNodes = require('./createNodes');
const { createRecipeNodes, createTagGroupingsNodes } = createNodes;
const { getCategoryTags, getRecipesByPage } = require('./apiService');
const constants = require('../../scripts/constants');

const RECIPE_PAGE_SIZE = 250;

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, getNodesByType },
  configOptions
) => {
  const { createNode } = actions;

  let [dictionary] = getNodesByType(constants.NODE_TYPES.DICTIONARY);
  let [disclaimer] = getNodesByType(constants.NODE_TYPES.DISCLAIMER);
  dictionary && (dictionary = JSON.parse(dictionary.content));
  disclaimer && (disclaimer = JSON.parse(disclaimer.content));

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

  const getTagsPromise = getCategoryTags(configOptions).then(result =>
    result.data.forEach(
      item =>
        item &&
        createTagGroupingsNodes(
          item,
          {
            createNodeId,
            createContentDigest,
            createNode,
          },
          dictionary,
          disclaimer
        )
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
