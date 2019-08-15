const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const keys = require('../../integrations/keys.json');

module.exports = async (url, id, staticParams) => {
  const imgNode = await createRemoteFileNode({
    url:
      url ===
      'https://scm-assets.constant.co/scm/unilever/1d398653b55393fd6da9bff8ea193338/d4ae1ef9-bfba-401d-bdc8-89ccb70a8e4f.jpg'
        ? 'https://scm-assets.constant.co/scm/unilever/1d398653b55393fd6da9bff8ea193338/bab4fc1b-c269-44c1-8d60-367626f8b029.jpg'
        : url,
    // 'https://author-dev-headless.unileversolutions.com/api/assets/aem-headless-cms/headless-demo/br/pt/homepage-content/teaser-content/images/teaser-image.png',
    parentNodeId: id,
    ext: '.jpg',
    name: 'image',
    auth: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      htaccess_pass: keys.AemAssetsCredentials.password,
      // eslint-disable-next-line @typescript-eslint/camelcase
      htaccess_user: keys.AemAssetsCredentials.user,
    },
    ...staticParams,
  });
  return imgNode;
};
