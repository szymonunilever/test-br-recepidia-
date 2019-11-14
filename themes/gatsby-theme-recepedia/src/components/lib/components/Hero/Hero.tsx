import React from 'react';
import { HeroProps } from './models';
import cx from 'classnames';
import theme from './Hero.modules.scss';
import Text from '../Text/Text';
import { TagName } from '../Text';
import { navigate, Link } from 'gatsby';
import get from 'lodash/get';
import { Button } from '../Button';
import AdaptiveImage from '../AdaptiveImage';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const Hero = ({ imageIsLink = true, ...props }: HeroProps) => {
  const titleLevel = props.titleLevel || 2;
  const containerStyles = cx('hero', props.className, theme.container);
  const imageStyles = cx('hero__image', theme.image);
  const copyStyles = cx('hero__copy', theme.copy);
  const { primaryCta } = props.content;
  const { secondaryCta } = props.content;

  const primaryCtaLink = primaryCta && primaryCta.linkTo;
  const secondaryCtaLink = secondaryCta && secondaryCta.linkTo;
  const goByPrimaryCTA = () => primaryCtaLink && navigate(primaryCtaLink);
  const goBySecondaryCTA = () => secondaryCtaLink && navigate(secondaryCtaLink);
  const image = get(props, 'content.image');

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
          <AdaptiveImage localImage={image.localImage} alt={image.alt} />
        </div>
      )}
      <div className={copyStyles}>
        <div className="hero__container">
          {props.content.header && (
            <div className="hero__header">
              <Text
                //@ts-ignore
                tag={TagName[`h${titleLevel}`]}
                text={props.content.header}
              />
            </div>
          )}

          {props.content.shortSubheader && (
            <div className="hero__short-subheader">
              <Text
                // @ts-ignore
                tag={TagName[`h${titleLevel + 1}`]}
                text={props.content.shortSubheader}
              />
            </div>
          )}

          {props.content.longSubheader && (
            <div className="hero__long-subheader">
              <Text tag={TagName.p} text={props.content.longSubheader} />
            </div>
          )}

          {primaryCta && (
            <div className="hero__cta-primary">
              {primaryCtaLink ? (
                <Link to={primaryCtaLink}>{primaryCta.label}</Link>
              ) : (
                <Button onClick={goByPrimaryCTA}>{primaryCta.label}</Button>
              )}
            </div>
          )}

          {secondaryCta && (
            <div className="hero__cta-secondary">
              {secondaryCtaLink ? (
                <Link to={secondaryCtaLink}>{secondaryCta.label}</Link>
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
