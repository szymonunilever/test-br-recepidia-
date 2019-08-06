const keys = require('../../integrations/keys.json');
const axios = require('axios');
const _ = require('lodash');

const BATCH_SIZE = 300;
const NODE_TYPES = { RECIPE: 'Recipe', ARTICLE: 'Article' };

const bulkPost = (data, url) => {
  return axios.post(`${url}/_bulk`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const isIndexExists = async (url, index) => {
  try {
    let indexRes = await axios.head(`${url}/${index}`);
    return indexRes.status === 200;
  } catch (err) {
    if (err.response.status === 404) {
      return false;
    }

    throw new Error(err);
  }
};

const clearIndex = (url, index) => {
  axios.post(
    `${url}/${index}/_delete_by_query?conflicts=proceed`,
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
  const noOfBatches = Math.ceil(items.length / BATCH_SIZE);

  const promises = _.times(noOfBatches, i => {
    const startItem = BATCH_SIZE * i;
    const endItem = BATCH_SIZE * (i + 1);

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

    // format required by ES needs newline at end of each row
    return bulkPost(bulkRows.join('\n') + '\n', esUrl);
  });

  return Promise.all(promises);
};

const updateRecipes = async recipes => {
  const { url, recipeIndex: index } = keys.elasticSearch;

  if (await isIndexExists(url, index)) {
    await clearIndex(url, index);
  }

  return bulkBatchPost(recipes, 'recipeId', url, index, [
    'parent',
    'children',
    'internal',
    'methods',
    'nutrients',
    'nutrientsPerServing',
  ]);
};

const updateArticles = async articles => {
  const { url, articleIndex: index } = keys.elasticSearch;

  if (await isIndexExists(url, index)) {
    await clearIndex(url, index);
  }

  return bulkBatchPost(articles, 'id', url, index, [
    'parent',
    'children',
    'internal',
  ]);
};

module.exports = { updateRecipes, updateArticles, NODE_TYPES };
