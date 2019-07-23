import React, { SyntheticEvent, useState, useEffect } from 'react';
import { RatingProps } from './models';
import {
  RatingAndReviewsEntityType,
  RatingAndReviewsProvider,
  RatingSummaryTemplate,
} from '../../models/ratings&reviews';
import cx from 'classnames';
import isBrowser from '../../utils/isBrowser';

const Rating = ({
  className,
  recipeId,
  provider,
  linkTo = '',
}: RatingProps) => {
  const classNames = cx('recipe-rating', className);
  const [locationOrigin, setLocationOrigin] = useState('');

  useEffect(() => {
    setLocationOrigin(window.location.origin);
  }, []);
  return (
    <>
      {provider === RatingAndReviewsProvider.kritique ? (
        <div className={classNames} data-componentname="recipe-rating">
          <div
            className="rr-widget-container rr-container"
            data-summary-template={RatingSummaryTemplate.inline01}
            data-entity-type={RatingAndReviewsEntityType.recipe}
            data-unique-id={recipeId}
            data-entity-url={isBrowser() && `${locationOrigin}${linkTo}`}
            data-category-pageurl={isBrowser() && `${locationOrigin}/recipes`}
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default Rating;
