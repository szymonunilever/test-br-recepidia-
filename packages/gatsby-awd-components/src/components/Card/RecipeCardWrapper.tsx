import cx from 'classnames';
import React, { FunctionComponent } from 'react';
import { RatingAndReviewsProvider } from '../../models';
import { Rating } from '../Rating';
import { Card } from './Card';
import theme from './RecipeCardWrapper.module.scss';
import { RecipeCardWrapperProps } from './models';

export const RecipeCardWrapper: FunctionComponent<RecipeCardWrapperProps> = ({
children,
ratingProvider,
})=>{
  const {recipeId, averageRating, fields:{slug}} = children.props.content;
  const ratingWidget =
    ratingProvider !== RatingAndReviewsProvider.none ? (
        <Rating
          className={cx(theme.recipeRatingStars, 'recipe-rating--stars')}
          recipeId={recipeId}
          provider={ratingProvider}
          averageRating={averageRating}
          linkTo={slug}
        />
    ): undefined;

  return <Card {...children.props} ratingWidget={ratingWidget} className={theme.recipeCard} />;
};

export default RecipeCardWrapper;
