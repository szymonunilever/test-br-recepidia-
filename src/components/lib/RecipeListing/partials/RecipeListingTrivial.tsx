import React from 'react';
import { TagName, Text } from 'src/components/lib/Text';
import { RecipeCard } from './index';
import { RecipeListingTrivialProps } from './models';
import Rating from '../../Rating';
import { RatingProvider } from '../../Rating/models';

const RecipeListingTrivial = ({
  list,
  withFavorite,
  titleLevel = 3,
  onFavoriteChange,
  ratingProvider = RatingProvider.none,
}: RecipeListingTrivialProps) => {
  return (
    <ul className="recipe-list__list">
      {list.length > 0 ? (
        list.map(recipe => {
          return (
            <li key={recipe.id} className="recipe-list__item">
              <RecipeCard
                id={recipe.id}
                inFavorite={withFavorite ? recipe.inFavorite : false}
                enableSelectFavorite={withFavorite}
                titleLevel={titleLevel}
                imgObject={recipe.localImage.childImageSharp.fluid}
                title={recipe.shortTitle}
                slug={recipe.fields.slug}
                onFavoriteChange={onFavoriteChange}
              />
              {recipe.rating && ratingProvider !== RatingProvider.none ? (
                <Rating
                  recipeId={recipe.recipeId}
                  rating={recipe.rating}
                  provider={ratingProvider}
                  linkTo={recipe.fields.slug}
                />
              ) : null}
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
