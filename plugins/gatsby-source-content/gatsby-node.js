const axios = require('axios');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  const processPage = page => {
    const nodeId = createNodeId(`page-${page.type}`);
    page.components = page.components.items.map(component => {
      const assets = component.content.image ? [component.content.image] : [];

      return {
        name: component.name,
        content: JSON.stringify(component.content),
        assets,
      };
    });
    const nodeContent = JSON.stringify(page);
    const nodeData = Object.assign({}, page, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'Page',
        content: nodeContent,
        contentDigest: createContentDigest(page),
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

  response.data.pages.forEach(page => {
    const nodeData = processPage(page);
    createNode(nodeData);
  });
};
