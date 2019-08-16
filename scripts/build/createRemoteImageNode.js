const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const keys = require('../../integrations/keys.json');

module.exports = async (url, id, staticParams) => {
  const imgNode = await createRemoteFileNode({
    url: 'https://i.ibb.co/B4RRSXR/bab4fc1b-c269-44c1-8d60-367626f8b029.jpg',
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
