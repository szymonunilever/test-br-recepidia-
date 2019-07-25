import React from 'react';
import { NullResult } from '../../NullResult';
import { RecipeCard } from './index';
import { RecipeListingTrivialProps } from './models';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';

const RecipeListingTrivial = ({
  list,
  withFavorite,
  FavoriteIcon,
  titleLevel = 3,
  onFavoriteChange,
  content: { nullResult },
  ratingProvider = RatingAndReviewsProvider.none,
}: RecipeListingTrivialProps) => (
  <ul className="recipe-list__list">
    {list.length > 0 ? (
      list.map(item => {
        return (
          <li key={item.id} className="recipe-list__item">
            <RecipeCard
              id={item.id}
              recipeId={item.recipeId}
              inFavorite={withFavorite ? item.inFavorite : false}
              enableSelectFavorite={withFavorite}
              Icon={FavoriteIcon}
              titleLevel={titleLevel}
              localImage={{
                id: item.recipeId,
                childImageSharp: { fluid: item.assets.images.default },
              }}
              content={{ title: item.title }}
              slug={item.fields.slug}
              onFavoriteChange={onFavoriteChange}
              ratingProvider={ratingProvider}
            />
          </li>
        );
      })
    ) : nullResult ? (
      <NullResult
        content={nullResult}
        className="recipe-list__null-results"
        titleLevel={titleLevel}
      />
    ) : null}
  </ul>
);

export default RecipeListingTrivial;
