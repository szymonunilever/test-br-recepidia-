import cx from 'classnames';
import React from 'react';
import Button from '../Button';
import { TagName, Text } from '../Text';
import theme from './Card.module.scss';
import { CardProps } from './models';

export const Card = ({
  className,
  content: { title, texts, type, cta },
  Icon,
  titleLevel = 2,
}: CardProps) => {
  const classWrapper = cx(theme.card, className);

  const Title = (
    <Text
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
      className="card__title"
    />
  );

  const withType = (
    type: string,
    view: JSX.Element[] | false,
    content: string[] = texts
  ) => {
    if (view) {
      switch (type) {
        case 'phone':
          return <a href={`tel:${content[0]}`}>{view}</a>;
        case 'address':
          return <address>{view}</address>;
        default:
          return view;
      }
    }
  };

  const view =
    texts &&
    texts.length > 0 &&
    texts.map((text, key) => (
      <Text key={key} tag={TagName.p} text={text} className="card__text" />
    ));

  return (
    <div data-componentname="card" className={classWrapper}>
      <div className="card__top">
        {Icon && (
          <div className="card__icon">
            <Icon />
          </div>
        )}
        {Title}
      </div>
      <div className="card__content">
        {withType(type, view)}
        {cta && <Button className="card__button" content={cta} />}
      </div>
    </div>
  );
};

export default Card;
