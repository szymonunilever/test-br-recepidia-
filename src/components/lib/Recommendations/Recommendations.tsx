import React from 'react';
import { RecommendationsProps } from './models';
import cx from 'classnames';
import theme from './Recommendations.module.scss';
import { TagName, Text } from '../Text';

const Recommendations = ({
  className,
  titleLevel = 2,
  content: { title, textList, subtitle },
}: RecommendationsProps) => {
  const classWrapper = cx(theme.recommendations, className);
  // @ts-ignore
  const theTitle = title ? (
    <Text
      className="recommendations__title"
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;
  const theSubTitle = subtitle ? (
    <Text
      className="recommendations__subtitle"
      // @ts-ignore
      tag={TagName[`h${titleLevel + 1}`]}
      text={subtitle}
    />
  ) : null;
  return (
    <div className={classWrapper}>
      {theTitle}
      {theSubTitle}
      <ul className="recommendations__list">
        {textList.map((item, key) => (
          <li key={key} className="recommendations__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
