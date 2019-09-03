/* eslint-disable @typescript-eslint/camelcase */

const path = require('path');
const integrations = require('./integrations/keys.json');

module.exports = {
  siteMetadata: {
    title: 'Recipedia',
    author: 'Unilever',
    description: 'Recipedia application',
    siteUrl: 'https://recipedia.netlify.com/',
    lang: 'pt-br',
  },
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-zopfli',
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        prettier: false,
        svgoConfig: {
          plugins: {
            removeViewBox: false,
            cleanupNumericValues: true,
            prefixIds: true,
          },
        },
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        integrations: path.join(__dirname, 'integrations'),
        lib: path.join(__dirname, 'src/components/lib'),
      },
    },
    {
      resolve: `gatsby-source-content`,
      options: {
        endpoint: integrations.middleware.contentEndpoint,
        key: integrations.middleware.key,
      },
    },
    {
      resolve: `gatsby-source-rms`,
      options: {
        endpoint: integrations.middleware.contentEndpoint,
        key: integrations.middleware.key,
      },
    },
    {
      resolve: 'gatsby-plugin-lodash',
      options: {
        disabledFeatures: [
          // 'shorthands',
          // 'currying',
          'deburring',
          'memoize',
          'coercions',
          'guards',
          'metadata',
          'flattening',
        ],
      },
    },
    // uncomment if need analyze bundle
    // {
    //   resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    //   options: {
    //     analyzerPort: 3000,
    //     production: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: integrations.analytics.google,
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: false,
        headers: {
          '/*': [
            `X-Frame-Options: DENY`,
            `X-XSS-Protection: 1; mode=block`,
            `X-Content-Type-Options: nosniff`,
            `Referrer-Policy: strict-origin-when-cross-origin`, // need to reqrite only this one to enable Kritique widget but because of plugin implemetation every security header is defined
          ],
        },
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
