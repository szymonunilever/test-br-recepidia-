import React, { useEffect, useState } from 'react';
import { getTagsFromRecipes } from '../../utils/getTagsFromRecipes';
import { useElasticSearch } from '../../utils';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';

import keys from 'integrations/keys.json';
import { onLoadMore } from '../lib/components/RecipeListing';
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
    >(allRecipe.nodes.slice(0, initialRecipesCount));

    const [recipeResultsCount, setRecipeResultsCount] = useState<number>(0);
    const [tagList, setTagList] = useState<Internal.Tag[]>([]);
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
      getOnlyRecipeCount = false
    ) => {
      const queryString = {
        query: formQueryString(),
      };

      const searchParams = {
        index: keys.elasticSearch.recipeIndex,
        body: {
          ...params,
          size: 8,
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
      })
        .then(res => {
          setRecipeResultsList([
            ...recipeResultsList,
            ...res.hits.hits.map(item => item._source),
          ]);
        })
        .catch(() => {});
    };

    useEffect(() => {
      if (
        !tags ||
        (tags &&
          tags.length === 0 &&
          recipeResultsList.length < initialRecipesCount)
      ) {
        getRecipeSearchData({
          size: 8,
        })
          .then(res => {
            setRecipeResultsList([...res.hits.hits.map(item => item._source)]);
          })
          .catch(() => {});
      } else if (initialRecipesCount > recipeResultsList.length) {
        setRecipeResultsList(allRecipe.nodes.slice(0, initialRecipesCount));
      }
    }, [initialRecipesCount]);

    useEffect(() => {
      setTagList(getTagsFromRecipes(recipeResultsList, allTag.nodes));
    }, [recipeResultsList]);

    useEffect(() => {
      getRecipeSearchData({ size: 0 }, true)
        .then(res => {
          setRecipeResultsCount(res.hits.total);
        })
        .catch(() => {});
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
