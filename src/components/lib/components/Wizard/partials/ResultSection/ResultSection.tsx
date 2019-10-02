import React, { Fragment, FunctionComponent } from 'react';
import { ResultSectionProps } from './models';
import { TagName, Text } from '../../../Text';

const ResultSection: FunctionComponent<ResultSectionProps> = ({
  content: { onResult, noResult },
  resultSize,
  children,
  isLoading = false,
}) => {
  const { title, subheading } = resultSize > 0 ? onResult : noResult;
  return (
    <Fragment>
      {!isLoading && (
        <div className="wizard__title">
          <Text className="" tag={TagName.h2} text={title} />
          {subheading && (
            <Text className="subheading" tag={TagName.p} text={subheading} />
          )}
        </div>
      )}
      {children}
    </Fragment>
  );
};

export default ResultSection;
