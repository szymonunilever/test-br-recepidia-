import React from 'react';
import { NullResult } from '../../NullResult';
import { RecipeCard } from './index';
import { RecipeListingTrivialProps } from './models';
import { RatingAndReviewsProvider } from '../../../models';
import cx from 'classnames';
import theme from './RecipeListingTrivial.module.scss';

const RecipeListingTrivial = ({
  list,
  withFavorite,
  FavoriteIcon,
  titleLevel = 3,
  onFavoriteChange,
  content: { nullResult },
  ratingProvider = RatingAndReviewsProvider.none,
  imageSizes,
  dataFetched,
}: RecipeListingTrivialProps) => {
  const noResults =
    nullResult && dataFetched ? (
      <NullResult
        content={nullResult}
        className={cx(
          theme.recipeList__nullResults,
          'recipe-list__null-results'
        )}
        titleLevel={titleLevel}
      />
    ) : null;

  return (
    <ul className={cx(theme.recipeList__list, 'recipe-list__list')}>
      {list.length > 0
        ? list.map(item => {
            return (
              <li
                key={item.id}
                className={cx(theme.recipeList__item, 'recipe-list__item')}
              >
                <RecipeCard
                  id={item.id}
                  recipeId={item.recipeId}
                  inFavorite={withFavorite ? item.inFavorite : false}
                  enableSelectFavorite={withFavorite}
                  Icon={FavoriteIcon}
                  titleLevel={titleLevel}
                  localImage={item.localImage}
                  content={{ title: item.title }}
                  slug={item.fields.slug}
                  onFavoriteChange={onFavoriteChange}
                  ratingProvider={ratingProvider}
                  imageSizes={imageSizes}
                />
              </li>
            );
          })
        : noResults}
    </ul>
  );
};

export default RecipeListingTrivial;
