import React from 'react';
import { RecipeCardProps } from './models';

const RecipeCard = ({
  title,
  recipeImgPath,
  enableSelectFavorite,
  className = '',
}: RecipeCardProps) => {
  const resultView = enableSelectFavorite ? (
    <div data-componentname="recipeCard" className={className}>
      <img title={title} alt={title} src={recipeImgPath} />
    </div>
  ) : null;
  return { resultView };
};

export default RecipeCard;
