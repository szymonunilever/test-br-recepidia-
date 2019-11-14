import React, { SyntheticEvent, useState, useEffect } from 'react';
import { reloadKritiqueWidget } from '../../utils';
import { RatingProps } from './models';
import {
  RatingAndReviewsEntityType,
  RatingAndReviewsProvider,
  RatingSummaryTemplate,
} from '../../models/ratings&reviews';
import cx from 'classnames';
import isBrowser from '../../utils/isBrowser';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

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
  useEffect(() => {
    reloadKritiqueWidget();
  });
  return (
    <>
      {provider === RatingAndReviewsProvider.kritique ? (
        <div className={classNames} {...getComponentDataAttrs('recipe-rating')}>
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
