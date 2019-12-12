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
import Helmet from 'react-helmet';

const Reviews = ({
  className,
  recipeId,
  provider,
  linkTo = '',
}: ReviewsProps) => {
  const classNames = cx('recipe-reviews', className);
  const kritiqueWidgetSrc = `${process.env['kritique_url']}?brandid=${process.env['kritique_brandId']}&localeid=${process.env['kritique_localeId']}&apikey=${process.env['kritique_apiKey']}&sitesource=${process.env['kritique_siteSource']}`;
  const [locationOrigin, setLocationOrigin] = useState('');

  useEffect(() => {
    setLocationOrigin(window.location.origin);
  }, []);

  return (
    <>
      {provider === RatingAndReviewsProvider.kritique ? (
        <>
          <Helmet
            script={[
              {
                id: `rr-widget-${recipeId}`,
                src: kritiqueWidgetSrc,
                async: true,
              },
            ]}
          />
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
        </>
      ) : null}
    </>
  );
};

export default Reviews;
