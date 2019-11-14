const axios = require('axios');
const createNodes = require('./createNodes');
const {
  createPagesNodes,
  createComponentsNodes,
  createArticleNodes,
  createCategoryNodes,
  createDictionaryNodes,
  createDisclaimerNodes,
} = createNodes;
const pagesMock = require('../../src/components/data/pages.json');
const componentsMock = require('../../src/components/data/components.json');

const fetchContent = (configOptions, contentType) => {
  return axios.get(
    configOptions.endpoint.replace('{contentType}', `${contentType}`),
    {
      headers: {
        'x-api-key': configOptions.key,
      },
    }
  );
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  delete configOptions.plugins;

  const [
    // pagesResponse,
    // componentsResponse,
    articlesResponse,
    categoriesResponse,
  ] = await Promise.all([
    //fetchContent(configOptions, 'pages'),
    //fetchContent(configOptions, 'components'),
    fetchContent(configOptions, 'articles'),
    fetchContent(configOptions, 'aem/categories'),
  ]);
  // please add to pagesData local page json mocks for development purposes if page on BE does not exist or incorrect
  // e.g. const pagesData = [...pagesResponse.data.pages, newPageMock];
  const pagesData = [...pagesMock.pages];
  //TODO: remove next string when data for components will fixed on middleware
  const componentsData = componentsMock;
  pagesData.forEach(page => {
    createPagesNodes(page, { createNodeId, createContentDigest, createNode });
  });

  //TODO: modify next two functions when data for components will be fixed on middleware.
  componentsData.components.components.items.forEach(component => {
    createComponentsNodes(component, {
      createNodeId,
      createContentDigest,
      createNode,
    });
  });
  componentsData.dictionary &&
    createDictionaryNodes(componentsData.dictionary, {
      createNodeId,
      createContentDigest,
      createNode,
    });

  componentsData.disclaimer &&
    createDisclaimerNodes(componentsData.disclaimer, {
      createNodeId,
      createContentDigest,
      createNode,
    });

  //  componentsResponse.data.components.components.items.forEach(component => {
  //   createComponentsNodes(component, {
  //     createNodeId,
  //     createContentDigest,
  //     createNode,
  //   });
  // });

  articlesResponse.data.articles.forEach(article => {
    createArticleNodes(article, {
      createNodeId,
      createContentDigest,
      createNode,
    });
  });

  categoriesResponse.data.forEach(
    item =>
      item &&
      createCategoryNodes(item, {
        createNodeId,
        createContentDigest,
        createNode,
      })
  );
};
