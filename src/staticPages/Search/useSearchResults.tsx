import { useState, useCallback, useEffect } from 'react';
import { get } from 'lodash';
import { SearchInputProps } from 'src/components/lib/components/SearchInput/models';
import {
  getRecipeResponse,
  getRecipeFavoritesResponse,
  getArticleResponse,
  getSearchSuggestionResponse,
} from 'src/utils/searchUtils';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';
import useResponsiveScreenInitialSearch from 'src/utils/useElasticSearch/useResponsiveScreenInitialSearch';

const useSearchResults = (searchQuery: string) => {
  const [recipeResults, setRecipeResults] = useState<{
    list: Internal.Recipe[];
    count: number;
  }>({
    list: [],
    count: 0,
  });
  const [recipeFavoritesResults, setRecipeFavoritesResults] = useState<{
    list: Internal.Recipe[];
    count: number;
  }>({
    list: [],
    count: 0,
  });
  const [articleResults, setArticleResults] = useState<{
    list: Internal.Article[];
    count: number;
  }>({
    list: [],
    count: 0,
  });
  const [searchInputResults, setSearchInputResults] = useState<{
    list: SearchInputProps['searchResults'];
    count: number;
  }>({
    list: [],
    count: 0,
  });
  const [resultsFetched, setResultsFetched] = useState(false);

  const getRecipeSearchData = useCallback(
    async (searchQeury, params) =>
      getRecipeResponse(searchQeury, params).then(res => {
        setRecipeResults({
          list: params.from
            ? [
                ...recipeResults.list,
                ...res.hits.hits.map(resItem => resItem._source),
              ]
            : res.hits.hits.map(resItem => resItem._source),
          count: res.hits.total,
        });
      }),
    [recipeResults]
  );

  const getRecipeFavoritesData = useCallback(
    async (searchQeury, params) => {
      getRecipeFavoritesResponse(searchQeury, params).then(res => {
        setRecipeFavoritesResults({
          list: recipeFavoritesResults.list.length
            ? [
                ...recipeFavoritesResults.list,
                ...res.hits.hits.map(resItem => resItem._source),
              ]
            : res.hits.hits.map(resItem => resItem._source),
          count: res.hits.total,
        });
      });
    },
    [recipeFavoritesResults]
  );

  const getArticleSearchData = useCallback(
    async (searchQeury, params) =>
      getArticleResponse(searchQeury, params).then(res => {
        setArticleResults({
          list: params.from
            ? [
                ...articleResults.list,
                ...res.hits.hits.map(resItem => resItem._source),
              ]
            : res.hits.hits.map(resItem => resItem._source),
          count: res.hits.total,
        });
      }),
    [articleResults]
  );

  const getSearchSuggestionData = useCallback(
    async (searchQuery, params) =>
      getSearchSuggestionResponse(searchQuery, params)
        .then(res => {
          const [recipeSearchResponse, articleSearchResponse] = res;

          setSearchInputResults({
            ...searchInputResults,
            list: [
              ...recipeSearchResponse.hits.hits.map(item => item._source.title),
              ...articleSearchResponse.hits.hits.map(
                item => item._source.title
              ),
            ],
          });
        })
        .then(() => {
          setResultsFetched(true);
        }),
    []
  );

  const getSearchData = async (searchQeury: string, params: SearchParams) => {
    Promise.all([
      getArticleSearchData(searchQeury, params),
      getRecipeSearchData(searchQeury, params),
    ]).then(() => {
      setResultsFetched(true);
    });
  };

  const initialRecipesCount = useResponsiveScreenInitialSearch(
    (size: number) => getSearchData(searchQuery, { size }),
    get(recipeResults, 'list.length', 0)
  );

  return {
    getSearchData,
    getRecipeSearchData,
    getRecipeFavoritesData,
    getArticleSearchData,
    getSearchSuggestionData,
    recipeResults,
    recipeFavoritesResults,
    articleResults,
    searchInputResults,
    resultsFetched,
    initialRecipesCount,
  };
};

export default useSearchResults;
