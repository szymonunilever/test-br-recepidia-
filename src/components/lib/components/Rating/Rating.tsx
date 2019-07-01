import React, { SyntheticEvent, useState, useEffect } from 'react';
import {
  RatingProps,
  RatingProvider,
  RatingSymmaryTemplate,
  RatingEntityType,
} from './models';
import isBrowser from '../../utils/isBrowser';

const Rating = ({ recipeId, provider, linkTo = '' }: RatingProps) => {
  const [locationOrigin, setLocationOrigin] = useState('');

  useEffect(() => {
    setLocationOrigin(window.location.origin);
  });

  return (
    <>
      {provider === RatingProvider.kritique ? (
        <>
          <div
            className="rr-widget-container rr-container"
            data-summary-template={RatingSymmaryTemplate.inline01}
            data-entity-type={RatingEntityType.recipe}
            data-unique-id={recipeId}
            data-entity-url={isBrowser() && `${locationOrigin}${linkTo}`}
            data-category-pageurl={
              isBrowser() && `${locationOrigin}${'/recipes'}`
            }
            title="Recipeeeeeeeeeee"
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default Rating;
