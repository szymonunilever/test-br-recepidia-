import React from 'react';
import { HeroProps } from './models';
import cx from 'classnames';
import Img from 'gatsby-image';
import theme from './Hero.modules.scss';
import Text from '../Text/Text';
import { TagName } from '../Text/index';
import { navigate } from 'gatsby';
import { Button } from '../common/Button/index';

const Hero = (props: HeroProps) => {
  const containerStyles = cx('hero', props.className);
  const imageStyles = cx('hero__image', theme.image);

  const goByPrimaryCTA = () => {
    const { primaryCTA } = props.content;
    primaryCTA && primaryCTA.linkTo && navigate(primaryCTA.linkTo);
  };

  const goBySecondaryCTA = () => {
    const { secondaryCTA } = props.content;
    secondaryCTA && secondaryCTA.linkTo && navigate(secondaryCTA.linkTo);
  };

  return (
    <div data-componentname="hero" className={containerStyles}>
      {props.content.image && (
        <div className={imageStyles} onClick={goByPrimaryCTA}>
          <Img
            fluid={props.localImage.childImageSharp.fluid}
            alt={props.content.image.alt}
          />
        </div>
      )}

      {props.content.header && (
        <div className="hero__header">
          <Text tag={TagName.h1} text={props.content.header} />
        </div>
      )}

      {props.content.shortSubheader && (
        <div className="hero__short-subheader">
          <Text tag={TagName.h3} text={props.content.shortSubheader} />
        </div>
      )}

      {props.content.longSubheader && (
        <div className="hero__long-subheader">
          <Text tag={TagName.p} text={props.content.longSubheader} />
        </div>
      )}

      {props.content.primaryCTA && (
        <div className="hero__cta-primary">
          <Button
            label={props.content.primaryCTA.label}
            onClick={goByPrimaryCTA}
          />
        </div>
      )}

      {props.content.secondaryCTA && (
        <div className="hero__cta-secondary">
          <Button
            label={props.content.secondaryCTA.label}
            onClick={goBySecondaryCTA}
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
