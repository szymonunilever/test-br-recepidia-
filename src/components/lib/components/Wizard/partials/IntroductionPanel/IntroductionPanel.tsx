/* eslint-disable no-console */
import React, { Fragment, FunctionComponent } from 'react';
import { IntroductionPanelProps } from './models';
import { TagName, Text } from '../../../Text';
import AdaptiveImage from '../../../AdaptiveImage';
import { Button } from '../../../Button';

const IntroductionPanel: FunctionComponent<IntroductionPanelProps> = ({
  title,
  description,
  image,
  primaryButtonLabel,
  secondaryButtonLabel,
  actionCallback,
}) => (
  <Fragment>
    <div className="wizard__info">
      <div className="wizard__title">
        <Text className="" tag={TagName.h2} text={title} />
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
      <Button
        className="wizard__button wizard__button--secondary"
        onClick={console.log}
        content={{ label: secondaryButtonLabel }}
      />
    </div>
  </Fragment>
);

export default IntroductionPanel;
