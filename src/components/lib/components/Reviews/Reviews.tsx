import React, { useState, useEffect } from 'react';
import { ReviewsProps } from './models';
import {
  RatingAndReviewsEntityType,
  ReviewsSummaryTemplate,
  RatingAndReviewsProvider,
} from '../../models/ratings&reviews';
import cx from 'classnames';
import isBrowser from '../../utils/isBrowser';

const Reviews = ({
  className,
  recipeId,
  provider,
  linkTo = '',
}: ReviewsProps) => {
  const classNames = cx('recipe-reviews', className);

  const [locationOrigin, setLocationOrigin] = useState('');

  useEffect(() => {
    setLocationOrigin(window.location.origin);
  }, []);

  return (
    <>
      {provider === RatingAndReviewsProvider.kritique ? (
        <div className={classNames} data-componentname="recipe-reviews">
          <div
            className="c-recipe-reviews rr-widget-container"
            data-readpanel-template={ReviewsSummaryTemplate.readpanel01}
            data-entity-type={RatingAndReviewsEntityType.recipe}
            data-unique-id={recipeId}
            data-entity-url={isBrowser() && `${locationOrigin}${linkTo}`}
            data-category-pageurl={isBrowser() && `${locationOrigin}/recipes`}
          />
          <div className="c-recipe-reviews_seo" />
        </div>
      ) : null}
    </>
  );
};

export default Reviews;