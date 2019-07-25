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
    'https://3ybs95wsg8.execute-api.eu-west-1.amazonaws.com/image/recipes/pt-BR',
    {
      headers: { 'x-api-key': 'HonNf7tiKw9CiiJ4WbT8U2LmoLo3kyVv3OFi8dNX' },
      params: { pageSize: pageSize, startRecord: page * pageSize + 1 },
    }
  );

  // return await axios.get(
  //   configOptions.endpoint.replace('{contentType}', 'recipes'),
  //   {
  //     headers: { 'x-api-key': configOptions.key },
  //     params: { pageSize: pageSize, startRecord: page * pageSize + 1 },
  //   }
  // );
}

exports.getRecipesByPage = getRecipesByPage;
exports.getCaterogyTags = getCaterogyTags;
