import { useState, useCallback } from 'react';
import get from 'lodash/get';
import { SearchInputProps } from 'gatsby-awd-components/src';
import {
  getRecipeResponse,
  getArticleResponse,
  getSearchSuggestionResponse,
} from 'src/utils/searchUtils';
import { SearchParams } from 'gatsby-awd-components/src';
import useResponsiveScreenInitialSearch from 'src/utils/useElasticSearch/useResponsiveScreenInitialSearch';
import useMedia from 'src/utils/useMedia';

const useSearchResults = (searchQuery: string) => {
  const [recipeResults, setRecipeResults] = useState<{
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
  const initialTagsCount = useMedia(undefined, [9, 5]);

  const getRecipeSearchData = useCallback(
    async (searchQuery, params, filter) =>
      getRecipeResponse(searchQuery, params, filter)
        .then(res => {
          setRecipeResults({
            list: params.from
              ? [
                  ...recipeResults.list,
                  ...res.body.hits.hits.map(resItem => resItem._source),
                ]
              : res.body.hits.hits.map(resItem => resItem._source),
            count: res.body.hits.total.value,
          });
        })
        .catch(() => {}),
    [recipeResults]
  );

  const getArticleSearchData = useCallback(
    async (searchQuery, params, filter) =>
      getArticleResponse(searchQuery, params, filter).then(res => {
        setArticleResults({
          list: params.from
            ? [
                ...articleResults.list,
                ...res.body.hits.hits.map(resItem => resItem._source),
              ]
            : res.body.hits.hits.map(resItem => resItem._source),
          count: res.body.hits.total.value,
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
              ...recipeSearchResponse.body.hits.hits.map(
                item => item._source.title
              ),
              ...articleSearchResponse.body.hits.hits.map(
                item => item._source.title
              ),
            ],
          });
        })
        .then(() => {
          setResultsFetched(true);
        })
        .catch(() => {}),
    []
  );

  const getSearchData = async (searchQuery: string, params: SearchParams) => {
    Promise.all([
      getArticleSearchData(searchQuery, params, ''),
      getRecipeSearchData(searchQuery, params, ''),
    ]).then(() => {
      setResultsFetched(true);
    });
  };

  const initialRecipesCount = useResponsiveScreenInitialSearch(
    (size: number) => getSearchData(searchQuery, { size }),
    get(recipeResults, 'list.length', 0),
    [searchQuery]
  );

  const initialArticlesCount = useResponsiveScreenInitialSearch(
    (size: number) => getSearchData(searchQuery, { size }),
    get(articleResults, 'list.length', 0),
    [searchQuery]
  );

  return {
    getSearchData,
    getRecipeSearchData,
    getArticleSearchData,
    getSearchSuggestionData,
    recipeResults,
    articleResults,
    searchInputResults,
    resultsFetched,
    initialRecipesCount,
    initialArticlesCount,
    initialTagsCount,
  };
};

export default useSearchResults;
