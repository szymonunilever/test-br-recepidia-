import React, { Fragment, FunctionComponent } from 'react';
import { Button } from '../../../Button';
import { ResultSectionProps } from './models';
import { TagName, Text } from '../../../Text';
import theme from './ResultSection.module.scss';
import cx from 'classnames';

const ResultSection: FunctionComponent<ResultSectionProps> = ({
  content: { onResult, noResult },
  resultSize,
  children,
  actionCallback,
  isLoading = false,
  callbacks,
}) => {
  const { title, subheading, ctas } = resultSize > 0 ? onResult : noResult;

  const buttons = ctas.map(cta => {
    const onClick = () => {
      if (cta.type === 'next') {
        return actionCallback;
      } else {
        return callbacks[cta.type] ? callbacks[cta.type] : undefined;
      }
    };

    return (
      <Button
        key={`button-${cta.type}`}
        onClick={onClick()}
        className={`wizard__button wizard__button--primary`}
        content={cta.content}
      />
    );
  });
  return (
    <Fragment>
      {!isLoading && (
        <div className={cx(theme.wizard__title, 'wizard__title')}>
          <Text className="" tag={TagName.h2} text={title} />
          {subheading && (
            <Text className="subheading" tag={TagName.p} text={subheading} />
          )}
        </div>
      )}
      {children}
      {!isLoading && (
        <div key="wizardButtons" className="wizard__buttons">
          {buttons}
        </div>
      )}
    </Fragment>
  );
};

export default ResultSection;
