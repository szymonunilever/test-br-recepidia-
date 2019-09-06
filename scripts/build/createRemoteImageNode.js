const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const keys = require('../../integrations/keys.json');

module.exports = async (url, id, staticParams) => {
  const imgExt = url && ~url.indexOf('.png') ? '.png' : '.jpg';
  return await createRemoteFileNode({
    url:
      url ||
      'https://i.ibb.co/B4RRSXR/bab4fc1b-c269-44c1-8d60-367626f8b029.jpg',
    parentNodeId: id,
    ext: imgExt,
    name: 'image',
    httpHeaders: {
      staticFirstApiKey: keys.AemAssetsCredentials['static-first-api-key'],
      Authorization: keys.AemAssetsCredentials.Authorization,
    },
    ...staticParams,
  });
};
