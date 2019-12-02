import React, { useState, useEffect } from 'react';
import { ReviewsProps } from './models';
import {
  RatingAndReviewsEntityType,
  ReviewsSummaryTemplate,
  RatingAndReviewsProvider,
} from '../../models';
import cx from 'classnames';
import isBrowser from '../../utils/isBrowser';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

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
        <div
          className={classNames}
          {...getComponentDataAttrs('recipe-reviews')}
        >
          <div
            className="rr-widget-container rr-container"
            data-readpanel-template={ReviewsSummaryTemplate.readpanel01}
            data-entity-type={RatingAndReviewsEntityType.recipe}
            data-unique-id={recipeId}
            data-entity-url={isBrowser() && `${locationOrigin}${linkTo}`}
            data-category-pageurl={isBrowser() && `${locationOrigin}/recipes`}
          />
        </div>
      ) : null}
    </>
  );
};

export default Reviews;
