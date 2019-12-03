const axios = require('axios');
const createNodes = require('./createNodes');
const {
  createPagesNodes
} = createNodes;

const fetchContent = (configOptions) => {
  return axios.get(
    configOptions.endpoint,
    {
      headers: {
        'x-api-key': configOptions.key,
      },
    }
  );
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  const [
    productsResponse,
  ] = await Promise.all([
    fetchContent(configOptions),
  ]);

  productsResponse.data.forEach(page => {
    createPagesNodes(page, { createNodeId, createContentDigest, createNode });
  });
};
