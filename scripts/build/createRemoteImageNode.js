const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const config = require('../../app-config');

module.exports = async (url, id, staticParams) => {
  const imgExt =
    (url && ~url.indexOf('.png') && '.png') ||
    (url && ~url.indexOf('.svg') && '.svg') ||
    '.jpg';

  return await createRemoteFileNode({
    url:
      url ||
      'https://prod-headless.unileversolutions.com/api/assets/aem-headless-cms/recepedia/br/pt/site-wide-content/other-images/1.jpg',
    parentNodeId: id,
    ext: imgExt,
    name: 'image',
    httpHeaders: {
      'static-first-api-key': config.getByKey(
        'AemAssetsCredentials_staticFirstApiKey'
      ),
      Authorization: config.getByKey('AemAssetsCredentials_Authorization'),
    },
    ...staticParams,
  });
};
