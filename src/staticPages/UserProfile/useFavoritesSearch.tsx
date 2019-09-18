import { useState, useCallback } from 'react';
import { getRecipesByIdsResponse } from 'src/utils/searchUtils';

const useFavoritesSearch = () => {
  const [recipeList, setRecipeList] = useState<Internal.Recipe[]>();
  const [totalCount, setTotalCount] = useState<number>();

  const getRecipeDataByIds = useCallback(
    async (searchQeury, controlArray, params) => {
      if (!searchQeury) {
        setRecipeList([]);
        setTotalCount(0);
        return;
      }
      getRecipesByIdsResponse(searchQeury, controlArray, params).then(res => {
        setRecipeList(
          recipeList && recipeList.length
            ? [...recipeList, ...res.hits.hits.map(resItem => resItem._source)]
            : res.hits.hits.map(resItem => resItem._source)
        );
        setTotalCount(res.hits.total);
      });
    },
    [recipeList, totalCount]
  );

  return {
    getRecipeDataByIds,
    recipeList,
    totalCount,
  };
};

export default useFavoritesSearch;
