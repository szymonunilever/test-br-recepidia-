const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const keys = require('../../integrations/keys.json');

module.exports = async (url, id, staticParams) => {
  return await createRemoteFileNode({
    url:
      url ||
      'https://i.ibb.co/B4RRSXR/bab4fc1b-c269-44c1-8d60-367626f8b029.jpg',
    parentNodeId: id,
    ext: '.jpg',
    name: 'image',
    httpHeaders: {
      staticFirstApiKey: keys.AemAssetsCredentials['staticFirstApiKey'],
      Authorization: keys.AemAssetsCredentials.Authorization,
    },
    ...staticParams,
  });
};
