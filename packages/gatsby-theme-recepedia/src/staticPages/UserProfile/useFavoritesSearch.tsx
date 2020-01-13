import { useState, useCallback } from 'react';
import { getRecipesByIdsResponse } from 'src/utils/searchUtils';
import { esResponseHandler } from '../../utils/esResponseHandler';

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
        const { data, total } = esResponseHandler(res);
        setRecipeList(
          recipeList && recipeList.length ? [...recipeList, ...data] : data
        );
        setTotalCount(total);
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
