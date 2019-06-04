/* eslint-disable @typescript-eslint/camelcase */

const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Gatsby Unilever Theme",
    author: "",
    description: "Unilever theme",
    // siteUrl: 'https://gatsby-unilever-theme-demo.netlify.com/',
    social: {
      twitter: "kylemathews"
    }
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        //trackingId: 'ADD YOUR TRACKING ID HERE',
      }
    },
    "gatsby-plugin-feed",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Uniliver Theme",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#663399",
        display: "minimal-ui"
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /inline/
        }
      }
    },
    `gatsby-plugin-sass`,
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: path.join(__dirname, "src"),
        lib: path.join(__dirname, "src/components/lib")
      }
    }
  ]
};
