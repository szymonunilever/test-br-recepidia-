import React, { useEffect, useState } from 'react';
import { getTagsFromRecipes } from '../../utils/getTagsFromRecipes';
import { useElasticSearch } from '../../utils';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';

import keys from 'integrations/keys.json';
import { onLoadMore } from '../lib/components/RecipeListing/models';
import useMedia from 'src/utils/useMedia';

const withInitialDataAndAsyncLoadMore = <T extends any>(
  Component: React.ComponentType<T>
) => {
  const Composition = (props: T) => {
    const {
      data: { tag, allRecipe, allTag },
    } = props;

    const initialRecipesCount = useMedia();

    const [recipeResultsList, setRecipeResultsList] = useState<
      Internal.Recipe[]
    >(allRecipe.nodes.slice(0, initialRecipesCount));

    const [recipeResultsCount, setRecipeResultsCount] = useState<number>(0);

    useEffect(() => {
      if (initialRecipesCount > setRecipeResultsList.length) {
        setRecipeResultsList(allRecipe.nodes.slice(0, initialRecipesCount));
      }
    }, [initialRecipesCount]);

    const [tagList, setTagList] = useState<Internal.Tag[]>([]);

    const getRecipeSearchData = async (
      params: SearchParams = {},
      getOnlyRecipeCount = false
    ) => {
      const queryString = {
        query: tag.tagId,
        fields: ['tagGroups.tags.id'],
      };

      const searchParams = {
        index: keys.elasticSearch.recipeIndex,
        body: {
          ...params,
          query: getOnlyRecipeCount
            ? {
                // eslint-disable-next-line @typescript-eslint/camelcase
                query_string: queryString,
              }
            : {
                bool: {
                  must: [
                    {
                      // eslint-disable-next-line @typescript-eslint/camelcase
                      query_string: queryString,
                    },
                  ],
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  must_not: [
                    {
                      terms: {
                        recipeId: recipeResultsList.map(
                          ({ recipeId }) => recipeId
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
        size,
      }).then(res => {
        setRecipeResultsList([
          ...recipeResultsList,
          ...res.hits.hits.map(item => item._source),
        ]);
      });
    };

    useEffect(() => {
      setTagList(getTagsFromRecipes(recipeResultsList, allTag.nodes));
    }, [recipeResultsList]);

    useEffect(() => {
      getRecipeSearchData({ size: 0 }, true).then(res => {
        setRecipeResultsCount(res.hits.total);
      });
    }, []);

    return (
      <Component
        {...props}
        initialRecipesCount={initialRecipesCount}
        tagList={tagList}
        recipeResultsList={recipeResultsList}
        recipeResultsCount={recipeResultsCount}
        onLoadMoreRecipes={onLoadMoreRecipes}
      />
    );
  };

  return Composition;
};

export default withInitialDataAndAsyncLoadMore;

export interface WithInitialDataAndAsyncLoadMore {
  tagList: Internal.Tag[];
  recipeResultsList: Internal.Recipe[];
  recipeResultsCount: number;
  onLoadMoreRecipes: onLoadMore;
}
