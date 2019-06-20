import React from 'react';
import { Recommendations } from '../../NullResult';
import { RecipeCard } from './index';
import { RecipeListingTrivialProps } from './models';

const RecipeListingTrivial = ({
  list,
  withFavorite,
  FavoriteIcon,
  titleLevel = 3,
  onFavoriteChange,
  content: { nullResult },
}: RecipeListingTrivialProps) => (
  <ul className="recipe-list__list">
    {list.length > 0 ? (
      list.map(item => {
        return (
          <li key={item.id} className="recipe-list__item">
            <RecipeCard
              id={item.id}
              inFavorite={withFavorite ? item.inFavorite : false}
              enableSelectFavorite={withFavorite}
              Icon={FavoriteIcon}
              titleLevel={titleLevel}
              imgObject={item.localImage.childImageSharp.fluid}
              content={{ title: item.shortTitle }}
              slug={item.fields.slug}
              onFavoriteChange={onFavoriteChange}
            />
          </li>
        );
      })
    ) : nullResult ? (
      <Recommendations
        content={nullResult}
        className="recipe-list__null-results"
        titleLevel={titleLevel}
      />
    ) : null}
  </ul>
);

export default RecipeListingTrivial;
