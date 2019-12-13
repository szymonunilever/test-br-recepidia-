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
  const [recipeResultsFetched, setRecipeResultsFetched] = useState(false);
  const [articleResultsFetched, setArticleResultsFetched] = useState(false);
  const initialTagsCount = useMedia(undefined, [9, 5]);

  const getRecipeSearchData = useCallback(
    async (searchQuery, params, filter) => {
      setRecipeResultsFetched(false);

      return getRecipeResponse(searchQuery, params, filter)
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
        .catch(() => {})
        .finally(() => {
          setRecipeResultsFetched(true);
      })
    },
    [recipeResults]
  );

  const getArticleSearchData = useCallback(
    async (searchQuery, params, filter) => {
      setArticleResultsFetched(false);

      return getArticleResponse(searchQuery, params, filter).then(res => {
        setArticleResults({
          list: params.from
            ? [
                ...articleResults.list,
                ...res.body.hits.hits.map(resItem => resItem._source),
              ]
            : res.body.hits.hits.map(resItem => resItem._source),
          count: res.body.hits.total.value,
        });
      }).finally(() => {
        setArticleResultsFetched(true)
      })
    },
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
        .catch(() => {}),
    []
  );

  const getSearchData = async (searchQuery: string, params: SearchParams) => {
    setRecipeResultsFetched(false);
    setArticleResultsFetched(false);
    Promise.all([
      // getArticleSearchData(searchQuery, params, ''), // TODO avoid request to articles EAT-1451
      getRecipeSearchData(searchQuery, params, ''),
    ]).then(() => {
      setRecipeResultsFetched(true);
      setArticleResultsFetched(true);
    });
  };

  const initialRecipesCount = useResponsiveScreenInitialSearch(
    (size: number) => getSearchData(searchQuery, { size }),
    get(recipeResults, 'list.length', 0),
    [searchQuery]
  );

  // const initialArticlesCount = useResponsiveScreenInitialSearch( // TODO avoid request to articles EAT-1451
  //   (size: number) => getSearchData(searchQuery, { size }),
  //   get(articleResults, 'list.length', 0),
  //   [searchQuery]
  // );

  const initialArticlesCount = 8;

  return {
    getSearchData,
    getRecipeSearchData,
    getArticleSearchData,
    getSearchSuggestionData,
    recipeResults,
    articleResults,
    searchInputResults,
    recipeResultsFetched,
    articleResultsFetched,
    initialRecipesCount,
    initialArticlesCount,
    initialTagsCount,
  };
};

export default useSearchResults;
