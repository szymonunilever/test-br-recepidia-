import { useState, useCallback } from 'react';
import { getRecipesByIdsResponse } from 'src/utils/searchUtils';

const useFavoritesSearch = () => {
  const [recipeList, setRecipeList] = useState<Internal.Recipe[]>();
  const [totalCount, setTotalCount] = useState<number>();

  const getRecipeDataByIds = useCallback(
    async (searchQuery, controlArray, params) => {
      if (!searchQuery) {
        setRecipeList([]);
        setTotalCount(0);
        return;
      }
      getRecipesByIdsResponse(searchQuery, controlArray, params).then(res => {
        setRecipeList(
          recipeList && recipeList.length
            ? [
                ...recipeList,
                ...res.body.hits.hits.map(resItem => resItem._source),
              ]
            : res.body.hits.hits.map(resItem => resItem._source)
        );
        setTotalCount(res.body.hits.total.value);
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
