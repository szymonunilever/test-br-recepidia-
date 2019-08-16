const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const keys = require('../../integrations/keys.json');

module.exports = async (url, id, staticParams) => {
  const imgNode = await createRemoteFileNode({
    url:
      'https://d37k6lxrz24y4c.cloudfront.net/v2/e9dc924f238fa6cc29465942875fe8f0/00fd0884-670e-4df4-adbb-ec517ee965c0-600.jpg',
    // 'https://author-dev-headless.unileversolutions.com/api/assets/aem-headless-cms/headless-demo/br/pt/homepage-content/teaser-content/images/teaser-image.png',
    parentNodeId: id,
    ext: '.jpg',
    name: 'image',
    // auth: {
    //   // eslint-disable-next-line @typescript-eslint/camelcase
    //   htaccess_user: keys.AemAssetsCredentials.user,
    //   // eslint-disable-next-line @typescript-eslint/camelcase
    //   htaccess_pass: keys.AemAssetsCredentials.password,
    // },
    ...staticParams,
  });
  return imgNode;
};
