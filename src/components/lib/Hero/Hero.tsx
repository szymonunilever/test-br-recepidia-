import React from 'react';
import { HeroProps } from './models';
import cx from 'classnames';
import Img from 'gatsby-image';
import theme from './Hero.modules.scss';

const Hero = (props: HeroProps) => {
  const containerStyles = cx('hero', props.className);
  const imageStyles = cx('hero__image', theme.image);

  return (
    <div data-componentname="hero" className={containerStyles}>
      {props.content.image && (
        <Img
          className={imageStyles}
          fluid={props.localImage.childImageSharp.fluid}
          alt={props.content.image.alt}
        />
      )}
    </div>
  );
};

export default Hero;
