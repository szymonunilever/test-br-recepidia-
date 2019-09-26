const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const keys = require('../../integrations/keys.json');

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
      'static-first-api-key': keys.AemAssetsCredentials['static-first-api-key'],
      Authorization: keys.AemAssetsCredentials.Authorization,
    },
    ...staticParams,
  });
};
