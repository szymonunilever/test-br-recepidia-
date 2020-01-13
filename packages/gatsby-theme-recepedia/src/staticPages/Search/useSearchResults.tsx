import { useState, useCallback } from 'react';
import get from 'lodash/get';
import { SearchInputProps } from 'gatsby-awd-components/src';
import {
  getRecipeResponse,
  getArticleResponse,
  getSearchSuggestionResponse,
  getProductResponse,
} from 'src/utils/searchUtils';
import { SearchParams } from 'gatsby-awd-components/src';
import useResponsiveScreenInitialSearch from 'src/utils/useElasticSearch/useResponsiveScreenInitialSearch';
import useMedia from 'src/utils/useMedia';
import { esResponseHandler } from '../../utils/esResponseHandler';

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
  const [productResults, setProductResults] = useState<{
    list: Internal.Product[];
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
  const [productResultsFetched, setProductResultsFetched] = useState(false);
  const initialTagsCount = useMedia(undefined, [9, 5]);

  const getRecipeSearchData = useCallback(
    async (searchQuery, params, filter) => {
      setRecipeResultsFetched(false);

      return getRecipeResponse(searchQuery, params, filter)
        .then(res => {
          const { data, total } = esResponseHandler(res);
          setRecipeResults({
            list: params.from ? [...recipeResults.list, ...data] : data,
            count: total,
          });
        })
        .catch(() => {})
        .finally(() => {
          setRecipeResultsFetched(true);
        });
    },
    [recipeResults]
  );

  const getArticleSearchData = useCallback(
    async (searchQuery, params, filter) => {
      setArticleResultsFetched(false);

      return getArticleResponse(searchQuery, params, filter)
        .then(res => {
          const { data, total } = esResponseHandler(res);
          setArticleResults({
            list: params.from ? [...articleResults.list, ...data] : data,
            count: total,
          });
        })
        .catch(() => {})
        .finally(() => {
          setArticleResultsFetched(true);
        });
    },
    [articleResults]
  );

  const getProductSearchData = useCallback(
    async (searchQuery, params, filter) => {
      setProductResultsFetched(false);

      return getProductResponse(searchQuery, params, filter)
        .then(res => {
          const { data, total } = esResponseHandler(res);
          setProductResults({
            list: params.from ? [...productResults.list, ...data] : data,
            count: total,
          });
        })
        .catch(() => {})
        .finally(() => {
          setProductResultsFetched(true);
        });
    },
    [productResults]
  );

  const getSearchSuggestionData = useCallback(
    async (searchQuery, params) =>
      getSearchSuggestionResponse(searchQuery, params)
        .then(res => {
          const [
            recipeSearchResponse,
            articleSearchResponse,
            productSearchResponse,
          ] = res;
          const recipeTitles = esResponseHandler(recipeSearchResponse, 'title')
            .byField;
          const articleTitles = esResponseHandler(
            articleSearchResponse,
            'title'
          ).byField;
          const productTitles = esResponseHandler(
            productSearchResponse,
            'productName'
          ).byField;
          setSearchInputResults({
            ...searchInputResults,
            list: [...recipeTitles, ...articleTitles, ...productTitles],
          });
        })
        .catch(() => {}),
    []
  );

  const getSearchData = async (searchQuery: string, params: SearchParams) => {
    setRecipeResultsFetched(false);
    setArticleResultsFetched(false);
    Promise.all([
      getArticleSearchData(searchQuery, params, ''),
      getRecipeSearchData(searchQuery, params, ''),
      getProductSearchData(searchQuery, params, ''),
    ]).then(() => {
      setRecipeResultsFetched(true);
      setArticleResultsFetched(true);
      setProductResultsFetched(true);
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

  const initialProductsCount = useResponsiveScreenInitialSearch(
    (size: number) => getSearchData(searchQuery, { size }),
    get(productResults, 'list.length', 0),
    [searchQuery]
  );

  return {
    getSearchData,
    getRecipeSearchData,
    getArticleSearchData,
    getProductSearchData,
    getSearchSuggestionData,
    recipeResults,
    articleResults,
    productResults,
    searchInputResults,
    recipeResultsFetched,
    articleResultsFetched,
    productResultsFetched,
    initialRecipesCount,
    initialArticlesCount,
    initialProductsCount,
    initialTagsCount,
  };
};

export default useSearchResults;
