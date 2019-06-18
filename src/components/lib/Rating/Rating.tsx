import React from 'react';
import { RatingProps, RatingProvider } from './models';

const Rating = ({ recipeId, rating, provider, linkTo = '' }: RatingProps) => {
  return (
    <>
      {provider === RatingProvider.kritique ? (
        <div
          className="rr-widget-container rr-container"
          data-summary-template="inline01"
          data-entity-type="recipe"
          data-unique-id={recipeId}
          data-entity-url=""
          data-category-pageurl=""
          title="Recipeeeeeeeeeee"
        />
      ) : null}
    </>
  );
  //   <div
  //     className="rr-widget-container rr-container"
  //     data-summary-template={rating.viewType}
  //     data-entity-type={rating.entityType}
  //     data-identifier-value={rating.identifierValue}
  //     data-identifier-type={rating.identifierType}
  //     data-unique-id={rating.uniqueId}
  //     data-entity-url={rating.entityUrl || `${process.env.RECIPES_URL}/${linkTo}`}
  //     data-category-pageurl={rating.categoryUrl || process.env.RECIPES_URL}
  //   />
};

export default Rating;
