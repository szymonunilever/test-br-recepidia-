/* eslint-disable @typescript-eslint/camelcase */

const path = require('path');

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
    'gatsby-plugin-offline',
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
  ],
};
