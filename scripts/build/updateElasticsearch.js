const keys = require('../../integrations/keys.json');
const axios = require('axios');

const BATCH_SIZE = 500;
const NODE_TYPES = { RECIPE: 'Recipe', ARTICLE: 'Article' };

const bulkPost = async (data, url) => {
  return await axios.post(`${url}/_bulk`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const clearIndex = async (url, index) => {
  return await axios.post(
    `${url}/${index}/_delete_by_query`,
    {
      query: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        match_all: {},
      },
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

const bulkBatchPost = (items, idField, esUrl, esIndex, fieldsToDelete) => {
  const promises = [];
  const noOfBatches = Math.ceil(items.length / BATCH_SIZE);
  let startItem = 0;

  promises.fill(
    (async () => {
      const endItem = startItem + BATCH_SIZE;
      const bulkRows = items.slice(startItem, endItem).map(item => {
        if (item) {
          // each datarow requires a header row like the below
          const headerRow = {
            index: {
              _index: esIndex,
              _type: '_doc',
              _id: item[idField],
            },
          };

          // Delete unnecessary fields
          fieldsToDelete.forEach(field => delete item[field]);

          return `${JSON.stringify(headerRow)}\n${JSON.stringify(item)}`;
        }
      });

      startItem = endItem > items.length ? items.length : endItem;

      // format required by ES needs newline at end of each row
      return bulkPost(bulkRows.join('\n') + '\n', esUrl);
    })(),
    0,
    noOfBatches
  );

  return Promise.all(promises);
};

const updateRecipes = async recipes => {
  await clearIndex(keys.elasticSearch.url, keys.elasticSearch.recipeIndex);

  return bulkBatchPost(
    recipes,
    'recipeId',
    keys.elasticSearch.url,
    keys.elasticSearch.recipeIndex,
    [
      'parent',
      'children',
      'internal',
      'methods',
      'nutrients',
      'nutrientsPerServing',
    ]
  );
};

const updateArticles = async articles => {
  await clearIndex(keys.elasticSearch.url, keys.elasticSearch.articleIndex);

  return bulkBatchPost(
    articles,
    'id',
    keys.elasticSearch.url,
    keys.elasticSearch.articleIndex,
    ['parent', 'children', 'internal']
  );
};

module.exports = { updateRecipes, updateArticles, NODE_TYPES };
