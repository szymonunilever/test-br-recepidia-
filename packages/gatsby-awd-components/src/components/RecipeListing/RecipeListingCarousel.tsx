import React, { ReactElement, useCallback } from 'react';
import { RatingAndReviewsProvider } from '../../models';
import reloadKritiqueWidget from '../../utils/useKritiqueReload';
import Carousel from '../Carousel/Carousel';
import { RecipeCardLinkWrapperProps } from '../RecipeCardLinkWrapper';
import { RecipeListingCarouselProps } from './models';
import {RecipeCardProps} from '../RecipeCard';

const RecipeListingCarousel = ({
  titleLevel = 1,
  list,
  config,
  ratingProvider = RatingAndReviewsProvider.none,
  imageSizes,
  children,
}: RecipeListingCarouselProps) => {
  const getCurrentItem = useCallback(
    (item: Internal.Recipe) => {
      // @ts-ignore
      return Array.isArray(children) ? children.find(child => {
        if (child.props.hasOwnProperty('recipeId')) {
          return child.props.recipeId === item.recipeId;
        } else {
          return child.props.children.props.recipeId === item.recipeId;
        }
      }) : children as ReactElement<RecipeCardLinkWrapperProps> | ReactElement<RecipeCardProps>;
    },
    [
      titleLevel,
      ratingProvider,
      imageSizes,
      children
    ]
  );

  const handleVisibleElementsChanged = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (visibleElements: number) => {
      if (ratingProvider === RatingAndReviewsProvider.kritique) {
        reloadKritiqueWidget();
      }
    },
    [ratingProvider]
  );

  return (
    <Carousel
      list={list}
      createElementFunction={getCurrentItem}
      config={config}
      onVisibleElementsChanged={handleVisibleElementsChanged}
    />
  );
};

export default RecipeListingCarousel;
