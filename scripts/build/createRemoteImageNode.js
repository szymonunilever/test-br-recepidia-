const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const keys = require('../../integrations/keys.json');

module.exports = async (url, id, staticParams) => {
  const imgNode = await createRemoteFileNode({
    url: 'https://develop--br-recepedia-com.netlify.com/Recipe-image.jpg',
    // 'https://author-dev-headless.unileversolutions.com/api/assets/aem-headless-cms/headless-demo/br/pt/homepage-content/teaser-content/images/teaser-image.png',
    parentNodeId: id,
    ext: '.jpg',
    name: 'image',
    auth: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      htaccess_pass: 'unilever',
      // htaccess_pass: keys.AemAssetsCredentials.password,
      // eslint-disable-next-line @typescript-eslint/camelcase
      htaccess_user: '@@Brazil!@@',
      // htaccess_user: keys.AemAssetsCredentials.user,
    },
    ...staticParams,
  });
  return imgNode;
};
