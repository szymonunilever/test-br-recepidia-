import cx from 'classnames';
import React from 'react';
import Button from '../Button';
import { TagName, Text } from '../Text';
import theme from './ContactCard.module.scss';
import { ContactCardProps } from './models';
import { navigate } from 'gatsby';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

export const ContactCard = ({
  className,
  content,
  content: { title, texts, type, cta },
  Icon,
  titleLevel = 2,
}: ContactCardProps) => {
  const classWrapper = cx(theme.contactCard, className);

  const Title = (
    <Text
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
      className={cx(theme.contactCard__title, 'contact-card__title')}
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
        case 'email':
          return <a href={`mailto:${content[0]}`}>{view}</a>;
        default:
          return view;
      }
    }
  };

  const view =
    texts &&
    texts.length > 0 &&
    texts.map((text, key) => (
      <Text
        key={key}
        tag={TagName.p}
        text={text}
        className={cx(theme.contactCard__text, 'contact-card__text')}
      />
    ));

  const ctaClickHandler = () => {
    if (cta && cta.linkTo) navigate(cta.linkTo);
  };

  return (
    <div {...getComponentDataAttrs('contactCard', content)} className={classWrapper}>
      <div className={cx(theme.contactCard__top, 'contact-card__top')}>
        {Icon && (
          <div className={cx(theme.contactCard__icon, 'contact-card__icon')}>
            <Icon />
          </div>
        )}
        {Title}
      </div>
      <div className={cx(theme.contactCard__content, 'contact-card__content')}>
        {withType(type, view)}
        {cta && (
          <Button
            className={cx(theme.contactCard__button, 'contact-card__button')}
            content={cta}
            onClick={ctaClickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default ContactCard;
