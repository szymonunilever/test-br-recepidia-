const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const config = require('../../app-config');

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
      staticFirstApiKey: config.getByKey(
        'AemAssetsCredentials_staticFirstApiKey'
      ),
      Authorization: config.getByKey('AemAssetsCredentials_Authorization'),
    },
    ...staticParams,
  });
};
