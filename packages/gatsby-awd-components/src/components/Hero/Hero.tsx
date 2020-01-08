import React from 'react';
import { HeroProps } from './models';
import cx from 'classnames';
import theme from './Hero.module.scss';
import Text from '../Text/Text';
import { TagName } from '../Text';
import { navigate, Link } from 'gatsby';
import get from 'lodash/get';
import { Button } from '../Button';
import AdaptiveImage from '../AdaptiveImage';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';
import { ReactComponent as KnorrLogoIcon } from '../../svgs/inline/logo-knorr.svg';
import { ReactComponent as HellmannsLogoIcon } from '../../svgs/inline/logo-hellmanns-filled.svg';
import { ReactComponent as MaizenaLogoIcon } from '../../svgs/inline/logo-maizena.svg';
import { iconNormalize } from '../../utils';

const Hero = ({ imageIsLink = true, imageSizes, ...props }: HeroProps) => {
  const titleLevel = props.titleLevel || 2;
  const containerStyles = cx('hero', props.className, theme.hero);
  const imageStyles = cx('hero__image', theme.image);
  const copyStyles = cx('hero__copy', theme.hero__copy);
  const headerStyles = cx('hero__header', theme.hero__header);
  const brandLogoClass = cx(
    theme.hero__containerBrand,
    props.brandLink && theme.hero__containerBrandLinked,
    'hero__container-brand'
  );
  const shortSubheaderStyles = cx(
    'hero__short-subheader ',
    theme.hero__shortSubheader
  );
  const longSubheaderStyles = cx(
    'hero__long-subheader ',
    theme.hero__longSubheader
  );
  const ctaLinkStyles = cx('hero__cta-link ', theme.hero__ctaLink);
  const { primaryCta } = props.content;
  const { secondaryCta } = props.content;

  const primaryCtaLink = primaryCta && primaryCta.linkTo;
  const secondaryCtaLink = secondaryCta && secondaryCta.linkTo;
  const goByPrimaryCTA = () => primaryCtaLink && navigate(primaryCtaLink);
  const goBySecondaryCTA = () => secondaryCtaLink && navigate(secondaryCtaLink);
  const image = get(props, 'content.image');
  const brandsLogo = {
    knorr: KnorrLogoIcon,
    hellmanns: HellmannsLogoIcon,
    maizena: MaizenaLogoIcon,
  };
  const currentBrand = props.brand ? props.brand.replace(/[^a-zA-Z0-9\s-]+/g, '').toLowerCase() : '';
  const handleBrandLogoClick = () => {
    props.brandLink && navigate(props.brandLink);
  };
  return (
    <div
      {...getComponentDataAttrs('hero', props.content)}
      className={containerStyles}
    >
      {props.viewType === 'Image' && image.localImage && (
        <div
          className={imageStyles}
          onClick={imageIsLink ? goByPrimaryCTA : () => {}}
        >
          <AdaptiveImage
            localImage={image.localImage}
            sizes={imageSizes}
            alt={image.alt}
          />
          {(props.brand && brandsLogo[currentBrand]) ? (
            <div
              className={brandLogoClass}
              onClick={handleBrandLogoClick}
            >
              {iconNormalize(brandsLogo[currentBrand])}
            </div>
          ) : null}
        </div>
      )}
      <div className={copyStyles}>
        <div className={cx(theme.hero__container, 'hero__container')}>
          {props.content.header && (
            <div className={headerStyles}>
              <Text
                //@ts-ignore
                tag={TagName[`h${titleLevel}`]}
                text={props.content.header}
              />
            </div>
          )}

          {props.content.shortSubheader && (
            <div className={shortSubheaderStyles}>
              <Text
                // @ts-ignore
                tag={TagName[`h${titleLevel + 1}`]}
                text={props.content.shortSubheader}
              />
            </div>
          )}

          {props.content.longSubheader && (
            <div className={longSubheaderStyles}>
              <Text tag={TagName.p} text={props.content.longSubheader} />
            </div>
          )}

          {primaryCta && (
            <div className={cx(theme.hero__ctaPrimary, 'hero__cta-primary')}>
              {primaryCtaLink ? (
                <Link className={ctaLinkStyles} to={primaryCtaLink}>
                  {primaryCta.label}
                </Link>
              ) : (
                <Button onClick={goByPrimaryCTA}>{primaryCta.label}</Button>
              )}
            </div>
          )}

          {secondaryCta && (
            <div
              className={cx(theme.hero__ctaSecondary, 'hero__cta-secondary')}
            >
              {secondaryCtaLink ? (
                <Link className={theme.hero__ctaLink} to={secondaryCtaLink}>
                  {secondaryCta.label}
                </Link>
              ) : (
                <Button onClick={goBySecondaryCTA}>{secondaryCta.label}</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
