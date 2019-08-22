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
  bottomContent,
}) => (
  <Fragment>
    <div className="wizard__info">
      <div className="wizard__title">
        <Text className="" tag={TagName.h1} text={title} />
      </div>
      <Text
        className="wizard__description"
        tag={TagName.p}
        text={description}
      />
    </div>

    <div className="wizard__image">
      <AdaptiveImage {...image} />
    </div>
    <div className="wizard__buttons">
      <Button
        attributes={{ 'aria-label': 'Start the Meal Planner quiz' }}
        className="wizard__button wizard__button--primary"
        onClick={actionCallback}
        content={{ label: primaryButtonLabel }}
      />
      {secondaryButtonLabel && (
        <Button
          className="wizard__button wizard__button--secondary"
          onClick={console.log}
          content={{ label: secondaryButtonLabel }}
        />
      )}
      {bottomContent != undefined && (
        <div className="wizard__button-placeholder">{bottomContent}</div>
      )}
    </div>
  </Fragment>
);

export default IntroductionPanel;
