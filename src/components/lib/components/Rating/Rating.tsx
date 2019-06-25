import React from 'react';
import {
  RatingProps,
  RatingProvider,
  RatingSymmaryTemplate,
  RatingEntityType,
} from './models';
import Kritique from 'src/integrations/Kritique';

const Rating = ({ recipeId, provider, linkTo = '' }: RatingProps) => {
  return (
    <>
      {provider === RatingProvider.kritique ? (
        <>
          <Kritique />
          <div
            className="rr-widget-container rr-container"
            data-summary-template={RatingSymmaryTemplate.inline01}
            data-entity-type={RatingEntityType.recipe}
            data-unique-id={recipeId}
            data-entity-url={
              typeof window !== 'undefined' &&
              `${window.location.origin}${linkTo}`
            }
            data-category-pageurl={
              typeof window !== 'undefined' &&
              `${window.location.origin}${'/recipes'}`
            }
            title="Recipeeeeeeeeeee"
          />
        </>
      ) : null}
    </>
  );
};

export default Rating;
