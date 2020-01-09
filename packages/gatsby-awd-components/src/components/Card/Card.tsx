import cx from 'classnames';
import React, { FunctionComponent, SyntheticEvent, useContext } from 'react';
import { getImageAlt, iconNormalize } from '../../utils';
import AdaptiveImage from '../AdaptiveImage';
import { ButtonProps } from '../Button';
import { TagName, Text } from '../Text';
import { CardProps } from './models';
import theme from './Card.module.scss';
import { ReactComponent as KnorrLogoIcon } from '../../svgs/inline/logo-knorr.svg';
import { ReactComponent as HellmannsLogoIcon } from '../../svgs/inline/logo-hellmanns-filled.svg';
import { ReactComponent as MaizenaLogoIcon } from '../../svgs/inline/logo-maizena.svg';
import { navigate } from 'gatsby';

export const Card: FunctionComponent<CardProps> = ({
   content,
   idPropertyName,
   children,
   className = '',
   imageSizes,
   ratingWidget,
   brand,
   brandName,
   brandLink,
   showDescription = false,
 }) => {
  const currentBrand = brandName ? brandName.replace(/[^a-zA-Z0-9\s-]+/g, '').toLowerCase() : '';
  const brandsLogo = {
    knorr: KnorrLogoIcon,
    hellmanns: HellmannsLogoIcon,
    maizena: MaizenaLogoIcon,
  };
  const { title, description, fields:{slug}, localImage } = content;
  const itemTitle = title && (
    <Text
      tag={TagName[ `div` ]}
      text={title}
      className={cx(theme.card__title, 'card__title')}
    />
    );
    const descriptionText = (description && showDescription) && (
      <Text
        tag={TagName[ `div` ]}
        text={description}
        className={cx(theme.card__description, 'card__description')}
      />
  );
  const modifiedChildren =
    children &&
    React.Children.map(children, child => {
      return (
        React.isValidElement<ButtonProps>(child) &&
        React.cloneElement<ButtonProps>(child, {
          onClick: (val: boolean) => {
            child &&
              child.props.onClick &&
              child.props.onClick.apply(child.props.onClick, [
                val,
                content[idPropertyName],
              ]);
          },
        })
      );
    });
  const wrapClasses = cx(theme.card, 'card', className);
  const Image = localImage && (
    <AdaptiveImage
      className={cx(theme.card__image, 'card__image')}
      localImage={localImage}
      alt={title ? getImageAlt(title, slug) : 'image'}
      sizes={imageSizes}
    />
  );

  const handleBrandClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    brandLink && navigate(`${brandLink}?searchQuery=${currentBrand}`);
  };
  return (
    <div className={wrapClasses} data-componentname="card">
      <div className="card__buttons">{modifiedChildren}</div>
      {Image}
      <div className={cx(theme.card__info, 'card__info')}>
        <div className={cx(theme.card__infoText, 'card__info-text')}>
          {itemTitle}
          {brand}
          {ratingWidget}
          {descriptionText}
        </div>
        {(brandName && brandsLogo[currentBrand]) ? (
          <div
            className={cx(theme.card__infoBrand, 'card__info-brand')}
            onClick={handleBrandClick}
          >
            {iconNormalize(brandsLogo[currentBrand])}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
