const path = require('path');
const appConfig = require('./app-config');

module.exports = {
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-content`,
      options: {
        endpoint: appConfig.getByKey('middleware_contentEndpoint'),
        key: appConfig.getByKey('middleware_key'),
      },
    },
    {
      resolve: `gatsby-source-rms`,
      options: {
        endpoint: appConfig.getByKey('middleware_contentEndpoint'),
        key: appConfig.getByKey('middleware_key'),
      },
    }
  ]
};

