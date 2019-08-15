import React, { Fragment, FunctionComponent } from 'react';
import { ResultSectionProps } from './models';
import { TagName, Text } from '../../../Text';

const ResultSection: FunctionComponent<ResultSectionProps> = ({
  title,
  subheading,
  children,
}) => {
  return (
    <Fragment>
      <div className="wizard__title">
        <Text className="" tag={TagName.h2} text={title} />
        {subheading && (
          <Text className="subheading" tag={TagName.p} text={subheading} />
        )}
      </div>
      {children}
    </Fragment>
  );
};

export default ResultSection;
