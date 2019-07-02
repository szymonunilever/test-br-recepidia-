const axios = require('axios');
const createNodes = require('./createNodes');
const { createRecipeNodes, createTagGroupNodes } = createNodes;

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  const config = {
    headers: {
      'x-api-key': configOptions.key,
    },
  };

  const response = await axios.get(
    configOptions.endpoint.replace('{contentType}', 'recipes'),
    config
  );
  // const [recipes, tagGroups] = await Promise.all([
  //   await axios.get(
  //     configOptions.endpoint.replace('{contentType}', 'recipes'),
  //     config
  //   ),
  //   await axios.get(
  //     configOptions.endpoint.replace('{contentType}', 'tagGroups'),
  //     config
  //   ),
  // ]);

  response.data.recipes.forEach(recipe =>
    createRecipeNodes(recipe, {
      createNodeId,
      createContentDigest,
      createNode,
    })
  );
  response.data.tagGroups.forEach(tagGroup =>
    createTagGroupNodes(tagGroup, {
      createNodeId,
      createContentDigest,
      createNode,
    })
  );
};
