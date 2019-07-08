const axios = require('axios');
const createNodes = require('./createNodes');
const { createPagesNodes, createComponentsNodes } = createNodes;

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

  const [pages, components] = await Promise.all([
    axios.get(
      'https://o04j5q4nt9.execute-api.eu-west-1.amazonaws.com/v1/pages/pt-br',
      {
        headers: {
          'x-api-key': 'UJAk5ILYjo8AhWaTP9d9K40LsdZZwoDS1YzCgo5s',
        },
      }
    ),
    axios.get(
      configOptions.endpoint.replace('{contentType}', 'components'),
      config
    ),
  ]);

  pages.data.pages.forEach(page => {
    createPagesNodes(page, { createNodeId, createContentDigest, createNode });
  });

  components.data.components.components.items.forEach(component => {
    createComponentsNodes(component, {
      createNodeId,
      createContentDigest,
      createNode,
    });
  });
};
