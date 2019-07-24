const axios = require('axios');
const createNodes = require('./createNodes');
const {
  createPagesNodes,
  createComponentsNodes,
  createArticleNodes,
} = createNodes;

//TODO: It should be removed after BackEnd will be done.
let articlePageTemplate = require('../../src/components/data/articleTemplateMock.json');
let articlesData = require('../../src/components/data/allArticlesPageData.json');
const searchPageMock = require('../../src/components/data/searchPageMock.json');
const contentHubPageMock = require('../../src/components/data/contentHubPage.json');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;
  const config = {
    headers: {
      'x-api-key': configOptions.key,
    },
  };

  const [pages, components] = await Promise.all([
    axios.get(
      'https://o04j5q4nt9.execute-api.eu-west-1.amazonaws.com/v1/pages/pt-br',
      {
        headers: {
          'x-api-key': 'UJAk5ILYjo8AhWaTP9d9K40LsdZZwoDS1YzCgo5s',
        },
      }
    ),
    axios.get(
      'https://o04j5q4nt9.execute-api.eu-west-1.amazonaws.com/v1/components/pt-br',
      {
        headers: {
          'x-api-key': 'UJAk5ILYjo8AhWaTP9d9K40LsdZZwoDS1YzCgo5s',
        },
      }
    ),
    /*axios.get(
      'https://o04j5q4nt9.execute-api.eu-west-1.amazonaws.com/v1/articles/pt-br',
      {
        headers: {
          'x-api-key': 'UJAk5ILYjo8AhWaTP9d9K40LsdZZwoDS1YzCgo5s',
        },
      }
    ),*/
  ]);

  //TODO: use this when BE for articles will be done.
  // pages.data.pages.forEach(page => {
  // createPagesNodes(page, { createNodeId, createContentDigest, createNode });
  // });

  //TODO: It should be removed after BackEnd for articles will be done.

  const tempData = [
    ...pages.data.pages,
    articlePageTemplate,
    contentHubPageMock,
    searchPageMock,
  ];
  tempData.forEach(page => {
    createPagesNodes(page, { createNodeId, createContentDigest, createNode });
  });

  components.data.components.components.items.forEach(component => {
    createComponentsNodes(component, {
      createNodeId,
      createContentDigest,
      createNode,
    });
  });

  //TODO: It should be replaced by real result mapping.
  articlesData = [...articlesData];
  articlesData.forEach(article => {
    createArticleNodes(article, {
      createNodeId,
      createContentDigest,
      createNode,
    });
  });
};
