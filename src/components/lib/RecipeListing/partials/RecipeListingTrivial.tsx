import React from 'react';
import { TagName, Text } from 'src/components/lib/Text';
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
              <div
                className="rr-widget-container rr-container"
                data-summary-template="inline01"
                data-entity-type="recipe"
                data-identifier-value="124481"
                data-identifier-type=""
                data-unique-id="124481"
                title="Recipeeeeeeeeeee"
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
