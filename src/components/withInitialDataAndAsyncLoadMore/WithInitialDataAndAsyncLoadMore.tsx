import React, { useEffect, useState } from 'react';
import { getTagsFromRecipes } from '../../utils/getTagsFromRecipes';
import { useElasticSearch } from '../../utils/index';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';

import keys from 'integrations/keys.json';
import { onLoadMore } from '../lib/components/RecipeListing/models';

const withInitialDataAndAsyncLoadMore = <T extends any>(
  Component: React.ComponentType<T>
) => {
  const Composition = (props: T) => {
    const {
      data: { tag, allRecipe, allTag },
    } = props;

    const [recipeResults, setRecipeResults] = useState<{
      list: Internal.Recipe[];
      count: number;
    }>({
      list: allRecipe.nodes,
      count: 0,
    });

    const [tagList, setTagList] = useState<Internal.Tag[]>([]);

    const getRecipeSearchData = async (params: SearchParams = {}) => {
      const searchParams = {
        index: keys.elasticSearch.recipeIndex,
        body: {
          ...params,
          query: {
            bool: {
              must: [
                {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  query_string: {
                    query: tag.name,
                    fields: ['tagGroups.tags.name'],
                  },
                },
              ],
              // eslint-disable-next-line @typescript-eslint/camelcase
              must_not: [
                {
                  terms: {
                    recipeId: allRecipe.nodes.map(
                      ({ recipeId }: { recipeId: number }) => recipeId
                    ),
                  },
                },
              ],
            },
          },
        },
      };

      return useElasticSearch<Internal.Recipe>(searchParams);
    };

    const onLoadMoreRecipes = async (
      tags: Internal.Tag[],
      sorting: string,
      size: number
    ) => {
      getRecipeSearchData({
        from: recipeResults.list.length - allRecipe.nodes.length,
        size,
      }).then(res => {
        setRecipeResults({
          ...recipeResults,
          list: [
            ...recipeResults.list,
            ...res.hits.hits.map(item => item._source),
          ],
        });
      });
    };

    useEffect(() => {
      setTagList(getTagsFromRecipes(recipeResults.list, allTag.nodes));
    }, [recipeResults]);

    useEffect(() => {
      getRecipeSearchData({
        size: 0,
      }).then(res => {
        setRecipeResults({
          ...recipeResults,
          count: res.hits.total + recipeResults.list.length,
        });
      });
    }, []);

    return (
      <Component
        {...props}
        tagList={tagList}
        recipeResults={recipeResults}
        onLoadMoreRecipes={onLoadMoreRecipes}
      />
    );
  };

  return Composition;
};

export default withInitialDataAndAsyncLoadMore;

export interface WithInitialDataAndAsyncLoadMore {
  tagList: Internal.Tag[];
  recipeResults: {
    list: Internal.Recipe[];
    count: number;
  };
  onLoadMoreRecipes: onLoadMore;
}
