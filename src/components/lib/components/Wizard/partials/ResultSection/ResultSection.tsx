import React, { Fragment, FunctionComponent } from 'react';
import { ResultSectionProps } from './models';
import RecipeListingCarousel from '../../../RecipeListing/RecipeListingCarousel';
import { TagName, Text } from '../../../Text';

const config = {
  breakpoints: [
    {
      width: 1366,
      switchElementsBelowBreakpoint: 1,
      switchElementsAfterBreakpoint: 2,
      visibleElementsBelowBreakpoint: 2,
      visibleElementsAboveBreakpoint: 4,
    },
  ],
};

const ResultSection: FunctionComponent<ResultSectionProps> = ({
  title,
  subheading,
  items,
}) => {
  const onFavoriteChange = () => alert('changed');

  return (
    <Fragment>
      <div className="wizard__title">
        <Text className="" tag={TagName.h2} text={title} />
        <Text className="subheading" tag={TagName.p} text={subheading} />
      </div>
      <div className="container">
        <RecipeListingCarousel
          list={items}
          config={config}
          titleLevel={1}
          onFavoriteChange={onFavoriteChange}
          imageSizes={'(min-width: 768px) 25vw, 50vw'}
        />
      </div>
    </Fragment>
  );
};

export default ResultSection;
