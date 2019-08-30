import { useState, useCallback } from 'react';
import get from 'lodash/get';
import { SearchInputProps } from 'src/components/lib/components/SearchInput/models';
import {
  getRecipeResponse,
  getArticleResponse,
  getSearchSuggestionResponse,
} from 'src/utils/searchUtils';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';
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

  const getArticleSearchData = useCallback(
    // async (searchQeury, params) =>
    //   getArticleResponse(searchQeury, params).then(res => {
    //     setArticleResults({
    //       list: params.from
    //         ? [
    //             ...articleResults.list,
    //             ...res.hits.hits.map(resItem => resItem._source),
    //           ]
    //         : res.hits.hits.map(resItem => resItem._source),
    //       count: res.hits.total,
    //     });
    //   }),
    async (searchQeury, params) => {}, // @todo remove this line and uncomment the a lines above when articles are there
    [articleResults]
  );

  const getSearchSuggestionData = useCallback(
    async (searchQuery, params) =>
      getSearchSuggestionResponse(searchQuery, params)
        .then(res => {
          // const [recipeSearchResponse, articleSearchResponse] = res;
          const [recipeSearchResponse] = res; // @todo remove this line and uncomment the a line above when articles are there

          setSearchInputResults({
            ...searchInputResults,
            list: [
              ...recipeSearchResponse.hits.hits.map(item => item._source.title),
              // ...articleSearchResponse.hits.hits.map(  // @todo uncomment these lines when articles are there
              //   item => item._source.title
              // ),
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
      // getArticleSearchData(searchQeury, params),
      getRecipeSearchData(searchQeury, params),
    ]).then(() => {
      setResultsFetched(true);
    });
  };

  const initialRecipesCount = useResponsiveScreenInitialSearch(
    (size: number) => getSearchData(searchQuery, { size }),
    get(recipeResults, 'list.length', 0),
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
    initialTagsCount,
  };
};

export default useSearchResults;
