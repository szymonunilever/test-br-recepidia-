import React, { useEffect, useState } from 'react';
import { getTagsFromRecipes } from '../../utils/getTagsFromRecipes';
import { useElasticSearch } from '../../utils';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';

import keys from 'integrations/keys.json';
import useMedia from 'src/utils/useMedia';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withInitialDataAndAsyncLoadMore = <T extends any>(
  Component: React.ComponentType<T>
) => {
  const Composition = (props: T) => {
    const {
      data: { tag, allRecipe, allTag },
      pageContext: { tags, recipeDetails },
    } = props;

    const initialRecipesCount = useMedia();
    const [recipeResultsList, setRecipeResultsList] = useState<
      Internal.Recipe[]
    >([]);
    const [recipeResultsCount, setRecipeResultsCount] = useState<number>(
      allRecipe.totalCount
    );
    const [tagList, setTagList] = useState<Internal.Tag[]>([]);
    const [dataFetched, setDataFetched] = useState(false);
    const formQueryString = () => {
      const query: string[] = [];
      if (tag || (tags && tags.length > 0)) {
        query.push(
          `(tagGroups.tags.id: (${tag ? tag.tagId : tags.join(' OR ')}))`
        );
      }

      recipeDetails &&
        Object.keys(recipeDetails).forEach(key => {
          recipeDetails[key] &&
            query.push(`recipeDetails.${key}: ${recipeDetails[key]}`);
        });

      return query.join(' AND ');
    };

    const getRecipeSearchData = async (
      params: SearchParams = {},
      queryString = {
        query: formQueryString(),
      }
    ) => {
      const searchParams = {
        index: keys.elasticSearch.recipeIndex,
        body: {
          ...params,
          query: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            query_string: queryString,
          },
        },
      };

      return useElasticSearch<Internal.Recipe>(searchParams);
    };

    const onLoadMoreRecipes = (
      tags: Internal.Tag[],
      sort: string,
      size: number,
      queryString: {
        query: string;
      }
    ) => {
      getRecipeSearchData(
        {
          size,
          sort,
          from: recipeResultsList.length,
        },
        queryString
      ).then(res => {
        setRecipeResultsList([
          ...recipeResultsList,
          ...res.hits.hits.map(item => item._source),
        ]);
      });
    };

    useEffect(() => {
      if (initialRecipesCount) {
        if (allRecipe.nodes && !allRecipe.nodes.length) {
          getRecipeSearchData({
            size: initialRecipesCount,
          }).then(res => {
            setRecipeResultsList(res.hits.hits.map(item => item._source));
            setRecipeResultsCount(res.hits.total);
            setDataFetched(true);
          });
        } else {
          setRecipeResultsList(allRecipe.nodes.slice(0, initialRecipesCount));
          setDataFetched(true);
        }
      }
    }, [initialRecipesCount]);

    useEffect(() => {
      if (allTag) {
        setTagList(getTagsFromRecipes(recipeResultsList, allTag.nodes));
      }
    }, [recipeResultsList]);

    return (
      <Component
        {...props}
        initialRecipesCount={initialRecipesCount}
        tagList={tagList}
        recipeResultsList={recipeResultsList}
        setRecipeResultsCount={setRecipeResultsCount}
        recipeResultsCount={recipeResultsCount}
        onLoadMoreRecipes={onLoadMoreRecipes}
        setDataFetched={setDataFetched}
        dataFetched={dataFetched}
        getRecipeSearchData={getRecipeSearchData}
        setRecipeResultsList={setRecipeResultsList}
      />
    );
  };

  return Composition;
};

export default withInitialDataAndAsyncLoadMore;
