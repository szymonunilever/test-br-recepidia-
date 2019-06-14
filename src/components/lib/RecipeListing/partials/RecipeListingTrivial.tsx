import React from 'react';
import { Recommendations } from '../../Recommendations';
import { Text, TagName } from '../../Text';
import { RecipeCard } from './index';
import { RecipeListingTrivialProps } from './models';

const RecipeListingTrivial = ({
  list,
  withFavorite,
  titleLevel = 3,
  onFavoriteChange,
  content,
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
        <Recommendations
          content={content}
          className="recipe-list__null-results"
          titleLevel={titleLevel}
        />
      )}
    </ul>
  );
};

export default RecipeListingTrivial;
