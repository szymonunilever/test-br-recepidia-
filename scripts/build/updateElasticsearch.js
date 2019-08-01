const keys = require('../../integrations/keys.json');
const axios = require('axios');

const BATCH_SIZE = 500;
const NODE_TYPES = { RECIPE: 'Recipe', ARTICLE: 'Article' };

const bulkPost = async (data, url) => {
  try {
    await axios.post(`${url}/_bulk`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    throw new Error(err);
  }
};

const clearIndex = async (url, index) => {
  try {
    await axios.post(
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
  } catch (err) {
    throw new Error(err);
  }
};

const bulkBatchPost = (items, idField, esUrl, esIndex, fieldsToDelete) => {
  const promises = [];
  const noOfBatches = Math.ceil(items.length / BATCH_SIZE);
  let startItem = 0;

  for (let i = 0; i < noOfBatches; i++) {
    const endItem = startItem + BATCH_SIZE;
    const bulkRows = [];

    for (const item of items.slice(startItem, endItem)) {
      if (item) {
        // each datarow requires a header row like the belwo
        const headerRow = {
          index: {
            _index: esIndex,
            _type: '_doc',
            _id: item[idField],
          },
        };

        bulkRows.push(JSON.stringify(headerRow));

        // Delete unnecessary fields
        fieldsToDelete.forEach(field => delete item[field]);

        bulkRows.push(JSON.stringify(item));
      }
    }
    startItem = endItem > items.length ? items.length : endItem;
    // format required by ES needs newline at end of each row
    promises.push(bulkPost(bulkRows.join('\n') + '\n', esUrl));
  }

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
