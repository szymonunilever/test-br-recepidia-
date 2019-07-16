const createNodes = require('./createNodes');
const { createRecipeNodes, createTagGroupNodes } = createNodes;
const { getCaterogyTags, getRecipesByPage } = require('./apiService');

// TODO: uncomment as soon as images transformation processing will be moved out from the app
// const RECIPE_PAGE_SIZE = 250;
const RECIPE_PAGE_SIZE = 100;

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  const createRecipeNode = recipe =>
    createRecipeNodes(recipe, {
      createNodeId,
      createContentDigest,
      createNode,
    });

  const createTagGroupsNode = tagGroup =>
    createTagGroupNodes(tagGroup, {
      createNodeId,
      createContentDigest,
      createNode,
    });

  const promises = [];

  // TODO: uncomment as soon as images transformation processing will be moved out from the app
  // const result = await getRecipesByPage(configOptions, 0, 1);
  // const recipeCount = result.data.recipeCount;
  const recipeCount = 100;

  let recipePage = 0;
  while (recipePage * RECIPE_PAGE_SIZE < recipeCount) {
    const recipePromise = async () =>
      getRecipesByPage(configOptions, RECIPE_PAGE_SIZE, recipePage).then(
        result =>
          result.data.recipes.forEach(item => item && createRecipeNode(item))
      );

    promises.push(recipePromise());
    recipePage++;
  }

  const getTagsPromise = getCaterogyTags(configOptions).then(result =>
    result.data.forEach(item => item && createTagGroupsNode(item))
  );

  promises.push(getTagsPromise);

  return await Promise.all(promises);
};
