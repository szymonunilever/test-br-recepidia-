import React, { Fragment, FunctionComponent } from 'react';
import { FinishPanelProps } from './models';
import { TagName, Text } from '../../../Text';
import { Button } from '../../../Button';
import AdaptiveImage from '../../../AdaptiveImage';

const FinishPanel: FunctionComponent<FinishPanelProps> = ({
  actionCallback,
  title,
  subheading,
  description,
  image,
  primaryButtonLabel,
}) => (
  <Fragment>
    <div className="wizard__info">
      <div className="wizard__title">
        <Text className="" tag={TagName.h2} text={title} />
        <Text className="subheading" tag={TagName.p} text={subheading} />
      </div>
      <div className="wizard__description">
        <Text className="" tag={TagName.p} text={description} />
      </div>
    </div>

    <div className="wizard__image">
      <AdaptiveImage {...image} />
    </div>
    <div className="wizard__buttons">
      <Button
        className="wizard__button wizard__button--primary"
        onClick={actionCallback}
        content={{ label: primaryButtonLabel }}
      />
      <div className="wizard__button-placeholder" />
    </div>
  </Fragment>
);

export default FinishPanel;
