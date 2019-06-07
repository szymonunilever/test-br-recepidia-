import React from 'react';
import cx from 'classnames';
import { RecipeListingProps } from './models';
import theme from './RecipeListing.module.scss';

const RecipeListing = ({ className }: RecipeListingProps) => {
  const wrapClasses = cx(theme.recipeList, className);
  return <div className={wrapClasses}>/* test */</div>;
};

export default RecipeListing;
