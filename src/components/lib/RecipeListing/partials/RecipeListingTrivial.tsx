import React from 'react';
import { Text, TagName } from '../../Text';
import { RecipeCard } from './index';
import { RecipeListingTrivialProps } from './models';

const RecipeListingTrivial = ({
  list,
  withFavorite,
  titleLevel = 3,
  onFavoriteChange,
}: RecipeListingTrivialProps) => {
  return (
    <ul className="recipe-list__list">
      {list.length > 0 ? (
        list.map(item => {
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
        })
      ) : (
        <Text
          tag={TagName.p}
          className="recipe-list__no-results"
          text="Recipes were not found."
        />
      )}
    </ul>
  );
};

export default RecipeListingTrivial;
