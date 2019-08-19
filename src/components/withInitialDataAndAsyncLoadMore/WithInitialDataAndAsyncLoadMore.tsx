import React, { useEffect, useState } from 'react';
import { getTagsFromRecipes } from '../../utils/getTagsFromRecipes';
import { onLoadMore } from '../lib/components/RecipeListing/models';
import useMedia from 'src/utils/useMedia';
import { getFilteredRecipeResponse } from 'src/utils/searchUtils';

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

    const onLoadMoreRecipes = async (
      tags: Internal.Tag[],
      sorting: string,
      size: number
    ) => {
      getFilteredRecipeResponse(
        tag.tagId,
        recipeResultsList.map(({ recipeId }) => recipeId),
        { size }
      ).then(res => {
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
      getFilteredRecipeResponse(tag.tagId, undefined, { size: 0 }, true).then(
        res => {
          setRecipeResultsCount(res.hits.total);
        }
      );
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
