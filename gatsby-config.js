/* eslint-disable @typescript-eslint/camelcase */

const path = require('path');
const integrations = require('./integrations.json');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Unilever Theme',
    author: '',
    description: 'Unilever theme',
    siteUrl: 'https://themealplanner.netlify.com/',
    social: {
      twitter: 'kylemathews',
    },
  },
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        //trackingId: 'ADD YOUR TRACKING ID HERE',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Uniliver Theme',
        short_name: 'GatsbyJS',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /inline/,
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
        lib: path.join(__dirname, 'src/components/lib'),
      },
    },
    {
      resolve: `gatsby-source-rms`,
      options: {
        endpoint: integrations.middleware.recipesEndpoint,
        key: integrations.middleware.key,
      },
    },
    {
      resolve: `gatsby-source-content`,
      options: {
        endpoint: integrations.middleware.pagesEndpoint,
        key: integrations.middleware.key,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Recipe',
        imagePath: 'assets.image.default[0].url',
        // imagePath: 'imageUrl',
      },
    },
  ],
};
