/* eslint-disable @typescript-eslint/camelcase */

const path = require('path');
const appConfig = require('./app-config');

module.exports = {
  siteMetadata: {
    title: 'Recepedia',
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
        'app-config': path.resolve(__dirname, 'app-config'),
      },
    },
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

    // GA should be applied within Analytics container
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: appConfig.getByKey('analytics_google_trackingId'),
    //     head: appConfig.getByKey('analytics_google_head'),
    //     anonymize: appConfig.getByKey('analytics_google_anonymize'),
    //     respectDNT: appConfig.getByKey('analytics_google_respectDNT'),
    //     exclude: appConfig.getByKey('analytics_google_exclude'),
    //     pageTransitionDelay: appConfig.getByKey(
    //       'analytics_google_pageTransitionDelay'
    //     ),
    //     optimizeId: appConfig.getByKey('analytics_google_optimizeId'),
    //     experimentId: appConfig.getByKey('analytics_google_experimentId'),
    //     variationId: appConfig.getByKey('analytics_google_variationId'),
    //     sampleRate: appConfig.getByKey('analytics_google_sampleRate'),
    //     siteSpeedSampleRate: appConfig.getByKey(
    //       'analytics_google_siteSpeedSampleRate'
    //     ),
    //     cookieDomain: appConfig.getByKey('analytics_google_cookieDomain'),
    //   },
    // },
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
    process.env.CONTEXT !== 'production' && {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [
          {
            userAgent: `*`,
            disallow: `/`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
