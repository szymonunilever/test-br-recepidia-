const axios = require('axios');

const getListFromStrangeContract = (col, key) => {
  const list = [];

  for (let dish in col) {
    list.push(...col[dish][key]);
  }

  return list;
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  const processRecipe = recipe => {
    const nodeId = createNodeId(`recipe-${recipe.id}`);
    const nodeContent = JSON.stringify(recipe);
    const nodeData = Object.assign({}, recipe, {
      id: nodeId,
      recipeId: recipe.id,
      parent: null,
      children: [],
      internal: {
        type: 'Recipe',
        content: nodeContent,
        contentDigest: createContentDigest(recipe),
      },
    });
    return nodeData;
  };

  const config = {
    headers: {
      'x-api-key': configOptions.key,
    },
  };

  const response = await axios.get(configOptions.endpoint, config);

  response.data.recipes.forEach(recipe => {
    const nodeData = processRecipe(recipe);
    createNode(nodeData);
  });
};
