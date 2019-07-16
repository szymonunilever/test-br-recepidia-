const axios = require('axios');

async function getCaterogyTags(configOptions) {
  return await axios.get(
    configOptions.endpoint.replace('{contentType}', 'categoryTags'),
    {
      headers: { 'x-api-key': configOptions.key },
    }
  );
}

async function getRecipesByPage(configOptions, pageSize, page) {
  return await axios.get(
    configOptions.endpoint.replace('{contentType}', 'recipes'),
    {
      headers: { 'x-api-key': configOptions.key },
      params: { pageSize: pageSize, startRecord: page * pageSize + 1 },
    }
  );
}

exports.getRecipesByPage = getRecipesByPage;
exports.getCaterogyTags = getCaterogyTags;
