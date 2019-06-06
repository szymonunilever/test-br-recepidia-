import React, { useState } from 'react';
import { RecipeListingTrivialProps } from './models';
import { RecipeCard } from './index';

const RecipeListingTrivial = ({
  list,
  withFavorite,
  titleLevel = 3,
  onFavoriteChange,
}: RecipeListingTrivialProps) => {
  return (
    <ul className="recipe-list__list">
      {list.map(item => {
        return (
          <li key={item.id} className="recipe-list__item">
            <RecipeCard
              id={item.id}
              inFavorite={withFavorite ? item.inFavorite : false}
              enableSelectFavorite={withFavorite}
              titleLevel={titleLevel}
              imgObject={item.localImage.childImageSharp.fluid}
              title={item.shortTitle}
              slug={item.fields.slug}
              onFavoriteChange={onFavoriteChange}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default RecipeListingTrivial;
