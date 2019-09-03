import { useState, useCallback } from 'react';
import { getRecipesByIdsResponse } from 'src/utils/searchUtils';

const useFavoritesSearch = () => {
  const [recipeByIdsResults, setRecipeByIdsResults] = useState<{
    list: Internal.Recipe[];
    count: number;
  }>({
    list: [],
    count: 0,
  });

  const getRecipeDataByIds = useCallback(
    async (searchQeury, controlArray, params) => {
      getRecipesByIdsResponse(searchQeury, controlArray, params).then(res => {
        setRecipeByIdsResults({
          list: recipeByIdsResults.list.length
            ? [
                ...recipeByIdsResults.list,
                ...res.hits.hits.map(resItem => resItem._source),
              ]
            : res.hits.hits.map(resItem => resItem._source),
          count: res.hits.total,
        });
      });
    },
    [recipeByIdsResults]
  );

  return {
    getRecipeDataByIds,
    recipeByIdsResults,
  };
};

export default useFavoritesSearch;
